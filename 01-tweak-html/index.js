import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import rehypeWrapAll from "rehype-wrap-all";
import rehypeAddClasses from "rehype-add-classes";
import rehypeFormat from "rehype-format";

// 処理前のHTML文字列
const html = `
<h1>記事タイトル</h1>
<p>段落</p>
<ul>
  <li>リスト</li>
  <li>リスト</li>
</ul>
`;

// まずはProcessorを作成
const processor = unified();

// rehype-parseプラグインを使う
// - HTML文字列を構文木に変換するParser
// - HTML文字列の一部を使うオプションを指定
processor.use(rehypeParse, { fragment: true });

// rehype-wrap-allプラグインを使う
// - <h1>を<div class="h1-wrapper">で包む
// - <p>を<div class="p-wrapper">で包む
processor.use(rehypeWrapAll, [
  {
    selector: "h1",
    wrapper: "div.h1-wrapper",
  },
  {
    selector: "p",
    wrapper: "div.p-wrapper",
  },
]);

// rehype-add-classesプラグインを使う
// - <ul>に"text-list"クラスを追加
// - <li>に"text-list-item"クラスを追加
processor.use(rehypeAddClasses, {
  ul: "text-list",
  li: "text-list-item",
});

// rehype-formatプラグインを使う
// いい感じにインデントなど揃えてくれる
processor.use(rehypeFormat);

// rehype-stringifyプラグインを使う
// - 構文木をHTML文字列に変換するCompiler
processor.use(rehypeStringify);

// HTML文字列を処理してVFileを作成
const vfile = processor.processSync(html);
// VFileを文字列にしてconsole.log
console.log(vfile.toString());
