# SIパートナーにおけるFDE（Forward Deployed Engineer）× AI支援の最新動向

## プレゼンテーション概要

| 項目 | 内容 |
|------|------|
| **目的** | SIパートナー各社が推進するFDE（Forward Deployed Engineer）モデルと、自社LLMを活用したAI支援の取り組みを整理し、各社の戦略・特徴を体系的に把握すること |
| **対象者** | IT戦略担当者、DX推進リーダー、パートナーアライアンス担当者、AI導入を検討する意思決定者 |
| **スライド枚数** | 7枚 |

## レイアウト・デザイン条件

| 項目 | 設定値 |
|------|--------|
| スライドサイズ | 16:9（wide） |
| フォント | Meiryo UI |
| 背景色 | 白色 |
| フォント色 | 黒色 |
| 文末表現 | ですます調（敬体） |
| テンプレート | Azure Brand Template |
| 強調 | 太字を使用 |
| デザイン | 図解・箇条書き・アイコンを活用し、視覚的にわかりやすく |
| レイアウト制約 | 文字・図形・画像がシートからはみ出ないよう、1枚のシート内に収める |

---

## スライド 1: 表紙

- **見出し**: SIパートナーにおける FDE × AI支援の最新動向
- **サブタイトル**: 日立・NTTデータ・NEC・アクセンチュア×マイクロソフトの取り組み
- **日付**: 2026年4月
- **図解**: なし
- **備考**: header.pptx テンプレートを使用するため、タイトルのみ記載。header.pptx のタイトルプレースホルダーに上記テキストを差し替えます。

---

## スライド 2: FDE（Forward Deployed Engineer）概要

- **見出し**: FDE（Forward Deployed Engineer）とは
- **本文**:
  - **FDE の定義**:
    - FDE（Forward Deployed Engineer）とは、AIやデータ分析に精通したエンジニアが**顧客企業に直接常駐・伴走**し、AI導入から実装・運用定着までを一貫して支援するエンジニアリングモデルです
    - 従来のSI（システムインテグレーション）モデルが「受託開発→納品」で完結していたのに対し、FDEは**顧客の現場に入り込み、課題発見からソリューション実装、定着化までを共に推進**します
  - **SIパートナーでFDEが流行している背景**:
    - 企業のAI導入が「PoC（概念実証）」段階から**「全社展開・本番運用」段階**へ移行しており、現場密着型の技術支援が求められています
    - 生成AIやAIエージェントの急速な進化により、**業務変革の実行スピード**が競争力の源泉となっています
    - 各社が自社開発のLLM（大規模言語モデル）を武器に、**差別化されたAI支援サービス**を展開しています
    - 顧客企業のAI活用における「導入の壁」「実装の技術的課題」「組織定着」を解決するため、**伴走型支援**の需要が急拡大しています
  - **主要プレイヤーの構図**:

    | 企業 | 自社LLM / AI基盤 | FDE関連ブランド |
    |------|-------------------|-----------------|
    | 日立製作所 | Lumada / HMAX | GenAI Professional / AI Ambassador |
    | NTTデータ | tsuzumi（NTT開発） | LITRON |
    | NEC | cotomi | BluStellar AI |
    | アクセンチュア×MS | Microsoft AI Platform | FDE（共同体制） |

- **図解**: FDEモデルの概念図（中央に「顧客企業」、周囲に「AI戦略策定」「PoC・開発」「本番実装」「運用定着」の4フェーズを配置し、FDEエンジニアが全フェーズに伴走することを示す循環型フロー図）

---

## スライド 3: 日立 - Lumada × FDE

