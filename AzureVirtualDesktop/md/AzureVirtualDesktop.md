# Azure Virtual Desktop 詳細仕様

## プレゼンテーション概要

| 項目 | 内容 |
|------|------|
| **目的** | Azure Virtual Desktop（AVD）の詳細仕様を体系的に整理し、アーキテクチャ・主要機能・セキュリティ・ライセンス体系を理解していただくこと |
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

- **見出し**: Azure Virtual Desktop 詳細仕様
- **サブタイトル**: Microsoft のクラウドネイティブ VDI / DaaS ソリューション
- **日付**: 2026年4月
- **図解**: なし

---

## スライド 2: Azure Virtual Desktop とは

- **見出し**: Azure Virtual Desktop の概要
- **本文**:
  - Azure Virtual Desktop（AVD）は、Azure 上で動作するデスクトップおよびアプリケーション仮想化サービスです
  - VDI（仮想デスクトップインフラストラクチャ）を DaaS（Desktop as a Service）として提供しています
  - ゲートウェイサーバーを自前で構築する必要がなく、Azure サブスクリプション内でフルデスクトップ仮想化環境を構築できます
  - Windows 11/10 Enterprise マルチセッション機能により、1台の VM で複数ユーザーが同時接続できます（AVD 専用機能）
  - Azure Portal、Azure CLI、PowerShell、REST API からホストプールやアプリケーショングループを管理できます
  - オートスケール機能により、需要に応じてセッションホストを自動的にスケールイン・スケールアウトできます
- **図解**: AVD の位置づけを示す概念図（従来型 VDI／RDS との比較、DaaS としての AVD）

---

## スライド 3: 主要な特徴と利点

- **見出し**: 主要な特徴と利点
- **本文**:
  - **柔軟な構成**: 多様なワークロードに対応する柔軟な VM サイズとイメージ選択が可能です
  - **コスト最適化**: Windows Enterprise マルチセッションにより、VM 数と OS オーバーヘッドを大幅に削減できます
  - **個人デスクトップ**: パーソナル（永続）デスクトップによる個別所有も提供できます
  - **オートスケール**: 時間帯・曜日・需要変動に応じた自動スケーリングでコスト管理を最適化できます
  - **FSLogix プロファイル管理**: ユーザープロファイルをコンテナ化し、セッション間でのプロファイルローミングを実現します
  - **App Attach**: アプリケーションを OS から分離し、VM のプロビジョニングと管理を簡素化できます
  - **マルチクライアント対応**: Windows App や Remote Desktop クライアント（Windows / macOS / iOS / Android / Web）から接続できます
- **図解**: 6つの特長をアイコン付きで配置したブロック図

---

## スライド 4: アーキテクチャ構成

- **見出し**: サービスアーキテクチャ
- **本文**:
  - **Microsoft 管理コンポーネント**（コントロールプレーン）:
    - **Web サービス**: ユーザー向け Web サイトおよびエンドポイントを提供し、接続情報を返却します
    - **ブローカーサービス**: 受信接続のオーケストレーションを行います
    - **ゲートウェイサービス**: WebSocket 経由で RDP 接続を中継し、逆接続（Reverse Connect）により受信ポートの開放が不要です
    - **リソースディレクトリ**: 各ユーザーの接続情報が格納された地理的データベースを参照します
    - **地理的データベース**: 接続ファイル（.rdp）とリソースアイコンを保持しています
  - **お客様管理コンポーネント**:
    - セッションホスト VM（OS イメージカスタマイズ・アプリケーション含む）
    - 仮想ネットワーク接続
    - ユーザー ID 管理・アクセス制御
  - **サービスの回復性**: 約40の Azure リージョンに分散配置され、Azure Traffic Manager と Azure Front Door により最寄りのエントリポイントへ自動ルーティングされます
- **図解**: アーキテクチャ構成図（コントロールプレーン ↔ ゲートウェイ ↔ セッションホスト の階層図、Microsoft 管理とお客様管理の責任分界を明示）

---

## スライド 5: セッションホストの種類と構成オプション

- **見出し**: セッションホストの種類と構成オプション
- **本文**:
  - **ホストプールの種類**:
    - **プールド（共有）**: 複数ユーザーが同一ホストプール内の VM を共有し、負荷分散アルゴリズムで振り分けられます
    - **パーソナル（専用）**: 各ユーザーに専用の VM が割り当てられ、永続的なデスクトップ環境を提供します
  - **セッションの種類**:
    - **シングルセッション**: 1台の VM に1ユーザーが接続します。高パフォーマンス・カスタム構成が必要なワークロードに適しています
    - **マルチセッション**: 1台の VM に複数ユーザーが同時接続します。Windows 11/10 Enterprise マルチセッションが必要です
  - **負荷分散アルゴリズム**:
    - **幅優先（Breadth-first）**: 最も接続数の少ないセッションホストに新規セッションを振り分けます
    - **深さ優先（Depth-first）**: 1台のセッションホストを容量いっぱいまで使用してから次の VM に振り分けます
  - **対応 OS**: Windows 11/10 Enterprise（シングル・マルチセッション）、Windows Server 2025/2022/2019/2016（64ビットのみ）
  - **セキュリティタイプ**: Standard、Trusted Launch VM、Confidential VM から選択できます
