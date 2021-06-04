// JavaScript source code
var $tool = new tool();
var html = '<!DOCTYPE html><html lang="en"xmlns="http://www.w3.org/1999/xhtml"><head><meta charset="utf-8"/><title></title><script src="https://ajax.aspnetcdn.com/ajax/jquery/jquery-1.10.2.min.js"></script></head><body>测试:<input id="txtkey"type="text"/><input id="btn"type="button"value="测试"/></body></html>$("#btn").click(function(){var keyval=$("#txtkey").val();var a=$prefs.valueForKey("dyheadlist");console.log(a)})';


//$tool.get({ url: "https://gitee.com/passerby-b/javascript/raw/master/test/HTTP_backend.html" }, function (e, r, d) {
    //$done(d);
//});
try{
  //var str= $prefs.valueForKey('dyheadlist');
  //var str= $prefs.valueForKey('ksjs');
  //var str= $prefs.valueForKey('zqgetbody_body');
  //var str= $prefs.valueForKey('中青看点阅读');
  let str=`<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
    <title>默认点标记</title>
    <link rel="stylesheet" href="https://a.amap.com/jsapi_demos/static/demo-center/css/demo-center.css"/>
    <style>
        html, body, #container {
            height: 100%;
            width: 100%;
        }

        .amap-icon img,
        .amap-marker-content img{
            width: 25px;
            height: 34px;
        }

        .marker {
            position: absolute;
            top: -20px;
            right: -118px;
            color: #fff;
            padding: 4px 10px;
            box-shadow: 1px 1px 1px rgba(10, 10, 10, .2);
            white-space: nowrap;
            font-size: 12px;
            font-family: "";
            background-color: #25A5F7;
            border-radius: 3px;
        }

        .input-card{
            width: 18rem;
            z-index: 170;
        }

        .input-card .btn{
            margin-right: .8rem;
        }

        .input-card .btn:last-child{
            margin-right: 0;
        }
    </style>
</head>
<body>
<div id="container"></div>
<div class="input-card">
    <label style="color:grey">点标记操作</label>
    <div class="input-item">
        <input id="addMarker" type="button" class="btn" onclick="addMarker()" value="添加点标记">
        <input id="updateMarker" type="button" class="btn" onclick="updateIcon()" value="更新点标记图标">
    </div>
    <div class="input-item">
        <input id="clearMarker" type="button" class="btn" onclick="clearMarker()" value="删除点标记">
        <input id="updateMarker" type="button" class="btn" onclick="updateContent()" value="更新点标记内容">
    </div>
</div>
<script type="text/javascript"
        src="https://webapi.amap.com/maps?v=1.4.15&key=334650026fcf5b7ceb675e4c2f7eb7d1"></script>
<script type="text/javascript">
    var marker, map = new AMap.Map("container", {
        resizeEnable: true,
        center: [114.320079,30.472023],
        zoom: 13
    });

   
        marker = new AMap.Marker({
            icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
            position: [114.320079,30.472023],
            offset: new AMap.Pixel(-13, -30)
        });
        marker.setMap(map);
    
    

    // 清除 marker
    function clearMarker() {

        if (marker) {
            marker.setMap(null);
            marker = null;
        }
    }
</script>
</body>
</html>`
  $done(str);
}
catch(e){
  $done('erro'+e);
}

function tool() { var isLoon = typeof $httpClient != "undefined"; var isQuanX = typeof $task != "undefined"; var obj = { notify: function (title, subtitle, message, option) { var option_obj = {}; if (isQuanX) { if (!!option) { if (typeof option == "string") option_obj["open-url"] = option; if (!!option.url) option_obj["open-url"] = option.url; if (!!option.img) option_obj["media-url"] = option.img; $notify(title, subtitle, message, option_obj) } else { $notify(title, subtitle, message) } } if (isLoon) { if (!!option) { if (typeof option == "string") option_obj["openUrl"] = option; if (!!option.url) option_obj["openUrl"] = option.url; if (!!option.img) option_obj["mediaUrl"] = option.img; $notification.post(title, subtitle, message, option_obj) } else { $notification.post(title, subtitle, message) } } }, get: function (options, callback) { if (isQuanX) { if (typeof options == "string") options = { url: options }; options["method"] = "GET"; $task.fetch(options).then(function (response) { callback(null, adapterStatus(response), response.body) }, function (reason) { callback(reason.error, null, null) }) } if (isLoon) { $httpClient.get(options, function (error, response, body) { callback(error, adapterStatus(response), body) }) } }, post: function (options, callback) { if (isQuanX) { if (typeof options == "string") options = { url: options }; options["method"] = "POST"; $task.fetch(options).then(function (response) { callback(null, adapterStatus(response), response.body) }, function (reason) { callback(reason.error, null, null) }) } if (isLoon) { $httpClient.post(options, function (error, response, body) { callback(error, adapterStatus(response), body) }) } }, unicode: function (str) { return unescape(str.replace(/\\u/gi, '%u')) }, decodeurl: function (str) { return decodeURIComponent(str) }, json2str: function (obj) { return JSON.stringify(obj) }, str2json: function (str) { return JSON.parse(str) }, setdata: function (value, key) { if (isQuanX) { $prefs.setValueForKey(value, key) } if (isLoon) { $persistentStore.write(value, key) } }, getdata: function (key) { if (isQuanX) { $prefs.valueForKey(key) } if (isLoon) { $persistentStore.read(key) } }, log: function (msg) { return console.log("📕" + msg) } }; function adapterStatus(response) { if (response) { if (response.status) { response["statusCode"] = response.status } else if (response.statusCode) { response["status"] = response.statusCode } } return response } return obj };


