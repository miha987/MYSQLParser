# MYSQL Parser

[![Node.js Version](https://img.shields.io/badge/Node.js-18.17.1-brightgreen)](https://nodejs.org/)


My implementation of MYSQL parser, for educational purposes.

## Installation

To use MYSQL parser inside your html page, copy `/build/parser.js`  to your project and than link it in html.
```html
<script src="./js/libs/parser.js"></script>
```
This will expose `MYSQLParser` function to window, that you can use anywhere.
You can create new instance of parser like this:
```js
let parser = window.MYSQLParser();
```
### Build
To build project locally, follow the steps bellow:

```console 
npm install
```

```console
npm run build
```
If you want to watch for changes, use:
```console
npm run watch
```