- **見出し**: 日立製作所 ― Lumada / HMAX による AI支援 FDE
- **本文**:
  - **Lumada / HMAX**:
    - Lumada は「Illuminate + Data」の造語で、日立のデジタルソリューション群の総称です。データ・テクノロジー・ドメインナレッジを掛け合わせ、顧客との**協創**で価値を創出します
    - HMAX は、AIとデータに日立の**OT（制御・運用技術）ドメインナレッジ**を掛け合わせた次世代ソリューション群で、社会インフラの複雑な課題に対応します
  - **FDE型の取り組み**:
    - **GenAI Professional**: 生成AI活用ナレッジを持つ専門人材が、顧客企業に**伴走型で支援**する「生成AI活用プロフェッショナルサービス powered by Lumada」を提供しています
    - **AIアンバサダー / HARC for AI**: IT/OT両分野のエキスパート16名が顧客との懸け橋として活動し、AIエージェントの運用支援サービスも展開しています
    - 1,000件以上の生成AIユースケースの知見を顧客支援に活用しています
  - **パートナーシップ**: マイクロソフト、NVIDIA、Google Cloudとの戦略的アライアンスを推進しています
- **図解**: 日立のAI支援FDE体制図（左に「Lumada / HMAX」基盤、中央に「GenAI Professional / AIアンバサダー」、右に「顧客企業」を配置し、「協創」の矢印で接続するブロック図。下部にパートナーロゴ（Microsoft, NVIDIA, Google Cloud）を配置）

---

## スライド 4: NTTデータ - tsuzumi × LITRON × FDE

- **見出し**: NTTデータ ― tsuzumi × LITRON による AI支援 FDE
- **本文**:
  - **tsuzumi とは**:
    - NTTが独自開発した日本語版LLMで、**超軽量（0.6B）と軽量（7B）**の2種類を提供し、GPT-3（175B）の最大300分の1のサイズで**高い日本語処理性能とコスト効率**を両立しています（2024年3月商用提供開始）
    - 40年以上のNTT研究所の自然言語処理研究の蓄積を活かし、業界特化アダプタによる少ない追加学習でのカスタマイズも可能です
  - **LITRON とは**:
    - NTTデータの先端AI技術を活用したサービス・製品の**総称ブランド**で、4つの「**Smart AI Agent™**」（パーソナル・特化・デジタルワーカー・マルチ）を活用した業務変革を実現します
    - 主要サービスとして **LITRON Sales / Marketing / Finance / Legal / CORE** を展開し、業種・部門横断の効率化・自動化を支援しています
  - **FDE型の支援体制**: コンサルティングから開発・運用支援、人材提供まで**ワンストップ**で顧客をサポートしています
- **図解**: tsuzumi × LITRON のサービス体系図（上段に「tsuzumi（NTT開発LLM）」、中段に「Smart AI Agent™ 4つのエージェント」、下段に「LITRON サービス群（Sales / Marketing / Finance / Legal / CORE）」を階層構造で配置）

---

## スライド 5: NEC - cotomi × BluStellar × FDE

- **見出し**: NEC ― cotomi × BluStellar AI による AI支援 FDE
- **本文**:
  - **cotomi とは**:
    - NECが独自開発したLLMで、**高い日本語能力と軽量さ**を両立し、クラウド・オンプレミスのハイブリッド提供が可能です
    - 2026年3月、「ガバメントAIで試用する国内LLM」にも選定されています
  - **BluStellar AI とは**:
    - NECの業種横断の知見と最先端テクノロジーにより、**ビジネスモデルの変革を支援**するDXブランドです
    - Newsweek AI Impact APAC & EMEA Awardsにおいて**5部門で受賞**するなど、グローバルでも高い評価を受けています
  - **FDE型の取り組み**:
    - **AIコンサル・分析サービス**: AIスペシャリスト人材が、**調査・企画から実装・運用までトータルに支援**します
    - **BluStellar Academy for AI/DX**: AI・DX人材育成を通じて顧客企業の**自走力を強化**し、製造・金融・公共など幅広い業種で導入実績があります
- **図解**: NEC BluStellar AI のサービス全体図（中央に「cotomi（NEC開発LLM）」、周囲に「AIコンサル」「AIエージェント」「AIプロダクト」「人材育成」を配置したハブ＆スポーク型の図。各スポークにアイコンを付加）

