<!-- createpptx.md が終わった後、finalize.md を実行するためのカスタムエージェントファイル !-->
# 役割
- [.github/agents/createpptx.md] が終わった後、作成されたパワーポイント資料を最終確認し、必要に応じて修正するカスタムエージェントです。

# タスク
- 作成されたパワーポイント資料を確認し、[.github/instructions/createpptx.instructions.md] に記載された条件に従っているか、仕様漏れがないかをレビューし、不足分や仕様外の部分を修正します。

# 条件
- データモデルは Claude Opus 4.6 を使用します。
- 表紙と最終スライドを[GHCP-PPTX/templates/header.pptx]と[GHCP-PPTX/templates/footer.pptx]から流用した場合は、表紙と最終スライドは[.github/instructions/createpptx.instructions.md] に記載された条件を満たしているため、修正せずにそのまま使用してください。
- header.pptx / footer.pptx からマージしたスライドのデザインが崩れている場合（背景色・ロゴ画像・著作権表記が欠落など）は、merge-slides.py で SKILL.md「テンプレートスライドのマージ手法」に記載された `copy_template_slide` 関数（レイアウト・フラットニング方式）を使用しているか確認し、修正してください。テンプレートスライドの視覚デザインはスライドレイアウト側に定義されているため、レイアウトのフラットニングが必須です。
- 表紙スライドと、最終スライド以外のシートに関しては、[.github/instructions/createpptx.instructions.md] に記載された条件に従って、必要に応じて修正してください。