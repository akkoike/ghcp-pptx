const PptxGenJS = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

// ============================================================
// Azure Network Watcher 詳細仕様 — スライド生成スクリプト
// ============================================================

const pptx = new PptxGenJS();

// --- グローバル設定 ---
pptx.layout = 'LAYOUT_WIDE'; // 16:9
pptx.author = 'GitHub Copilot';
pptx.subject = 'Azure Network Watcher 詳細仕様';

// --- 定数 ---
const FONT_FACE = 'Meiryo UI';
const COLOR_BLACK = '000000';
const COLOR_WHITE = 'FFFFFF';
const COLOR_TITLE_BG = '0078D4'; // Azure Blue
const COLOR_ACCENT = '0078D4';
const COLOR_ACCENT2 = '50E6FF';
const COLOR_LIGHT_BG = 'F3F2F1';
const COLOR_LIGHT_BLUE = 'DEECF9';
const COLOR_GREEN = '107C10';
const COLOR_ORANGE = 'FF8C00';
const COLOR_PURPLE = '5C2D91';
const COLOR_RED = 'D13438';
const COLOR_DARK_BLUE = '002050';
const COLOR_YELLOW = 'FFF4CE';
const MARGIN_LEFT = 0.5;
const MARGIN_TOP_BODY = 1.3;
const CONTENT_WIDTH = 12.33;

// --- ヘルパー: スライドタイトルバー ---
function addTitleBar(slide, titleText) {
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: '100%', h: 0.9,
    fill: { color: COLOR_TITLE_BG },
  });
  slide.addText(titleText, {
    x: MARGIN_LEFT, y: 0.15, w: CONTENT_WIDTH, h: 0.6,
    fontSize: 26, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
  });
}

// --- ヘルパー: フッター ---
function addFooter(slide, pageNum, totalPages) {
  const total = totalPages || 8;
  slide.addText(`${pageNum} / ${total}`, {
    x: 11.5, y: 7.1, w: 1.5, h: 0.3,
    fontSize: 9, fontFace: FONT_FACE, color: '999999', align: 'right',
  });
}

