const PptxGenJS = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

// ============================================================
// Azure Local 詳細仕様 — スライド生成スクリプト
// ============================================================

const pptx = new PptxGenJS();

// --- グローバル設定 ---
pptx.layout = 'LAYOUT_WIDE'; // 16:9
pptx.author = 'GitHub Copilot';
pptx.subject = 'Azure Local 詳細仕様';

// --- 定数 ---
const FONT_FACE = 'Meiryo UI';
const COLOR_BLACK = '333333';
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
function addFooter(slide, pageNum) {
  slide.addText(`${pageNum} / 10`, {
    x: 11.5, y: 7.1, w: 1.5, h: 0.3,
    fontSize: 9, fontFace: FONT_FACE, color: '999999', align: 'right',
  });
}

// ============================================================
// スライド 1: 表紙 (header.pptx テンプレートを使用)
// ============================================================
// header.pptx は後で python-pptx で差し込むため、ここではスキップ
// → 後工程で結合

// ============================================================
// スライド 2: Azure Local の概要
// ============================================================
function createSlide2() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'Azure Local の概要');
  addFooter(slide, 2);

  // 概念図: Azure クラウド ↔ Azure Arc ↔ オンプレミス
  const boxY = MARGIN_TOP_BODY;
  const boxH = 1.2;
  const boxW = 3.0;
  const arrowFontSize = 28;

  // Azure クラウド
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: boxY, w: boxW, h: boxH,
    fill: { color: COLOR_ACCENT }, rectRadius: 0.15,
  });
  slide.addText('Azure クラウド', {
    x: 0.5, y: boxY, w: boxW, h: boxH,
    fontSize: 16, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
    align: 'center', valign: 'middle',
  });

  // 矢印
  slide.addText('⇄', {
    x: 3.7, y: boxY, w: 1.0, h: boxH,
    fontSize: arrowFontSize, fontFace: FONT_FACE, color: COLOR_ACCENT,
    align: 'center', valign: 'middle',
  });

  // Azure Arc
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 4.8, y: boxY, w: boxW, h: boxH,
    fill: { color: COLOR_PURPLE }, rectRadius: 0.15,
  });
  slide.addText('Azure Arc\n(統一管理プレーン)', {
    x: 4.8, y: boxY, w: boxW, h: boxH,
    fontSize: 14, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
    align: 'center', valign: 'middle',
  });

  // 矢印
  slide.addText('⇄', {
    x: 8.0, y: boxY, w: 1.0, h: boxH,
    fontSize: arrowFontSize, fontFace: FONT_FACE, color: COLOR_ACCENT,
    align: 'center', valign: 'middle',
  });

  // Azure Local
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 9.2, y: boxY, w: boxW, h: boxH,
    fill: { color: COLOR_GREEN }, rectRadius: 0.15,
  });
  slide.addText('Azure Local\n(オンプレミス)', {
    x: 9.2, y: boxY, w: boxW, h: boxH,
    fontSize: 14, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
    align: 'center', valign: 'middle',
  });

  // 箇条書き
  const bullets = [
    { text: 'Azure Local は、Microsoft の分散インフラストラクチャソリューションです', options: { bullet: true, fontSize: 13, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'お客様のオンプレミス環境に Azure の機能を拡張し、ローカルでのアプリケーション展開を実現します', options: { bullet: true, fontSize: 13, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '旧称「Azure Stack HCI」から名称が変更されています', options: { bullet: true, fontSize: 13, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'Azure Arc を統一コントロールプレーンとして使用し、クラウドからエッジまでシームレスに管理できます', options: { bullet: true, fontSize: 13, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'クラウドネイティブな管理エクスペリエンスを提供し、接続・切断両方のデプロイをサポートします', options: { bullet: true, fontSize: 13, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '物理コアあたりの月額サブスクリプション課金モデルを採用しています', options: { bullet: true, fontSize: 13, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ];
  slide.addText(bullets, {
    x: MARGIN_LEFT, y: 2.8, w: CONTENT_WIDTH, h: 4.2,
    valign: 'top', lineSpacingMultiple: 1.3,
  });
}

// ============================================================
// スライド 3: 主要ユースケース
// ============================================================
function createSlide3() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'Azure Local のユースケース');
  addFooter(slide, 3);

  const cases = [
    { icon: '🤖', title: 'ローカル AI 推論', desc: 'データをソースで処理する必要がある環境に適しています（例: 小売店のセルフチェックアウト、パイプラインの漏洩検出）', color: COLOR_ACCENT },
    { icon: '🏭', title: 'ミッションクリティカルな\n業務継続', desc: 'ネットワーク障害時にも稼働し続ける必要があるシステムに適しています（例: 工場の生産ライン、スタジアムのチケッティング）', color: COLOR_GREEN },
    { icon: '⚡', title: '制御システム・\nリアルタイム運用', desc: '極めて低いレイテンシが要求される環境に適しています（例: 製造実行システム、金融インフラ）', color: COLOR_ORANGE },
    { icon: '🔒', title: '主権・規制要件', desc: 'データをローカルに保持・管理する必要がある業界に適しています（例: 防衛・情報セクター、エネルギーインフラ）', color: COLOR_PURPLE },
  ];

  const cardW = 2.8;
  const cardH = 4.5;
  const startX = 0.5;
  const gap = 0.3;
  const cardY = MARGIN_TOP_BODY + 0.1;

  cases.forEach((c, i) => {
    const x = startX + i * (cardW + gap);

    // カード背景
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: cardY, w: cardW, h: cardH,
      fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.15,
      line: { color: c.color, width: 2 },
    });

    // アイコン
    slide.addText(c.icon, {
      x, y: cardY + 0.2, w: cardW, h: 0.8,
      fontSize: 36, fontFace: FONT_FACE, align: 'center', valign: 'middle',
    });

    // タイトル
    slide.addText(c.title, {
      x: x + 0.15, y: cardY + 1.1, w: cardW - 0.3, h: 0.8,
      fontSize: 13, fontFace: FONT_FACE, color: c.color, bold: true,
      align: 'center', valign: 'middle',
    });

    // 説明
    slide.addText(c.desc, {
      x: x + 0.2, y: cardY + 2.0, w: cardW - 0.4, h: 2.3,
      fontSize: 10.5, fontFace: FONT_FACE, color: COLOR_BLACK,
      align: 'left', valign: 'top', lineSpacingMultiple: 1.3,
    });
  });
}

// ============================================================
// スライド 4: アーキテクチャとシステム要件（統合）
// ============================================================
function createSlide4() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'アーキテクチャとシステム要件');
  addFooter(slide, 4);

  // ===== 左側: アーキテクチャ階層図 (コンパクト版) =====
  slide.addText('アーキテクチャ構成', {
    x: 0.5, y: MARGIN_TOP_BODY, w: 5.8, h: 0.35,
    fontSize: 13, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
  });

  const layers = [
    { label: 'Azure クラウドサービス群', color: COLOR_ACCENT, y: 1.75 },
    { label: 'Azure Arc (統一管理プレーン)', color: COLOR_PURPLE, y: 2.7 },
    { label: 'HCI 基盤 (Hyper-V / S2D / FCI)', color: COLOR_GREEN, y: 3.65 },
    { label: '物理サーバー (1〜16台)', color: '6B6B6B', y: 4.6 },
  ];

  layers.forEach((l) => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.5, y: l.y, w: 5.8, h: 0.8,
      fill: { color: l.color }, rectRadius: 0.1,
    });
    slide.addText(l.label, {
      x: 0.5, y: l.y, w: 5.8, h: 0.8,
      fontSize: 11.5, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
      align: 'center', valign: 'middle',
    });
  });

  // 矢印（上向き）
  [2.55, 3.5, 4.45].forEach((y) => {
    slide.addText('▲', {
      x: 2.9, y: y, w: 1.0, h: 0.2,
      fontSize: 12, fontFace: FONT_FACE, color: COLOR_ACCENT,
      align: 'center', valign: 'middle',
    });
  });

  // プラットフォームリソース（左下）
  slide.addText([
    { text: '● Azure Local (コンピュート・ストレージ)\n', options: { fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '● Azure Key Vault / Monitor / Defender for Cloud', options: { fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ], {
    x: 0.5, y: 5.6, w: 5.8, h: 0.8,
    valign: 'top', lineSpacingMultiple: 1.3,
  });

  // ===== 右側: システム要件 =====
  // Azure / ネットワーク要件
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.7, y: MARGIN_TOP_BODY, w: 6.1, h: 1.8,
    fill: { color: COLOR_LIGHT_BLUE }, rectRadius: 0.1,
  });
  slide.addText('Azure / ネットワーク要件', {
    x: 6.9, y: MARGIN_TOP_BODY + 0.05, w: 5.7, h: 0.35,
    fontSize: 13, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
  });
  slide.addText([
    { text: '• Azure サブスクリプション（EA / CSP / Pay-as-you-go 等）が必要です\n', options: { fontSize: 10.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '• 対応リージョン: East US、West Europe、Japan East 等に対応しています\n', options: { fontSize: 10.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '• ネットワーク: Azure への接続が必要です（最低 10 Mbit）', options: { fontSize: 10.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ], {
    x: 6.9, y: MARGIN_TOP_BODY + 0.4, w: 5.7, h: 1.3,
    valign: 'top', lineSpacingMultiple: 1.2,
  });

  // 最大ハードウェア仕様テーブル（コンパクト版）
  slide.addText('最大ハードウェア仕様', {
    x: 6.7, y: 3.3, w: 6.1, h: 0.35,
    fontSize: 13, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
  });

  const tableRows = [
    [
      { text: '項目', options: { bold: true, fontFace: FONT_FACE, fontSize: 10, color: COLOR_WHITE, fill: { color: COLOR_ACCENT }, align: 'center' } },
      { text: '最大値', options: { bold: true, fontFace: FONT_FACE, fontSize: 10, color: COLOR_WHITE, fill: { color: COLOR_ACCENT }, align: 'center' } },
    ],
    [
      { text: '物理マシン数', options: { fontFace: FONT_FACE, fontSize: 10, fill: { color: COLOR_LIGHT_BG } } },
      { text: '16台/システム', options: { fontFace: FONT_FACE, fontSize: 10, fill: { color: COLOR_LIGHT_BG }, align: 'center' } },
    ],
    [
      { text: 'ストレージ', options: { fontFace: FONT_FACE, fontSize: 10 } },
      { text: '4 PB/システム、400 TB/マシン', options: { fontFace: FONT_FACE, fontSize: 10, align: 'center' } },
    ],
    [
      { text: 'ボリューム', options: { fontFace: FONT_FACE, fontSize: 10, fill: { color: COLOR_LIGHT_BG } } },
      { text: '64個/システム、64 TB/ボリューム', options: { fontFace: FONT_FACE, fontSize: 10, fill: { color: COLOR_LIGHT_BG }, align: 'center' } },
    ],
    [
      { text: '論理プロセッサ', options: { fontFace: FONT_FACE, fontSize: 10 } },
      { text: '512個/ホスト', options: { fontFace: FONT_FACE, fontSize: 10, align: 'center' } },
    ],
    [
      { text: 'RAM', options: { fontFace: FONT_FACE, fontSize: 10, fill: { color: COLOR_LIGHT_BG } } },
      { text: '24 TB/ホスト', options: { fontFace: FONT_FACE, fontSize: 10, fill: { color: COLOR_LIGHT_BG }, align: 'center' } },
    ],
    [
      { text: '仮想プロセッサ', options: { fontFace: FONT_FACE, fontSize: 10 } },
      { text: '2,048個/ホスト', options: { fontFace: FONT_FACE, fontSize: 10, align: 'center' } },
    ],
  ];

  slide.addTable(tableRows, {
    x: 6.7, y: 3.7, w: 6.1,
    colW: [3.05, 3.05],
    border: { type: 'solid', color: 'CCCCCC', pt: 0.5 },
    rowH: 0.37,
  });
}

// ============================================================
// スライド 6: ワークロード管理
// ============================================================
function createSlide6() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'ワークロード管理機能');
  addFooter(slide, 5);

  // 3本柱
  const pillars = [
    {
      icon: '🖥️',
      title: 'Azure Local VM 管理',
      items: [
        'Windows/Linux VM のプロビジョニングと管理ができます',
        'Azure Portal、CLI、PowerShell、ARM テンプレートから操作が可能です',
        'VM ライフサイクル操作（作成・起動・停止・削除・リサイズ等）に対応しています',
        'RBAC による役割ベースのアクセス制御を提供しています',
      ],
      color: COLOR_ACCENT,
    },
    {
      icon: '☸️',
      title: 'AKS on Azure Local',
      items: [
        'Azure Arc 対応の Azure Kubernetes Service を展開できます',
        'Azure Portal から直接 Kubernetes クラスタの作成・管理が可能です',
        'コンテナ化されたアプリケーションのスケーリングに対応しています',
      ],
      color: COLOR_GREEN,
    },
    {
      icon: '🖵',
      title: 'Azure Virtual Desktop',
      items: [
        'オンプレミスインフラにセッションホストを展開できます',
        'シングルセッション・マルチセッション構成を選択できます',
      ],
      color: COLOR_PURPLE,
    },
  ];

  const pillarW = 3.8;
  const pillarH = 5.2;
  const startX = 0.5;
  const gap = 0.3;
  const pY = MARGIN_TOP_BODY + 0.1;

  pillars.forEach((p, i) => {
    const x = startX + i * (pillarW + gap);

    // 背景
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: pY, w: pillarW, h: pillarH,
      fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.15,
      line: { color: p.color, width: 2 },
    });

    // ヘッダー帯
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: pY, w: pillarW, h: 0.9,
      fill: { color: p.color }, rectRadius: 0.15,
    });
    // 下部を隠す四角
    slide.addShape(pptx.ShapeType.rect, {
      x, y: pY + 0.6, w: pillarW, h: 0.35,
      fill: { color: p.color },
    });

    slide.addText(`${p.icon}  ${p.title}`, {
      x, y: pY, w: pillarW, h: 0.9,
      fontSize: 14, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
      align: 'center', valign: 'middle',
    });

    // 項目
    const bullets = p.items.map((item) => ({
      text: item,
      options: { bullet: true, fontSize: 10.5, fontFace: FONT_FACE, color: COLOR_BLACK },
    }));
    slide.addText(bullets, {
      x: x + 0.15, y: pY + 1.1, w: pillarW - 0.3, h: pillarH - 1.3,
      valign: 'top', lineSpacingMultiple: 1.4,
    });
  });
}

