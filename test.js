const chikyu = require('./lib/chikyu');

token_name = '';
token = '';
secret_token = '';

chikyu.session.login(token_name, token, secret_token).then((r) => {
   return chikyu.secure.invoke('/entity/business_discussions/list', {'items_per_page': 10, 'page_index': 0}).then((d) => {
       console.log(d);
   });
}).catch((e) => {
   console.log(e);
});