// ============================================================
// スライド 2: Azure Network Watcher の概要
// ============================================================
function createSlide2() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'Azure Network Watcher とは');
  addFooter(slide, 2);

  // 概念図: Azure IaaS ネットワーク基盤と Network Watcher の関係
  // 上部: Network Watcher の位置づけ図
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 2.5, y: MARGIN_TOP_BODY, w: 8.5, h: 1.3,
    fill: { color: COLOR_LIGHT_BLUE }, rectRadius: 0.15,
    line: { color: COLOR_ACCENT, width: 2 },
  });
  slide.addText('🔍  Azure Network Watcher', {
    x: 2.7, y: MARGIN_TOP_BODY + 0.1, w: 8.1, h: 0.4,
    fontSize: 16, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
    align: 'center',
  });
  slide.addText('Azure IaaS リソースのネットワークを監視・診断するためのツール群', {
    x: 2.7, y: MARGIN_TOP_BODY + 0.55, w: 8.1, h: 0.5,
    fontSize: 12, fontFace: FONT_FACE, color: COLOR_BLACK,
    align: 'center',
  });

  // 矢印
  slide.addText('⬇', {
    x: 6.0, y: 2.7, w: 1.3, h: 0.5,
    fontSize: 20, fontFace: FONT_FACE, color: COLOR_ACCENT,
    align: 'center',
  });

  // 監視対象リソース群
  const resources = [
    { icon: '🖥️', label: '仮想マシン\n(VM)', color: COLOR_ACCENT },
    { icon: '🌐', label: '仮想ネットワーク\n(VNet)', color: COLOR_GREEN },
    { icon: '⚖️', label: 'ロード\nバランサー', color: COLOR_ORANGE },
    { icon: '🛡️', label: 'Application\nGateway', color: COLOR_PURPLE },
    { icon: '🔒', label: 'NSG', color: COLOR_RED },
  ];

  const resW = 2.1;
  const resH = 1.2;
  const startX = 0.7;
  const gap = 0.4;
  const resY = 3.3;

  resources.forEach((r, i) => {
    const x = startX + i * (resW + gap);
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: resY, w: resW, h: resH,
      fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.12,
      line: { color: r.color, width: 1.5 },
    });
    slide.addText(`${r.icon}  ${r.label}`, {
      x, y: resY, w: resW, h: resH,
      fontSize: 11, fontFace: FONT_FACE, color: r.color, bold: true,
      align: 'center', valign: 'middle',
    });
  });

  // 箇条書き
  const bullets = [
    { text: 'Azure Network Watcher は、Azure IaaS リソースのネットワークを監視・診断するためのツール群を提供するサービスです', options: { bullet: true, fontSize: 12, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'サブスクリプション内で仮想ネットワークを作成・更新すると、そのリージョンで自動的に有効化されます', options: { bullet: true, fontSize: 12, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '自動有効化によるリソースへの影響やコストの発生はありません', options: { bullet: true, fontSize: 12, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'PaaS の監視や Web 分析を目的としたサービスではありません', options: { bullet: true, fontSize: 12, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '既定でゾーン冗長に対応しており、追加の構成は不要です', options: { bullet: true, fontSize: 12, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ];
  slide.addText(bullets, {
    x: MARGIN_LEFT, y: 4.8, w: CONTENT_WIDTH, h: 2.3,
    valign: 'top', lineSpacingMultiple: 1.3,
  });
}

// ============================================================
// スライド 3: 主要機能の全体像
// ============================================================
function createSlide3() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, '主要機能の全体像（3 つのカテゴリ）');
  addFooter(slide, 3);

  // 3カテゴリのブロック
  const categories = [
    {
      icon: '📊',
      title: '監視（Monitoring）',
      color: COLOR_ACCENT,
      items: [
        'トポロジ — ネットワーク構成の可視化を行います',
        '接続モニター — エンドポイント間の接続と遅延を継続的に監視します',
      ],
    },
    {
      icon: '🔧',
      title: 'ネットワーク診断ツール',
      color: COLOR_GREEN,
      items: [
        'IP フロー検証',
        'NSG 診断',
        '次のホップ',
        '有効なセキュリティ規則',
        '接続のトラブルシューティング',
        'パケットキャプチャ',
        'VPN トラブルシューティング',
      ],
    },
    {
      icon: '📈',
      title: 'トラフィック（Traffic）',
      color: COLOR_ORANGE,
      items: [
        'フローログ — NSG / VNet フローログでトラフィックを記録します',
        'トラフィック分析 — フローログデータのリッチな可視化を提供します',
      ],
    },
  ];

  const colW = 3.8;
  const colH = 4.8;
  const startX = 0.5;
  const gapX = 0.35;

  categories.forEach((cat, i) => {
    const x = startX + i * (colW + gapX);
    const y = MARGIN_TOP_BODY + 0.1;

    // カード背景
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y, w: colW, h: colH,
      fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.15,
      line: { color: cat.color, width: 2 },
    });

    // カテゴリヘッダー
    slide.addShape(pptx.ShapeType.roundRect, {
      x: x + 0.1, y: y + 0.1, w: colW - 0.2, h: 0.6,
      fill: { color: cat.color }, rectRadius: 0.1,
    });
    slide.addText(`${cat.icon}  ${cat.title}`, {
      x: x + 0.1, y: y + 0.1, w: colW - 0.2, h: 0.6,
      fontSize: 14, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
      align: 'center', valign: 'middle',
    });

    // 項目リスト
    const itemTexts = cat.items.map(item => ({
      text: item,
      options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK },
    }));
    slide.addText(itemTexts, {
      x: x + 0.2, y: y + 0.9, w: colW - 0.4, h: colH - 1.1,
      valign: 'top', lineSpacingMultiple: 1.4,
    });
  });

  // 下部: 使用量 + クォータ
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 6.3, w: CONTENT_WIDTH, h: 0.6,
    fill: { color: COLOR_LIGHT_BLUE }, rectRadius: 0.1,
    line: { color: COLOR_ACCENT, width: 1 },
  });
  slide.addText('📋  使用量 + クォータ: サブスクリプションとリージョンごとのネットワークリソースの使用状況と制限を確認できます', {
    x: 0.7, y: 6.3, w: CONTENT_WIDTH - 0.4, h: 0.6,
    fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK, valign: 'middle',
  });
}

