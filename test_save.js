const chikyu = require('./lib/chikyu');

// ここにログイン用のトークンネームをユーザー側で好きな文字列を設定します。
// ここに、get_login.jsに設定したtoken_nameをセットしてください。
// 以下は例なのでそのまま使用しないでください。
token_name = 'nodejssdk_login001';
// ここに、get_login.jsでリターンされたtokenをセットしてください。
token = 'ここにget_login.jsでリターンされたtokenをセット';
// ここに、get_login.jsでリターンされたsecret_tokenをセットしてくださいをセットしてください。
secret_token = 'ここにget_login.jsでリターンされたsecret_tokenをセット';

// 上記で、設定されたtoken_name, token, secret_tokenによって、ログインができます。
chikyu.session.login(token_name, token, secret_token).then((r) => {

   // ここでchangeOrgan()の引数に組織IDを数値型でセットする。
   chikyu.session.changeOrgan(ここに数値型で組織IDをセットする).then((s) => {

      // saveAPI
      return chikyu.secure.invoke('/entity/business_discussions/save', {

         // 基本、ここには、APIのDOC(chikyu-api.html)でみた場合の「data」から下の階層を設定すると見るとわかりやすいかと思われます。

         "key": "listAPIで取得した場合の「_id」の値をここに入れれば更新",  // listAPIで取得した場合の「_id」の値を入れれば更新。ここを省けば新規作成。更新対象データのID。 ・新規データの場合は空白とする。 ・IDに該当するデータが存在しない場合、新たにIDを採番して新しい項目を作成する。 ・値に該当する項目が複数見つかった場合は、最初に見つかった一つだけが更新される。
         "fields": { // 必須。listAPIで取得した結果の「list」の配列内のオブジェクトの値を入れればわかりやすい。項目設定で定義されたフィールド名と、対応する値のマップ。
            business_discussion_name : "テスト商談名００１",
            role_id: "事前にlistAPIでrole_idを調べてここにセットするのがおすすめです", // 新規作成の場合は、事前にlistAPIで取得して、新規作成レコードにどのロールを設定するか、確認してrole_idの設定をすることをおすすめします。
         },
         // "is_async": true, // 処理を非同期で実行する(空白の場合はfalse)
         // "options": {
         //    "key_search_option": {
         //       "input_method": "string", // データの検索方法(by_id=IDで検索, by_name=表示名で検索, by_field_value=特定のフィールドの値で検索)
         //       "input_field_name": "string" // データの検索フィールド名(input_method=by_field_valueのみ)
         //    },
         //    "search_related_by_name": true, // true=選択項目や関連マスタを表示名称で検索する, false=選択項目や関連マスタをIDで検索する 指定しない場合はIDで検索する。
         //    "field_search_option_list": [ // フィールドごとに検索方法を変更する場合に設定する
         //       {
         //          "field_name": "string", // フィールド名称
         //          "input_method": "string", // 関連データの検索方法(by_id=IDで検索, by_name=表示名で検索, by_field_value=特定のフィールドの値で検索)
         //          "input_field_name": "string" // 関連データの検索フィールド名(input_method=by_field_valueのみ)
         //       }
         //    ]
         // }

      }).then((d) => {
         console.log(d);
      }); // End saveAPI

   }).catch((e) => {
      console.log(e);
   }); // End changeOrgan

}).catch((e) => {
   console.log(e);
}); // End login
