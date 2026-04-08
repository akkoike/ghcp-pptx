const PptxGenJS = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

// ============================================================
// Azure Arc 詳細仕様 — スライド生成スクリプト
// ============================================================

const pptx = new PptxGenJS();

// --- グローバル設定 ---
pptx.layout = 'LAYOUT_WIDE'; // 16:9
pptx.author = 'GitHub Copilot';
pptx.subject = 'Azure Arc 詳細仕様';

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
const COLOR_TEAL = '008272';
const COLOR_YELLOW_BG = 'FFF4CE';
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
  slide.addText(`${pageNum} / 9`, {
    x: 11.5, y: 7.1, w: 1.5, h: 0.3,
    fontSize: 9, fontFace: FONT_FACE, color: '999999', align: 'right',
  });
}

// ============================================================
// スライド 2: Azure Arc とは
// ============================================================
function createSlide2() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'Azure Arc とは');
  addFooter(slide, 1);

  // --- 統一コントロールプレーン概念図 ---
  // 上部中央: Azure Arc コントロールプレーン
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 3.0, y: MARGIN_TOP_BODY, w: 7.3, h: 1.2,
    fill: { color: COLOR_LIGHT_BLUE }, rectRadius: 0.15,
    line: { color: COLOR_ACCENT, width: 2 },
  });
  slide.addText('☁️  Azure Arc — 統一コントロールプレーン', {
    x: 3.2, y: MARGIN_TOP_BODY + 0.1, w: 6.9, h: 0.4,
    fontSize: 16, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
    align: 'center',
  });
  slide.addText('Azure Resource Manager に投影 → 環境全体を一元管理', {
    x: 3.2, y: MARGIN_TOP_BODY + 0.55, w: 6.9, h: 0.4,
    fontSize: 12, fontFace: FONT_FACE, color: COLOR_BLACK,
    align: 'center',
  });

  // 矢印
  slide.addText('⬇', {
    x: 6.0, y: 2.55, w: 1.3, h: 0.5,
    fontSize: 22, fontFace: FONT_FACE, color: COLOR_ACCENT, align: 'center',
  });

  // 下部: 管理対象環境 4ブロック
  const envs = [
    { icon: '☁️', label: 'Azure\nクラウド', color: COLOR_ACCENT },
    { icon: '🏢', label: 'オンプレミス', color: COLOR_GREEN },
    { icon: '🌐', label: 'マルチクラウド\n(AWS / GCP)', color: COLOR_ORANGE },
    { icon: '📡', label: 'エッジ', color: COLOR_PURPLE },
  ];
  const envW = 2.6;
  const envH = 1.1;
  const envStartX = 0.8;
  const envGap = 0.5;
  const envY = 3.2;

  envs.forEach((e, i) => {
    const x = envStartX + i * (envW + envGap);
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: envY, w: envW, h: envH,
      fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.12,
      line: { color: e.color, width: 1.5 },
    });
    slide.addText(`${e.icon}  ${e.label}`, {
      x, y: envY, w: envW, h: envH,
      fontSize: 11, fontFace: FONT_FACE, color: e.color, bold: true,
      align: 'center', valign: 'middle',
    });
  });

  // 箇条書き
  const bullets = [
    { text: 'Azure Arc は、オンプレミス、マルチクラウド、エッジにまたがる分散環境を簡素化し、一貫した管理プラットフォームを提供します', options: { bullet: true, fontSize: 11.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '非 Azure リソースを Azure Resource Manager に投影（プロジェクション）し、環境全体を一元管理できます', options: { bullet: true, fontSize: 11.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '仮想マシン、Kubernetes クラスター、データベースを Azure 上で実行されているかのように管理できます', options: { bullet: true, fontSize: 11.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '従来の ITOps を継続しながら、DevOps プラクティスを導入してクラウドネイティブパターンをサポートできます', options: { bullet: true, fontSize: 11.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'Azure の「アダプティブクラウド」アプローチの中核を担うサービスです', options: { bullet: true, fontSize: 11.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ];
  slide.addText(bullets, {
    x: MARGIN_LEFT, y: 4.6, w: CONTENT_WIDTH, h: 2.6,
    valign: 'top', lineSpacingMultiple: 1.3,
  });
}

// ============================================================
// スライド 3: Azure Arc 対応リソースの種類
// ============================================================
function createSlide3() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'Azure Arc 対応リソースの種類');
  addFooter(slide, 2);

  // 中央: Azure Arc ハブ
  const hubX = 5.15;
  const hubY = 3.5;
  const hubW = 3.0;
  const hubH = 1.1;
  slide.addShape(pptx.ShapeType.roundRect, {
    x: hubX, y: hubY, w: hubW, h: hubH,
    fill: { color: COLOR_ACCENT }, rectRadius: 0.15,
  });
  slide.addText('Azure Arc', {
    x: hubX, y: hubY, w: hubW, h: hubH,
    fontSize: 20, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
    align: 'center', valign: 'middle',
  });

  // 放射状の対応リソース（上段4つ、下段3つ）
  const resources = [
    { icon: '🖥️', label: '対応サーバー', desc: 'Windows / Linux\n物理 / 仮想', color: COLOR_ACCENT, x: 0.4, y: MARGIN_TOP_BODY + 0.1 },
    { icon: '☸️', label: '対応 Kubernetes', desc: 'CNCF 準拠\nK8s クラスター', color: COLOR_GREEN, x: 3.45, y: MARGIN_TOP_BODY + 0.1 },
    { icon: '🗄️', label: '対応データサービス', desc: 'SQL MI on K8s', color: COLOR_ORANGE, x: 6.5, y: MARGIN_TOP_BODY + 0.1 },
    { icon: '💾', label: 'SQL Server enabled by Arc', desc: 'Azure 外 SQL Server', color: COLOR_PURPLE, x: 9.55, y: MARGIN_TOP_BODY + 0.1 },
    { icon: '🔄', label: '対応 VMware vSphere', desc: 'VMware vCenter VM', color: COLOR_TEAL, x: 0.4, y: 5.3 },
    { icon: '🖧', label: '対応 SCVMM', desc: 'System Center VM', color: COLOR_RED, x: 3.45, y: 5.3 },
    { icon: '🏗️', label: 'Azure Local', desc: '旧 Azure Stack HCI', color: COLOR_DARK_BLUE, x: 6.5, y: 5.3 },
  ];

  const rW = 3.0;
  const rH = 1.5;

  resources.forEach((r) => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: r.x, y: r.y, w: rW, h: rH,
      fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.12,
      line: { color: r.color, width: 1.5 },
    });
    slide.addText(`${r.icon}  ${r.label}`, {
      x: r.x + 0.15, y: r.y + 0.1, w: rW - 0.3, h: 0.5,
      fontSize: 12, fontFace: FONT_FACE, color: r.color, bold: true,
      align: 'center',
    });
    slide.addText(r.desc, {
      x: r.x + 0.15, y: r.y + 0.65, w: rW - 0.3, h: 0.7,
      fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK,
      align: 'center', valign: 'top',
    });
  });
}

