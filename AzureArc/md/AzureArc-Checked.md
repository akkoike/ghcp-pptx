# AzureArc.md レビュー結果

## レビュー結果
- **チェック日**: 2026-04-07
- **データモデル**: GPT 5.4
- **ステータス**: チェック済

| チェック観点             | 判定 | 指摘事項         |
|--------------------------|------|------------------|
| 事実の正確性             | OK   | -                |
| 誤解を招く表現           | NG   | スライド 9 修正済（下記参照） |
| 過剰な言及               | NG   | スライド 4・5 修正済（下記参照） |
| 視覚的な見づらさ         | NG   | スライド 4・5 修正済（下記参照） |

---

## 検証詳細

### 1. 事実の正確性（嘘の有無）: OK

以下の主要な事実を Microsoft 公式ドキュメントと照合し、すべて正確であることを確認しました。

- **Azure Arc の概要**（スライド 2）: Azure Resource Manager への投影、統一コントロールプレーンとしての機能は公式ドキュメント通り
- **対応リソースの種類**（スライド 3）: サーバー、Kubernetes、データサービス、SQL Server、VMware vSphere、SCVMM、Azure Local の 7 種類は公式ドキュメントと一致
- **Connected Machine Agent 対応 OS**（スライド 4）: Windows Server 2012〜2025、Ubuntu 18.04〜24.04、RHEL 7〜10、SLES 12 SP5 / 15 SP4 以降、Amazon Linux 2 / 2023、Debian 11〜13 はすべて公式前提条件ページと一致
  - 参照: https://learn.microsoft.com/azure/azure-arc/servers/prerequisites#supported-operating-systems
- **SQL Managed Instance サービスティア**（スライド 6）: General Purpose（24 コア / 128 GB）、Business Critical（無制限）の仕様は公式ドキュメントと完全一致
  - 参照: https://learn.microsoft.com/azure/azure-arc/data/service-tiers
- **Azure Arc 対応 PostgreSQL サーバー**（スライド 6）: 2025 年 7 月の廃止は公式ドキュメントで確認済み（"Azure Arc-enabled PostgreSQL server retired in July, 2025"）
  - 参照: https://learn.microsoft.com/azure/azure-arc/data/what-is-azure-arc-enabled-postgresql
- **Windows Server Management enabled by Azure Arc**（スライド 9）: Connected Machine Agent バージョン 1.47 以降、Windows Server 2012 以上の Standard / Datacenter エディションが対象である点は公式ドキュメントと一致
  - 参照: https://learn.microsoft.com/azure/azure-arc/servers/windows-server-management-overview#requirements

### 2. 誤解を招く表現の有無: NG → 修正済

**指摘箇所**: スライド 9「料金体系」

- **問題**: 「Windows Server Management enabled by Azure Arc」が料金スライドに記載されているにもかかわらず、無料/有料の区分が明記されていなかった。要件（Agent バージョン、対象 OS）のみが記載されており、読み手がこの機能の料金区分を判断できない状態であった。
- **修正内容**: 見出しに「（有料）」を追記し、月額課金のサービスであることを明示。要件を 1 つの箇条書きに統合して簡潔化した。

### 3. 言及しすぎた表現の有無（過剰表現）: NG → 修正済

**指摘箇所 1**: スライド 4「Azure Arc 対応サーバー」

- **問題**: 「接続方法」セクションに 3 つのサブ項目があり、個別のツール名（Azure Arc Setup、グループポリシー、VMware vSphere / SCVMM 経由の自動オンボーディング、AWS マルチクラウドコネクタ）が詳細に列挙されていた。スライド全体の情報量が過多（3 セクション × 各 3〜5 項目 = 合計 13 以上）。
- **修正内容**: 接続方法を「対話型」「大規模展開」の 2 項目に集約し、個別ツール名の列挙を「等」で簡略化した。

**指摘箇所 2**: スライド 5「Azure Arc 対応 Kubernetes」

- **問題**: クラスター拡張機能のセクションで、Azure Monitor、Microsoft Defender for Containers、Azure Policy、Azure Machine Learning、Azure Arc 対応データサービス、Event Grid、Azure Container Apps の 7 つのサービスが 1 つの箇条書き内に列挙されており、冗長であった。
- **修正内容**: 代表的なサービス名を 3 つに絞り、「等の主要な Azure サービス」と集約した。

### 4. 視覚的に見づらい表現の有無: NG → 修正済

上記スライド 4・5 の修正により解消。

- スライド 4: 接続方法のサブ項目を 3 → 2 に削減し、情報密度を低減
- スライド 5: 拡張機能リストの列挙を簡潔化し、1 箇条書きあたりの文字数を削減
- 全スライドの箇条書きネストは 3 階層以内に収まっていることを確認
- 各スライドの主要項目数は 5〜7 の推奨範囲内であることを確認

---

## 修正サマリー

| スライド | 修正箇所 | 修正前 | 修正後 |
|----------|----------|--------|--------|
| 4 | 接続方法 | 3 項目（対話型・大規模展開・AWS コネクタ） | 2 項目に集約（対話型・大規模展開） |
| 5 | クラスター拡張機能 | 7 サービスの個別列挙 | 代表的な 3 サービス＋「等」に集約 |
| 9 | Windows Server Management | 無料/有料の区分なし、要件のみ記載 | 「（有料）」を明記、月額課金と明示 |

---

## 結論

3 件の NG 指摘をすべて AzureArc.md 上で修正済みです。ステータスを「チェック済」とし、createpptx エージェントへの引き継ぎを許可します。