// ============================================================
// スライド 7: 管理ツール・Azure サービス連携
// ============================================================
function createSlide7() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, '管理ツールと Azure サービス連携');
  addFooter(slide, 6);

  // 左側: 管理ツール（2セクション）
  // クラウド管理ツール
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: MARGIN_TOP_BODY, w: 5.8, h: 2.4,
    fill: { color: COLOR_LIGHT_BLUE }, rectRadius: 0.12,
  });
  slide.addText('☁️  クラウド管理ツール', {
    x: 0.7, y: MARGIN_TOP_BODY + 0.1, w: 5.4, h: 0.4,
    fontSize: 14, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
  });
  slide.addText([
    { text: '• Azure Portal（単一管理画面）を使用できます\n', options: { fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '• Azure CLI / Azure PowerShell でコマンドライン管理が可能です\n', options: { fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '• ARM / Bicep / Terraform テンプレートで自動化できます', options: { fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ], {
    x: 0.7, y: MARGIN_TOP_BODY + 0.55, w: 5.4, h: 1.7,
    valign: 'top', lineSpacingMultiple: 1.3,
  });

  // オンプレミス管理ツール
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 4.0, w: 5.8, h: 2.4,
    fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.12,
  });
  slide.addText('🏢  オンプレミス管理ツール', {
    x: 0.7, y: 4.1, w: 5.4, h: 0.4,
    fontSize: 14, fontFace: FONT_FACE, color: COLOR_BLACK, bold: true,
  });
  slide.addText([
    { text: '• Windows Admin Center から管理できます\n', options: { fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '• Hyper-V Manager / Failover Cluster Manager が利用可能です\n', options: { fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '• PowerShell での操作に対応しています', options: { fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ], {
    x: 0.7, y: 4.55, w: 5.4, h: 1.7,
    valign: 'top', lineSpacingMultiple: 1.3,
  });

  // 右側: Azure サービス連携（放射状風）
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.7, y: MARGIN_TOP_BODY, w: 6.0, h: 5.2,
    fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.15,
    line: { color: COLOR_ACCENT, width: 1.5 },
  });
  slide.addText('Azure サービス連携', {
    x: 6.7, y: MARGIN_TOP_BODY + 0.1, w: 6.0, h: 0.4,
    fontSize: 14, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
    align: 'center',
  });

  // 中央の Azure Local
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 8.7, y: 3.0, w: 2.5, h: 1.2,
    fill: { color: COLOR_ACCENT },
  });
  slide.addText('Azure\nLocal', {
    x: 8.7, y: 3.0, w: 2.5, h: 1.2,
    fontSize: 14, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
    align: 'center', valign: 'middle',
  });

  // 周囲のサービス
  const services = [
    { label: 'Azure Monitor\nAzure Policy', x: 7.0, y: 1.9 },
    { label: 'Azure Backup\nSite Recovery', x: 10.2, y: 1.9 },
    { label: 'Azure Update\nManager', x: 7.0, y: 4.5 },
    { label: 'Copilot for\nAzure', x: 10.2, y: 4.5 },
  ];

  services.forEach((s) => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: s.x, y: s.y, w: 2.0, h: 0.9,
      fill: { color: COLOR_WHITE }, rectRadius: 0.1,
      line: { color: COLOR_ACCENT, width: 1 },
    });
    slide.addText(s.label, {
      x: s.x, y: s.y, w: 2.0, h: 0.9,
      fontSize: 9.5, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
      align: 'center', valign: 'middle',
    });
  });
}