// ============================================================
// スライド 4: 監視機能（トポロジ、接続モニター）
// ============================================================
function createSlide4() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, '監視機能（Monitoring）');
  addFooter(slide, 4);

  // --- 左側: トポロジ ---
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: MARGIN_TOP_BODY, w: 5.8, h: 5.5,
    fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.15,
    line: { color: COLOR_ACCENT, width: 2 },
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.6, y: MARGIN_TOP_BODY + 0.1, w: 5.6, h: 0.55,
    fill: { color: COLOR_ACCENT }, rectRadius: 0.1,
  });
  slide.addText('🗺️  トポロジ（Topology）', {
    x: 0.6, y: MARGIN_TOP_BODY + 0.1, w: 5.6, h: 0.55,
    fontSize: 15, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
    align: 'center', valign: 'middle',
  });

  const topoItems = [
    { text: 'ネットワーク全体の構成を可視化するインタラクティブなインターフェースを提供します', options: { bullet: true, fontSize: 11.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '複数のサブスクリプション、リソースグループ、リージョンにまたがるリソースとその関係性を表示できます', options: { bullet: true, fontSize: 11.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'ネットワーク構成の理解と確認に役立ちます', options: { bullet: true, fontSize: 11.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ];
  slide.addText(topoItems, {
    x: 0.8, y: MARGIN_TOP_BODY + 0.9, w: 5.2, h: 2.0,
    valign: 'top', lineSpacingMultiple: 1.35,
  });

  // トポロジ概念図
  const topoResources = [
    { label: 'VNet', x: 2.2, y: 4.2, color: COLOR_GREEN },
    { label: 'Subnet', x: 1.0, y: 5.3, color: COLOR_ACCENT },
    { label: 'VM', x: 3.4, y: 5.3, color: COLOR_PURPLE },
    { label: 'NSG', x: 4.6, y: 4.2, color: COLOR_RED },
  ];
  topoResources.forEach((r) => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: r.x, y: r.y, w: 1.5, h: 0.65,
      fill: { color: r.color }, rectRadius: 0.1,
    });
    slide.addText(r.label, {
      x: r.x, y: r.y, w: 1.5, h: 0.65,
      fontSize: 10, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
      align: 'center', valign: 'middle',
    });
  });
  // 接続線
  slide.addText('─────', { x: 1.7, y: 4.8, w: 1.5, h: 0.3, fontSize: 10, fontFace: FONT_FACE, color: '999999', align: 'center' });
  slide.addText('─────', { x: 3.0, y: 4.8, w: 1.5, h: 0.3, fontSize: 10, fontFace: FONT_FACE, color: '999999', align: 'center' });

  // --- 右側: 接続モニター ---
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.7, y: MARGIN_TOP_BODY, w: 6.1, h: 5.5,
    fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.15,
    line: { color: COLOR_GREEN, width: 2 },
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.8, y: MARGIN_TOP_BODY + 0.1, w: 5.9, h: 0.55,
    fill: { color: COLOR_GREEN }, rectRadius: 0.1,
  });
  slide.addText('📡  接続モニター（Connection Monitor）', {
    x: 6.8, y: MARGIN_TOP_BODY + 0.1, w: 5.9, h: 0.55,
    fontSize: 15, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
    align: 'center', valign: 'middle',
  });

  const connItems = [
    { text: 'エンドツーエンドの接続監視を行います', options: { bullet: true, fontSize: 11.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'TCP、ICMP、HTTP、HTTPS プロトコルによるテストをサポートしています', options: { bullet: true, fontSize: 11.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'テストグループごとにソース、宛先、テスト構成を柔軟に設定できます', options: { bullet: true, fontSize: 11.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'Azure Monitor と統合して、アラートおよびメトリクスのダッシュボードを提供しています', options: { bullet: true, fontSize: 11.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ];
  slide.addText(connItems, {
    x: 6.9, y: MARGIN_TOP_BODY + 0.9, w: 5.7, h: 2.0,
    valign: 'top', lineSpacingMultiple: 1.35,
  });

  // 接続モニターフロー図
  const flowItems = [
    { label: 'ソース\n(VM)', x: 7.0, y: 4.5, w: 1.5, color: COLOR_ACCENT },
    { label: 'テスト\nグループ', x: 9.0, y: 4.5, w: 1.5, color: COLOR_ORANGE },
    { label: '宛先\n(Endpoint)', x: 11.0, y: 4.5, w: 1.5, color: COLOR_GREEN },
  ];
  flowItems.forEach((fi) => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: fi.x, y: fi.y, w: fi.w, h: 1.0,
      fill: { color: fi.color }, rectRadius: 0.1,
    });
    slide.addText(fi.label, {
      x: fi.x, y: fi.y, w: fi.w, h: 1.0,
      fontSize: 10, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
      align: 'center', valign: 'middle',
    });
  });
  // 矢印
  slide.addText('→', { x: 8.5, y: 4.7, w: 0.5, h: 0.6, fontSize: 24, fontFace: FONT_FACE, color: COLOR_ACCENT, align: 'center', valign: 'middle' });
  slide.addText('→', { x: 10.5, y: 4.7, w: 0.5, h: 0.6, fontSize: 24, fontFace: FONT_FACE, color: COLOR_ACCENT, align: 'center', valign: 'middle' });

  // Azure Monitor 連携
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 8.5, y: 5.8, w: 3.0, h: 0.55,
    fill: { color: COLOR_LIGHT_BLUE }, rectRadius: 0.08,
    line: { color: COLOR_ACCENT, width: 1 },
  });
  slide.addText('📊 Azure Monitor 連携', {
    x: 8.5, y: 5.8, w: 3.0, h: 0.55,
    fontSize: 10, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
    align: 'center', valign: 'middle',
  });
}

