# Azure Network Watcher 詳細仕様

## プレゼンテーション概要

| 項目 | 内容 |
|------|------|
| **目的** | Azure Network Watcher の詳細仕様を体系的に整理し、監視・診断・ログ機能・セキュリティ・料金体系を理解していただくこと |
| **対象者** | ネットワークエンジニア、クラウドアーキテクト、インフラエンジニア、IT 管理者 |
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

- **見出し**: Azure Network Watcher 詳細仕様
- **サブタイトル**: Azure IaaS ネットワークの監視・診断・トラフィック分析サービス
- **日付**: 2026年4月
- **図解**: なし

---

## スライド 2: Azure Network Watcher の概要

- **見出し**: Azure Network Watcher とは
- **本文**:
  - Azure Network Watcher は、Azure IaaS（Infrastructure-as-a-Service）リソースのネットワークを監視・診断するためのツール群を提供するサービスです
  - 仮想マシン（VM）、仮想ネットワーク（VNet）、Application Gateway、ロードバランサーなどのネットワーク正常性を監視・修復できます
  - サブスクリプション内で仮想ネットワークを作成または更新すると、そのリージョンで Network Watcher が自動的に有効化されます
  - 自動有効化によるリソースへの影響やコストの発生はありません
  - Network Watcher は PaaS の監視や Web 分析を目的としたサービスではありません
  - Network Watcher は既定でゾーン冗長に対応しており、追加の構成は不要です
- **図解**: Network Watcher の位置づけを示す概念図（Azure IaaS ネットワーク基盤と Network Watcher の関係性）

---

## スライド 3: 主要機能の全体像

- **見出し**: 主要機能の全体像（3 つのカテゴリ）
- **本文**:
  - Network Watcher の機能は大きく **3 つのカテゴリ** に分類されます
  - **監視（Monitoring）**:
    - トポロジ — ネットワーク構成の可視化を行います
    - 接続モニター — エンドポイント間の接続と遅延を継続的に監視します
  - **ネットワーク診断ツール（Network Diagnostic Tools）**:
    - IP フロー検証、NSG 診断、次のホップ、有効なセキュリティ規則、接続のトラブルシューティング、パケットキャプチャ、VPN トラブルシューティングの 7 つの診断ツールを提供しています
  - **トラフィック（Traffic）**:
    - フローログ — NSG フローログおよび VNet フローログによりトラフィックを記録します
    - トラフィック分析 — フローログデータのリッチな可視化を提供します
  - **使用量 + クォータ**: サブスクリプションとリージョンごとのネットワークリソースの使用状況と制限を確認できます
- **図解**: 3 カテゴリの機能マップ（監視・診断・トラフィックの 3 列に分類した機能一覧のブロック図）

---

## スライド 4: 監視機能

- **見出し**: 監視機能（Monitoring）
- **本文**:
  - **トポロジ（Topology）**:
    - ネットワーク全体の構成を可視化するためのインタラクティブなインターフェースを提供します
    - 複数のサブスクリプション、リソースグループ、リージョンにまたがるリソースとその関係性を表示できます
    - ネットワーク構成の理解と確認に役立ちます
  - **接続モニター（Connection Monitor）**:
    - Azure およびハイブリッドのエンドポイント間でエンドツーエンドの接続監視を行います
    - ネットワークインフラストラクチャ内の各エンドポイント間のパフォーマンスを把握できます
    - TCP、ICMP、HTTP、HTTPS プロトコルによるテストをサポートしています
    - テストグループごとにソース、宛先、テスト構成を柔軟に設定できます
    - Azure Monitor と統合して、アラートおよびメトリクスのダッシュボードを提供しています
- **図解**: 接続モニターの構成図（ソース（VM）→ テストグループ → 宛先（外部エンドポイント / Azure リソース）のフロー図）

---

## スライド 5: 診断ツール（1/2）

