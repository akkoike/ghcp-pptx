const PptxGenJS = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

// ============================================================
// Azure Virtual Desktop 詳細仕様 — スライド生成スクリプト
// ============================================================

const pptx = new PptxGenJS();

// --- グローバル設定 ---
pptx.layout = 'LAYOUT_WIDE'; // 16:9
pptx.author = 'GitHub Copilot';
pptx.subject = 'Azure Virtual Desktop 詳細仕様';

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
  const total = totalPages || 10;
  slide.addText(`${pageNum} / ${total}`, {
    x: 11.5, y: 7.1, w: 1.5, h: 0.3,
    fontSize: 9, fontFace: FONT_FACE, color: '999999', align: 'right',
  });
}

// ============================================================
// スライド 2: Azure Virtual Desktop の概要
// ============================================================
function createSlide2() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'Azure Virtual Desktop の概要');
  addFooter(slide, 2);

  // 概念図: 従来型 VDI ↔ RDS ↔ AVD (DaaS)
  const boxY = MARGIN_TOP_BODY;
  const boxH = 1.2;
  const boxW = 3.2;

  // 従来型 VDI
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: boxY, w: boxW, h: boxH,
    fill: { color: '6B6B6B' }, rectRadius: 0.15,
  });
  slide.addText('従来型 VDI\n(オンプレミス)', {
    x: 0.5, y: boxY, w: boxW, h: boxH,
    fontSize: 14, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
    align: 'center', valign: 'middle',
  });

  // 矢印
  slide.addText('→', {
    x: 3.9, y: boxY, w: 0.8, h: boxH,
    fontSize: 28, fontFace: FONT_FACE, color: COLOR_ACCENT,
    align: 'center', valign: 'middle',
  });

  // RDS
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 4.8, y: boxY, w: boxW, h: boxH,
    fill: { color: COLOR_PURPLE }, rectRadius: 0.15,
  });
  slide.addText('RDS\n(リモートデスクトップ)', {
    x: 4.8, y: boxY, w: boxW, h: boxH,
    fontSize: 14, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
    align: 'center', valign: 'middle',
  });

  // 矢印
  slide.addText('→', {
    x: 8.2, y: boxY, w: 0.8, h: boxH,
    fontSize: 28, fontFace: FONT_FACE, color: COLOR_ACCENT,
    align: 'center', valign: 'middle',
  });

  // AVD
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 9.2, y: boxY, w: boxW, h: boxH,
    fill: { color: COLOR_ACCENT }, rectRadius: 0.15,
  });
  slide.addText('Azure Virtual Desktop\n(DaaS)', {
    x: 9.2, y: boxY, w: boxW, h: boxH,
    fontSize: 14, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
    align: 'center', valign: 'middle',
  });

  // 箇条書き
  const bullets = [
    { text: 'Azure Virtual Desktop（AVD）は、Azure 上で動作するデスクトップおよびアプリケーション仮想化サービスです', options: { bullet: true, fontSize: 12.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'VDI（仮想デスクトップインフラストラクチャ）を DaaS（Desktop as a Service）として提供しています', options: { bullet: true, fontSize: 12.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'ゲートウェイサーバーを自前で構築する必要がなく、Azure サブスクリプション内でフルデスクトップ仮想化環境を構築できます', options: { bullet: true, fontSize: 12.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'Windows 11/10 Enterprise マルチセッション機能により、1台の VM で複数ユーザーが同時接続できます（AVD 専用機能）', options: { bullet: true, fontSize: 12.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'Azure Portal、Azure CLI、PowerShell、REST API からホストプールやアプリケーショングループを管理できます', options: { bullet: true, fontSize: 12.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'オートスケール機能により、需要に応じてセッションホストを自動的にスケールイン・スケールアウトできます', options: { bullet: true, fontSize: 12.5, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ];
  slide.addText(bullets, {
    x: MARGIN_LEFT, y: 2.8, w: CONTENT_WIDTH, h: 4.2,
    valign: 'top', lineSpacingMultiple: 1.3,
  });
}

// ============================================================
// スライド 3: 主要な特徴と利点
// ============================================================
function createSlide3() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, '主要な特徴と利点');
  addFooter(slide, 3);

  const features = [
    { icon: '⚙️', title: '柔軟な構成', desc: '多様なワークロードに対応する柔軟な VM サイズとイメージ選択が可能です', color: COLOR_ACCENT },
    { icon: '💰', title: 'コスト最適化', desc: 'Windows Enterprise マルチセッションにより、VM 数とオーバーヘッドを大幅に削減できます', color: COLOR_GREEN },
    { icon: '📈', title: 'オートスケール', desc: '時間帯・曜日・需要変動に応じた自動スケーリングでコスト管理を最適化できます', color: COLOR_ORANGE },
    { icon: '👤', title: 'FSLogix プロファイル', desc: 'ユーザープロファイルをコンテナ化し、セッション間でのプロファイルローミングを実現します', color: COLOR_PURPLE },
    { icon: '📦', title: 'App Attach', desc: 'アプリケーションを OS から分離し、VM のプロビジョニングと管理を簡素化できます', color: COLOR_RED },
    { icon: '📱', title: 'マルチクライアント', desc: 'Windows / macOS / iOS / Android / Web から接続できます', color: COLOR_DARK_BLUE },
  ];

  const cardW = 3.8;
  const cardH = 2.3;
  const startX = 0.5;
  const gapX = 0.35;
  const gapY = 0.3;

  features.forEach((f, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = startX + col * (cardW + gapX);
    const y = MARGIN_TOP_BODY + 0.1 + row * (cardH + gapY);

    // カード背景
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y, w: cardW, h: cardH,
      fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.15,
      line: { color: f.color, width: 2 },
    });

    // アイコン + タイトル
    slide.addText(`${f.icon}  ${f.title}`, {
      x: x + 0.15, y: y + 0.15, w: cardW - 0.3, h: 0.5,
      fontSize: 14, fontFace: FONT_FACE, color: f.color, bold: true,
    });

    // 説明
    slide.addText(f.desc, {
      x: x + 0.15, y: y + 0.75, w: cardW - 0.3, h: 1.4,
      fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK,
      valign: 'top', lineSpacingMultiple: 1.3,
    });
  });
}

// ============================================================
// スライド 4: サービスアーキテクチャ
// ============================================================
function createSlide4() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'サービスアーキテクチャ');
  addFooter(slide, 4);

  // --- 左側: Microsoft 管理コンポーネント ---
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: MARGIN_TOP_BODY, w: 5.8, h: 5.5,
    fill: { color: COLOR_LIGHT_BLUE }, rectRadius: 0.15,
    line: { color: COLOR_ACCENT, width: 1.5 },
  });
  slide.addText('☁️  Microsoft 管理（コントロールプレーン）', {
    x: 0.7, y: MARGIN_TOP_BODY + 0.1, w: 5.4, h: 0.4,
    fontSize: 14, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
  });

  const msComponents = [
    { label: 'Web サービス', desc: 'ユーザー向けエンドポイント・接続情報を返却します', color: COLOR_ACCENT },
    { label: 'ブローカーサービス', desc: '受信接続をオーケストレーションします', color: COLOR_ACCENT },
    { label: 'ゲートウェイサービス', desc: 'WebSocket 経由で RDP を中継します（逆接続）', color: COLOR_ACCENT },
    { label: 'リソースディレクトリ', desc: '接続情報の地理的データベースです', color: COLOR_ACCENT },
  ];

  msComponents.forEach((c, i) => {
    const y = MARGIN_TOP_BODY + 0.7 + i * 1.15;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.9, y, w: 5.0, h: 0.95,
      fill: { color: COLOR_WHITE }, rectRadius: 0.1,
      line: { color: c.color, width: 1 },
    });
    slide.addText(c.label, {
      x: 1.1, y: y + 0.05, w: 4.6, h: 0.4,
      fontSize: 12, fontFace: FONT_FACE, color: c.color, bold: true,
    });
    slide.addText(c.desc, {
      x: 1.1, y: y + 0.45, w: 4.6, h: 0.4,
      fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK,
    });
  });

  // --- 中央矢印 ---
  slide.addText('⇄', {
    x: 6.3, y: 3.5, w: 0.8, h: 0.8,
    fontSize: 32, fontFace: FONT_FACE, color: COLOR_ACCENT,
    align: 'center', valign: 'middle',
  });

  // --- 右側: お客様管理コンポーネント ---
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 7.1, y: MARGIN_TOP_BODY, w: 5.8, h: 3.6,
    fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.15,
    line: { color: COLOR_GREEN, width: 1.5 },
  });
  slide.addText('🏢  お客様管理', {
    x: 7.3, y: MARGIN_TOP_BODY + 0.1, w: 5.4, h: 0.4,
    fontSize: 14, fontFace: FONT_FACE, color: COLOR_GREEN, bold: true,
  });

  const custComponents = [
    'セッションホスト VM（OS イメージ・アプリ含む）を管理します',
    '仮想ネットワーク接続を構成します',
    'ユーザー ID 管理・アクセス制御を行います',
  ];

  custComponents.forEach((item, i) => {
    const y = MARGIN_TOP_BODY + 0.7 + i * 0.85;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 7.4, y, w: 5.2, h: 0.65,
      fill: { color: COLOR_WHITE }, rectRadius: 0.1,
      line: { color: COLOR_GREEN, width: 1 },
    });
    slide.addText(item, {
      x: 7.6, y, w: 4.8, h: 0.65,
      fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK,
      valign: 'middle',
    });
  });

  // --- 回復性情報 ---
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 7.1, y: 5.2, w: 5.8, h: 1.3,
    fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.15,
    line: { color: COLOR_ORANGE, width: 1.5 },
  });
  slide.addText('🌐  サービスの回復性', {
    x: 7.3, y: 5.3, w: 5.4, h: 0.35,
    fontSize: 13, fontFace: FONT_FACE, color: COLOR_ORANGE, bold: true,
  });
  slide.addText('約40の Azure リージョンに分散配置され、Azure Traffic Manager と Front Door により最寄りのエントリポイントへ自動ルーティングされます', {
    x: 7.3, y: 5.7, w: 5.4, h: 0.7,
    fontSize: 10.5, fontFace: FONT_FACE, color: COLOR_BLACK,
    valign: 'top', lineSpacingMultiple: 1.3,
  });
}