// ============================================================
// スライド 4: Azure Arc 対応サーバー
// ============================================================
function createSlide4() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'Azure Arc 対応サーバー（Connected Machine Agent）');
  addFooter(slide, 3);

  // --- アーキテクチャ図 ---
  // 左: オンプレミスサーバー
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: MARGIN_TOP_BODY, w: 3.5, h: 2.0,
    fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.12,
    line: { color: COLOR_GREEN, width: 2 },
  });
  slide.addText('🏢 オンプレミス / マルチクラウド', {
    x: 0.6, y: MARGIN_TOP_BODY + 0.05, w: 3.3, h: 0.4,
    fontSize: 11, fontFace: FONT_FACE, color: COLOR_GREEN, bold: true,
    align: 'center',
  });
  slide.addText('🖥️ Windows / Linux サーバー\n（物理 / 仮想マシン）', {
    x: 0.6, y: MARGIN_TOP_BODY + 0.55, w: 3.3, h: 0.6,
    fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK, align: 'center',
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.9, y: MARGIN_TOP_BODY + 1.3, w: 2.7, h: 0.5,
    fill: { color: COLOR_ACCENT }, rectRadius: 0.08,
  });
  slide.addText('Connected Machine Agent', {
    x: 0.9, y: MARGIN_TOP_BODY + 1.3, w: 2.7, h: 0.5,
    fontSize: 10, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
    align: 'center', valign: 'middle',
  });

  // 矢印
  slide.addText('→', {
    x: 4.0, y: MARGIN_TOP_BODY + 0.6, w: 0.8, h: 0.7,
    fontSize: 28, fontFace: FONT_FACE, color: COLOR_ACCENT, align: 'center', valign: 'middle',
  });

  // 中央: Azure Resource Manager
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 4.8, y: MARGIN_TOP_BODY, w: 3.8, h: 2.0,
    fill: { color: COLOR_LIGHT_BLUE }, rectRadius: 0.12,
    line: { color: COLOR_ACCENT, width: 2 },
  });
  slide.addText('☁️ Azure Resource Manager', {
    x: 4.9, y: MARGIN_TOP_BODY + 0.1, w: 3.6, h: 0.4,
    fontSize: 12, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
    align: 'center',
  });
  slide.addText('・リソースとして登録\n・システムマネージド ID 自動割当\n・Azure サービスへの認証', {
    x: 4.9, y: MARGIN_TOP_BODY + 0.6, w: 3.6, h: 1.2,
    fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK, align: 'center',
  });

  // 矢印
  slide.addText('→', {
    x: 8.6, y: MARGIN_TOP_BODY + 0.6, w: 0.8, h: 0.7,
    fontSize: 28, fontFace: FONT_FACE, color: COLOR_ACCENT, align: 'center', valign: 'middle',
  });

  // 右: 管理ツール
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 9.4, y: MARGIN_TOP_BODY, w: 3.4, h: 2.0,
    fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.12,
    line: { color: COLOR_PURPLE, width: 2 },
  });
  slide.addText('🔧 Azure 管理ツール', {
    x: 9.5, y: MARGIN_TOP_BODY + 0.1, w: 3.2, h: 0.4,
    fontSize: 12, fontFace: FONT_FACE, color: COLOR_PURPLE, bold: true,
    align: 'center',
  });
  slide.addText('・Azure Portal\n・Azure CLI / PowerShell\n・Azure Policy / Monitor', {
    x: 9.5, y: MARGIN_TOP_BODY + 0.6, w: 3.2, h: 1.2,
    fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK, align: 'center',
  });

  // --- 対応 OS ---
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 3.6, w: 6.0, h: 2.8,
    fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.12,
    line: { color: COLOR_ACCENT, width: 1.5 },
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.6, y: 3.65, w: 5.8, h: 0.45,
    fill: { color: COLOR_ACCENT }, rectRadius: 0.08,
  });
  slide.addText('対応 OS（主要なもの）', {
    x: 0.6, y: 3.65, w: 5.8, h: 0.45,
    fontSize: 12, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
    align: 'center', valign: 'middle',
  });

  const osItems = [
    { text: 'Windows Server 2012 / 2012 R2 / 2016 / 2019 / 2022 / 2025', options: { bullet: true, fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'Ubuntu 18.04 / 20.04 / 22.04 / 24.04', options: { bullet: true, fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'RHEL 7 / 8 / 9 / 10、SLES 12 SP5 / 15 SP4 以降', options: { bullet: true, fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'Amazon Linux 2 / 2023、Debian 11 / 12 / 13 ほか', options: { bullet: true, fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ];
  slide.addText(osItems, {
    x: 0.8, y: 4.25, w: 5.5, h: 2.0,
    valign: 'top', lineSpacingMultiple: 1.35,
  });

  // --- 接続方法 ---
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.8, y: 3.6, w: 6.0, h: 2.8,
    fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.12,
    line: { color: COLOR_GREEN, width: 1.5 },
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.9, y: 3.65, w: 5.8, h: 0.45,
    fill: { color: COLOR_GREEN }, rectRadius: 0.08,
  });
  slide.addText('接続方法', {
    x: 6.9, y: 3.65, w: 5.8, h: 0.45,
    fontSize: 12, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
    align: 'center', valign: 'middle',
  });

  const connItems = [
    { text: '対話型: Azure Portal からのスクリプト実行、Windows Admin Center 等を利用します', options: { bullet: true, fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '大規模展開: サービスプリンシパル、Azure Policy、Configuration Manager 等を利用した自動オンボーディングに対応しています', options: { bullet: true, fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ];
  slide.addText(connItems, {
    x: 7.0, y: 4.25, w: 5.5, h: 2.0,
    valign: 'top', lineSpacingMultiple: 1.35,
  });
}

// ============================================================
// スライド 5: Azure Arc 対応 Kubernetes
// ============================================================
function createSlide5() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'Azure Arc 対応 Kubernetes');
  addFooter(slide, 4);

  // --- アーキテクチャ図 ---
  // 左: K8s クラスター
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: MARGIN_TOP_BODY, w: 3.3, h: 1.6,
    fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.12,
    line: { color: COLOR_GREEN, width: 2 },
  });
  slide.addText('☸️ Kubernetes クラスター', {
    x: 0.6, y: MARGIN_TOP_BODY + 0.05, w: 3.1, h: 0.4,
    fontSize: 11, fontFace: FONT_FACE, color: COLOR_GREEN, bold: true,
    align: 'center',
  });
  slide.addText('オンプレミス / マルチクラウド\n（CNCF 準拠）', {
    x: 0.6, y: MARGIN_TOP_BODY + 0.55, w: 3.1, h: 0.8,
    fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK, align: 'center',
  });

  // 矢印
  slide.addText('→', {
    x: 3.8, y: MARGIN_TOP_BODY + 0.4, w: 0.7, h: 0.6,
    fontSize: 28, fontFace: FONT_FACE, color: COLOR_ACCENT, align: 'center', valign: 'middle',
  });

  // 中央: Azure Arc
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 4.5, y: MARGIN_TOP_BODY, w: 4.3, h: 1.6,
    fill: { color: COLOR_LIGHT_BLUE }, rectRadius: 0.12,
    line: { color: COLOR_ACCENT, width: 2 },
  });
  slide.addText('☁️ Azure Arc', {
    x: 4.6, y: MARGIN_TOP_BODY + 0.05, w: 4.1, h: 0.4,
    fontSize: 12, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
    align: 'center',
  });
  slide.addText('ARM リソースとして管理\nPortal / CLI / REST API で一元管理\nCluster Connect で安全アクセス', {
    x: 4.6, y: MARGIN_TOP_BODY + 0.5, w: 4.1, h: 0.9,
    fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK, align: 'center',
  });

  // 矢印
  slide.addText('→', {
    x: 8.8, y: MARGIN_TOP_BODY + 0.4, w: 0.7, h: 0.6,
    fontSize: 28, fontFace: FONT_FACE, color: COLOR_ACCENT, align: 'center', valign: 'middle',
  });

  // 右: Azure サービス
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 9.5, y: MARGIN_TOP_BODY, w: 3.3, h: 1.6,
    fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.12,
    line: { color: COLOR_PURPLE, width: 2 },
  });
  slide.addText('🔧 Azure サービス', {
    x: 9.6, y: MARGIN_TOP_BODY + 0.05, w: 3.1, h: 0.4,
    fontSize: 11, fontFace: FONT_FACE, color: COLOR_PURPLE, bold: true,
    align: 'center',
  });
  slide.addText('Azure Monitor\nDefender for Containers\nAzure Policy', {
    x: 9.6, y: MARGIN_TOP_BODY + 0.55, w: 3.1, h: 0.8,
    fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK, align: 'center',
  });

  // --- GitOps ---
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 3.2, w: 6.0, h: 3.6,
    fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.12,
    line: { color: COLOR_ACCENT, width: 1.5 },
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.6, y: 3.25, w: 5.8, h: 0.45,
    fill: { color: COLOR_ACCENT }, rectRadius: 0.08,
  });
  slide.addText('📦 GitOps によるアプリケーション展開', {
    x: 0.6, y: 3.25, w: 5.8, h: 0.45,
    fontSize: 12, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
    align: 'center', valign: 'middle',
  });

  const gitopsItems = [
    { text: 'Flux v2: Git リポジトリ、Helm リポジトリ、S3 バケット、Azure Blob Storage からの構成を自動デプロイします', options: { bullet: true, fontSize: 10.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'Argo CD（プレビュー）: プルベースのアーキテクチャで、ドリフト検出・自動修復機能を提供します', options: { bullet: true, fontSize: 10.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'Azure Policy と連携して、複数クラスターへの構成を一貫して適用できます', options: { bullet: true, fontSize: 10.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ];
  slide.addText(gitopsItems, {
    x: 0.7, y: 3.85, w: 5.5, h: 2.8,
    valign: 'top', lineSpacingMultiple: 1.35,
  });

  // --- クラスター拡張機能 ---
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.8, y: 3.2, w: 6.0, h: 3.6,
    fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.12,
    line: { color: COLOR_GREEN, width: 1.5 },
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.9, y: 3.25, w: 5.8, h: 0.45,
    fill: { color: COLOR_GREEN }, rectRadius: 0.08,
  });
  slide.addText('🔌 クラスター拡張機能', {
    x: 6.9, y: 3.25, w: 5.8, h: 0.45,
    fontSize: 12, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
    align: 'center', valign: 'middle',
  });

  const extItems = [
    { text: 'Azure Monitor、Defender for Containers、Azure Policy 等を拡張機能としてデプロイできます', options: { bullet: true, fontSize: 10.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'カスタムロケーションを作成し、Azure サービスインスタンスのデプロイ先として指定できます', options: { bullet: true, fontSize: 10.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ];
  slide.addText(extItems, {
    x: 7.0, y: 3.85, w: 5.5, h: 2.8,
    valign: 'top', lineSpacingMultiple: 1.35,
  });
}

// ============================================================
// スライド 6: Azure Arc 対応データサービス
// ============================================================
function createSlide6() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'Azure Arc 対応データサービス');
  addFooter(slide, 5);

  // 概要テキスト
  const overviewItems = [
    { text: 'SQL Managed Instance enabled by Azure Arc は、最新の SQL Server エンジンとほぼ 100% の互換性を持ちます', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'オンプレミス、エッジ、パブリッククラウド上の Kubernetes で実行されます', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'データ主権を維持しながら、既存の SQL Server アプリケーションを最小限の変更でリフト＆シフトできます', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ];
  slide.addText(overviewItems, {
    x: MARGIN_LEFT, y: MARGIN_TOP_BODY, w: CONTENT_WIDTH, h: 1.5,
    valign: 'top', lineSpacingMultiple: 1.3,
  });

  // サービスティア比較表
  const tableRows = [
    [
      { text: '項目', options: { bold: true, fontSize: 10, fontFace: FONT_FACE, color: COLOR_WHITE, fill: { color: COLOR_ACCENT }, align: 'center', valign: 'middle' } },
      { text: 'General Purpose', options: { bold: true, fontSize: 10, fontFace: FONT_FACE, color: COLOR_WHITE, fill: { color: COLOR_ACCENT }, align: 'center', valign: 'middle' } },
      { text: 'Business Critical', options: { bold: true, fontSize: 10, fontFace: FONT_FACE, color: COLOR_WHITE, fill: { color: COLOR_ACCENT }, align: 'center', valign: 'middle' } },
    ],
    [
      { text: 'SQL 機能', options: { fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK, fill: { color: COLOR_LIGHT_BG } } },
      { text: 'Standard Edition 相当', options: { fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK, fill: { color: COLOR_LIGHT_BG } } },
      { text: 'Enterprise Edition 相当', options: { fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK, fill: { color: COLOR_LIGHT_BG } } },
    ],
    [
      { text: 'CPU 制限', options: { fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK } },
      { text: '24 コア', options: { fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK } },
      { text: '無制限', options: { fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK, bold: true } },
    ],
    [
      { text: 'メモリ制限', options: { fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK, fill: { color: COLOR_LIGHT_BG } } },
      { text: '128 GB', options: { fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK, fill: { color: COLOR_LIGHT_BG } } },
      { text: '無制限', options: { fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK, bold: true, fill: { color: COLOR_LIGHT_BG } } },
    ],
    [
      { text: '高可用性', options: { fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK } },
      { text: 'K8s 再デプロイ ＋ 共有ストレージ', options: { fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK } },
      { text: '包含可用性グループ', options: { fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK, bold: true } },
    ],
    [
      { text: '読み取りスケールアウト', options: { fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK, fill: { color: COLOR_LIGHT_BG } } },
      { text: 'なし', options: { fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK, fill: { color: COLOR_LIGHT_BG } } },
      { text: '可用性グループ', options: { fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK, bold: true, fill: { color: COLOR_LIGHT_BG } } },
    ],
    [
      { text: 'ディザスター リカバリー', options: { fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK } },
      { text: 'フェールオーバーグループ', options: { fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK } },
      { text: 'フェールオーバーグループ', options: { fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK } },
    ],
  ];

  slide.addTable(tableRows, {
    x: 1.0, y: 3.0, w: 11.3,
    border: { type: 'solid', pt: 0.5, color: 'CCCCCC' },
    colW: [3.3, 4.0, 4.0],
    rowH: 0.45,
    margin: [3, 5, 3, 5],
  });

  // PostgreSQL 廃止注意
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 1.0, y: 6.3, w: 11.3, h: 0.7,
    fill: { color: COLOR_YELLOW_BG }, rectRadius: 0.1,
    line: { color: COLOR_ORANGE, width: 1 },
  });
  slide.addText('⚠️  Azure Arc 対応 PostgreSQL サーバーは 2025 年 7 月に廃止されました。代替として Azure Database for PostgreSQL - Flexible Server の利用が推奨されています。', {
    x: 1.2, y: 6.3, w: 10.9, h: 0.7,
    fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK, valign: 'middle',
  });
}

// ============================================================
// スライド 7: Azure サービスとの連携
// ============================================================
function createSlide7() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'Azure サービスとの連携');
  addFooter(slide, 6);

  // ハブ: Azure Arc
  const hubX = 4.9;
  const hubY = 3.5;
  const hubW = 3.5;
  const hubH = 1.2;
  slide.addShape(pptx.ShapeType.roundRect, {
    x: hubX, y: hubY, w: hubW, h: hubH,
    fill: { color: COLOR_ACCENT }, rectRadius: 0.15,
  });
  slide.addText('Azure Arc', {
    x: hubX, y: hubY, w: hubW, h: hubH,
    fontSize: 18, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
    align: 'center', valign: 'middle',
  });

  // スポーク: Azure サービス
  const spokes = [
    { icon: '📋', label: 'Azure Policy', desc: 'ガバナンスとコンプライアンスの\n統一管理を行います', color: COLOR_ACCENT, x: 0.5, y: MARGIN_TOP_BODY },
    { icon: '📊', label: 'Azure Monitor', desc: 'ログ・メトリクス・トレースを\n統合的に収集します', color: COLOR_GREEN, x: 4.7, y: MARGIN_TOP_BODY },
    { icon: '🛡️', label: 'Defender for Cloud', desc: '脆弱性評価・脅威保護\nセキュリティ推奨事項を提供します', color: COLOR_RED, x: 8.9, y: MARGIN_TOP_BODY },
    { icon: '⚙️', label: 'Azure Automation', desc: 'Update Management / DSC\n変更追跡を適用します', color: COLOR_ORANGE, x: 0.5, y: 5.3 },
    { icon: '🔌', label: 'VM 拡張機能', desc: 'Custom Script Extension\nAzure Monitor Agent 等', color: COLOR_PURPLE, x: 8.9, y: 5.3 },
  ];

  const spW = 3.8;
  const spH = 1.5;

  spokes.forEach((s) => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: s.x, y: s.y, w: spW, h: spH,
      fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.12,
      line: { color: s.color, width: 1.5 },
    });
    slide.addText(`${s.icon}  ${s.label}`, {
      x: s.x + 0.1, y: s.y + 0.08, w: spW - 0.2, h: 0.45,
      fontSize: 12, fontFace: FONT_FACE, color: s.color, bold: true,
      align: 'center', valign: 'middle',
    });
    slide.addText(s.desc, {
      x: s.x + 0.1, y: s.y + 0.6, w: spW - 0.2, h: 0.8,
      fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK, align: 'center',
    });
  });

  // 接続線（テキスト矢印）
  slide.addText('↕', { x: 2.0, y: 2.55, w: 0.5, h: 0.8, fontSize: 18, fontFace: FONT_FACE, color: COLOR_ACCENT, align: 'center' });
  slide.addText('↕', { x: 6.3, y: 2.55, w: 0.5, h: 0.8, fontSize: 18, fontFace: FONT_FACE, color: COLOR_GREEN, align: 'center' });
  slide.addText('↕', { x: 10.5, y: 2.55, w: 0.5, h: 0.8, fontSize: 18, fontFace: FONT_FACE, color: COLOR_RED, align: 'center' });
  slide.addText('↕', { x: 2.0, y: 4.65, w: 0.5, h: 0.8, fontSize: 18, fontFace: FONT_FACE, color: COLOR_ORANGE, align: 'center' });
  slide.addText('↕', { x: 10.5, y: 4.65, w: 0.5, h: 0.8, fontSize: 18, fontFace: FONT_FACE, color: COLOR_PURPLE, align: 'center' });
}

