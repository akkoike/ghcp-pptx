# AzureNetworkWatcher レビュー結果

## レビュー結果
- **チェック日**: 2026-04-07
- **データモデル**: GPT 5.4
- **ステータス**: チェック済

| チェック観点             | 判定   | 指摘事項                                                                 |
|--------------------------|--------|--------------------------------------------------------------------------|
| 事実の正確性             | NG→修正済 | スライド4: 接続モニターのプロトコルに HTTPS が欠落していた                |
| 誤解を招く表現           | OK     | -                                                                        |
| 過剰な言及               | NG→修正済 | スライド10: まとめが計11項目（価値6+次のステップ5）で推奨上限を超過していた |
| 視覚的な見づらさ         | NG→修正済 | スライド7: NSGフローログ廃止の記述が1箇条書きに詰め込まれすぎていた       |

---

## 修正内容の詳細

### 修正 1: 事実の正確性 — スライド 4（接続モニターのプロトコル）

**問題**: 接続モニターがサポートするプロトコルとして「TCP、ICMP、HTTP」と記載されていたが、Microsoft 公式ドキュメント（Connection monitor overview）では「TCP, ICMP, HTTP, or HTTPS」と記載されており、**HTTPS** が欠落していた。

**修正前**:
```
- TCP、ICMP、HTTP プロトコルによるテストをサポートしています
```

**修正後**:
```
- TCP、ICMP、HTTP、HTTPS プロトコルによるテストをサポートしています
```

**根拠**: https://learn.microsoft.com/azure/network-watcher/connection-monitor-overview

---

### 修正 2: 過剰な言及 — スライド 10（まとめ項目数の削減）

**問題**: 「Azure Network Watcher の価値」6項目 + 「次のステップ」5項目 = 計11項目で、1スライドあたりの推奨項目数（5〜7項目）を大幅に超過していた。

**修正内容**:
- 「Azure Network Watcher の価値」: 「ゾーン冗長にも既定で対応しており、高い可用性を提供しています」を削除し5項目に削減（スライド2で既に言及済みのため重複）
- 「次のステップ」: 「接続モニターを設定し、重要なエンドポイント間の接続を監視してください」を削除し4項目に削減（全体として重要度の優先順位付けを行い、最も必須のアクション項目に絞り込み）

**修正後の合計**: 5項目 + 4項目 = 9項目（大幅に改善）

---

### 修正 3: 視覚的な見づらさ — スライド 7（NSG フローログ廃止の記述分割）

**問題**: NSG フローログの廃止に関する重要情報が1つの箇条書き項目に3つの文（廃止日、新規作成停止日、移行推奨）が詰め込まれており、プレゼンテーション上で読みづらい状態だった。

**修正前**:
```
- **重要**: NSG フローログは **2027 年 9 月 30 日に廃止** される予定です。2025 年 6 月 30 日以降、新規の NSG フローログは作成できなくなります。VNet フローログへの移行が推奨されています
```

**修正後**:
```
- **重要**: NSG フローログは **2027 年 9 月 30 日に廃止** される予定です
- 2025 年 6 月 30 日以降、新規の NSG フローログは作成できなくなります
- VNet フローログへの移行が推奨されています
```

---

## 検証に使用した公式ドキュメント

| # | タイトル | URL |
|---|---------|-----|
| 1 | What is Azure Network Watcher? | https://learn.microsoft.com/azure/network-watcher/network-watcher-overview |
| 2 | Network Watcher FAQ | https://learn.microsoft.com/azure/network-watcher/frequently-asked-questions |
| 3 | Connection monitor overview | https://learn.microsoft.com/azure/network-watcher/connection-monitor-overview |
| 4 | NSG flow logs overview | https://learn.microsoft.com/azure/network-watcher/nsg-flow-logs-overview |
| 5 | RBAC permissions required to use Network Watcher | https://learn.microsoft.com/azure/network-watcher/required-rbac-permissions |
| 6 | Azure subscription service limits (Network Watcher) | https://learn.microsoft.com/azure/azure-resource-manager/management/azure-subscription-service-limits#azure-networking-limits |

---

## 結論

3件の指摘事項（事実の正確性1件、過剰な言及1件、視覚的な見づらさ1件）はすべて AzureNetworkWatcher.md に対して修正済みです。ステータスを「チェック済」とし、createpptx エージェントへの引き継ぎを許可します。