// ============================================================
// スライド 8: セキュリティ
// ============================================================
function createSlide8() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'セキュリティ機能');
  addFooter(slide, 7);

  // 多層セキュリティ図
  const secLayers = [
    { label: 'クラウドサービス層: Microsoft Defender for Cloud / Azure RBAC / SIEM 連携', color: COLOR_ACCENT, y: MARGIN_TOP_BODY },
    { label: 'ワークロード層: Trusted Launch / VM 保護 / BitLocker ディスク暗号化', color: COLOR_PURPLE, y: MARGIN_TOP_BODY + 1.2 },
    { label: 'OS 層: セキュア・バイ・デフォルト (300+ 設定) / ドリフト制御', color: COLOR_GREEN, y: MARGIN_TOP_BODY + 2.4 },
    { label: 'ハードウェア層: Secure Boot / UEFI / TPM / VBS', color: '6B6B6B', y: MARGIN_TOP_BODY + 3.6 },
  ];

  secLayers.forEach((l) => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.5, y: l.y, w: 12.3, h: 1.0,
      fill: { color: l.color }, rectRadius: 0.12,
    });
    slide.addText(l.label, {
      x: 0.7, y: l.y, w: 11.9, h: 1.0,
      fontSize: 13, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
      align: 'left', valign: 'middle',
    });
  });

  // 補足テキスト
  slide.addText([
    { text: '主要なセキュリティ特徴:', options: { bold: true, fontSize: 12, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '\n• 300以上のセキュリティ設定を標準搭載し、一貫したセキュリティベースラインを提供しています', options: { fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '\n• ドリフト制御メカニズムにより設定の逸脱を防止します', options: { fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '\n• SMB 暗号化によるストレージトラフィック保護に対応しています', options: { fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ], {
    x: 0.5, y: 5.7, w: 12.3, h: 1.5,
    valign: 'top', lineSpacingMultiple: 1.2,
  });
}

// ============================================================
// スライド 9: 料金体系と Windows Server との比較
// ============================================================
function createSlide9() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, '料金体系と Windows Server との比較');
  addFooter(slide, 8);

  // 料金体系セクション
  slide.addText('料金体系', {
    x: MARGIN_LEFT, y: MARGIN_TOP_BODY, w: 5.0, h: 0.4,
    fontSize: 15, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
  });
  slide.addText([
    { text: '• 物理コアあたりの月額サブスクリプション課金モデルです\n', options: { fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '• 追加 Azure サービス利用時は従量課金が適用されます\n', options: { fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '• Azure Hybrid Benefit により既存ライセンスを活用できます\n', options: { fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '• AKS on Azure Local は Azure Local 料金に含まれています', options: { fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ], {
    x: MARGIN_LEFT, y: MARGIN_TOP_BODY + 0.4, w: 12.3, h: 1.5,
    valign: 'top', lineSpacingMultiple: 1.3,
  });

  // 比較テーブル
  slide.addText('Windows Server との主な違い', {
    x: MARGIN_LEFT, y: 3.3, w: 8.0, h: 0.4,
    fontSize: 15, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
  });

  const headerOpts = { bold: true, fontFace: FONT_FACE, fontSize: 11, color: COLOR_WHITE, fill: { color: COLOR_ACCENT }, align: 'center', valign: 'middle' };
  const cellOptA = { fontFace: FONT_FACE, fontSize: 10.5, color: COLOR_BLACK, valign: 'middle' };
  const cellOptB = { fontFace: FONT_FACE, fontSize: 10.5, color: COLOR_BLACK, fill: { color: COLOR_LIGHT_BG }, valign: 'middle' };

  const compTable = [
    [
      { text: '項目', options: headerOpts },
      { text: 'Azure Local', options: headerOpts },
      { text: 'Windows Server', options: headerOpts },
    ],
    [
      { text: 'クラウド接続', options: { ...cellOptA, bold: true } },
      { text: '必須（30日に1回以上）', options: cellOptA },
      { text: 'オプション', options: cellOptA },
    ],
    [
      { text: 'ライセンス', options: { ...cellOptB, bold: true } },
      { text: 'Pay-as-you-go / Azure Hybrid Benefit', options: cellOptB },
      { text: '従来型ライセンス', options: cellOptB },
    ],
    [
      { text: 'ハードウェア', options: { ...cellOptA, bold: true } },
      { text: '認定カタログから選択（200以上）', options: cellOptA },
      { text: 'Certified for Windows Server', options: cellOptA },
    ],
    [
      { text: 'ライフサイクル', options: { ...cellOptB, bold: true } },
      { text: '常に最新（更新適用猶予6ヶ月）', options: cellOptB },
      { text: 'LTSC（10年サポート）', options: cellOptB },
    ],
    [
      { text: 'サポート', options: { ...cellOptA, bold: true } },
      { text: 'Azure サポートに含まれます', options: cellOptA },
      { text: '別途サポート契約で対応', options: cellOptA },
    ],
  ];

  slide.addTable(compTable, {
    x: 0.5, y: 3.8, w: 12.3,
    colW: [2.5, 5.0, 4.8],
    border: { type: 'solid', color: 'CCCCCC', pt: 0.5 },
    rowH: 0.5,
  });
}

// ============================================================
// スライド 10 (実質8): まとめ・次のステップ
// ============================================================
function createSlide10() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'まとめと次のステップ');
  addFooter(slide, 9);

  // 左: Azure Local の価値
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: MARGIN_TOP_BODY, w: 6.0, h: 4.2,
    fill: { color: COLOR_LIGHT_BLUE }, rectRadius: 0.15,
  });
  slide.addText('Azure Local の価値', {
    x: 0.7, y: MARGIN_TOP_BODY + 0.1, w: 5.6, h: 0.4,
    fontSize: 16, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
  });
  slide.addText([
    { text: '✔ Azure の一貫した管理体験をオンプレミスに拡張できます\n\n', options: { fontSize: 12, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '✔ AI・ミッションクリティカル・低レイテンシ・主権要件に対応しています\n\n', options: { fontSize: 12, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '✔ セキュア・バイ・デフォルトで運用負荷を軽減します\n\n', options: { fontSize: 12, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '✔ 柔軟なハードウェア選択と課金モデルを提供しています', options: { fontSize: 12, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ], {
    x: 0.7, y: MARGIN_TOP_BODY + 0.6, w: 5.6, h: 3.4,
    valign: 'top', lineSpacingMultiple: 1.1,
  });

  // 右: 次のステップ
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.9, y: MARGIN_TOP_BODY, w: 6.0, h: 4.2,
    fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.15,
  });
  slide.addText('次のステップ', {
    x: 7.1, y: MARGIN_TOP_BODY + 0.1, w: 5.6, h: 0.4,
    fontSize: 16, fontFace: FONT_FACE, color: COLOR_BLACK, bold: true,
  });
  slide.addText([
    { text: '➊  Azure Local Catalog でハードウェアパートナーを確認してください\n\n', options: { fontSize: 12, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '➋  Azure Local サイジングツールで構成を見積もってください\n\n', options: { fontSize: 12, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '➌  60日間の無料試用版をダウンロードしてお試しいただけます\n\n', options: { fontSize: 12, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '➍  Microsoft パートナーにご相談ください', options: { fontSize: 12, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ], {
    x: 7.1, y: MARGIN_TOP_BODY + 0.6, w: 5.6, h: 3.4,
    valign: 'top', lineSpacingMultiple: 1.1,
  });

  // 参考リンク
  slide.addText('参考リンク', {
    x: MARGIN_LEFT, y: 5.8, w: 5.0, h: 0.4,
    fontSize: 14, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
  });
  slide.addText([
    { text: '• Azure Local とは: ', options: { fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'https://learn.microsoft.com/azure/azure-local/overview', options: { fontSize: 10, fontFace: FONT_FACE, color: COLOR_ACCENT, hyperlink: { url: 'https://learn.microsoft.com/azure/azure-local/overview' } } },
    { text: '\n• ハイパーコンバージド展開の概要: ', options: { fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'https://learn.microsoft.com/azure/azure-local/overview/hyperconverged-overview', options: { fontSize: 10, fontFace: FONT_FACE, color: COLOR_ACCENT, hyperlink: { url: 'https://learn.microsoft.com/azure/azure-local/overview/hyperconverged-overview' } } },
    { text: '\n• システム要件: ', options: { fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'https://learn.microsoft.com/azure/azure-local/concepts/system-requirements-23h2', options: { fontSize: 10, fontFace: FONT_FACE, color: COLOR_ACCENT, hyperlink: { url: 'https://learn.microsoft.com/azure/azure-local/concepts/system-requirements-23h2' } } },
  ], {
    x: MARGIN_LEFT, y: 6.2, w: 12.3, h: 1.0,
    valign: 'top', lineSpacingMultiple: 1.4,
  });
}

// ============================================================
// メイン処理: スライド生成 → .pptx 書き出し
// ============================================================
async function main() {
  // コンテンツスライドを生成 (スライド2〜10に相当。表紙・最終は後で差し込み)
  createSlide2();
  createSlide3();
  createSlide4();
  createSlide6();
  createSlide7();
  createSlide8();
  createSlide9();
  createSlide10();

  // 一時出力
  const outDir = path.resolve(__dirname, '..', 'docs');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const tmpPath = path.resolve(outDir, 'AzureLocal_content.pptx');
  await pptx.writeFile({ fileName: tmpPath });
  console.log(`[PptxGenJS] コンテンツスライドを出力しました: ${tmpPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