// ============================================================
// スライド 5: 診断ツール（前半）
// ============================================================
function createSlide5() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'ネットワーク診断ツール（前半）');
  addFooter(slide, 5);

  const tools = [
    {
      icon: '🔍',
      title: 'IP フロー検証',
      color: COLOR_ACCENT,
      items: [
        'VM レベルでトラフィックのフィルタリング問題を検出します',
        '5 タプル（送信元/宛先 IP・ポート、プロトコル）でパケットの許可・拒否を判定します',
        '拒否した場合、該当するセキュリティ規則を返却します',
      ],
    },
    {
      icon: '🛡️',
      title: 'NSG 診断',
      color: COLOR_GREEN,
      items: [
        'VM、VMSS、Application Gateway レベルでのフィルタリング問題を検出します',
        'IP アドレス、IP プレフィックス、サービスタグに対するパケットの許可・拒否を判定します',
        'より高い優先度のセキュリティ規則の追加も可能です',
      ],
    },
    {
      icon: '🔀',
      title: '次のホップ',
      color: COLOR_ORANGE,
      items: [
        'ルーティングの問題を検出するために使用します',
        '宛先 IP に対するネクストホップの種類、IP アドレス、ルートテーブル ID を返却します',
        'ユーザー定義ルートの構成ミスを診断できます',
      ],
    },
    {
      icon: '📋',
      title: '有効なセキュリティ規則',
      color: COLOR_PURPLE,
      items: [
        'ネットワークインターフェースに適用されている有効なセキュリティ規則を表示します',
        'NIC のルール、サブネットのルール、集約結果を確認できます',
      ],
    },
  ];

  const cardW = 5.9;
  const cardH = 2.5;
  const gapX = 0.45;
  const gapY = 0.3;

  tools.forEach((tool, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.5 + col * (cardW + gapX);
    const y = MARGIN_TOP_BODY + 0.1 + row * (cardH + gapY);

    // カード背景
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y, w: cardW, h: cardH,
      fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.12,
      line: { color: tool.color, width: 2 },
    });

    // ヘッダー
    slide.addShape(pptx.ShapeType.roundRect, {
      x: x + 0.1, y: y + 0.08, w: cardW - 0.2, h: 0.5,
      fill: { color: tool.color }, rectRadius: 0.08,
    });
    slide.addText(`${tool.icon}  ${tool.title}`, {
      x: x + 0.1, y: y + 0.08, w: cardW - 0.2, h: 0.5,
      fontSize: 13, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
      align: 'center', valign: 'middle',
    });

    // 箇条書き
    const itemTexts = tool.items.map(item => ({
      text: item,
      options: { bullet: true, fontSize: 10.5, fontFace: FONT_FACE, color: COLOR_BLACK },
    }));
    slide.addText(itemTexts, {
      x: x + 0.2, y: y + 0.7, w: cardW - 0.4, h: cardH - 0.9,
      valign: 'top', lineSpacingMultiple: 1.3,
    });
  });
}

