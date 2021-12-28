import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import find from "unist-util-find";
import flatFilter from "unist-util-flat-filter";
import rehypeFormat from "rehype-format";
import { u } from "unist-builder";

// 処理前のHTML文字列
const html = `
<h1>記事タイトル</h1>
<h2 id="toc-title">目次</h2>
<ol id="toc-holder"></ol>
<h2>大見出し1</h2>
<p>段落</p>
<h2>大見出し2</h2>
<p>段落</p>
<h2>大見出し3</h2>
<p>段落</p>
<h2>大見出し4</h2>
<p>段落</p>
`;

// TOCのolの中身を作る
const tocGenerator = () => {
  return (tree) => {
    // デバッグ用1: 構文木全量
    //console.dir(tree, { depth: null });

    // TOCのノードを探す
    const tocNode = find(tree, (node) => {
      if (!node.properties) return false;
      return node.properties.id === "toc-holder";
    });

    // デバッグ用2: TOCのノード
    //console.dir(tocNode, { depth: null });

    // h2のノードだけを集める
    const headingsTree = flatFilter(tree, (node) => {
      if (node.properties && node.properties.id === "toc-title") return false;
      return node.tagName === "h2";
    });

    // デバッグ用3: h2のノードを集めたもの
    //console.dir(headingsTree, { depth: null });

    // TOCのノードのchildrenをページ内アンカーへ置き換え
    tocNode.children = headingsTree.children.map((node) => {
      return u("element", { tagName: "li" }, [
        u(
          "element",
          { tagName: "a", properties: { href: `#${node.properties.id}` } },
          [u("text", node.children[0].value)]
        ),
      ]);
    });

    // デバッグ用4: 処理後のtree
    //console.dir(tree, { depth: null });
  };
};

const processor = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeSlug)
  .use(tocGenerator)
  .use(rehypeFormat)
  .use(rehypeStringify);

// HTML文字列を処理してVFileを作成
const vfile = processor.processSync(html);
// VFileを文字列にしてconsole.log
console.log(vfile.toString());
