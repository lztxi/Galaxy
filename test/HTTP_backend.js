// JavaScript source code
var $tool = new tool();

try{
  //var str= $prefs.valueForKey('dyheadlist');
  var str= $prefs.valueForKey('dyjs');
  //var str= $prefs.valueForKey('ksjs');
  //var str= $prefs.valueForKey('zqgetbody_body');
  //var str= $prefs.valueForKey('中青看点阅读');
  
  $done(str);
}
catch(e){
  $done('erro'+e);
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

function tool() { var isLoon = typeof $httpClient != "undefined"; var isQuanX = typeof $task != "undefined"; var obj = { notify: function (title, subtitle, message, option) { var option_obj = {}; if (isQuanX) { if (!!option) { if (typeof option == "string") option_obj["open-url"] = option; if (!!option.url) option_obj["open-url"] = option.url; if (!!option.img) option_obj["media-url"] = option.img; $notify(title, subtitle, message, option_obj) } else { $notify(title, subtitle, message) } } if (isLoon) { if (!!option) { if (typeof option == "string") option_obj["openUrl"] = option; if (!!option.url) option_obj["openUrl"] = option.url; if (!!option.img) option_obj["mediaUrl"] = option.img; $notification.post(title, subtitle, message, option_obj) } else { $notification.post(title, subtitle, message) } } }, get: function (options, callback) { if (isQuanX) { if (typeof options == "string") options = { url: options }; options["method"] = "GET"; $task.fetch(options).then(function (response) { callback(null, adapterStatus(response), response.body) }, function (reason) { callback(reason.error, null, null) }) } if (isLoon) { $httpClient.get(options, function (error, response, body) { callback(error, adapterStatus(response), body) }) } }, post: function (options, callback) { if (isQuanX) { if (typeof options == "string") options = { url: options }; options["method"] = "POST"; $task.fetch(options).then(function (response) { callback(null, adapterStatus(response), response.body) }, function (reason) { callback(reason.error, null, null) }) } if (isLoon) { $httpClient.post(options, function (error, response, body) { callback(error, adapterStatus(response), body) }) } }, unicode: function (str) { return unescape(str.replace(/\\u/gi, '%u')) }, decodeurl: function (str) { return decodeURIComponent(str) }, json2str: function (obj) { return JSON.stringify(obj) }, str2json: function (str) { return JSON.parse(str) }, setdata: function (value, key) { if (isQuanX) { $prefs.setValueForKey(value, key) } if (isLoon) { $persistentStore.write(value, key) } }, getdata: function (key) { if (isQuanX) { $prefs.valueForKey(key) } if (isLoon) { $persistentStore.read(key) } }, log: function (msg) { return console.log("📕" + msg) } }; function adapterStatus(response) { if (response) { if (response.status) { response["statusCode"] = response.status } else if (response.statusCode) { response["status"] = response.statusCode } } return response } return obj };