// ============================================================
// スライド 6: 診断ツール（後半）
// ============================================================
function createSlide6() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'ネットワーク診断ツール（後半）');
  addFooter(slide, 6);

  const tools = [
    {
      icon: '🔗',
      title: '接続のトラブルシューティング',
      color: COLOR_ACCENT,
      items: [
        'VM、VMSS、Application Gateway、Bastion ホストから宛先への接続をテストします',
        '宛先として VM、FQDN、URI、IPv4 アドレスを指定できます',
        'ポイントインタイムでの単発テストを実行します',
      ],
    },
    {
      icon: '📦',
      title: 'パケットキャプチャ',
      color: COLOR_GREEN,
      items: [
        'VM や VMSS のトラフィックをリモートでキャプチャするセッションを作成します',
        'Network Watcher Agent VM 拡張機能のインストールが必要です',
        'キャプチャデータはローカルディスクまたは Azure Storage Blob に保存できます',
        'Portal、PowerShell、Azure CLI、REST API からトリガーでき、VM アラートによる自動起動も可能です',
      ],
    },
    {
      icon: '🔐',
      title: 'VPN トラブルシューティング',
      color: COLOR_ORANGE,
      items: [
        '仮想ネットワークゲートウェイおよびその接続に対して複数の診断チェックを実行します',
        'VPN ゲートウェイと接続の問題をデバッグするために使用します',
      ],
    },
  ];

  // 上部: 3列カードレイアウト
  const cardW = 3.8;
  const cardH = 3.5;
  const gapX = 0.35;
  const startX = 0.5;

  tools.forEach((tool, i) => {
    const x = startX + i * (cardW + gapX);
    const y = MARGIN_TOP_BODY + 0.1;

    slide.addShape(pptx.ShapeType.roundRect, {
      x, y, w: cardW, h: cardH,
      fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.12,
      line: { color: tool.color, width: 2 },
    });

    slide.addShape(pptx.ShapeType.roundRect, {
      x: x + 0.1, y: y + 0.08, w: cardW - 0.2, h: 0.5,
      fill: { color: tool.color }, rectRadius: 0.08,
    });
    slide.addText(`${tool.icon}  ${tool.title}`, {
      x: x + 0.1, y: y + 0.08, w: cardW - 0.2, h: 0.5,
      fontSize: 12, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
      align: 'center', valign: 'middle',
    });

    const itemTexts = tool.items.map(item => ({
      text: item,
      options: { bullet: true, fontSize: 10.5, fontFace: FONT_FACE, color: COLOR_BLACK },
    }));
    slide.addText(itemTexts, {
      x: x + 0.2, y: y + 0.7, w: cardW - 0.4, h: cardH - 0.9,
      valign: 'top', lineSpacingMultiple: 1.3,
    });
  });

  // 下部: 接続トラブルシューティングのフロー図
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 5.2, w: CONTENT_WIDTH, h: 1.6,
    fill: { color: COLOR_LIGHT_BLUE }, rectRadius: 0.12,
    line: { color: COLOR_ACCENT, width: 1 },
  });
  slide.addText('📋  接続テストのフロー', {
    x: 0.7, y: 5.3, w: 3.0, h: 0.35,
    fontSize: 12, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
  });

  const flowSteps = [
    { label: 'ソース\n(VM/GW/Bastion)', x: 1.0, w: 2.3, color: COLOR_ACCENT },
    { label: '接続テスト\n実行', x: 4.2, w: 2.0, color: COLOR_ORANGE },
    { label: '宛先\n(VM/FQDN/IP)', x: 7.1, w: 2.3, color: COLOR_GREEN },
    { label: '結果\n(到達性/遅延)', x: 10.2, w: 2.3, color: COLOR_PURPLE },
  ];
  flowSteps.forEach((step) => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: step.x, y: 5.8, w: step.w, h: 0.8,
      fill: { color: step.color }, rectRadius: 0.1,
    });
    slide.addText(step.label, {
      x: step.x, y: 5.8, w: step.w, h: 0.8,
      fontSize: 10, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
      align: 'center', valign: 'middle',
    });
  });
  // 矢印
  slide.addText('→', { x: 3.4, y: 5.9, w: 0.7, h: 0.5, fontSize: 22, fontFace: FONT_FACE, color: COLOR_ACCENT, align: 'center', valign: 'middle' });
  slide.addText('→', { x: 6.3, y: 5.9, w: 0.7, h: 0.5, fontSize: 22, fontFace: FONT_FACE, color: COLOR_ACCENT, align: 'center', valign: 'middle' });
  slide.addText('→', { x: 9.5, y: 5.9, w: 0.7, h: 0.5, fontSize: 22, fontFace: FONT_FACE, color: COLOR_ACCENT, align: 'center', valign: 'middle' });
}

