const PptxGenJS = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

// ============================================================
// FDE × AI支援 — スライド生成スクリプト (スライド2〜6)
// ============================================================

const pptx = new PptxGenJS();

// --- グローバル設定 ---
pptx.layout = 'LAYOUT_WIDE'; // 16:9
pptx.author = 'GitHub Copilot';
pptx.subject = 'SIパートナーにおける FDE × AI支援の最新動向';

// --- 定数 ---
const FONT_FACE = 'Meiryo UI';
const COLOR_BLACK = '000000';
const COLOR_WHITE = 'FFFFFF';
const COLOR_TITLE_BG = '0078D4'; // Azure Blue
const COLOR_ACCENT = '0078D4';
const COLOR_LIGHT_BG = 'F3F2F1';
const COLOR_LIGHT_BLUE = 'DEECF9';
const COLOR_GREEN = '107C10';
const COLOR_ORANGE = 'FF8C00';
const COLOR_PURPLE = '5C2D91';
const COLOR_RED = 'D13438';
const COLOR_TEAL = '008272';
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
    fontSize: 24, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
  });
}

// --- ヘルパー: フッター ---
function addFooter(slide, pageNum, totalPages) {
  slide.addText(`${pageNum} / ${totalPages}`, {
    x: 11.5, y: 7.1, w: 1.5, h: 0.3,
    fontSize: 9, fontFace: FONT_FACE, color: '999999', align: 'right',
  });
}