- **図解**: ホストプール構成を示す比較図（プールド vs パーソナル、シングルセッション vs マルチセッション の2×2マトリクス）

---

## スライド 6: ネットワーク・接続要件

- **見出し**: ネットワークと接続要件
- **本文**:
  - **基本接続方式**:
    - 逆接続（Reverse Connect）トランスポートを使用し、受信ポートの開放は不要です
    - TCP ポート 443 を既定で使用します
  - **RDP Shortpath**（UDP ベースの高速接続）:
    - **マネージドネットワーク向け**: ExpressRoute プライベートピアリングまたは VPN 経由で直接 UDP 接続を確立します
    - **パブリックネットワーク向け**: ICE/STUN/TURN プロトコルを使用し、インターネット経由で UDP 直接接続を確立します
    - UDP 接続が確立できない場合は TCP 逆接続にフォールバックします
  - **ネットワーク要件**:
    - セッションホスト用の仮想ネットワークとサブネットが必要です
    - ドメインコントローラーと DNS サーバーへの接続が必要です（AD DS / Microsoft Entra Domain Services 使用時）
    - AVD サービスの必須 URL リストへの TCP 443 アクセスが必要です
    - クライアントネットワークからセッションホストへの RTT レイテンシは 150ms 未満を推奨しています
  - **Azure Private Link**（オプション）: プライベートエンドポイント経由で Microsoft バックボーンネットワーク上を通信し、パブリックインターネットへの露出を回避できます
- **図解**: ネットワーク接続パターンを示すフロー図（TCP 逆接続 / RDP Shortpath マネージド / RDP Shortpath パブリック の3パターン）

---

## スライド 7: セキュリティ機能

- **見出し**: セキュリティ機能
- **本文**:
  - **ID・アクセス管理**:
    - Microsoft Entra ID による認証および多要素認証（MFA）をサポートしています
    - 条件付きアクセスポリシーにより、デバイス・場所・リスクレベルに基づくアクセス制御が可能です
    - Microsoft Entra ID 参加またはハイブリッド参加のセッションホストをサポートしています
  - **接続・トランスポートセキュリティ**:
    - 逆接続（Reverse Connect）により受信ポートを開放せずにセッションを確立します
    - RDP Shortpath による UDP 暗号化トランスポートおよび Azure Private Link によるプライベート接続を提供しています
  - **VM・インフラストラクチャ保護**:
    - Trusted Launch VM（セキュアブート + vTPM）および Confidential VM をサポートしています
    - Microsoft Defender for Cloud によるセキュリティポスチャ評価と脅威検出を提供しています
  - **運用セキュリティ**:
    - Just-in-Time（JIT）アクセスによる管理用アクセス制御が可能です
    - Azure Firewall・NSG によるネットワーク制御と Microsoft Sentinel 連携による SIEM/SOAR を活用できます
- **図解**: セキュリティレイヤーを示す多層図（ID 層 → ネットワーク層 → ホスト層 → データ層）

---

## スライド 8: ライセンスと料金体系

- **見出し**: ライセンスと料金体系
- **本文**:
  - **Windows クライアント OS 利用時の対象ライセンス**:
    - Microsoft 365 E3 / E5 / A3 / A5 / F3 / Business Premium
    - Windows Enterprise E3 / E5
    - Windows Education A3 / A5
    - Windows VDA（ユーザーあたり）
  - **Windows Server OS 利用時の対象ライセンス**:
    - Remote Desktop Services（RDS）クライアントアクセスライセンス（CAL）＋ Software Assurance
    - RDS ユーザーサブスクリプションライセンス
  - **外部商用利用（External Commercial）**:
    - ユーザーあたりのアクセス価格（Per-user access pricing）を Azure サブスクリプションに登録して利用します
    - Windows Server OS では外部商用利用は非対応です
  - **AVD on Azure Local の追加コスト**:
    - Azure Local サービス料金に加え、セッションホストのアクティブ vCPU あたりの AVD サービス料金が必要です
  - **コスト最適化策**:
    - オートスケールによる VM 稼働時間の最適化が可能です
    - Azure Reserved Instances の活用でコンピュートコストを削減できます
    - マルチセッション活用で VM 台数を削減できます
