# unifiedとrehypeでHTMLを自由に加工する サンプルレポジトリ

## このレポジトリについて

[CodeGrid: unifiedとrehypeによるHTMLの加工](https://www.codegrid.net/series/2022-rehype) のサンプルレポジトリです。

- `01-tweak-html`: HTML文字列を加工するサンプル
- `02-toc`: HTML文字列からh2だけで目次を作るサンプル
- `02-toc-reference-json`: 目次生成の途中段階の構文木のサンプル


## セットアップ

```bash
npm ci
```

## サンプルの実行の仕方

WYSIWYGっぽいHTMLを加工する例

```bash
npm run example1
```

h2だけを拾って目次のページ内アンカーを作る例

```bash
npm run example2
```