---
name: create-pptx
description: PowerPoint を新規に作成する指示があった際に、node.js の PptxGenJS を使用して .pptx 形式の資料を作成します。既に存在する PowerPoint ファイルを修正する際は、Python の python-pptx を使用してください。
---

## 基本レイアウト・デザイン条件
- すべてのテキスト（タイトル・見出し・本文・箇条書き・テーブル内を含む）のフォントは **Meiryo UI** を使用し、`run.font.name = 'Meiryo UI'` で明示的に設定してください。テンプレートから差し替えた表紙のタイトルも同様です。
- デザインは図解や箇条書きを活用し、視覚的にわかりやすくします。
- スライドの内容は簡潔にまとめ、重要なポイントを強調します。
- アイコンやイラストを適宜使用し、視覚的な興味を引きます。
- 文字や図形、画像がシートからはみ出ないよう、１枚のシート内に収まるようにします。

## テンプレートスライド（header.pptx / footer.pptx）のマージ手法

python-pptx で異なる .pptx ファイルからスライドをコピーする際、デザインが崩れる2つの原因と正しい手法を示します。

### 禁止パターン

#### 禁止1: shape 個別コピー方式

```python
# ❌ 画像 rId 参照が壊れるため使用しないこと
for shape in src_slide.shapes:
    el = copy.deepcopy(shape._element)
    new_slide.shapes._spTree.append(el)
```

**壊れる理由**: shape XML 内の画像参照（`r:embed="rId2"` 等）は元スライドのリレーション定義に依存しており、宛先に画像パートが存在しないため画像消失・背景崩れが発生します。

#### 禁止2: cSld のみコピー + Blank レイアウト方式（テンプレート用途で崩れる）

```python
# ❌ テンプレートスライドはレイアウト由来のデザインが失われるため不十分
new_slide = dst_prs.slides.add_slide(blank_layout)
# cSld だけコピーしても、レイアウト上の背景・画像・書式が反映されない
```

**壊れる理由**: header.pptx / footer.pptx のスライドは、視覚的なデザイン要素（背景色、ロゴ画像、著作権表記、テキスト書式など）が**スライドレイアウト側**に定義されており、スライド本体の cSld には含まれていません。Blank レイアウトで複製すると、レイアウト由来のデザインが全て失われます。

### 正しい手法: レイアウト・フラットニング + rId マッピング方式

テンプレートスライドをコピーする際は、**スライドレイアウトの視覚要素をスライド本体に「フラットニング」（統合）してからコピー** してください。

#### 処理手順

1. 宛先プレゼンテーションに Blank レイアウトで空スライドを追加し、デフォルトの placeholder を削除する
2. ソースの**スライドレイアウト**と**スライド本体**の両方から全リレーション（画像パート等）を `relate_to()` で宛先に追加し、**旧 rId → 新 rId のマッピング辞書**を作成する
3. スライドの `cSld` を `copy.deepcopy` でコピーする
4. レイアウトの `cSld` から以下を統合する:
   - **背景 (`<p:bg>`)**: スライド本体に背景がない場合、レイアウトの背景を挿入する
   - **非プレースホルダー shape** (画像・テキストボックス等): スライドの spTree にコピーする
   - **プレースホルダーの書式継承を解決**: スライド内のプレースホルダーの `spPr`（位置・サイズ）と `bodyPr`（テキスト余白）が空（レイアウトから継承）の場合、レイアウト側の定義で埋める
5. 統合した `cSld` 内の全 rId 参照を、マッピング辞書で書き換える
6. 宛先スライドの `cSld` を差し替える

#### コード実装

