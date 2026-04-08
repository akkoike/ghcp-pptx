# Azure Arc 詳細仕様

## プレゼンテーション概要

| 項目 | 内容 |
|------|------|
| **目的** | Azure Arc の詳細仕様を体系的に整理し、ハイブリッド・マルチクラウド管理における統一コントロールプレーンとしての機能、対応リソース、セキュリティ、料金体系を理解していただくこと |
| **対象者** | クラウドアーキテクト、インフラエンジニア、IT 管理者、ハイブリッドクラウド導入を検討する意思決定者 |
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

- **見出し**: Azure Arc 詳細仕様
- **サブタイトル**: ハイブリッド・マルチクラウド環境のための統一管理プラットフォーム
- **日付**: 2026年4月
- **図解**: なし

---

## スライド 2: Azure Arc の概要

- **見出し**: Azure Arc とは
- **本文**:
  - Azure Arc は、オンプレミス、マルチクラウド、エッジにまたがる複雑な分散環境を簡素化し、一貫したマルチクラウドおよびオンプレミス管理プラットフォームを提供するサービスです
  - 既存の非 Azure リソースおよびオンプレミスリソースを Azure Resource Manager に投影（プロジェクション）することで、環境全体を一元管理できます
  - 仮想マシン、Kubernetes クラスター、データベースを、あたかも Azure 上で実行されているかのように管理できます
  - Azure の使い慣れたサービスと管理機能を、リソースの場所を問わず利用できます
  - 従来の ITOps を継続しながら、DevOps プラクティスを導入して新しいクラウドネイティブパターンをサポートできます
  - Azure の「アダプティブクラウド」アプローチの中核を担うサービスです
- **図解**: Azure Arc コントロールプレーンの概念図（Azure クラウド・オンプレミス・マルチクラウド・エッジを Azure Arc でつなぐ統一管理のブロック図）

---

## スライド 3: Azure Arc 対応リソースの種類

- **見出し**: Azure Arc 対応リソースの種類
- **本文**:
  - **Azure Arc 対応サーバー**: Azure 外でホストされている Windows / Linux の物理サーバーおよび仮想マシンを管理します
  - **Azure Arc 対応 Kubernetes**: あらゆる場所で実行されている Kubernetes クラスターを接続・構成できます（複数のディストリビューションに対応）
  - **Azure Arc 対応データサービス**: Kubernetes とお客様のインフラストラクチャ上で SQL Managed Instance をオンプレミス、エッジ、パブリッククラウドで実行できます
  - **SQL Server enabled by Azure Arc**: Azure 外でホストされている SQL Server インスタンスに Azure サービスを拡張します
  - **Azure Arc 対応 VMware vSphere**: VMware vCenter で管理される VM のライフサイクル管理・ゲスト管理を提供します
  - **Azure Arc 対応 SCVMM**: System Center Virtual Machine Manager 環境の VM を Azure から管理できます
  - **Azure Local（旧 Azure Stack HCI）**: Azure Local 上の VM を Azure Arc で管理し、VM のライフサイクル操作を実行できます
- **図解**: 対応リソースの種類を示す放射状のブロック図（中央に Azure Arc、周囲にサーバー・Kubernetes・データサービス・SQL Server・VMware・SCVMM・Azure Local を配置）

---

## スライド 4: Azure Arc 対応サーバー

- **見出し**: Azure Arc 対応サーバー（Connected Machine Agent）
- **本文**:
  - **Azure Connected Machine Agent**:
    - Azure 外の Windows / Linux マシンを Azure に接続するためのエージェントです
    - エージェントのインストールにより、マシンは Azure Resource Manager のリソースとして登録されます
    - システムマネージド ID が自動的に割り当てられ、Azure サービスへの認証に使用されます
  - **対応 OS（主要なもの）**:
    - Windows Server 2012 / 2012 R2 / 2016 / 2019 / 2022 / 2025
    - Windows 10 / 11（サーバー用途に限る）
    - Ubuntu 18.04 / 20.04 / 22.04 / 24.04
    - RHEL 7 / 8 / 9 / 10、SLES 12 SP5 / 15 SP4以降
    - Amazon Linux 2 / 2023、Debian 11 / 12 / 13 ほか
  - **接続方法**:
    - 対話型：Azure Portal からのスクリプト実行、Windows Admin Center 等
    - 大規模展開：サービスプリンシパル、Azure Policy、Configuration Manager 等を利用した自動オンボーディングに対応しています