// ============================================================
// スライド 2: FDE（Forward Deployed Engineer）概要
// ============================================================
function createSlide2() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'FDE（Forward Deployed Engineer）とは');
  addFooter(slide, 2, 7);

  // --- FDE 定義ボックス ---
  slide.addShape(pptx.ShapeType.roundRect, {
    x: MARGIN_LEFT, y: MARGIN_TOP_BODY, w: CONTENT_WIDTH, h: 1.3,
    fill: { color: COLOR_LIGHT_BLUE }, rectRadius: 0.1,
    line: { color: COLOR_ACCENT, width: 1.5 },
  });
  slide.addText('📋  FDE の定義', {
    x: MARGIN_LEFT + 0.2, y: MARGIN_TOP_BODY + 0.05, w: 4.0, h: 0.35,
    fontSize: 13, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
  });
  slide.addText(
    'AIやデータ分析に精通したエンジニアが顧客企業に直接常駐・伴走し、AI導入から実装・運用定着までを一貫して支援するエンジニアリングモデルです。従来の「受託開発→納品」型SIとは異なり、課題発見からソリューション実装、定着化までを共に推進します。',
    {
      x: MARGIN_LEFT + 0.3, y: MARGIN_TOP_BODY + 0.4, w: CONTENT_WIDTH - 0.6, h: 0.8,
      fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK,
      valign: 'top', lineSpacingMultiple: 1.3,
    }
  );

  // --- FDE 循環フロー図（4フェーズ） ---
  const phases = [
    { icon: '🎯', label: 'AI戦略策定', color: COLOR_ACCENT, x: 3.8, y: 2.65 },
    { icon: '🔬', label: 'PoC・開発', color: COLOR_GREEN, x: 7.2, y: 2.65 },
    { icon: '🚀', label: '本番実装', color: COLOR_ORANGE, x: 7.2, y: 3.85 },
    { icon: '🔄', label: '運用定着', color: COLOR_PURPLE, x: 3.8, y: 3.85 },
  ];
  // 中央: 顧客企業
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 5.2, y: 3.05, w: 2.2, h: 1.1,
    fill: { color: COLOR_LIGHT_BG },
    line: { color: COLOR_ACCENT, width: 2 },
  });
  slide.addText('🏢 顧客企業', {
    x: 5.2, y: 3.05, w: 2.2, h: 1.1,
    fontSize: 12, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
    align: 'center', valign: 'middle',
  });
  // FDEラベル
  slide.addText('FDE エンジニアが全フェーズに伴走', {
    x: 3.5, y: 4.95, w: 5.6, h: 0.35,
    fontSize: 10, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
    align: 'center',
  });

  phases.forEach((p) => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: p.x, y: p.y, w: 2.0, h: 0.9,
      fill: { color: COLOR_WHITE },
      rectRadius: 0.1,
      line: { color: p.color, width: 2 },
    });
    slide.addText(`${p.icon}  ${p.label}`, {
      x: p.x, y: p.y, w: 2.0, h: 0.9,
      fontSize: 11, fontFace: FONT_FACE, color: p.color, bold: true,
      align: 'center', valign: 'middle',
    });
  });

  // 矢印テキスト（循環を示す）
  slide.addText('→', { x: 5.8, y: 2.75, w: 1.0, h: 0.5, fontSize: 18, fontFace: FONT_FACE, color: '999999', align: 'center' });
  slide.addText('↓', { x: 8.4, y: 3.4, w: 0.8, h: 0.5, fontSize: 18, fontFace: FONT_FACE, color: '999999', align: 'center' });
  slide.addText('←', { x: 5.8, y: 3.95, w: 1.0, h: 0.5, fontSize: 18, fontFace: FONT_FACE, color: '999999', align: 'center' });
  slide.addText('↑', { x: 3.5, y: 3.4, w: 0.8, h: 0.5, fontSize: 18, fontFace: FONT_FACE, color: '999999', align: 'center' });

  // --- 主要プレイヤー比較表 ---
  slide.addText('📊  主要プレイヤーの構図', {
    x: MARGIN_LEFT, y: 5.35, w: 4.0, h: 0.35,
    fontSize: 13, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
  });

  const tableRows = [
    [
      { text: '企業', options: { bold: true, fontFace: FONT_FACE, fontSize: 10, color: COLOR_WHITE, fill: { color: COLOR_ACCENT }, align: 'center', valign: 'middle' } },
      { text: '自社LLM / AI基盤', options: { bold: true, fontFace: FONT_FACE, fontSize: 10, color: COLOR_WHITE, fill: { color: COLOR_ACCENT }, align: 'center', valign: 'middle' } },
      { text: 'FDE関連ブランド', options: { bold: true, fontFace: FONT_FACE, fontSize: 10, color: COLOR_WHITE, fill: { color: COLOR_ACCENT }, align: 'center', valign: 'middle' } },
    ],
    [
      { text: '日立製作所', options: { fontFace: FONT_FACE, fontSize: 10, color: COLOR_BLACK, fill: { color: COLOR_LIGHT_BG }, valign: 'middle' } },
      { text: 'Lumada / HMAX', options: { fontFace: FONT_FACE, fontSize: 10, color: COLOR_BLACK, fill: { color: COLOR_LIGHT_BG }, valign: 'middle' } },
      { text: 'GenAI Professional / AI Ambassador', options: { fontFace: FONT_FACE, fontSize: 10, color: COLOR_BLACK, fill: { color: COLOR_LIGHT_BG }, valign: 'middle' } },
    ],
    [
      { text: 'NTTデータ', options: { fontFace: FONT_FACE, fontSize: 10, color: COLOR_BLACK, fill: { color: COLOR_WHITE }, valign: 'middle' } },
      { text: 'tsuzumi（NTT開発）', options: { fontFace: FONT_FACE, fontSize: 10, color: COLOR_BLACK, fill: { color: COLOR_WHITE }, valign: 'middle' } },
      { text: 'LITRON', options: { fontFace: FONT_FACE, fontSize: 10, color: COLOR_BLACK, fill: { color: COLOR_WHITE }, valign: 'middle' } },
    ],
    [
      { text: 'NEC', options: { fontFace: FONT_FACE, fontSize: 10, color: COLOR_BLACK, fill: { color: COLOR_LIGHT_BG }, valign: 'middle' } },
      { text: 'cotomi', options: { fontFace: FONT_FACE, fontSize: 10, color: COLOR_BLACK, fill: { color: COLOR_LIGHT_BG }, valign: 'middle' } },
      { text: 'BluStellar AI', options: { fontFace: FONT_FACE, fontSize: 10, color: COLOR_BLACK, fill: { color: COLOR_LIGHT_BG }, valign: 'middle' } },
    ],
    [
      { text: 'アクセンチュア×MS', options: { fontFace: FONT_FACE, fontSize: 10, color: COLOR_BLACK, fill: { color: COLOR_WHITE }, valign: 'middle' } },
      { text: 'Microsoft AI Platform', options: { fontFace: FONT_FACE, fontSize: 10, color: COLOR_BLACK, fill: { color: COLOR_WHITE }, valign: 'middle' } },
      { text: 'FDE（共同体制）', options: { fontFace: FONT_FACE, fontSize: 10, color: COLOR_BLACK, fill: { color: COLOR_WHITE }, valign: 'middle' } },
    ],
  ];

  slide.addTable(tableRows, {
    x: MARGIN_LEFT, y: 5.75, w: CONTENT_WIDTH,
    colW: [3.0, 4.5, 4.83],
    rowH: [0.35, 0.3, 0.3, 0.3, 0.3],
    border: { type: 'solid', pt: 0.5, color: 'CCCCCC' },
    margin: [2, 5, 2, 5],
  });
}