// ============================================================
// スライド 8: セキュリティとガバナンス
// ============================================================
function createSlide8() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'セキュリティとガバナンス');
  addFooter(slide, 7);

  // 4層構成図
  const layers = [
    {
      label: '🔑 マネージド ID（Managed Identity）',
      desc: '・Connected Machine Agent インストール時にシステムマネージド ID を自動作成します\n・Azure サービスへのセキュアな認証を実現します（ワークスペース ID やキーは不要です）',
      color: COLOR_ACCENT,
    },
    {
      label: '🔐 Azure RBAC（ロールベースアクセス制御）',
      desc: '・Arc 対応リソースにきめ細かなアクセス制御を適用できます\n・Arc 対応 Kubernetes では K8s クラスターへの RBAC 管理もサポートしています',
      color: COLOR_GREEN,
    },
    {
      label: '📋 Azure Policy',
      desc: '・組織全体のコンプライアンスポリシーを一貫して適用できます\n・リソースの構成を自動的に評価・修復し、企業標準への準拠を保証します',
      color: COLOR_ORANGE,
    },
    {
      label: '🛡️ Microsoft Defender for Cloud',
      desc: '・セキュリティポスチャの評価と脅威保護をハイブリッド環境全体で提供します\n・セキュリティベースラインを継続的に評価します',
      color: COLOR_RED,
    },
  ];

  const layerW = 11.5;
  const layerH = 1.25;
  const startX = 0.9;
  let startY = MARGIN_TOP_BODY + 0.1;
  const gapY = 0.15;

  layers.forEach((l, i) => {
    const y = startY + i * (layerH + gapY);
    slide.addShape(pptx.ShapeType.roundRect, {
      x: startX, y, w: layerW, h: layerH,
      fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.1,
      line: { color: l.color, width: 2 },
    });
    // ラベルバー
    slide.addShape(pptx.ShapeType.roundRect, {
      x: startX + 0.1, y: y + 0.08, w: layerW - 0.2, h: 0.38,
      fill: { color: l.color }, rectRadius: 0.06,
    });
    slide.addText(l.label, {
      x: startX + 0.15, y: y + 0.08, w: layerW - 0.3, h: 0.38,
      fontSize: 12, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
      valign: 'middle',
    });
    slide.addText(l.desc, {
      x: startX + 0.25, y: y + 0.5, w: layerW - 0.5, h: layerH - 0.6,
      fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK, valign: 'top',
    });
  });

  // データの所在地
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.9, y: 6.9, w: 11.5, h: 0.5,
    fill: { color: COLOR_LIGHT_BLUE }, rectRadius: 0.08,
    line: { color: COLOR_ACCENT, width: 1 },
  });
  slide.addText('📍 データの所在地: Arc 対応サーバーは、登録されたリージョン内に顧客データを保存し、データ所在地要件を満たします', {
    x: 1.1, y: 6.9, w: 11.1, h: 0.5,
    fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK, valign: 'middle',
  });
}

