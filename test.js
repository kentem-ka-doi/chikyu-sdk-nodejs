const chikyu = require('./lib/chikyu');

// ここにログイン用のトークンネームをユーザー側で好きな文字列を設定します。
// ここに、get_login.jsに設定したtoken_nameをセットしてください。
// 以下は例なのでそのまま使用しないでください。
token_name = 'nodejssdk_login001';
// ここに、get_login.jsでリターンされたtokenをセットしてください。
token = 'ここにget_login.jsでリターンされたtokenをセット';
// ここに、get_login.jsでリターンされたsecret_tokenをセットしてくださいをセットしてください。
secret_token = 'ここにget_login.jsでリターンされたsecret_tokenをセットしてください';

// 上記で、設定された、token_name, token, secret_tokenの３つによって、ログインができます。
chikyu.session.login(token_name, token, secret_token).then((r) => {
   // 以下はログイン後に、一覧取得の基本APIの「/entity/ここに取得したいオブジェクト名/list」に、
   // 商談(business_discussions)をセットして、商談の一覧Listを取得した例です。
   // ページ設定は必須です。page_index→0からスタートで何ページ目からか。items_per_page→１ページの表示件数。(Maxは500)
   return chikyu.secure.invoke('/entity/business_discussions/list', {'items_per_page': 10, 'page_index': 0}).then((d) => {
      console.log(d);
   });
}).catch((e) => {
   console.log(e);
});