// ============================================================
// スライド 3: 日立 - Lumada × FDE
// ============================================================
function createSlide3() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, '日立製作所 ― Lumada / HMAX による AI支援 FDE');
  addFooter(slide, 3, 7);

  // --- 体制図 ---
  // 左: Lumada / HMAX 基盤
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.3, y: MARGIN_TOP_BODY, w: 3.5, h: 2.2,
    fill: { color: COLOR_LIGHT_BLUE }, rectRadius: 0.12,
    line: { color: COLOR_ACCENT, width: 2 },
  });
  slide.addText('💡 Lumada / HMAX', {
    x: 0.4, y: MARGIN_TOP_BODY + 0.1, w: 3.3, h: 0.4,
    fontSize: 14, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
    align: 'center',
  });
  slide.addText('データ × テクノロジー ×\nOTドメインナレッジ\nで価値を協創', {
    x: 0.5, y: MARGIN_TOP_BODY + 0.6, w: 3.1, h: 1.0,
    fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK,
    align: 'center', lineSpacingMultiple: 1.3,
  });

  // 矢印
  slide.addText('⇒', {
    x: 3.8, y: MARGIN_TOP_BODY + 0.6, w: 0.8, h: 0.6,
    fontSize: 24, fontFace: FONT_FACE, color: COLOR_ACCENT, align: 'center', valign: 'middle',
  });

  // 中央: GenAI Professional / AI アンバサダー
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 4.6, y: MARGIN_TOP_BODY, w: 4.2, h: 2.2,
    fill: { color: COLOR_WHITE }, rectRadius: 0.12,
    line: { color: COLOR_GREEN, width: 2 },
  });
  slide.addText('👨‍💼 GenAI Professional', {
    x: 4.7, y: MARGIN_TOP_BODY + 0.1, w: 4.0, h: 0.35,
    fontSize: 13, fontFace: FONT_FACE, color: COLOR_GREEN, bold: true,
    align: 'center',
  });
  slide.addText('AIアンバサダー / HARC for AI', {
    x: 4.7, y: MARGIN_TOP_BODY + 0.45, w: 4.0, h: 0.3,
    fontSize: 11, fontFace: FONT_FACE, color: COLOR_GREEN,
    align: 'center',
  });
  slide.addText('伴走型の生成AI活用支援\nIT/OT両分野のエキスパート16名\nAIエージェント運用支援も展開', {
    x: 4.8, y: MARGIN_TOP_BODY + 0.85, w: 3.8, h: 1.0,
    fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK,
    align: 'center', lineSpacingMultiple: 1.3,
  });

  // 矢印（協創）
  slide.addText('⇒', {
    x: 8.8, y: MARGIN_TOP_BODY + 0.6, w: 0.8, h: 0.6,
    fontSize: 24, fontFace: FONT_FACE, color: COLOR_ACCENT, align: 'center', valign: 'middle',
  });

  // 右: 顧客企業
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 9.6, y: MARGIN_TOP_BODY, w: 3.2, h: 2.2,
    fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.12,
    line: { color: COLOR_ORANGE, width: 2 },
  });
  slide.addText('🏢 顧客企業', {
    x: 9.7, y: MARGIN_TOP_BODY + 0.1, w: 3.0, h: 0.4,
    fontSize: 14, fontFace: FONT_FACE, color: COLOR_ORANGE, bold: true,
    align: 'center',
  });
  slide.addText('AI導入 → 実装 → 定着\n1,000件以上の\nユースケース知見を活用', {
    x: 9.8, y: MARGIN_TOP_BODY + 0.65, w: 2.8, h: 1.0,
    fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK,
    align: 'center', lineSpacingMultiple: 1.3,
  });

  // 「協創」ラベル
  slide.addText('協  創', {
    x: 4.6, y: MARGIN_TOP_BODY + 2.0, w: 4.2, h: 0.35,
    fontSize: 11, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
    align: 'center',
  });

  // --- 箇条書き ---
  const bullets = [
    { text: 'Lumada は「Illuminate + Data」の造語で、日立のデジタルソリューション群の総称です。データ・テクノロジー・ドメインナレッジを掛け合わせ、顧客との協創で価値を創出します', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'HMAX は、AIとデータに日立のOT（制御・運用技術）ドメインナレッジを掛け合わせた次世代ソリューション群で、社会インフラの複雑な課題に対応します', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'GenAI Professional: 生成AI活用ナレッジを持つ専門人材が、顧客企業に伴走型で支援する「生成AI活用プロフェッショナルサービス powered by Lumada」を提供しています', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK, bold: false } },
    { text: 'AIアンバサダー / HARC for AI: IT/OT両分野のエキスパート16名が顧客との懸け橋として活動し、AIエージェントの運用支援サービスも展開しています', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '1,000件以上の生成AIユースケースの知見を顧客支援に活用しています', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'パートナーシップ: マイクロソフト、NVIDIA、Google Cloudとの戦略的アライアンスを推進しています', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ];
  slide.addText(bullets, {
    x: MARGIN_LEFT, y: 3.85, w: CONTENT_WIDTH, h: 3.3,
    valign: 'top', lineSpacingMultiple: 1.25,
  });
}

