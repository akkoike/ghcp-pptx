# Azure Local 詳細仕様

## プレゼンテーション概要

| 項目 | 内容 |
|------|------|
| **目的** | Azure Local の詳細仕様を体系的に整理し、製品の全体像・アーキテクチャ・主要機能・導入要件を理解していただくこと |
| **対象者** | インフラエンジニア、クラウドアーキテクト、IT 意思決定者 |
| **スライド枚数** | 10枚 |

## レイアウト・デザイン条件

| 項目 | 設定値 |
|------|--------|
| スライドサイズ | 16:9（wide） |
| フォント | Meiryo UI |
| 背景色 | 白色 |
| フォント色 | 黒色 |
| 文末表現 | ですます調（敬体） |

---

## スライド 1: 表紙

- **見出し**: Azure Local 詳細仕様
- **サブタイトル**: Microsoft のハイブリッドクラウドインフラストラクチャソリューション
- **日付**: 2026年4月
- **図解**: なし

---

## スライド 2: Azure Local とは

- **見出し**: Azure Local の概要
- **本文**:
  - Azure Local は、Microsoft の分散インフラストラクチャソリューションです
  - お客様のオンプレミス環境に Azure の機能を拡張し、ローカルでのアプリケーション展開を実現します
  - 旧称「Azure Stack HCI」から名称が変更されています
  - Azure Arc を統一コントロールプレーンとして使用し、クラウドからエッジまでシームレスに管理できます
  - クラウドネイティブな管理エクスペリエンスを提供し、接続・切断両方のデプロイをサポートします
  - 物理コアあたりの月額サブスクリプション課金モデルを採用しています
- **図解**: Azure Local の位置づけを示す概念図（Azure クラウド ↔ Azure Arc ↔ オンプレミス Azure Local）

---

## スライド 3: 主要ユースケース

- **見出し**: Azure Local のユースケース
- **本文**:
  - **ローカル AI 推論**: データをソースで処理する必要がある環境に適しています（例: 小売店のセルフチェックアウト、パイプラインの漏洩検出）
  - **ミッションクリティカルな業務継続**: ネットワーク障害時にも稼働し続ける必要があるシステムに適しています（例: 工場の生産ライン、スタジアムのチケッティング）
  - **制御システム・リアルタイム運用**: 極めて低いレイテンシが要求される環境に適しています（例: 製造実行システム、金融インフラ）
  - **主権・規制要件**: データをローカルに保持・管理する必要がある業界に適しています（例: 防衛・情報セクター、エネルギーインフラ）
- **図解**: 4つのユースケースを四象限で示す図（アイコン付き）

---

## スライド 4: アーキテクチャ

- **見出し**: Azure Local のアーキテクチャ
- **本文**:
  - ハイパーコンバージドインフラストラクチャ（HCI）ソリューションとして構築されています
  - **基盤技術**: Hyper-V、Storage Spaces Direct、フェイルオーバークラスタリングを採用しています
  - **構成規模**: 1台から最大16台の物理マシンでクラスタを構成できます
  - **プラットフォームリソース**:
    - Azure Local（コンピュート・ストレージ基盤）
    - Azure Arc（統一管理プレーン）
    - Azure Key Vault（シークレット管理）
    - Azure Monitor（監視・ログ分析）
    - Microsoft Defender for Cloud（セキュリティ）
  - **ネットワーク設計**: ストレージスイッチ構成またはスイッチレス構成（2～4ノード）を選択できます
- **図解**: アーキテクチャ構成図（物理サーバー → HCI 基盤 → Azure Arc → Azure クラウドサービス群の階層図）

---

## スライド 5: システム要件

- **見出し**: システム要件・ハードウェア仕様
- **本文**:
  - **Azure 要件**:
    - Azure サブスクリプション（EA、CSP、Pay-as-you-go 等）が必要です
    - 対応リージョン: East US、West Europe、Australia East、Southeast Asia、Japan East 等に対応しています
  - **最大ハードウェア仕様**:
    - 物理マシン数: 最大16台/システム
    - ストレージ: 最大4 PB/システム、最大400 TB/マシン
    - ボリューム: 最大64個/システム、最大64 TB/ボリューム
    - 論理プロセッサ: 最大512個/ホスト
    - RAM: 最大24 TB/ホスト
    - 仮想プロセッサ: 最大2,048個/ホスト
  - **ネットワーク要件**: Azure パブリックエンドポイントへの接続が必要です（最低10 Mbit）
- **図解**: ハードウェア仕様を示すテーブル

---

## スライド 6: ワークロード管理

- **見出し**: ワークロード管理機能
- **本文**:
  - **Azure Local VM 管理**:
    - Windows/Linux VM のプロビジョニングと管理ができます
    - Azure Portal、Azure CLI、PowerShell、ARM テンプレートから操作が可能です
    - VM ライフサイクル操作（作成・起動・停止・削除・リサイズ等）に対応しています
    - RBAC による役割ベースのアクセス制御を提供しています
  - **AKS on Azure Local**:
    - Azure Arc 対応の Azure Kubernetes Service を展開できます
    - Azure Portal から直接 Kubernetes クラスタの作成・管理が可能です
    - コンテナ化されたアプリケーションのスケーリングに対応しています
  - **Azure Virtual Desktop**:
    - オンプレミスインフラにセッションホストを展開できます
    - シングルセッション・マルチセッション構成を選択できます