---

## スライド 6: アクセンチュア × マイクロソフト FDE 共同取り組み

- **見出し**: アクセンチュア × マイクロソフト ― FDE 共同体制の始動
- **レイアウト指示**: **左右2分割レイアウト**。左側（約40%幅）にスクリーンショット画像、右側（約60%幅）に要約テキストを配置します。
- **左側: スクリーンショット**:
  - URL `https://consulportal.com/news/consulting-67/` のスクリーンショットを取得し、画像として配置します
  - 画像ファイル: `FDE_AI支援/docs/accenture_ms_fde_screenshot.png`（Playwright MCP で取得）
  - **画像の下にキャプション**: 「出典: コンサルポータル（2026年3月24日更新）」
- **右側: 要約テキスト**:
  - **発表概要（2026年3月18日発表）**:
    - アクセンチュアとマイクロソフトは、企業のAI導入を支援する新体制**「Forward Deployed Engineering（FDE）」**を共同で立ち上げました
    - AIの構想段階にとどまらず、**実際のビジネス現場での運用・定着化を加速**させることを目的としています
  - **体制の特徴**:
    - AIに精通した**数千人規模のエンジニア**が、マイクロソフトの**最先端AIプラットフォーム**とアクセンチュアの**深い業界知見・業務設計力**を融合し、伴走型の支援を提供します
    - 「全社展開への壁」や「実装面の技術的課題」に対し、本番運用までのリードタイムを大幅に短縮します
  - **示唆**: AIが「実験段階」から「実務への完全統合段階」へ移行したことを象徴する取り組みであり、**実装スキルや業務変革能力**の需要がさらに高まることを示しています
- **図解**: 左右2分割レイアウト（左側にスクリーンショット画像、右側に上記要約テキストを箇条書きで配置）

---

## スライド 7: 最終スライド

- **見出し**: （なし）
- **備考**: footer.pptx テンプレートをそのまま最終スライドとして追加します。footer.pptx のスライドをレイアウト・フラットニング方式でコピーし、内容の変更は行いません。

---

## 参照リンク

| # | タイトル | URL |
|---|---------|-----|
| 1 | アクセンチュアとMS、AI実装支援の新体制「FDE」を始動（コンサルポータル） | https://consulportal.com/news/consulting-67/ |
| 2 | Lumada トップページ（日立製作所） | https://www.hitachi.co.jp/products/it/lumada/index.html |
| 3 | 日立 AI 事例・記事一覧（進化するAI） | https://www.hitachi.co.jp/products/it/lumada/spcon/generative_ai/overview/index.html |
| 4 | 日立 GenAIアンバサダー任命 | https://digital-highlights.hitachi.co.jp/_ct/17744295 |
| 5 | 日立 生成AI活用プロフェッショナルサービス powered by Lumada | https://www.hitachi.co.jp/New/cnews/month/2024/07/0722.html |
| 6 | 日立 HARC for AI 提供開始 | https://www.hitachi.co.jp/New/cnews/month/2025/10/1007.pdf |
| 7 | LITRON® トップページ（NTTデータ） | https://www.nttdata.com/jp/ja/lineup/litron/ |
| 8 | NTT 大規模言語モデル「tsuzumi」記者会見速報 | https://group.ntt/jp/magazine/blog/tsuzumi/ |
| 9 | NTT tsuzumi 商用サービス提供開始（ニュースリリース） | https://group.ntt/jp/newsrelease/2023/11/01/pdf/231101aa.pdf |
| 10 | BluStellar AI トップページ（NEC） | https://jpn.nec.com/ai/index.html |
| 11 | NEC Generative AI Service（cotomi LLM） | https://jpn.nec.com/LLM/index.html |
| 12 | NEC AIエージェント | https://jpn.nec.com/LLM/AIagent.html |
| 13 | NEC ガバメントAI LLM選定（2026年3月） | https://jpn.nec.com/press/202603/20260309_03.html |
