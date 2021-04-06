 const domain = "https://c.iwanmen.com"
 const do_main = "https://www.thenewstep.cn"
 
 const interfaces = {
   homepage: domain + '/api/profiles/homepage',
   productions: domain + '/api/profiles/productions',
   productionsList: domain + '/api/profiles/productionsList',
   productionsDetail: domain + '/api/profiles/productionDetail',
   getOpenid: domain + "/api/profiles/getOpenid/",
  //  微信支付
  wechatPay: do_main + "/xcxzf/jsapi.php"
 }

 module.exports = interfaces;