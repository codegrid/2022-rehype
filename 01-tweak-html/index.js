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

const processor = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeWrapAll, [
    {
      selector: "h1",
      wrapper: "div.h1-wrapper",
    },
    {
      selector: "p",
      wrapper: "div.p-wrapper",
    },
  ])
  .use(rehypeAddClasses, {
    ul: "text-list",
    li: "text-list-item",
  })
  .use(rehypeFormat)
  .use(rehypeStringify);

// HTML文字列を処理してVFileを作成
const vfile = processor.processSync(html);
// VFileを文字列にしてconsole.log
console.log(vfile.toString());