// ============================================================
// スライド 9: 料金体系 + 参考リンク
// ============================================================
function createSlide9() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, '料金体系 + 参考リンク');
  addFooter(slide, 8);

  // --- 料金テーブル ---
  const priceRows = [
    [
      { text: 'カテゴリ', options: { bold: true, fontSize: 10, fontFace: FONT_FACE, color: COLOR_WHITE, fill: { color: COLOR_ACCENT }, align: 'center', valign: 'middle' } },
      { text: '対象', options: { bold: true, fontSize: 10, fontFace: FONT_FACE, color: COLOR_WHITE, fill: { color: COLOR_ACCENT }, align: 'center', valign: 'middle' } },
      { text: '料金', options: { bold: true, fontSize: 10, fontFace: FONT_FACE, color: COLOR_WHITE, fill: { color: COLOR_ACCENT }, align: 'center', valign: 'middle' } },
    ],
    [
      { text: 'コントロールプレーン', options: { fontSize: 9, fontFace: FONT_FACE, color: COLOR_BLACK, fill: { color: COLOR_LIGHT_BG } } },
      { text: 'リソース整理 / Resource Graph / RBAC / 自動化', options: { fontSize: 9, fontFace: FONT_FACE, color: COLOR_BLACK, fill: { color: COLOR_LIGHT_BG } } },
      { text: '無料', options: { fontSize: 9, fontFace: FONT_FACE, color: COLOR_GREEN, bold: true, fill: { color: COLOR_LIGHT_BG } } },
    ],
    [
      { text: 'VMware vSphere / SCVMM', options: { fontSize: 9, fontFace: FONT_FACE, color: COLOR_BLACK } },
      { text: 'VM 検出・インベントリ / ライフサイクル操作', options: { fontSize: 9, fontFace: FONT_FACE, color: COLOR_BLACK } },
      { text: '無料', options: { fontSize: 9, fontFace: FONT_FACE, color: COLOR_GREEN, bold: true } },
    ],
    [
      { text: 'Azure サービス利用', options: { fontSize: 9, fontFace: FONT_FACE, color: COLOR_BLACK, fill: { color: COLOR_LIGHT_BG } } },
      { text: 'Defender for Cloud / Azure Monitor / GitOps 等', options: { fontSize: 9, fontFace: FONT_FACE, color: COLOR_BLACK, fill: { color: COLOR_LIGHT_BG } } },
      { text: '各サービス課金', options: { fontSize: 9, fontFace: FONT_FACE, color: COLOR_ORANGE, bold: true, fill: { color: COLOR_LIGHT_BG } } },
    ],
    [
      { text: 'データサービス', options: { fontSize: 9, fontFace: FONT_FACE, color: COLOR_BLACK } },
      { text: 'SQL MI — vCore 従量課金 / 1年・3年予約', options: { fontSize: 9, fontFace: FONT_FACE, color: COLOR_BLACK } },
      { text: '有料', options: { fontSize: 9, fontFace: FONT_FACE, color: COLOR_RED, bold: true } },
    ],
    [
      { text: 'Windows Server 管理', options: { fontSize: 9, fontFace: FONT_FACE, color: COLOR_BLACK, fill: { color: COLOR_LIGHT_BG } } },
      { text: 'Agent v1.47+ / WS2012 以上 Standard/Datacenter', options: { fontSize: 9, fontFace: FONT_FACE, color: COLOR_BLACK, fill: { color: COLOR_LIGHT_BG } } },
      { text: '月額課金', options: { fontSize: 9, fontFace: FONT_FACE, color: COLOR_RED, bold: true, fill: { color: COLOR_LIGHT_BG } } },
    ],
  ];

  slide.addTable(priceRows, {
    x: 0.5, y: MARGIN_TOP_BODY, w: 12.33,
    border: { type: 'solid', pt: 0.5, color: 'CCCCCC' },
    colW: [2.5, 6.33, 3.5],
    rowH: 0.38,
    margin: [2, 4, 2, 4],
  });

  // --- 参考リンク ---
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.4, y: 3.8, w: 12.5, h: 0.4,
    fill: { color: COLOR_ACCENT }, rectRadius: 0.08,
  });
  slide.addText('📚 参考リンク', {
    x: 0.5, y: 3.8, w: 12.33, h: 0.4,
    fontSize: 13, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
    valign: 'middle',
  });

  const refRows = [
    [
      { text: '#', options: { bold: true, fontSize: 8, fontFace: FONT_FACE, color: COLOR_WHITE, fill: { color: COLOR_ACCENT }, align: 'center', valign: 'middle' } },
      { text: 'タイトル', options: { bold: true, fontSize: 8, fontFace: FONT_FACE, color: COLOR_WHITE, fill: { color: COLOR_ACCENT }, align: 'center', valign: 'middle' } },
      { text: 'URL', options: { bold: true, fontSize: 8, fontFace: FONT_FACE, color: COLOR_WHITE, fill: { color: COLOR_ACCENT }, align: 'center', valign: 'middle' } },
    ],
    [
      { text: '1', options: { fontSize: 7, fontFace: FONT_FACE, color: COLOR_BLACK, fill: { color: COLOR_LIGHT_BG }, align: 'center' } },
      { text: 'Azure Arc の概要', options: { fontSize: 7, fontFace: FONT_FACE, color: COLOR_BLACK, fill: { color: COLOR_LIGHT_BG } } },
      { text: 'https://learn.microsoft.com/azure/azure-arc/overview', options: { fontSize: 7, fontFace: FONT_FACE, color: COLOR_ACCENT, fill: { color: COLOR_LIGHT_BG } } },
    ],
    [
      { text: '2', options: { fontSize: 7, fontFace: FONT_FACE, color: COLOR_BLACK, align: 'center' } },
      { text: 'Azure Arc 対応サーバーとは', options: { fontSize: 7, fontFace: FONT_FACE, color: COLOR_BLACK } },
      { text: 'https://learn.microsoft.com/azure/azure-arc/servers/overview', options: { fontSize: 7, fontFace: FONT_FACE, color: COLOR_ACCENT } },
    ],
    [
      { text: '3', options: { fontSize: 7, fontFace: FONT_FACE, color: COLOR_BLACK, fill: { color: COLOR_LIGHT_BG }, align: 'center' } },
      { text: 'Connected Machine Agent の前提条件', options: { fontSize: 7, fontFace: FONT_FACE, color: COLOR_BLACK, fill: { color: COLOR_LIGHT_BG } } },
      { text: 'https://learn.microsoft.com/azure/azure-arc/servers/prerequisites', options: { fontSize: 7, fontFace: FONT_FACE, color: COLOR_ACCENT, fill: { color: COLOR_LIGHT_BG } } },
    ],
    [
      { text: '4', options: { fontSize: 7, fontFace: FONT_FACE, color: COLOR_BLACK, align: 'center' } },
      { text: 'Azure Arc 対応 Kubernetes', options: { fontSize: 7, fontFace: FONT_FACE, color: COLOR_BLACK } },
      { text: 'https://learn.microsoft.com/azure/azure-arc/kubernetes/overview', options: { fontSize: 7, fontFace: FONT_FACE, color: COLOR_ACCENT } },
    ],
    [
      { text: '5', options: { fontSize: 7, fontFace: FONT_FACE, color: COLOR_BLACK, fill: { color: COLOR_LIGHT_BG }, align: 'center' } },
      { text: 'GitOps と Flux v2 によるアプリ展開', options: { fontSize: 7, fontFace: FONT_FACE, color: COLOR_BLACK, fill: { color: COLOR_LIGHT_BG } } },
      { text: 'https://learn.microsoft.com/azure/azure-arc/kubernetes/conceptual-gitops-flux2', options: { fontSize: 7, fontFace: FONT_FACE, color: COLOR_ACCENT, fill: { color: COLOR_LIGHT_BG } } },
    ],
    [
      { text: '6', options: { fontSize: 7, fontFace: FONT_FACE, color: COLOR_BLACK, align: 'center' } },
      { text: 'SQL Managed Instance enabled by Azure Arc', options: { fontSize: 7, fontFace: FONT_FACE, color: COLOR_BLACK } },
      { text: 'https://learn.microsoft.com/azure/azure-arc/data/managed-instance-overview', options: { fontSize: 7, fontFace: FONT_FACE, color: COLOR_ACCENT } },
    ],
    [
      { text: '7', options: { fontSize: 7, fontFace: FONT_FACE, color: COLOR_BLACK, fill: { color: COLOR_LIGHT_BG }, align: 'center' } },
      { text: 'Azure Arc 対応 VMware vSphere', options: { fontSize: 7, fontFace: FONT_FACE, color: COLOR_BLACK, fill: { color: COLOR_LIGHT_BG } } },
      { text: 'https://learn.microsoft.com/azure/azure-arc/vmware-vsphere/overview', options: { fontSize: 7, fontFace: FONT_FACE, color: COLOR_ACCENT, fill: { color: COLOR_LIGHT_BG } } },
    ],
    [
      { text: '8', options: { fontSize: 7, fontFace: FONT_FACE, color: COLOR_BLACK, align: 'center' } },
      { text: 'Azure Arc の料金', options: { fontSize: 7, fontFace: FONT_FACE, color: COLOR_BLACK } },
      { text: 'https://azure.microsoft.com/pricing/details/azure-arc/', options: { fontSize: 7, fontFace: FONT_FACE, color: COLOR_ACCENT } },
    ],
  ];

  slide.addTable(refRows, {
    x: 0.5, y: 4.25, w: 12.33,
    border: { type: 'solid', pt: 0.5, color: 'CCCCCC' },
    colW: [0.5, 4.0, 7.83],
    rowH: 0.3,
    margin: [1, 3, 1, 3],
  });
}