- **見出し**: ネットワーク診断ツール（前半）
- **本文**:
  - **IP フロー検証（IP Flow Verify）**:
    - VM レベルでトラフィックのフィルタリング問題を検出します
    - 5 タプル（送信元 IP / 宛先 IP / 送信元ポート / 宛先ポート / プロトコル）に基づき、パケットの許可・拒否を判定します
    - 拒否した場合は、どのセキュリティ規則が該当するかを返却します
  - **NSG 診断（NSG Diagnostics）**:
    - VM、仮想マシンスケールセット、および Application Gateway レベルでのフィルタリング問題を検出します
    - IP アドレス、IP プレフィックス、またはサービスタグに対するパケットの許可・拒否を判定します
    - より高い優先度の新しいセキュリティ規則の追加も可能です
  - **次のホップ（Next Hop）**:
    - ルーティングの問題を検出するために使用します
    - 特定の宛先 IP に対するネクストホップの種類、IP アドレス、ルートテーブル ID を返却します
    - ユーザー定義ルートの構成ミスを診断できます
  - **有効なセキュリティ規則（Effective Security Rules）**:
    - ネットワークインターフェースに適用されている有効なセキュリティ規則を表示します
    - NIC に適用されたすべてのルール、サブネットのルール、およびそれらの集約結果を確認できます
- **図解**: 各診断ツールの入力と出力を示すフロー図（4 つのツールを並列で表示）

---

## スライド 6: 診断ツール（2/2）

- **見出し**: ネットワーク診断ツール（後半）
- **本文**:
  - **接続のトラブルシューティング（Connection Troubleshoot）**:
    - VM、仮想マシンスケールセット、Application Gateway、または Bastion ホストから宛先への接続をテストします
    - 宛先として VM、FQDN、URI、IPv4 アドレスを指定できます
    - 接続モニターと類似の情報を返しますが、ポイントインタイムでの単発テストを実行します
  - **パケットキャプチャ（Packet Capture）**:
    - VM や仮想マシンスケールセットのトラフィックをリモートでキャプチャするセッションを作成します
    - Network Watcher Agent VM 拡張機能（AzureNetworkWatcherExtension）のインストールが必要です
    - キャプチャしたデータはローカルディスクまたは Azure Storage Blob に保存できます
    - Portal、PowerShell、Azure CLI、REST API からトリガーでき、VM アラートによる自動起動も可能です
  - **VPN トラブルシューティング（VPN Troubleshoot）**:
    - 仮想ネットワークゲートウェイおよびその接続に対して複数の診断チェックを実行します
    - VPN ゲートウェイと接続の問題をデバッグするために使用します
- **図解**: 接続トラブルシューティングのフロー図（ソース → 接続テスト → 宛先 の構成と、パケットキャプチャのデータフロー図）

---

## スライド 7: ログ機能とトラフィック分析

- **見出し**: フローログとトラフィック分析（Traffic）
- **本文**:
  - **フローログ（Flow Logs）**:
    - Azure IP トラフィックの情報をログに記録し、Azure Storage に保存します
    - **VNet フローログ**: 仮想ネットワーク単位でトラフィックを記録します（推奨）
    - **NSG フローログ**: ネットワークセキュリティグループ単位でトラフィックを記録します
    - **重要**: NSG フローログは **2027 年 9 月 30 日に廃止** される予定です
    - 2025 年 6 月 30 日以降、新規の NSG フローログは作成できなくなります
    - VNet フローログへの移行が推奨されています
  - **トラフィック分析（Traffic Analytics）**:
    - フローログデータのリッチな可視化・クエリ・分析機能を提供します
    - Log Analytics ワークスペースと連携し、ネットワークトラフィックのパターンを把握できます
    - データ収集ルール（DCR）とデータ収集エンドポイント（DCE）リソースを自動作成します
    - 処理される生フローログデータ量に基づいて課金されます
- **図解**: フローログとトラフィック分析のアーキテクチャ図（VNet / NSG → フローログ → Azure Storage → トラフィック分析 → Log Analytics のデータフロー図）

---

## スライド 8: セキュリティとアクセス制御

- **見出し**: セキュリティとアクセス制御
- **本文**:
  - **Azure RBAC によるアクセス制御**:
    - Network Watcher の各機能に対して、きめ細かなロールベースのアクセス制御を適用できます
    - 使用するアカウントには、所有者（Owner）、共同作成者（Contributor）、またはネットワーク共同作成者（Network Contributor）ロールが必要です
    - カスタムロールにより、必要最小限のアクションのみを割り当てることも可能です
  - **ロール別の注意点**:
    - Network Contributor ロールでは、Storage、Compute、OperationalInsights 関連のアクションが含まれません
    - フローログやトラフィック分析には追加の Storage / Log Analytics 権限が必要です
  - **Azure Policy との統合**:
    - Azure Policy を使用して、トラフィック分析の有効化やフローログの構成を組織全体で統一的に管理・適用できます
  - **データの保存**:
    - Network Watcher は顧客データを保存しません（接続モニターを除く）。接続モニターのデータは、リージョン内データ所在地要件を満たすために単一リージョンに自動保存されます