// ============================================================
// スライド 7: フローログとトラフィック分析
// ============================================================
function createSlide7() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'フローログとトラフィック分析');
  addFooter(slide, 7);

  // --- アーキテクチャ図 ---
  // データフロー: VNet/NSG → フローログ → Azure Storage → トラフィック分析 → Log Analytics
  const archItems = [
    { label: 'VNet / NSG', x: 0.5, w: 2.0, color: COLOR_ACCENT },
    { label: 'フロー\nログ', x: 3.2, w: 1.8, color: COLOR_GREEN },
    { label: 'Azure\nStorage', x: 5.7, w: 1.8, color: COLOR_ORANGE },
    { label: 'トラフィック\n分析', x: 8.2, w: 1.8, color: COLOR_PURPLE },
    { label: 'Log\nAnalytics', x: 10.7, w: 1.8, color: COLOR_DARK_BLUE },
  ];

  archItems.forEach((item) => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: item.x, y: MARGIN_TOP_BODY, w: item.w, h: 0.9,
      fill: { color: item.color }, rectRadius: 0.1,
    });
    slide.addText(item.label, {
      x: item.x, y: MARGIN_TOP_BODY, w: item.w, h: 0.9,
      fontSize: 11, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
      align: 'center', valign: 'middle',
    });
  });
  // 矢印
  [2.6, 5.1, 7.6, 10.1].forEach(ax => {
    slide.addText('→', {
      x: ax, y: MARGIN_TOP_BODY + 0.1, w: 0.5, h: 0.7,
      fontSize: 22, fontFace: FONT_FACE, color: COLOR_ACCENT, align: 'center', valign: 'middle',
    });
  });

  // --- フローログ セクション ---
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 2.6, w: 6.0, h: 4.2,
    fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.12,
    line: { color: COLOR_GREEN, width: 2 },
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.6, y: 2.68, w: 5.8, h: 0.5,
    fill: { color: COLOR_GREEN }, rectRadius: 0.08,
  });
  slide.addText('📝  フローログ（Flow Logs）', {
    x: 0.6, y: 2.68, w: 5.8, h: 0.5,
    fontSize: 14, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
    align: 'center', valign: 'middle',
  });

  const flowLogItems = [
    { text: 'Azure IP トラフィックの情報をログに記録し、Azure Storage に保存します', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'VNet フローログ: 仮想ネットワーク単位でトラフィックを記録します（推奨）', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK, bold: true } },
    { text: 'NSG フローログ: ネットワークセキュリティグループ単位でトラフィックを記録します', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ];
  slide.addText(flowLogItems, {
    x: 0.8, y: 3.35, w: 5.4, h: 1.6,
    valign: 'top', lineSpacingMultiple: 1.35,
  });

  // 警告ボックス
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8, y: 5.1, w: 5.4, h: 1.5,
    fill: { color: COLOR_YELLOW }, rectRadius: 0.1,
    line: { color: COLOR_ORANGE, width: 1.5 },
  });
  slide.addText('⚠️  重要: NSG フローログの廃止予定', {
    x: 1.0, y: 5.2, w: 5.0, h: 0.35,
    fontSize: 11, fontFace: FONT_FACE, color: COLOR_RED, bold: true,
  });
  slide.addText([
    { text: '• NSG フローログは 2027 年 9 月 30 日 に廃止予定です\n', options: { fontSize: 10.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '• 2025 年 6 月 30 日以降、新規作成ができなくなります\n', options: { fontSize: 10.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '• VNet フローログへの移行が推奨されています', options: { fontSize: 10.5, fontFace: FONT_FACE, color: COLOR_BLACK, bold: true } },
  ], {
    x: 1.0, y: 5.55, w: 5.0, h: 1.0,
    valign: 'top', lineSpacingMultiple: 1.2,
  });

  // --- トラフィック分析 セクション ---
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.8, y: 2.6, w: 6.0, h: 4.2,
    fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.12,
    line: { color: COLOR_PURPLE, width: 2 },
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.9, y: 2.68, w: 5.8, h: 0.5,
    fill: { color: COLOR_PURPLE }, rectRadius: 0.08,
  });
  slide.addText('📊  トラフィック分析（Traffic Analytics）', {
    x: 6.9, y: 2.68, w: 5.8, h: 0.5,
    fontSize: 14, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
    align: 'center', valign: 'middle',
  });

  const taItems = [
    { text: 'フローログデータのリッチな可視化・クエリ・分析機能を提供します', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'Log Analytics ワークスペースと連携し、ネットワークトラフィックのパターンを把握できます', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'データ収集ルール（DCR）とデータ収集エンドポイント（DCE）リソースを自動作成します', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '処理される生フローログデータ量に基づいて課金されます', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ];
  slide.addText(taItems, {
    x: 7.0, y: 3.35, w: 5.6, h: 3.3,
    valign: 'top', lineSpacingMultiple: 1.35,
  });
}