- **図解**: Connected Machine Agent のアーキテクチャ図（オンプレミスサーバー → Agent → Azure Resource Manager への接続フロー図）

---

## スライド 5: Azure Arc 対応 Kubernetes

- **見出し**: Azure Arc 対応 Kubernetes
- **本文**:
  - **クラスタ接続**:
    - あらゆる CNCF 準拠の Kubernetes クラスターを Azure Arc に接続できます
    - 接続されたクラスターは Azure Resource Manager リソースとして管理されます
    - Azure Portal、CLI、REST API から一元的にクラスターを管理できます
    - Cluster Connect 機能により、任意の場所からクラスターに安全にアクセスできます
  - **GitOps によるアプリケーション展開**:
    - **Flux v2**: Git リポジトリ、Helm リポジトリ、S3 バケット、Azure Blob Storage からの構成をクラスターに自動デプロイします
    - **Argo CD（プレビュー）**: プルベースのアーキテクチャで、ドリフト検出・自動修復機能を提供します
    - Azure Policy と連携して、複数クラスターへの構成を一貫して適用できます
  - **クラスター拡張機能**:
    - Azure Monitor、Defender for Containers、Azure Policy 等の主要な Azure サービスを拡張機能としてデプロイできます
    - カスタムロケーションを作成し、Azure サービスインスタンスのデプロイ先として指定できます
- **図解**: Arc 対応 Kubernetes のアーキテクチャ図（オンプレミス / マルチクラウドの K8s クラスター → Azure Arc → GitOps + 拡張機能の構成図）

---

## スライド 6: Azure Arc 対応データサービス

- **見出し**: Azure Arc 対応データサービス
- **本文**:
  - **SQL Managed Instance enabled by Azure Arc**:
    - 最新の SQL Server データベースエンジンとほぼ 100% の互換性を持ちます
    - お客様が選択したインフラストラクチャ（オンプレミス、エッジ、パブリッククラウド）上の Kubernetes 上で実行されます
    - データ主権を維持しながら、既存の SQL Server アプリケーションを最小限の変更でリフト＆シフトできます
  - **サービスティア**:

    | 項目 | General Purpose | Business Critical |
    |------|-----------------|-------------------|
    | SQL 機能 | Standard Edition 相当 | Enterprise Edition 相当 |
    | CPU 制限 | 24 コア | 無制限 |
    | メモリ制限 | 128 GB | 無制限 |
    | 高可用性 | Kubernetes 再デプロイ ＋ 共有ストレージ | 包含可用性グループ |
    | 読み取りスケールアウト | なし | 可用性グループ |
    | ディザスター リカバリー | フェールオーバーグループ | フェールオーバーグループ |

  - **Azure Arc 対応 PostgreSQL サーバー**:
    - 2025 年 7 月に廃止（リタイア）されました
    - 代替として Azure Database for PostgreSQL - Flexible Server の利用が推奨されています
- **図解**: SQL Managed Instance のサービスティア比較表（General Purpose / Business Critical の機能比較マトリクス）

---

## スライド 7: Azure サービス連携