- **図解**: ライセンス体系を示すテーブル（OS 種別 × 利用目的 × 対象ライセンスのマトリクス）

---

## スライド 9: 管理ツール・監視機能

- **見出し**: 管理ツールと監視機能
- **本文**:
  - **管理ツール**:
    - Azure Portal からホストプール・セッションホスト・アプリケーショングループを一元管理できます
    - Azure CLI / PowerShell / REST API / ARM・Bicep テンプレートによる自動化に対応しています
    - Microsoft Intune によるセッションホスト OS の統合管理をサポートしています
  - **監視機能**:
    - **Azure Virtual Desktop Insights**: Azure Monitor ベースのダッシュボードで、パフォーマンスを可視化できます
    - **診断設定**: ホストプールのイベントを Log Analytics に送信し、オートスケール操作ログも統合して監視できます
    - **Azure Advisor**: リソース最適化のための推奨事項を提供しています
  - **プロファイル管理**:
    - FSLogix プロファイルコンテナにより、ユーザープロファイルを VHD ファイルに格納し、セッション間でローミングできます
    - Azure Files / Azure NetApp Files / SMB ファイル共有にプロファイルを保存できます
- **図解**: 管理・監視のエコシステムを示す放射状の図（中心に AVD、周囲に Azure Portal / Insights / Intune / FSLogix / Advisor 等のアイコン）

---

## スライド 10: まとめ・次のステップ

- **見出し**: まとめと次のステップ
- **本文**:
  - **Azure Virtual Desktop の価値**:
    - ゲートウェイサーバー不要でフルデスクトップ仮想化環境を Azure 上に構築できます
    - Windows Enterprise マルチセッションによるコスト最適化と柔軟なスケーリングを実現します
    - Microsoft 管理のコントロールプレーンにより、インフラ運用負荷を大幅に削減します
    - 条件付きアクセス・MFA・Trusted Launch 等のエンタープライズセキュリティを標準提供しています
    - RDP Shortpath による低遅延・高信頼性の接続を実現します
  - **次のステップ**:
    - Azure Portal で AVD 環境のデプロイを開始してください
    - セッションホストの VM サイズガイドラインを参照し、適切なサイジングを検討してください
    - FSLogix プロファイルコンテナの設計・構成を計画してください
    - オートスケーリングプランを作成し、コスト最適化を図ってください
    - Azure Virtual Desktop Insights を有効化し、運用監視体制を整備してください
- **図解**: なし

---

## 参照リンク

| # | タイトル | URL |
|---|---------|-----|
| 1 | Azure Virtual Desktop とは | https://learn.microsoft.com/azure/virtual-desktop/overview |
| 2 | サービスアーキテクチャと回復性 | https://learn.microsoft.com/azure/virtual-desktop/service-architecture-resilience |
| 3 | 前提条件（ネットワーク・OS・ライセンス） | https://learn.microsoft.com/azure/virtual-desktop/prerequisites |
| 4 | RDP Shortpath の概要 | https://learn.microsoft.com/azure/virtual-desktop/rdp-shortpath |
| 5 | RDP Shortpath の構成 | https://learn.microsoft.com/azure/virtual-desktop/configure-rdp-shortpath |
| 6 | ライセンスガイド | https://learn.microsoft.com/azure/virtual-desktop/licensing |
| 7 | Windows Enterprise マルチセッション FAQ | https://learn.microsoft.com/azure/virtual-desktop/windows-multisession-faq |
| 8 | AVD Insights による監視 | https://learn.microsoft.com/azure/virtual-desktop/insights |
| 9 | セッションホスト OS の管理（Intune） | https://learn.microsoft.com/azure/virtual-desktop/management |
| 10 | Azure Virtual Desktop on Azure Local | https://learn.microsoft.com/azure/virtual-desktop/azure-local-overview |
| 11 | ネットワークトポロジと接続設計ガイダンス | https://learn.microsoft.com/azure/cloud-adoption-framework/scenarios/azure-virtual-desktop/eslz-network-topology-and-connectivity |
| 12 | セキュリティとガバナンス | https://learn.microsoft.com/azure/cloud-adoption-framework/scenarios/azure-virtual-desktop/eslz-security-governance-and-compliance |
| 13 | オートスケール操作の Insights 監視 | https://learn.microsoft.com/azure/virtual-desktop/autoscale-monitor-operations-insights |
| 14 | FSLogix プロファイルコンテナ | https://learn.microsoft.com/fslogix/overview-what-is-fslogix |
| 15 | AVD デプロイ手順 | https://learn.microsoft.com/azure/virtual-desktop/deploy-azure-virtual-desktop |