// ============================================================
// スライド 8: セキュリティとアクセス制御 + 料金体系・利用制限
// ============================================================
function createSlide8() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'セキュリティ・料金体系・利用制限');
  addFooter(slide, 8);

  // --- 左側: セキュリティとアクセス制御 ---
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: MARGIN_TOP_BODY, w: 6.0, h: 5.5,
    fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.12,
    line: { color: COLOR_ACCENT, width: 2 },
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.6, y: MARGIN_TOP_BODY + 0.08, w: 5.8, h: 0.5,
    fill: { color: COLOR_ACCENT }, rectRadius: 0.08,
  });
  slide.addText('🔒  セキュリティとアクセス制御', {
    x: 0.6, y: MARGIN_TOP_BODY + 0.08, w: 5.8, h: 0.5,
    fontSize: 14, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
    align: 'center', valign: 'middle',
  });

  // RBAC ロール一覧 テーブル
  const rbacRows = [
    ['ロール', '説明'],
    ['Owner', 'すべての権限を持ちます'],
    ['Contributor', '所有権の割り当て以外の全権限を持ちます'],
    ['Network Contributor', 'ネットワーク関連の権限を持ちます'],
    ['カスタムロール', '必要最小限のアクションのみを割り当てます'],
  ];
  slide.addTable(rbacRows, {
    x: 0.7, y: MARGIN_TOP_BODY + 0.75, w: 5.6, h: 2.0,
    fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK,
    border: { type: 'solid', pt: 0.5, color: 'CCCCCC' },
    colW: [2.0, 3.6],
    rowH: [0.35, 0.35, 0.35, 0.35, 0.35],
    autoPage: false,
    firstRow: { fill: COLOR_ACCENT, color: COLOR_WHITE, bold: true, fontSize: 10, fontFace: FONT_FACE },
  });

  // 追加情報
  const secItems = [
    { text: 'Network Contributor には Storage、Compute、OperationalInsights 関連アクションが含まれません', options: { bullet: true, fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'フローログやトラフィック分析には追加の権限が必要です', options: { bullet: true, fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'Azure Policy でフローログの構成を組織全体で統一的に管理できます', options: { bullet: true, fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'Network Watcher は顧客データを保存しません（接続モニターを除く）', options: { bullet: true, fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ];
  slide.addText(secItems, {
    x: 0.7, y: 4.5, w: 5.6, h: 2.2,
    valign: 'top', lineSpacingMultiple: 1.3,
  });

  // --- 右側: 料金体系・利用制限 ---
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.8, y: MARGIN_TOP_BODY, w: 6.0, h: 5.5,
    fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.12,
    line: { color: COLOR_ORANGE, width: 2 },
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.9, y: MARGIN_TOP_BODY + 0.08, w: 5.8, h: 0.5,
    fill: { color: COLOR_ORANGE }, rectRadius: 0.08,
  });
  slide.addText('💰  料金体系と利用制限', {
    x: 6.9, y: MARGIN_TOP_BODY + 0.08, w: 5.8, h: 0.5,
    fontSize: 14, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
    align: 'center', valign: 'middle',
  });

  // 料金情報
  const priceItems = [
    { text: '自動有効化自体には課金は発生しません', options: { bullet: true, fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '各機能の使用量に基づいて個別に課金されます', options: { bullet: true, fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'トラフィック分析は生フローログデータ量に基づきます', options: { bullet: true, fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'Log Analytics への取り込みは Azure Monitor 料金が適用されます', options: { bullet: true, fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ];
  slide.addText(priceItems, {
    x: 7.0, y: MARGIN_TOP_BODY + 0.75, w: 5.6, h: 1.5,
    valign: 'top', lineSpacingMultiple: 1.25,
  });

  // 利用制限テーブル
  const limitRows = [
    ['リソース', '制限'],
    ['NW インスタンス / リージョン', '1'],
    ['接続モニター / リージョン', '100'],
    ['テストグループ / モニター', '20'],
    ['ソース・宛先 / モニター', '100'],
    ['テスト構成 / モニター', '20'],
    ['パケットキャプチャ / リージョン', '10,000'],
    ['VPN トラブルシュート (同時)', '1'],
  ];
  slide.addTable(limitRows, {
    x: 7.0, y: 3.6, w: 5.6, h: 3.0,
    fontSize: 9.5, fontFace: FONT_FACE, color: COLOR_BLACK,
    border: { type: 'solid', pt: 0.5, color: 'CCCCCC' },
    colW: [3.2, 2.4],
    rowH: [0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32],
    autoPage: false,
    firstRow: { fill: COLOR_ORANGE, color: COLOR_WHITE, bold: true, fontSize: 9.5, fontFace: FONT_FACE },
  });
}

// ============================================================
// スライド 9: まとめ・次のステップ + 参考リンク
// ============================================================
function createSlide9() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'まとめと次のステップ');
  addFooter(slide, 9);

  // --- まとめ ---
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: MARGIN_TOP_BODY, w: CONTENT_WIDTH, h: 2.3,
    fill: { color: COLOR_LIGHT_BLUE }, rectRadius: 0.12,
    line: { color: COLOR_ACCENT, width: 2 },
  });
  slide.addText('✅  Azure Network Watcher の価値', {
    x: 0.7, y: MARGIN_TOP_BODY + 0.08, w: CONTENT_WIDTH - 0.4, h: 0.4,
    fontSize: 14, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
  });
  const summaryItems = [
    { text: 'Azure IaaS ネットワークの監視・診断・トラフィック分析を一元的に提供します', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '仮想ネットワーク作成時に自動有効化されるため、追加の構成なしで利用を開始できます', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '7 つの診断ツールにより、NSG、ルーティング、VPN、接続の問題を迅速に特定・解決できます', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'VNet フローログとトラフィック分析により、ネットワークトラフィックの可視化と分析が可能です', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ];
  slide.addText(summaryItems, {
    x: 0.7, y: MARGIN_TOP_BODY + 0.5, w: CONTENT_WIDTH - 0.4, h: 1.7,
    valign: 'top', lineSpacingMultiple: 1.3,
  });

  // --- 次のステップ ---
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 3.85, w: 6.0, h: 1.8,
    fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.12,
    line: { color: COLOR_GREEN, width: 1.5 },
  });
  slide.addText('🚀  次のステップ', {
    x: 0.7, y: 3.92, w: 5.6, h: 0.35,
    fontSize: 13, fontFace: FONT_FACE, color: COLOR_GREEN, bold: true,
  });
  const nextSteps = [
    { text: 'Azure Portal で Network Watcher の有効化状態を確認してください', options: { bullet: true, fontSize: 10.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'VNet フローログを有効化し、トラフィック分析で可視化環境を構築してください', options: { bullet: true, fontSize: 10.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'NSG フローログ使用中の場合は VNet フローログへの移行を検討してください', options: { bullet: true, fontSize: 10.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'RBAC のカスタムロールで最小権限の原則に基づくアクセス制御を設計してください', options: { bullet: true, fontSize: 10.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ];
  slide.addText(nextSteps, {
    x: 0.7, y: 4.3, w: 5.6, h: 1.2,
    valign: 'top', lineSpacingMultiple: 1.2,
  });

  // --- 参考リンク ---
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.8, y: 3.85, w: 6.0, h: 1.8,
    fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.12,
    line: { color: COLOR_PURPLE, width: 1.5 },
  });
  slide.addText('📎  参考リンク（主要）', {
    x: 7.0, y: 3.92, w: 5.6, h: 0.35,
    fontSize: 13, fontFace: FONT_FACE, color: COLOR_PURPLE, bold: true,
  });
  const topLinks = [
    { text: '• Azure Network Watcher とは', options: { fontSize: 9.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '• Network Watcher FAQ', options: { fontSize: 9.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '• VNet フローログの概要', options: { fontSize: 9.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '• トラフィック分析', options: { fontSize: 9.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '• Network Watcher の料金', options: { fontSize: 9.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ];
  slide.addText(topLinks, {
    x: 7.0, y: 4.3, w: 5.6, h: 1.2,
    valign: 'top', lineSpacingMultiple: 1.15,
  });

  // --- 参考リンク一覧（下部） ---
  const linkRows = [
    ['#', 'タイトル', 'URL'],
    ['1', 'Azure Network Watcher とは', 'learn.microsoft.com/azure/network-watcher/network-watcher-overview'],
    ['2', 'Network Watcher FAQ', 'learn.microsoft.com/azure/network-watcher/frequently-asked-questions'],
    ['3', '接続モニターの概要', 'learn.microsoft.com/azure/network-watcher/connection-monitor-overview'],
    ['4', 'VNet フローログの概要', 'learn.microsoft.com/azure/network-watcher/vnet-flow-logs-overview'],
    ['5', 'トラフィック分析', 'learn.microsoft.com/azure/network-watcher/traffic-analytics'],
    ['6', 'RBAC 権限', 'learn.microsoft.com/azure/network-watcher/required-rbac-permissions'],
    ['7', '料金', 'azure.microsoft.com/pricing/details/network-watcher/'],
  ];
  slide.addTable(linkRows, {
    x: 0.5, y: 5.8, w: CONTENT_WIDTH, h: 1.25,
    fontSize: 7.5, fontFace: FONT_FACE, color: COLOR_BLACK,
    border: { type: 'solid', pt: 0.3, color: 'CCCCCC' },
    colW: [0.4, 3.5, 8.43],
    rowH: [0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16],
    autoPage: false,
    firstRow: { fill: COLOR_ACCENT, color: COLOR_WHITE, bold: true, fontSize: 7.5, fontFace: FONT_FACE },
  });
}

// ============================================================
// メイン: スライド生成・保存
// ============================================================
createSlide2();
createSlide3();
createSlide4();
createSlide5();
createSlide6();
createSlide7();
createSlide8();
createSlide9();

const outputDir = path.join(__dirname, '..', 'docs');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const outputPath = path.join(outputDir, 'AzureNetworkWatcher_content.pptx');
pptx.writeFile({ fileName: outputPath })
  .then(() => {
    console.log(`[PptxGenJS] コンテンツスライドを出力しました: ${outputPath}`);
    console.log(`  スライド数: 8枚（表紙・最終スライドは別途結合）`);
  })
  .catch(err => {
    console.error('エラー:', err);
    process.exit(1);
  });