// ============================================================
// スライド 5: セッションホストの種類と構成オプション
// ============================================================
function createSlide5() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'セッションホストの種類と構成オプション');
  addFooter(slide, 5);

  // 2x2 マトリクス
  slide.addText('ホストプール × セッション構成マトリクス', {
    x: MARGIN_LEFT, y: MARGIN_TOP_BODY, w: CONTENT_WIDTH, h: 0.35,
    fontSize: 14, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
  });

  // ヘッダー行
  slide.addShape(pptx.ShapeType.rect, {
    x: 3.2, y: 1.8, w: 4.5, h: 0.55,
    fill: { color: COLOR_ACCENT },
  });
  slide.addText('シングルセッション', {
    x: 3.2, y: 1.8, w: 4.5, h: 0.55,
    fontSize: 12, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
    align: 'center', valign: 'middle',
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 7.8, y: 1.8, w: 4.5, h: 0.55,
    fill: { color: COLOR_PURPLE },
  });
  slide.addText('マルチセッション', {
    x: 7.8, y: 1.8, w: 4.5, h: 0.55,
    fontSize: 12, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
    align: 'center', valign: 'middle',
  });

  // 左側ラベル
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 2.45, w: 2.6, h: 2.0,
    fill: { color: COLOR_GREEN },
  });
  slide.addText('プールド\n（共有）', {
    x: 0.5, y: 2.45, w: 2.6, h: 2.0,
    fontSize: 13, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
    align: 'center', valign: 'middle',
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 4.55, w: 2.6, h: 2.0,
    fill: { color: COLOR_ORANGE },
  });
  slide.addText('パーソナル\n（専用）', {
    x: 0.5, y: 4.55, w: 2.6, h: 2.0,
    fontSize: 13, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
    align: 'center', valign: 'middle',
  });

  // セルの内容
  const cells = [
    { x: 3.2, y: 2.45, w: 4.5, h: 2.0, text: '1VM に 1 ユーザーを割り当てます\n共有ホストプールから\n負荷分散で割り当てられます\n\n高パフォーマンス用途に最適です', bg: COLOR_LIGHT_BG },
    { x: 7.8, y: 2.45, w: 4.5, h: 2.0, text: '1VM に複数ユーザーが接続します\nWindows 11/10 マルチセッション\n負荷分散で割り当てられます\n\nコスト最適化に最適です', bg: COLOR_LIGHT_BLUE },
    { x: 3.2, y: 4.55, w: 4.5, h: 2.0, text: '1VM を 1 ユーザーに専用で割り当てます\n永続デスクトップ環境を提供します\n\nカスタム構成が必要な\nワークロードに最適です', bg: COLOR_LIGHT_BG },
    { x: 7.8, y: 4.55, w: 4.5, h: 2.0, text: '一般的には選択されない\n組み合わせです', bg: 'E8E8E8' },
  ];

  cells.forEach((c) => {
    slide.addShape(pptx.ShapeType.rect, {
      x: c.x, y: c.y, w: c.w, h: c.h,
      fill: { color: c.bg },
      line: { color: 'CCCCCC', width: 0.5 },
    });
    slide.addText(c.text, {
      x: c.x + 0.15, y: c.y + 0.1, w: c.w - 0.3, h: c.h - 0.2,
      fontSize: 10.5, fontFace: FONT_FACE, color: COLOR_BLACK,
      align: 'center', valign: 'middle', lineSpacingMultiple: 1.25,
    });
  });

  // 負荷分散アルゴリズム（下部）
  slide.addText([
    { text: '負荷分散: ', options: { bold: true, fontSize: 10, fontFace: FONT_FACE, color: COLOR_ACCENT } },
    { text: '幅優先（最も接続数の少ない VM に割り当て）と深さ優先（1台を容量いっぱいまで使用）の 2 方式があります', options: { fontSize: 10, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ], {
    x: 0.5, y: 6.7, w: CONTENT_WIDTH, h: 0.35,
  });
}

// ============================================================
// スライド 6: ネットワークと接続要件
// ============================================================
function createSlide6() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'ネットワークと接続要件');
  addFooter(slide, 6);

  // 3つの接続パターン
  slide.addText('接続パターン', {
    x: MARGIN_LEFT, y: MARGIN_TOP_BODY, w: CONTENT_WIDTH, h: 0.35,
    fontSize: 14, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
  });

  const patterns = [
    {
      icon: '🔄',
      title: 'TCP 逆接続（既定）',
      desc: 'TCP 443 を使用し、受信ポートの開放は不要です。ゲートウェイサービスが WebSocket 経由で RDP を中継します',
      color: COLOR_ACCENT,
    },
    {
      icon: '⚡',
      title: 'RDP Shortpath\n（マネージドネットワーク）',
      desc: 'ExpressRoute/VPN 経由で直接 UDP 接続を確立し、低遅延・高信頼な接続を実現します',
      color: COLOR_GREEN,
    },
    {
      icon: '🌐',
      title: 'RDP Shortpath\n（パブリックネットワーク）',
      desc: 'ICE/STUN/TURN プロトコルでインターネット経由 UDP 接続を確立します。失敗時は TCP にフォールバックします',
      color: COLOR_ORANGE,
    },
  ];

  const cardW = 3.8;
  const cardH = 2.5;
  const startX = 0.5;
  const gap = 0.35;
  const cardY = MARGIN_TOP_BODY + 0.5;

  patterns.forEach((p, i) => {
    const x = startX + i * (cardW + gap);

    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: cardY, w: cardW, h: cardH,
      fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.15,
      line: { color: p.color, width: 2 },
    });

    slide.addText(`${p.icon}  ${p.title}`, {
      x: x + 0.15, y: cardY + 0.15, w: cardW - 0.3, h: 0.7,
      fontSize: 12, fontFace: FONT_FACE, color: p.color, bold: true,
      align: 'center', valign: 'middle',
    });

    slide.addText(p.desc, {
      x: x + 0.15, y: cardY + 0.95, w: cardW - 0.3, h: 1.4,
      fontSize: 10.5, fontFace: FONT_FACE, color: COLOR_BLACK,
      valign: 'top', lineSpacingMultiple: 1.3,
    });
  });

  // ネットワーク要件
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 4.5, w: 8.5, h: 2.4,
    fill: { color: COLOR_LIGHT_BLUE }, rectRadius: 0.12,
  });
  slide.addText('📋  ネットワーク要件', {
    x: 0.7, y: 4.6, w: 8.1, h: 0.4,
    fontSize: 13, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
  });
  slide.addText([
    { text: '• セッションホスト用の仮想ネットワークとサブネットが必要です\n', options: { fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '• ドメインコントローラーと DNS サーバーへの接続が必要です（AD DS / Entra Domain Services 使用時）\n', options: { fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '• AVD サービスの必須 URL リストへの TCP 443 アクセスが必要です\n', options: { fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '• クライアント → セッションホストの RTT レイテンシは 150ms 未満を推奨しています', options: { fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ], {
    x: 0.7, y: 5.05, w: 8.1, h: 1.7,
    valign: 'top', lineSpacingMultiple: 1.3,
  });

  // Private Link
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 9.2, y: 4.5, w: 3.6, h: 2.4,
    fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.12,
    line: { color: COLOR_PURPLE, width: 1.5 },
  });
  slide.addText('🔒  Azure Private Link', {
    x: 9.4, y: 4.6, w: 3.2, h: 0.4,
    fontSize: 13, fontFace: FONT_FACE, color: COLOR_PURPLE, bold: true,
  });
  slide.addText('プライベートエンドポイント経由で Microsoft バックボーンネットワーク上を通信し、パブリックインターネットへの露出を回避できます', {
    x: 9.4, y: 5.05, w: 3.2, h: 1.7,
    fontSize: 10.5, fontFace: FONT_FACE, color: COLOR_BLACK,
    valign: 'top', lineSpacingMultiple: 1.3,
  });
}

// ============================================================
// スライド 7: セキュリティ機能
// ============================================================
function createSlide7() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'セキュリティ機能');
  addFooter(slide, 7);

  // 多層セキュリティ図
  const secLayers = [
    {
      label: '🔑  ID・アクセス管理',
      desc: 'Microsoft Entra ID 認証・MFA、条件付きアクセスポリシー（デバイス・場所・リスクレベル）、Entra ID 参加/ハイブリッド参加をサポートしています',
      color: COLOR_ACCENT,
      y: MARGIN_TOP_BODY,
    },
    {
      label: '🌐  接続・トランスポートセキュリティ',
      desc: '逆接続（受信ポート不要）、RDP Shortpath UDP 暗号化、Azure Private Link プライベート接続を提供しています',
      color: COLOR_GREEN,
      y: MARGIN_TOP_BODY + 1.5,
    },
    {
      label: '🖥️  VM・インフラストラクチャ保護',
      desc: 'Trusted Launch VM（セキュアブート + vTPM）、Confidential VM に対応し、Microsoft Defender for Cloud でセキュリティポスチャ評価・脅威検出を行います',
      color: COLOR_PURPLE,
      y: MARGIN_TOP_BODY + 3.0,
    },
    {
      label: '🛡️  運用セキュリティ',
      desc: 'Just-in-Time（JIT）アクセス、Azure Firewall・NSG ネットワーク制御、Microsoft Sentinel 連携（SIEM/SOAR）に対応しています',
      color: COLOR_ORANGE,
      y: MARGIN_TOP_BODY + 4.5,
    },
  ];

  secLayers.forEach((layer) => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.5, y: layer.y, w: CONTENT_WIDTH, h: 1.3,
      fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.12,
      line: { color: layer.color, width: 2, dashType: 'solid' },
    });

    // ヘッダー帯
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.5, y: layer.y, w: 3.5, h: 1.3,
      fill: { color: layer.color }, rectRadius: 0.12,
    });
    // 右側の角を四角で覆う
    slide.addShape(pptx.ShapeType.rect, {
      x: 2.5, y: layer.y, w: 1.6, h: 1.3,
      fill: { color: layer.color },
    });

    slide.addText(layer.label, {
      x: 0.7, y: layer.y, w: 3.1, h: 1.3,
      fontSize: 13, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
      valign: 'middle',
    });

    slide.addText(layer.desc, {
      x: 4.3, y: layer.y + 0.1, w: 8.3, h: 1.1,
      fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK,
      valign: 'middle', lineSpacingMultiple: 1.3,
    });
  });
}