```python
import copy
from pptx import Presentation

NSMAP_P = '{http://schemas.openxmlformats.org/presentationml/2006/main}'
NSMAP_R = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'
NSMAP_A = '{http://schemas.openxmlformats.org/drawingml/2006/main}'
RT_SLIDE_LAYOUT = (
    'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout'
)
RT_SLIDE_MASTER = (
    'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster'
)
RT_NOTES_SLIDE = (
    'http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesSlide'
)
SKIP_RELTYPES = {RT_SLIDE_LAYOUT, RT_SLIDE_MASTER, RT_NOTES_SLIDE}


def _find_blank_layout(prs):
    """Blank レイアウトを探す"""
    for layout in prs.slide_layouts:
        if layout.name in ('Blank', '白紙'):
            return layout
    return prs.slide_layouts[6]  # フォールバック


def _collect_rels(part, rId_map, new_slide_part):
    """part のリレーションを new_slide_part にコピーし rId_map を更新する"""
    for rId, rel in part.rels.items():
        if rel.is_external:
            continue
        if rel.reltype in SKIP_RELTYPES:
            continue
        new_rId = new_slide_part.relate_to(rel.target_part, rel.reltype)
        rId_map[rId] = new_rId


def _get_ph_type(sp_elem):
    """shape 要素からプレースホルダータイプを取得する (None=非PH)"""
    nvPr = sp_elem.find(f'.//{NSMAP_P}nvPr')
    if nvPr is not None:
        ph = nvPr.find(f'{NSMAP_P}ph')
        if ph is not None:
            return ph.get('type', 'body')
    return None


def _resolve_placeholder_inheritance(slide_sp, layout_spTree):
    """スライドのプレースホルダーにレイアウトの spPr / bodyPr を解決する"""
    ph_type = _get_ph_type(slide_sp)
    if ph_type is None:
        return

    # レイアウトから一致するプレースホルダーを探す
    for layout_sp in layout_spTree:
        tag = layout_sp.tag.split('}')[-1] if '}' in layout_sp.tag else layout_sp.tag
        if tag in ('nvGrpSpPr', 'grpSpPr'):
            continue
        if _get_ph_type(layout_sp) == ph_type:
            # spPr が空なら、レイアウトの spPr で置換
            slide_spPr = slide_sp.find(f'{NSMAP_P}spPr')
            layout_spPr = layout_sp.find(f'{NSMAP_P}spPr')
            if slide_spPr is not None and layout_spPr is not None:
                if len(slide_spPr) == 0:
                    parent = slide_spPr.getparent()
                    idx = list(parent).index(slide_spPr)
                    parent.remove(slide_spPr)
                    parent.insert(idx, copy.deepcopy(layout_spPr))

            # bodyPr が空なら、レイアウトの bodyPr で置換
            slide_txBody = slide_sp.find(f'{NSMAP_P}txBody')
            layout_txBody = layout_sp.find(f'{NSMAP_P}txBody')
            if slide_txBody is not None and layout_txBody is not None:
                slide_bodyPr = slide_txBody.find(f'{NSMAP_A}bodyPr')
                layout_bodyPr = layout_txBody.find(f'{NSMAP_A}bodyPr')
                if slide_bodyPr is not None and layout_bodyPr is not None:
                    if len(slide_bodyPr) == 0 and len(slide_bodyPr.attrib) == 0:
                        parent = slide_bodyPr.getparent()
                        idx = list(parent).index(slide_bodyPr)
                        parent.remove(slide_bodyPr)
                        parent.insert(idx, copy.deepcopy(layout_bodyPr))
            break


def copy_template_slide(src_slide, dst_prs):
    """
    テンプレートスライド (header/footer) を、レイアウト由来のデザインを
    含めて正しくコピーする（レイアウト・フラットニング方式）。
    """
    src_layout = src_slide.slide_layout
    blank_layout = _find_blank_layout(dst_prs)
    new_slide = dst_prs.slides.add_slide(blank_layout)

    # placeholder を削除
    for ph in list(new_slide.placeholders):
        ph._element.getparent().remove(ph._element)

    # --- リレーションを両方からコピー ---
    rId_map = {}
    _collect_rels(src_layout.part, rId_map, new_slide.part)  # レイアウトから先
    _collect_rels(src_slide.part, rId_map, new_slide.part)   # スライドから後

    # --- cSld をディープコピー ---
    new_cSld = copy.deepcopy(
        src_slide._element.find(f'{NSMAP_P}cSld')
    )
    layout_cSld = src_layout._element.find(f'{NSMAP_P}cSld')

    # (A) レイアウトの背景をスライドに統合
    slide_bg = new_cSld.find(f'{NSMAP_P}bg')
    layout_bg = layout_cSld.find(f'{NSMAP_P}bg') if layout_cSld is not None else None
    if slide_bg is None and layout_bg is not None:
        bg_copy = copy.deepcopy(layout_bg)
        spTree = new_cSld.find(f'{NSMAP_P}spTree')
        spTree_idx = list(new_cSld).index(spTree) if spTree is not None else 0
        new_cSld.insert(spTree_idx, bg_copy)

    # (B) プレースホルダーの書式継承を解決
    slide_spTree = new_cSld.find(f'{NSMAP_P}spTree')
    layout_spTree = layout_cSld.find(f'{NSMAP_P}spTree') if layout_cSld is not None else None
    if slide_spTree is not None and layout_spTree is not None:
        slide_ph_types = set()
        for sp in list(slide_spTree):
            pt = _get_ph_type(sp)
            if pt is not None:
                slide_ph_types.add(pt)
                _resolve_placeholder_inheritance(sp, layout_spTree)

        # (C) レイアウトの非プレースホルダー shape をスライドに統合
        insert_pos = 2  # nvGrpSpPr, grpSpPr の後
        for child in layout_spTree:
            tag = child.tag.split('}')[-1] if '}' in child.tag else child.tag
            if tag in ('nvGrpSpPr', 'grpSpPr'):
                continue
            # スライドに既存のプレースホルダーならスキップ
            if _get_ph_type(child) in slide_ph_types:
                continue
            slide_spTree.insert(insert_pos, copy.deepcopy(child))
            insert_pos += 1

    # --- 全 rId を書き換え ---
    for elem in new_cSld.iter():
        for attr_name, attr_val in list(elem.attrib.items()):
            if NSMAP_R in attr_name and attr_val in rId_map:
                elem.attrib[attr_name] = rId_map[attr_val]

    # --- cSld を差し替え ---
    old_cSld = new_slide._element.find(f'{NSMAP_P}cSld')
    new_slide._element.replace(old_cSld, new_cSld)

    return new_slide
```

