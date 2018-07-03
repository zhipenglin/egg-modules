# bole-framework

用于统一伯乐端配置的framework

## QuickStart

```bash
$ npm install
$ npm test
```

publish your framework to npm, then change app's dependencies:

```js
// {app_root}/index.js
require('bole-framework').startCluster({
  baseDir: __dirname,
  // port: 7001, // default to 7001
});

```

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