- **図解**: ワークロードの種類を示すブロック図（VM / AKS / AVD の3本柱）

---

## スライド 7: 管理ツール・Azure サービス連携

- **見出し**: 管理ツールと Azure サービス連携
- **本文**:
  - **クラウド管理ツール**:
    - Azure Portal（単一管理画面）を使用できます
    - Azure CLI / Azure PowerShell でコマンドライン管理が可能です
    - ARM / Bicep / Terraform テンプレートで自動化できます
  - **オンプレミス管理ツール**:
    - Windows Admin Center から管理できます
    - Hyper-V Manager / Failover Cluster Manager が利用可能です
    - PowerShell での操作に対応しています
  - **Azure サービス連携**:
    - Azure Monitor / Azure Policy（監視・コンプライアンス管理）
    - Azure Backup / Azure Site Recovery（事業継続・災害復旧）
    - Azure Update Manager / Copilot for Azure（運用管理・AI 支援）
- **図解**: Azure サービス連携を示す放射状の図（中心に Azure Local、周囲に各サービスアイコン）

---

## スライド 8: セキュリティ

- **見出し**: セキュリティ機能
- **本文**:
  - **セキュア・バイ・デフォルト構成**:
    - 300以上のセキュリティ設定を標準搭載し、一貫したセキュリティベースラインを提供しています
    - ドリフト制御メカニズムにより設定の逸脱を防止します
  - **インフラストラクチャ保護**:
    - Secure Boot、UEFI、TPM、仮想化ベースのセキュリティ（VBS）をサポートしています
    - BitLocker によるディスク暗号化、SMB 暗号化によるストレージトラフィック保護に対応しています
  - **脅威保護・アクセス制御**:
    - Microsoft Defender for Cloud によるセキュリティポスチャ評価と脅威検出を提供しています
    - Trusted Launch による VM ワークロード保護、Syslog 転送による SIEM 連携に対応しています
    - Azure RBAC によるきめ細かなアクセス制御を実現しています
- **図解**: セキュリティレイヤーを示す多層図（ハードウェア層 → OS 層 → ワークロード層 → クラウドサービス層）

---

## スライド 9: 料金体系と Windows Server との比較

- **見出し**: 料金体系と Windows Server との比較
- **本文**:
  - **料金体系**:
    - 物理コアあたりの月額サブスクリプション課金モデルです
    - 追加 Azure サービス利用時は従量課金が適用されます
    - Azure Hybrid Benefit により既存ライセンスを活用できます
    - AKS on Azure Local は Azure Local 料金に含まれています
  - **Windows Server との主な違い**:

    | 項目 | Azure Local | Windows Server |
    |------|-------------|----------------|
    | クラウド接続 | 必須（30日に1回以上） | オプション |
    | ライセンス | Pay-as-you-go / Azure Hybrid Benefit | 従来型ライセンス |
    | ハードウェア | 認定カタログから選択（200以上） | Certified for Windows Server |
    | ライフサイクル | 常に最新（更新適用猶予6ヶ月） | LTSC（10年サポート） |
    | サポート | Azure サポートに含まれます | 別途サポート契約（Premier Support 等）で対応 |

- **図解**: 比較テーブル

---

## スライド 10: まとめ・次のステップ

- **見出し**: まとめと次のステップ
- **本文**:
  - **Azure Local の価値**:
    - Azure の一貫した管理体験をオンプレミスに拡張できます
    - AI・ミッションクリティカル・低レイテンシ・主権要件に対応しています
    - セキュア・バイ・デフォルトで運用負荷を軽減します
    - 柔軟なハードウェア選択と課金モデルを提供しています
  - **次のステップ**:
    - Azure Local Catalog でハードウェアパートナーを確認してください
    - Azure Local サイジングツールで構成を見積もってください
    - 60日間の無料試用版をダウンロードしてお試しいただけます
    - Microsoft パートナーにご相談ください
- **図解**: なし

---

## 参照リンク

| # | タイトル | URL |
|---|---------|-----|
| 1 | Azure Local とは | https://learn.microsoft.com/azure/azure-local/overview |
| 2 | ハイパーコンバージド展開の概要 | https://learn.microsoft.com/azure/azure-local/overview/hyperconverged-overview |
| 3 | システム要件 | https://learn.microsoft.com/azure/azure-local/concepts/system-requirements-23h2 |
| 4 | ベースラインリファレンスアーキテクチャ | https://learn.microsoft.com/azure/architecture/hybrid/azure-local-baseline |
| 5 | Azure サービスとのハイブリッド連携 | https://learn.microsoft.com/azure/azure-local/hybrid-capabilities-with-azure-services-23h2 |
| 6 | VM 管理の概要 | https://learn.microsoft.com/azure/azure-local/manage/azure-arc-vm-management-overview |
| 7 | AKS on Azure Local アーキテクチャ | https://learn.microsoft.com/azure/aks/aksarc/cluster-architecture |
| 8 | Windows Server との比較 | https://learn.microsoft.com/azure/azure-local/concepts/compare-windows-server |
| 9 | Well-Architected Framework ガイド | https://learn.microsoft.com/azure/well-architected/service-guides/azure-local |
| 10 | ストレージスイッチレスアーキテクチャ | https://learn.microsoft.com/azure/architecture/hybrid/azure-local-switchless |
