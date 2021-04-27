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

      // 以下はログイン後に、一覧取得の基本APIの「/entity/ここに取得したいオブジェクト名/list」に、
      // 商談(business_discussions)をセットして、商談の一覧Listを取得した例です。
      return chikyu.secure.invoke('/entity/business_discussions/list', {

         // 基本、ここには、APIのDOC(chikyu-api.html)でみた場合の「data」から下の階層を設定すると見るとわかりやすいかと思われます。

         "items_per_page": 1, // 必須。ページごとのデータ取得件数。１ページの表示件数。Maxは500。
         "page_index": 0, // 必須。取得ページ番号。0からスタートで何ページ目からか。
         "sort": [ // ソート条件。
            {
               "field_name": "updated_on", // 対象フィールド名。この例では項目設定→商談での、項目の「フィールド名称」。デフォルトは「_id」。
               "direction": -1 // 正順 -> 0以上, 逆順 -> -1以下。検索方向。sortを何も設定しなければ、デフォルトは昇順、-1にすると降順。
            }
         ],
         // "condition_list": [ 
            // 抽出条件リスト(AND条件)。AND条件の場合は、この[]部分を、下にカンマつなぎでコピーするイメージです。
            // [
               // 抽出条件リスト(OR条件)。OR条件の場合は、この{}部分を、下にカンマつなぎでコピーするイメージです。
               // {
                  // "field_name": "business_discussion_name", // condition_listを入れた場合、必須。この例では項目設定→商談での、項目の「フィールド名称」。対象フィールド名 「KEYWORD」と指定すると、全フィールドからキーワード検索を行う。
                  // "operator": "cn", // condition_listを入れた場合、必須。日付・日時型以外に対して検索を行う場合の演算子 cn=含む eq=等しい bw=で始まる ew=で終わる nc=含まない ne=等しくない bn=で始まらない en=で終わらない gt=より大きい ge=と等しいか大きい lt=より小さい le=と等しいか小さい between=の間 na=空白である cs=空白でない
                  // "value": "い", // condition_listを入れた場合、必須。フィールド値(範囲指定の場合は最小値)
                  // "search_type": "string", // データ型が「collection」または「table」である場合のみ有効。 value=表示値で検索(デフォルト) id=idで検索
                  // "range_to_value": "string", // 範囲を指定する場合の最大値
                  // "range_option": "string", // 日付(date)・日時型(datetime)型に対してのみ有効。 検索を行う場合の演算子。 custom=始まりの日(value)と終わりの日(range_to_value)を指定 today=今日 yesterday=昨日 tomorrow=明日 this_week=今週 last_week=先週 next_week=来週 this_month=今月 last_month=先月 next_month=来月 this_quarter=当四半期 last_quarter=前四半期 next_quarter=翌四半期 this_year=本年 last_year=昨年 next_year=来年 this_fiscal_year=当会計年度 last_fiscal_year=前会計年度 next_fiscal_year=翌会計年度 past7days=過去7日間 past14days=過去14日間 past30days=過去30日間 not_applicable=空白である CONTAINS=空白でない
                  // "collection_name": "string" // 対象となるコレクション名(レポートでの利用以外の場合は常に空白)
               // }
            // ]
         // ],
         // "search_field_name": "string", // 検索フィールド名(ALL_FIELDSを指定すると、全項目から検索)
         // "search_field_value": "string", // 検索フィールド値
         // "list_id": "string" // 検索に利用するリストのID

      }).then((d) => {
         console.log(d);
      }); // End listAPI

   }).catch((e) => {
      console.log(e);
   }); // End changeOrgan

}).catch((e) => {
   console.log(e);
}); // End login