- **見出し**: Azure サービスとの連携
- **本文**:
  - **Azure Policy**:
    - Arc 対応サーバーおよび Kubernetes クラスターに Azure Policy を割り当て、ハイブリッド・マルチクラウド環境全体でガバナンスとコンプライアンスを統一的に管理できます
    - コンプライアンスダッシュボードで環境全体の準拠状態を一元的に可視化できます
  - **Azure Monitor**:
    - Azure Monitor Agent を Arc 対応サーバーにデプロイし、ログ・メトリクス・トレースを統合的に収集できます
    - Container Insights を Arc 対応 Kubernetes クラスターに有効化し、コンテナの監視を実現します
  - **Microsoft Defender for Cloud**:
    - Arc 対応サーバーに対して、脆弱性評価、脅威保護、セキュリティ推奨事項を提供します
    - Defender for Containers により、Arc 対応 Kubernetes クラスターの脅威保護を実現します
  - **Azure Automation**:
    - Update Management、変更追跡、Desired State Configuration（DSC）を Arc 対応サーバーに適用できます
  - **Azure VM 拡張機能**:
    - Arc 対応サーバーに対して、Azure VM と同じ拡張機能（Custom Script Extension、Azure Monitor Agent 等）をデプロイできます
- **図解**: Azure サービス連携の全体図（中央に Azure Arc、周囲に Azure Policy・Azure Monitor・Defender for Cloud・Azure Automation・VM 拡張機能を接続するハブ＆スポーク図）

---

## スライド 8: セキュリティとガバナンス

- **見出し**: セキュリティとガバナンス
- **本文**:
  - **マネージド ID（Managed Identity）**:
    - Connected Machine Agent のインストール時にシステムマネージド ID が自動的に作成されます
    - マネージド ID を使用して、Azure サービスへのセキュアな認証を実現します（ワークスペース ID やキーは不要です）
  - **Azure RBAC（ロールベースアクセス制御）**:
    - Arc 対応リソースに対して、Azure RBAC によるきめ細かなアクセス制御を適用できます
    - 開発者やアプリケーションチームに、オンデマンドの VM 操作を安全にセルフサービスで提供できます
    - Arc 対応 Kubernetes では、Azure RBAC による Kubernetes クラスターへのアクセス管理もサポートしています
  - **Azure Policy**:
    - 組織全体のコンプライアンスポリシーを Arc 対応リソースに一貫して適用できます
    - リソースの構成を自動的に評価・修復し、企業標準への準拠を保証します
  - **Microsoft Defender for Cloud**:
    - セキュリティポスチャの評価と脅威からの保護を、ハイブリッド環境全体で提供します
    - Arc 対応サーバーと Kubernetes クラスターのセキュリティベースラインを継続的に評価します
  - **データの所在地**:
    - Arc 対応サーバーは、登録されたリージョン内に顧客データを保存し、データ所在地要件を満たします
- **図解**: セキュリティとガバナンスのレイヤー構成図（マネージド ID → RBAC → Azure Policy → Defender for Cloud の 4 層構成図）

---

## スライド 9: 料金体系

- **見出し**: 料金体系
- **本文**:
  - **Azure Arc コントロールプレーン（無料）**:
    - リソースの整理（管理グループ、タグ）は無料です
    - Azure Resource Graph による検索・インデックスは無料です
    - Azure RBAC によるアクセス制御は無料です
    - テンプレートおよび拡張機能による自動化は無料です
  - **Azure Arc 対応 VMware vSphere / SCVMM（無料）**:
    - VM の検出・インベントリ表示は無料です
    - VM のライフサイクル操作（作成・変更・削除）およびパワーサイクル操作は無料です
  - **有料となるサービス**:
    - Arc 対応サーバー上で使用する Azure サービス（Microsoft Defender for Cloud、Azure Monitor 等）は、各サービスの料金に基づき課金されます
    - Arc 対応 Kubernetes 上の構成（GitOps 等）は、各サービスの料金に基づき課金されます
    - Arc 対応データサービス（SQL Managed Instance）は、vCore ベースの従量課金または 1 年 / 3 年の予約容量で課金されます
  - **Windows Server Management enabled by Azure Arc（有料）**:
    - Azure Arc 対応サーバー向けの追加管理機能を提供するサービスです（月額課金）
    - Connected Machine Agent バージョン 1.47 以降、Windows Server 2012 以上の Standard / Datacenter エディションが対象です