// ============================================================
// スライド 4: NTTデータ - tsuzumi × LITRON × FDE
// ============================================================
function createSlide4() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'NTTデータ ― tsuzumi × LITRON による AI支援 FDE');
  addFooter(slide, 4, 7);

  // --- 階層図: 上段 tsuzumi → 中段 Smart AI Agent → 下段 LITRON サービス ---
  // 上段: tsuzumi
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 2.0, y: MARGIN_TOP_BODY, w: 9.3, h: 1.1,
    fill: { color: COLOR_LIGHT_BLUE }, rectRadius: 0.12,
    line: { color: COLOR_ACCENT, width: 2 },
  });
  slide.addText('🧠 tsuzumi（NTT開発 日本語LLM）', {
    x: 2.1, y: MARGIN_TOP_BODY + 0.05, w: 9.1, h: 0.4,
    fontSize: 14, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
    align: 'center',
  });
  slide.addText('超軽量（0.6B）/ 軽量（7B） — GPT-3比 最大300分の1 ｜ 2024年3月〜商用提供', {
    x: 2.2, y: MARGIN_TOP_BODY + 0.5, w: 8.9, h: 0.4,
    fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK,
    align: 'center',
  });

  // 矢印
  slide.addText('▼', {
    x: 6.0, y: 2.4, w: 1.3, h: 0.35,
    fontSize: 16, fontFace: FONT_FACE, color: COLOR_ACCENT, align: 'center',
  });

  // 中段: Smart AI Agent
  const agents = [
    { label: 'パーソナル\nAgent', color: COLOR_GREEN },
    { label: '特化\nAgent', color: COLOR_ORANGE },
    { label: 'デジタルワーカー\nAgent', color: COLOR_PURPLE },
    { label: 'マルチ\nAgent', color: COLOR_TEAL },
  ];
  const agentW = 2.2;
  const agentGap = 0.2;
  const agentStartX = 2.0;
  const agentY = 2.75;
  agents.forEach((a, i) => {
    const x = agentStartX + i * (agentW + agentGap);
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: agentY, w: agentW, h: 0.9,
      fill: { color: COLOR_WHITE }, rectRadius: 0.1,
      line: { color: a.color, width: 1.5 },
    });
    slide.addText(`🤖 ${a.label}`, {
      x, y: agentY, w: agentW, h: 0.9,
      fontSize: 10, fontFace: FONT_FACE, color: a.color, bold: true,
      align: 'center', valign: 'middle',
    });
  });
  slide.addText('Smart AI Agent™ — 4つのエージェント', {
    x: 2.0, y: 3.7, w: 9.3, h: 0.3,
    fontSize: 10, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
    align: 'center',
  });

  // 矢印
  slide.addText('▼', {
    x: 6.0, y: 3.95, w: 1.3, h: 0.35,
    fontSize: 16, fontFace: FONT_FACE, color: COLOR_ACCENT, align: 'center',
  });

  // 下段: LITRON サービス群
  const services = [
    { label: 'LITRON\nSales', color: COLOR_ACCENT },
    { label: 'LITRON\nMarketing', color: COLOR_GREEN },
    { label: 'LITRON\nFinance', color: COLOR_ORANGE },
    { label: 'LITRON\nLegal', color: COLOR_PURPLE },
    { label: 'LITRON\nCORE', color: COLOR_RED },
  ];
  const svcW = 1.75;
  const svcGap = 0.15;
  const svcStartX = 2.0;
  const svcY = 4.35;
  services.forEach((s, i) => {
    const x = svcStartX + i * (svcW + svcGap);
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: svcY, w: svcW, h: 0.8,
      fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.08,
      line: { color: s.color, width: 1.5 },
    });
    slide.addText(s.label, {
      x, y: svcY, w: svcW, h: 0.8,
      fontSize: 10, fontFace: FONT_FACE, color: s.color, bold: true,
      align: 'center', valign: 'middle',
    });
  });

  // --- 箇条書き ---
  const bullets = [
    { text: 'tsuzumi は NTTが独自開発した日本語LLMで、超軽量（0.6B）と軽量（7B）の2種類を提供し、GPT-3（175B）の最大300分の1のサイズで高い日本語処理性能とコスト効率を両立しています', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '40年以上のNTT研究所の自然言語処理研究の蓄積を活かし、業界特化アダプタによる少ない追加学習でのカスタマイズも可能です', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'LITRON はNTTデータの先端AI技術を活用したサービス・製品の総称ブランドで、4つの「Smart AI Agent™」を活用した業務変革を実現します', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'LITRON Sales / Marketing / Finance / Legal / CORE により、業種・部門横断の効率化・自動化を支援しています', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'コンサルティングから開発・運用支援、人材提供までワンストップで顧客をサポートしています', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ];
  slide.addText(bullets, {
    x: MARGIN_LEFT, y: 5.35, w: CONTENT_WIDTH, h: 2.0,
    valign: 'top', lineSpacingMultiple: 1.2,
  });
}

