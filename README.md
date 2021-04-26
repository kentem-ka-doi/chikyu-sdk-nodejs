# chikyu-sdk-nodejs

## 概要
ちきゅうのWeb APIをJavaScript(NodeJS)から利用するためのライブラリです。
  
## APIの基本仕様について
こちらのレポジトリをご覧ください
  
https://github.com/chikyuinc/chikyu-api-specification

上記リポジトリの説明では、APIのレベルは、class2の箇所をご確認ください。
  
## 利用方法
(1)package.jsonの"dependencies"セクションの中に、以下のように追加してください。
```
"dependencies": {
  "chikyu-sdk": "https://github.com/chikyuinc/chikyu-sdk-nodejs.git"
},
↓
こちら、追加してありますので、npmが実行できるのを確認できたら、以下の(2)へ進んでください。
ここは、内容だけ、ご確認ください。
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