// ============================================================
// スライド 10: まとめと次のステップ
// ============================================================
function createSlide10() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'まとめと次のステップ');
  addFooter(slide, 9);

  // --- まとめ ---
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: MARGIN_TOP_BODY, w: 12.33, h: 2.8,
    fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.12,
    line: { color: COLOR_ACCENT, width: 2 },
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.6, y: MARGIN_TOP_BODY + 0.05, w: 12.13, h: 0.45,
    fill: { color: COLOR_ACCENT }, rectRadius: 0.08,
  });
  slide.addText('✅ Azure Arc の価値', {
    x: 0.6, y: MARGIN_TOP_BODY + 0.05, w: 12.13, h: 0.45,
    fontSize: 14, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
    valign: 'middle',
  });

  const summaryItems = [
    { text: 'オンプレミス、マルチクラウド、エッジにまたがるリソースを Azure の統一コントロールプレーンで一元管理できます', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'コントロールプレーン機能は無料で利用でき、既存のインフラを Azure Resource Manager に投影するだけで管理を開始できます', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'サーバー、Kubernetes、データサービス、VMware vSphere、SCVMM、Azure Local など幅広いリソースタイプに対応しています', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'Azure Policy、Azure Monitor、Defender for Cloud との統合により、統一的なガバナンス・監視・セキュリティを実現します', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'GitOps（Flux v2 / Argo CD）により、マルチクラスターへの構成展開を自動化できます', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ];
  slide.addText(summaryItems, {
    x: 0.8, y: MARGIN_TOP_BODY + 0.6, w: 11.8, h: 2.1,
    valign: 'top', lineSpacingMultiple: 1.3,
  });

  // --- 次のステップ ---
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 4.4, w: 12.33, h: 2.8,
    fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.12,
    line: { color: COLOR_GREEN, width: 2 },
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.6, y: 4.45, w: 12.13, h: 0.45,
    fill: { color: COLOR_GREEN }, rectRadius: 0.08,
  });
  slide.addText('🚀 次のステップ', {
    x: 0.6, y: 4.45, w: 12.13, h: 0.45,
    fontSize: 14, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
    valign: 'middle',
  });

  const nextItems = [
    { text: 'Azure Arc 対応サーバーの Connected Machine Agent をインストールし、既存サーバーを Azure に接続してください', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'Kubernetes クラスターを Arc に接続し、GitOps による構成管理を導入してください', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'Azure Policy と Microsoft Defender for Cloud を有効化し、ガバナンスとセキュリティを強化してください', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'Arc 対応データサービスを活用し、データ主権を維持しながらクラウドネイティブなデータ管理を実現してください', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ];
  slide.addText(nextItems, {
    x: 0.8, y: 5.0, w: 11.8, h: 2.1,
    valign: 'top', lineSpacingMultiple: 1.3,
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
createSlide10();

const outputDir = path.join(__dirname, '..', 'docs');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const outputPath = path.join(outputDir, 'AzureArc_content.pptx');
pptx.writeFile({ fileName: outputPath })
  .then(() => {
    console.log(`[PptxGenJS] コンテンツスライドを出力しました: ${outputPath}`);
    console.log(`  スライド数: 9枚（表紙・最終スライドは別途結合）`);
  })
  .catch(err => {
    console.error('エラー:', err);
    process.exit(1);
  });