#### コンテンツスライドのコピー

PptxGenJS で生成したコンテンツスライドは、レイアウトに依存しない自己完結型のため、以下の軽量版で十分です。

```python
def copy_content_slide(src_slide, dst_prs):
    """PptxGenJS 生成のコンテンツスライドをコピーする（rId マッピング方式）"""
    blank_layout = _find_blank_layout(dst_prs)
    new_slide = dst_prs.slides.add_slide(blank_layout)

    for ph in list(new_slide.placeholders):
        ph._element.getparent().remove(ph._element)

    rId_map = {}
    _collect_rels(src_slide.part, rId_map, new_slide.part)

    src_cSld = copy.deepcopy(
        src_slide._element.find(f'{NSMAP_P}cSld')
    )
    for elem in src_cSld.iter():
        for attr_name, attr_val in list(elem.attrib.items()):
            if NSMAP_R in attr_name and attr_val in rId_map:
                elem.attrib[attr_name] = rId_map[attr_val]

    old_cSld = new_slide._element.find(f'{NSMAP_P}cSld')
    new_slide._element.replace(old_cSld, src_cSld)
    return new_slide
```

### マージスクリプト（merge-slides.py）での使用例

```python
# header.pptx をベースに開く（表紙はそのまま残る）
prs = Presentation(HEADER_PPTX)

# PptxGenJS で生成したコンテンツスライドを追加
content_prs = Presentation(CONTENT_PPTX)
for slide in content_prs.slides:
    copy_content_slide(slide, prs)

# footer.pptx を最終スライドとして追加（レイアウト・フラットニング方式）
footer_prs = Presentation(FOOTER_PPTX)
for slide in footer_prs.slides:
    copy_template_slide(slide, prs)

prs.save(OUTPUT_PPTX)
```

### 使い分けまとめ

| 関数名 | 用途 | レイアウト処理 |
|--------|------|---------------|
| `copy_template_slide` | header.pptx / footer.pptx のテンプレートスライド | レイアウトの背景・画像・書式をスライドにフラットニング |
| `copy_content_slide` | PptxGenJS で生成したコンテンツスライド | スライド本体のみコピー（レイアウト依存なし） |

### 注意事項
- `slide_layouts` から Blank レイアウトを `name` で探してください（`'Blank'` または `'白紙'`）。インデックス `[6]` はテンプレートによって異なります。
- header.pptx の表紙タイトルを変更する場合は、`Presentation(HEADER_PPTX)` で開いた後に直接編集すれば、リレーションは保持されたままなので問題ありません。
- テンプレートスライドの背景が `schemeClr`（テーマカラー参照）を使用している場合、宛先プレゼンテーションのテーマに同名の色定義が存在する必要があります。header.pptx と footer.pptx が同一テンプレート由来であれば問題ありません。