- **図解**: 料金構成を示すテーブル（無料機能 / 有料サービスのカテゴリ分類表）

---

## スライド 10: まとめ・次のステップ

- **見出し**: まとめと次のステップ
- **本文**:
  - **Azure Arc の価値**:
    - オンプレミス、マルチクラウド、エッジにまたがるリソースを Azure の統一コントロールプレーンで一元管理できます
    - コントロールプレーン機能は無料で利用でき、既存のインフラストラクチャを Azure Resource Manager に投影するだけで管理を開始できます
    - サーバー、Kubernetes、データサービス、VMware vSphere、SCVMM、Azure Local など、幅広いリソースタイプに対応しています
    - Azure Policy、Azure Monitor、Microsoft Defender for Cloud との統合により、統一的なガバナンス・監視・セキュリティを実現します
    - GitOps（Flux v2 / Argo CD）により、マルチクラスターへの構成展開を自動化できます
  - **次のステップ**:
    - Azure Arc 対応サーバーの Connected Machine Agent をインストールし、既存サーバーを Azure に接続してください
    - Kubernetes クラスターを Arc に接続し、GitOps による構成管理を導入してください
    - Azure Policy と Microsoft Defender for Cloud を有効化し、ハイブリッド環境全体のガバナンスとセキュリティを強化してください
    - Arc 対応データサービスを活用し、データ主権を維持しながらクラウドネイティブなデータ管理を実現してください
- **図解**: なし

---

## 参照リンク

| # | タイトル | URL |
|---|---------|-----|
| 1 | Azure Arc の概要 | https://learn.microsoft.com/azure/azure-arc/overview |
| 2 | Azure Arc 対応サーバーとは | https://learn.microsoft.com/azure/azure-arc/servers/overview |
| 3 | Connected Machine Agent の前提条件 | https://learn.microsoft.com/azure/azure-arc/servers/prerequisites |
| 4 | Connected Machine Agent のデプロイオプション | https://learn.microsoft.com/azure/azure-arc/servers/deployment-options |
| 5 | Azure Arc 対応 Kubernetes とは | https://learn.microsoft.com/azure/azure-arc/kubernetes/overview |
| 6 | GitOps と Flux v2 によるアプリ展開 | https://learn.microsoft.com/azure/azure-arc/kubernetes/conceptual-gitops-flux2 |
| 7 | Arc 対応 Kubernetes のクラスター拡張機能 | https://learn.microsoft.com/azure/azure-arc/kubernetes/extensions-release |
| 8 | SQL Managed Instance enabled by Azure Arc の概要 | https://learn.microsoft.com/azure/azure-arc/data/managed-instance-overview |
| 9 | SQL Managed Instance のサービスティア | https://learn.microsoft.com/azure/azure-arc/data/service-tiers |
| 10 | Azure Arc 対応 VMware vSphere の概要 | https://learn.microsoft.com/azure/azure-arc/vmware-vsphere/overview |
| 11 | Azure Arc 対応 SCVMM の概要 | https://learn.microsoft.com/azure/azure-arc/system-center-virtual-machine-manager/overview |
| 12 | Windows Server Management enabled by Azure Arc | https://learn.microsoft.com/azure/azure-arc/servers/windows-server-management-overview |
| 13 | Azure Arc の料金 | https://azure.microsoft.com/pricing/details/azure-arc/ |
| 14 | Azure Arc ランディングゾーン | https://learn.microsoft.com/azure/cloud-adoption-framework/scenarios/hybrid/enterprise-scale-landing-zone |
| 15 | Azure Arc 対応 PostgreSQL サーバー（廃止） | https://learn.microsoft.com/azure/azure-arc/data/what-is-azure-arc-enabled-postgresql |