// ============================================================
// スライド 5: NEC - cotomi × BluStellar × FDE
// ============================================================
function createSlide5() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'NEC ― cotomi × BluStellar AI による AI支援 FDE');
  addFooter(slide, 5, 7);

  // --- ハブ＆スポーク型図 ---
  // 中央: cotomi
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 4.8, y: 1.55, w: 3.7, h: 1.7,
    fill: { color: COLOR_LIGHT_BLUE },
    line: { color: COLOR_ACCENT, width: 2 },
  });
  slide.addText('🧠 cotomi\n（NEC開発 LLM）', {
    x: 4.8, y: 1.65, w: 3.7, h: 1.5,
    fontSize: 14, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
    align: 'center', valign: 'middle',
  });

  // スポーク
  const spokes = [
    { icon: '💬', label: 'AIコンサル', desc: '調査・企画～\n実装・運用支援', color: COLOR_GREEN, x: 0.5, y: 1.4 },
    { icon: '🤖', label: 'AIエージェント', desc: '業務自動化と\nプロセス最適化', color: COLOR_ORANGE, x: 9.5, y: 1.4 },
    { icon: '📦', label: 'AIプロダクト', desc: 'BluStellar AI\nサービス群', color: COLOR_PURPLE, x: 0.5, y: 3.55 },
    { icon: '🎓', label: '人材育成', desc: 'BluStellar Academy\nfor AI/DX', color: COLOR_TEAL, x: 9.5, y: 3.55 },
  ];

  spokes.forEach((s) => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: s.x, y: s.y, w: 3.2, h: 1.5,
      fill: { color: COLOR_WHITE }, rectRadius: 0.1,
      line: { color: s.color, width: 1.5 },
    });
    slide.addText(`${s.icon}  ${s.label}`, {
      x: s.x + 0.1, y: s.y + 0.1, w: 3.0, h: 0.4,
      fontSize: 12, fontFace: FONT_FACE, color: s.color, bold: true,
      align: 'center',
    });
    slide.addText(s.desc, {
      x: s.x + 0.1, y: s.y + 0.55, w: 3.0, h: 0.8,
      fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK,
      align: 'center', valign: 'top',
    });
  });

  // 接続線（テキスト矢印で表現）
  slide.addText('⟶', { x: 3.7, y: 1.85, w: 1.1, h: 0.4, fontSize: 18, fontFace: FONT_FACE, color: '999999', align: 'center' });
  slide.addText('⟵', { x: 8.5, y: 1.85, w: 1.1, h: 0.4, fontSize: 18, fontFace: FONT_FACE, color: '999999', align: 'center' });
  slide.addText('⟶', { x: 3.7, y: 4.0, w: 1.1, h: 0.4, fontSize: 18, fontFace: FONT_FACE, color: '999999', align: 'center' });
  slide.addText('⟵', { x: 8.5, y: 4.0, w: 1.1, h: 0.4, fontSize: 18, fontFace: FONT_FACE, color: '999999', align: 'center' });

  // --- 箇条書き ---
  const bullets = [
    { text: 'cotomi はNECが独自開発したLLMで、高い日本語能力と軽量さを両立し、クラウド・オンプレミスのハイブリッド提供が可能です', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '2026年3月、「ガバメントAIで試用する国内LLM」にも選定されています', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'BluStellar AI は業種横断の知見と最先端テクノロジーにより、ビジネスモデルの変革を支援するDXブランドです。Newsweek AI Impact Awards で5部門受賞の実績があります', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'AIスペシャリスト人材が調査・企画から実装・運用までトータルに支援します', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'BluStellar Academy for AI/DX を通じて顧客企業の自走力を強化し、製造・金融・公共など幅広い業種で導入実績があります', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'AIエージェントによる業務自動化・プロセス最適化も推進しています', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ];
  slide.addText(bullets, {
    x: MARGIN_LEFT, y: 5.3, w: CONTENT_WIDTH, h: 2.0,
    valign: 'top', lineSpacingMultiple: 1.2,
  });
}