- **図解**: RBAC のロール階層図（Owner / Contributor / Network Contributor / カスタムロール の権限範囲のマトリクス）

---

## スライド 9: 料金体系・利用制限

- **見出し**: 料金体系と利用制限
- **本文**:
  - **料金体系**:
    - Network Watcher の自動有効化自体には課金は発生しません
    - 各機能の使用量に基づいて個別に課金されます（接続モニター、フローログ、パケットキャプチャ、トラフィック分析など）
    - トラフィック分析は処理される生フローログデータ量に基づいて課金されます
    - Log Analytics ワークスペースへのログ取り込みには Azure Monitor の料金が別途適用されます
  - **利用制限（サービスリミット）**:

    | リソース | 制限 |
    |----------|------|
    | Network Watcher インスタンス（リージョン / サブスクリプション） | 1 |
    | 接続モニター（リージョン / サブスクリプション） | 100 |
    | 接続モニターあたりの最大テストグループ数 | 20 |
    | 接続モニターあたりの最大ソース / 宛先数 | 100 |
    | 接続モニターあたりの最大テスト構成数 | 20 |
    | パケットキャプチャセッション（リージョン / サブスクリプション） | 10,000 |
    | VPN トラブルシューティング操作（サブスクリプション） | 1（同時実行） |

- **図解**: 料金構成を示すテーブル（機能カテゴリ × 課金単位 のマトリクス）

---

## スライド 10: まとめ・次のステップ

- **見出し**: まとめと次のステップ
- **本文**:
  - **Azure Network Watcher の価値**:
    - Azure IaaS ネットワークの監視・診断・トラフィック分析を一元的に提供します
    - 仮想ネットワーク作成時に自動有効化されるため、追加の構成なしで利用を開始できます
    - 7 つの診断ツールにより、NSG、ルーティング、VPN、接続の問題を迅速に特定・解決できます
    - VNet フローログとトラフィック分析により、ネットワークトラフィックの可視化と分析が可能です
    - Azure RBAC と Azure Policy による統一的なセキュリティとガバナンスを実現します
  - **次のステップ**:
    - Azure Portal で Network Watcher の有効化状態を確認してください
    - VNet フローログを有効化し、トラフィック分析で可視化環境を構築してください
    - NSG フローログを使用中の場合は、VNet フローログへの移行を検討してください
    - RBAC のカスタムロールを活用し、最小権限の原則に基づくアクセス制御を設計してください
- **図解**: なし

---

## 参照リンク

| # | タイトル | URL |
|---|---------|-----|
| 1 | Azure Network Watcher とは | https://learn.microsoft.com/azure/network-watcher/network-watcher-overview |
| 2 | Network Watcher FAQ | https://learn.microsoft.com/azure/network-watcher/frequently-asked-questions |
| 3 | 接続モニターの概要 | https://learn.microsoft.com/azure/network-watcher/connection-monitor-overview |
| 4 | IP フロー検証の概要 | https://learn.microsoft.com/azure/network-watcher/ip-flow-verify-overview |
| 5 | NSG 診断の概要 | https://learn.microsoft.com/azure/network-watcher/nsg-diagnostics-overview |
| 6 | 次のホップの概要 | https://learn.microsoft.com/azure/network-watcher/network-watcher-next-hop-overview |
| 7 | パケットキャプチャの概要 | https://learn.microsoft.com/azure/network-watcher/packet-capture-overview |
| 8 | VPN トラブルシューティングの概要 | https://learn.microsoft.com/azure/network-watcher/vpn-troubleshoot-overview |
| 9 | 接続のトラブルシューティングの概要 | https://learn.microsoft.com/azure/network-watcher/connection-troubleshoot-overview |
| 10 | VNet フローログの概要 | https://learn.microsoft.com/azure/network-watcher/vnet-flow-logs-overview |
| 11 | NSG フローログの概要 | https://learn.microsoft.com/azure/network-watcher/nsg-flow-logs-overview |
| 12 | トラフィック分析 | https://learn.microsoft.com/azure/network-watcher/traffic-analytics |
| 13 | Network Watcher の RBAC 権限 | https://learn.microsoft.com/azure/network-watcher/required-rbac-permissions |
| 14 | Network Watcher の料金 | https://azure.microsoft.com/pricing/details/network-watcher/ |
| 15 | Network Watcher セキュリティベースライン | https://learn.microsoft.com/security/benchmark/azure/baselines/network-watcher-security-baseline |
