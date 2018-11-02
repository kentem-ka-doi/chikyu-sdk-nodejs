# chikyu-sdk-nodejs

## 概要
ちきゅうのWeb APIをJavaScript(NodeJS)から利用するためのライブラリです。
  
## APIの基本仕様について
こちらのレポジトリをご覧ください
  
https://github.com/chikyuinc/chikyu-api-specification
  
## 利用方法
(1)package.jsonの"dependencies"セクションの中に、以下のように追加してください。
```
"dependencies": {
  "chikyu-sdk": "https://github.com/chikyuinc/chikyu-sdk-nodejs.git"
},
```

(2)npm install を実行してください

(3)利用するスクリプト内でrequireを行ってください
```
const chikyu = require('chikyu-sdk');
```

## 関数
```
chikyu.token.create
chikyu.session.login
chikyu.open.invoke
chikyu.public.invoke
chikyu.setApiKeys
chikyu.secure.invoke
```