// ============================================================
// スライド 6: アクセンチュア × マイクロソフト FDE
// ============================================================
function createSlide6() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'アクセンチュア × マイクロソフト ― FDE 共同体制の始動');
  addFooter(slide, 6, 7);

  // --- 左側: スクリーンショット画像（約40%幅）---
  const imgPath = path.resolve(__dirname, '..', 'docs', 'accenture_ms_fde_screenshot.png');
  if (fs.existsSync(imgPath)) {
    slide.addImage({
      path: imgPath,
      x: 0.3, y: MARGIN_TOP_BODY, w: 5.0, h: 3.5,
      rounding: true,
    });
  } else {
    // 画像がない場合のプレースホルダー
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.3, y: MARGIN_TOP_BODY, w: 5.0, h: 3.5,
      fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.1,
      line: { color: 'CCCCCC', width: 1 },
    });
    slide.addText('📷 スクリーンショット\n（画像未取得）', {
      x: 0.3, y: MARGIN_TOP_BODY, w: 5.0, h: 3.5,
      fontSize: 14, fontFace: FONT_FACE, color: '999999',
      align: 'center', valign: 'middle',
    });
  }

  // キャプション
  slide.addText('出典: コンサルポータル（2026年3月24日更新）', {
    x: 0.3, y: 4.9, w: 5.0, h: 0.3,
    fontSize: 8, fontFace: FONT_FACE, color: '999999',
    align: 'center',
  });

  // --- 右側: 要約テキスト（約60%幅）---
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 5.6, y: MARGIN_TOP_BODY, w: 7.2, h: 0.4,
    fill: { color: COLOR_ACCENT }, rectRadius: 0.08,
  });
  slide.addText('📢  発表概要（2026年3月18日発表）', {
    x: 5.7, y: MARGIN_TOP_BODY, w: 7.0, h: 0.4,
    fontSize: 12, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
    valign: 'middle',
  });

  const rightBullets = [
    { text: 'アクセンチュアとマイクロソフトは、企業のAI導入を支援する新体制「Forward Deployed Engineering（FDE）」を共同で立ち上げました', options: { bullet: true, fontSize: 10.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'AIの構想段階にとどまらず、実際のビジネス現場での運用・定着化を加速させることを目的としています', options: { bullet: true, fontSize: 10.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'AIに精通した数千人規模のエンジニアが、マイクロソフトの最先端AIプラットフォームとアクセンチュアの深い業界知見・業務設計力を融合し、伴走型の支援を提供します', options: { bullet: true, fontSize: 10.5, fontFace: FONT_FACE, color: COLOR_BLACK, bold: false } },
    { text: '「全社展開への壁」や「実装面の技術的課題」に対し、本番運用までのリードタイムを大幅に短縮します', options: { bullet: true, fontSize: 10.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'AIが「実験段階」から「実務への完全統合段階」へ移行したことを象徴する取り組みであり、実装スキルや業務変革能力の需要がさらに高まることを示しています', options: { bullet: true, fontSize: 10.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ];
  slide.addText(rightBullets, {
    x: 5.6, y: MARGIN_TOP_BODY + 0.5, w: 7.2, h: 4.3,
    valign: 'top', lineSpacingMultiple: 1.3,
  });

  // --- 参考リンク ---
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.3, y: 5.4, w: CONTENT_WIDTH + 0.2, h: 1.85,
    fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.1,
  });
  slide.addText('📎  参考リンク', {
    x: 0.5, y: 5.45, w: 4.0, h: 0.35,
    fontSize: 12, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
  });

  const links = [
    ['#1', 'アクセンチュアとMS、AI実装支援の新体制「FDE」を始動', 'consulportal.com/news/consulting-67/'],
    ['#2', 'Lumada トップページ（日立製作所）', 'hitachi.co.jp/products/it/lumada/'],
    ['#4', '日立 GenAIアンバサダー任命', 'digital-highlights.hitachi.co.jp/_ct/17744295'],
    ['#7', 'LITRON® トップページ（NTTデータ）', 'nttdata.com/jp/ja/lineup/litron/'],
    ['#8', 'NTT tsuzumi 記者会見速報', 'group.ntt/jp/magazine/blog/tsuzumi/'],
    ['#10', 'BluStellar AI トップページ（NEC）', 'jpn.nec.com/ai/'],
    ['#11', 'NEC cotomi LLM', 'jpn.nec.com/LLM/'],
    ['#13', 'NEC ガバメントAI LLM選定', 'jpn.nec.com/press/202603/'],
  ];

  const linkTableRows = [];
  for (let i = 0; i < links.length; i += 2) {
    const row = [];
    for (let j = 0; j < 2; j++) {
      const lnk = links[i + j];
      if (lnk) {
        row.push({ text: `${lnk[0]} ${lnk[1]}`, options: { fontFace: FONT_FACE, fontSize: 7.5, color: COLOR_ACCENT } });
      } else {
        row.push({ text: '', options: { fontFace: FONT_FACE, fontSize: 7.5 } });
      }
    }
    linkTableRows.push(row);
  }

  slide.addTable(linkTableRows, {
    x: 0.5, y: 5.85, w: CONTENT_WIDTH,
    colW: [6.16, 6.17],
    rowH: [0.28, 0.28, 0.28, 0.28],
    border: { type: 'none' },
    margin: [1, 3, 1, 3],
  });
}

// ============================================================
// メイン実行
// ============================================================
createSlide2();
createSlide3();
createSlide4();
createSlide5();
createSlide6();

const outputDir = path.resolve(__dirname, '..', 'docs');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
const outputPath = path.join(outputDir, 'FDE_AI支援_content.pptx');

pptx.writeFile({ fileName: outputPath })
  .then(() => {
    console.log(`[PptxGenJS] コンテンツスライドを生成しました: ${outputPath}`);
    console.log(`  スライド数: 5 (スライド2〜6)`);
  })
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