// ============================================================
// スライド 8: ライセンスと料金体系
// ============================================================
function createSlide8() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'ライセンスと料金体系');
  addFooter(slide, 8);

  // ライセンステーブル
  const tableRows = [
    [
      { text: 'OS 種別', options: { bold: true, fontFace: FONT_FACE, fontSize: 11, color: COLOR_WHITE, fill: { color: COLOR_ACCENT }, align: 'center', valign: 'middle' } },
      { text: '対象ライセンス', options: { bold: true, fontFace: FONT_FACE, fontSize: 11, color: COLOR_WHITE, fill: { color: COLOR_ACCENT }, align: 'center', valign: 'middle' } },
      { text: '外部商用利用', options: { bold: true, fontFace: FONT_FACE, fontSize: 11, color: COLOR_WHITE, fill: { color: COLOR_ACCENT }, align: 'center', valign: 'middle' } },
    ],
    [
      { text: 'Windows\nクライアント OS', options: { fontFace: FONT_FACE, fontSize: 10, fill: { color: COLOR_LIGHT_BG }, bold: true, valign: 'middle', align: 'center' } },
      { text: 'Microsoft 365 E3/E5/A3/A5/F3/Business Premium\nWindows Enterprise E3/E5\nWindows Education A3/A5\nWindows VDA（ユーザーあたり）', options: { fontFace: FONT_FACE, fontSize: 9.5, fill: { color: COLOR_LIGHT_BG }, valign: 'middle' } },
      { text: 'ユーザーあたりの\nアクセス価格で利用可能', options: { fontFace: FONT_FACE, fontSize: 10, fill: { color: COLOR_LIGHT_BG }, align: 'center', valign: 'middle' } },
    ],
    [
      { text: 'Windows\nServer OS', options: { fontFace: FONT_FACE, fontSize: 10, bold: true, valign: 'middle', align: 'center' } },
      { text: 'RDS CAL + Software Assurance\nRDS ユーザーサブスクリプションライセンス', options: { fontFace: FONT_FACE, fontSize: 9.5, valign: 'middle' } },
      { text: '非対応', options: { fontFace: FONT_FACE, fontSize: 10, color: COLOR_RED, bold: true, align: 'center', valign: 'middle' } },
    ],
  ];

  slide.addTable(tableRows, {
    x: 0.5, y: MARGIN_TOP_BODY, w: CONTENT_WIDTH,
    colW: [2.5, 6.5, 3.33],
    border: { type: 'solid', color: 'CCCCCC', pt: 0.5 },
    rowH: [0.5, 1.3, 0.9],
  });

  // コスト最適化
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 4.2, w: 6.0, h: 2.6,
    fill: { color: COLOR_LIGHT_BLUE }, rectRadius: 0.12,
  });
  slide.addText('💡  コスト最適化策', {
    x: 0.7, y: 4.3, w: 5.6, h: 0.4,
    fontSize: 14, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
  });
  slide.addText([
    { text: '• オートスケールによる VM 稼働時間の最適化が可能です\n', options: { fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '• Azure Reserved Instances の活用でコンピュートコストを削減できます\n', options: { fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '• マルチセッション活用で VM 台数を削減できます', options: { fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ], {
    x: 0.7, y: 4.8, w: 5.6, h: 1.8,
    valign: 'top', lineSpacingMultiple: 1.4,
  });

  // Azure Local 追加コスト
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.7, y: 4.2, w: 6.13, h: 2.6,
    fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.12,
    line: { color: COLOR_ORANGE, width: 1.5 },
  });
  slide.addText('☁️  AVD on Azure Local', {
    x: 6.9, y: 4.3, w: 5.73, h: 0.4,
    fontSize: 14, fontFace: FONT_FACE, color: COLOR_ORANGE, bold: true,
  });
  slide.addText('Azure Local サービス料金に加え、セッションホストのアクティブ vCPU あたりの AVD サービス料金が必要です', {
    x: 6.9, y: 4.8, w: 5.73, h: 1.8,
    fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK,
    valign: 'top', lineSpacingMultiple: 1.4,
  });
}

// ============================================================
// スライド 9: まとめと参考リンク
// ============================================================
function createSlide9() {
  const slide = pptx.addSlide();
  slide.background = { fill: COLOR_WHITE };
  addTitleBar(slide, 'まとめと参考リンク');
  addFooter(slide, 9);

  // --- 左側: まとめ ---
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: MARGIN_TOP_BODY, w: 6.0, h: 3.5,
    fill: { color: COLOR_LIGHT_BLUE }, rectRadius: 0.15,
  });
  slide.addText('✅  Azure Virtual Desktop の価値', {
    x: 0.7, y: MARGIN_TOP_BODY + 0.1, w: 5.6, h: 0.35,
    fontSize: 14, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
  });

  const summaryBullets = [
    { text: 'ゲートウェイ不要でフルデスクトップ仮想化環境を Azure 上に構築できます', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'Windows Enterprise マルチセッションによりコスト最適化と柔軟なスケーリングを実現します', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'Microsoft 管理のコントロールプレーンでインフラ運用負荷を大幅に削減します', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: '条件付きアクセス・MFA・Trusted Launch 等のエンタープライズセキュリティを標準提供しています', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
    { text: 'Azure Portal・CLI による一元管理と AVD Insights による監視に対応しています', options: { bullet: true, fontSize: 11, fontFace: FONT_FACE, color: COLOR_BLACK } },
  ];

  slide.addText(summaryBullets, {
    x: 0.7, y: MARGIN_TOP_BODY + 0.5, w: 5.6, h: 2.8,
    valign: 'top', lineSpacingMultiple: 1.4,
  });

  // --- 右側: 次のステップ ---
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.7, y: MARGIN_TOP_BODY, w: 6.13, h: 3.5,
    fill: { color: COLOR_LIGHT_BG }, rectRadius: 0.15,
    line: { color: COLOR_GREEN, width: 1.5 },
  });
  slide.addText('🚀  次のステップ', {
    x: 6.9, y: MARGIN_TOP_BODY + 0.1, w: 5.73, h: 0.35,
    fontSize: 14, fontFace: FONT_FACE, color: COLOR_GREEN, bold: true,
  });

  const steps = [
    { num: '1', text: 'Azure Portal で AVD 環境のデプロイを開始してください' },
    { num: '2', text: 'VM サイズガイドラインを参照し、適切なサイジングを検討してください' },
    { num: '3', text: 'FSLogix プロファイルコンテナの設計・構成を計画してください' },
    { num: '4', text: 'オートスケーリングプランを作成し、コスト最適化を図ってください' },
    { num: '5', text: 'AVD Insights を有効化し、運用監視体制を整備してください' },
  ];

  steps.forEach((s, i) => {
    const y = MARGIN_TOP_BODY + 0.55 + i * 0.57;

    // 番号バッジ
    slide.addShape(pptx.ShapeType.ellipse, {
      x: 7.1, y: y + 0.02, w: 0.4, h: 0.4,
      fill: { color: COLOR_GREEN },
    });
    slide.addText(s.num, {
      x: 7.1, y: y + 0.02, w: 0.4, h: 0.4,
      fontSize: 12, fontFace: FONT_FACE, color: COLOR_WHITE, bold: true,
      align: 'center', valign: 'middle',
    });

    // テキスト
    slide.addText(s.text, {
      x: 7.7, y: y, w: 4.9, h: 0.5,
      fontSize: 10.5, fontFace: FONT_FACE, color: COLOR_BLACK,
      valign: 'middle', lineSpacingMultiple: 1.2,
    });
  });

  // --- 参考リンク ---
  slide.addText('📚  参考リンク', {
    x: 0.5, y: 5.0, w: CONTENT_WIDTH, h: 0.35,
    fontSize: 13, fontFace: FONT_FACE, color: COLOR_ACCENT, bold: true,
  });

  const linkTableRows = [
    [
      { text: '#', options: { bold: true, fontFace: FONT_FACE, fontSize: 8, color: COLOR_WHITE, fill: { color: COLOR_ACCENT }, align: 'center' } },
      { text: 'タイトル', options: { bold: true, fontFace: FONT_FACE, fontSize: 8, color: COLOR_WHITE, fill: { color: COLOR_ACCENT } } },
      { text: 'URL', options: { bold: true, fontFace: FONT_FACE, fontSize: 8, color: COLOR_WHITE, fill: { color: COLOR_ACCENT } } },
    ],
    [
      { text: '1', options: { fontFace: FONT_FACE, fontSize: 7, align: 'center', fill: { color: COLOR_LIGHT_BG } } },
      { text: 'Azure Virtual Desktop とは', options: { fontFace: FONT_FACE, fontSize: 7, fill: { color: COLOR_LIGHT_BG } } },
      { text: 'https://learn.microsoft.com/azure/virtual-desktop/overview', options: { fontFace: FONT_FACE, fontSize: 6.5, fill: { color: COLOR_LIGHT_BG } } },
    ],
    [
      { text: '2', options: { fontFace: FONT_FACE, fontSize: 7, align: 'center' } },
      { text: 'サービスアーキテクチャと回復性', options: { fontFace: FONT_FACE, fontSize: 7 } },
      { text: 'https://learn.microsoft.com/azure/virtual-desktop/service-architecture-resilience', options: { fontFace: FONT_FACE, fontSize: 6.5 } },
    ],
    [
      { text: '3', options: { fontFace: FONT_FACE, fontSize: 7, align: 'center', fill: { color: COLOR_LIGHT_BG } } },
      { text: '前提条件（ネットワーク・OS・ライセンス）', options: { fontFace: FONT_FACE, fontSize: 7, fill: { color: COLOR_LIGHT_BG } } },
      { text: 'https://learn.microsoft.com/azure/virtual-desktop/prerequisites', options: { fontFace: FONT_FACE, fontSize: 6.5, fill: { color: COLOR_LIGHT_BG } } },
    ],
    [
      { text: '4', options: { fontFace: FONT_FACE, fontSize: 7, align: 'center' } },
      { text: 'RDP Shortpath / ライセンスガイド', options: { fontFace: FONT_FACE, fontSize: 7 } },
      { text: 'https://learn.microsoft.com/azure/virtual-desktop/rdp-shortpath', options: { fontFace: FONT_FACE, fontSize: 6.5 } },
    ],
    [
      { text: '5', options: { fontFace: FONT_FACE, fontSize: 7, align: 'center', fill: { color: COLOR_LIGHT_BG } } },
      { text: 'AVD Insights / FSLogix / デプロイ手順', options: { fontFace: FONT_FACE, fontSize: 7, fill: { color: COLOR_LIGHT_BG } } },
      { text: 'https://learn.microsoft.com/azure/virtual-desktop/insights', options: { fontFace: FONT_FACE, fontSize: 6.5, fill: { color: COLOR_LIGHT_BG } } },
    ],
  ];

  slide.addTable(linkTableRows, {
    x: 0.5, y: 5.4, w: CONTENT_WIDTH,
    colW: [0.5, 4.0, 7.83],
    border: { type: 'solid', color: 'CCCCCC', pt: 0.5 },
    rowH: 0.23,
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
createSlide7();
createSlide8();
createSlide9();

const outputDir = path.join(__dirname, '..', 'docs');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'AzureVirtualDesktop_content.pptx');
pptx.writeFile({ fileName: outputPath }).then(() => {
  console.log(`[PptxGenJS] コンテンツスライドを出力しました: ${outputPath}`);
}).catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
