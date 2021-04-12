const $ = new API("中青看点任务");
var cookies = [];
if ($.env.isNode) cookies = require('./YOUTH_Cookie.js');

!(async () => {

    for (let index = 0; index < cookies.length; index++) {
        console.log('\r\n*********开始执行第' + (index + 1) + '个账号******\r\n');
        var cookie = cookies[index];

        var url = 'https://kd.youth.cn:443/WebApi/NewTaskIos/sendTwentyScore?action=read_article_video_reward_five&' + cookie;
        var headers = {
            "Accept-Encoding": "gzip, deflate, br",
            "Connection": "keep-alive",
            "Content-Type": "",
            "Accept": "*\/*",
            "Host": "kd.youth.cn",
            "User-Agent": "Mozilla\/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit\/605.1.15 (KHTML, like Gecko) Mobile\/15E148",
            "Accept-Language": "zh-cn",
            "X-Requested-With": "XMLHttpRequest"
        };
        var body = ``;

        var myRequest = {
            url: url,
            headers: headers,
            body: body
        };

        //阅读5篇新闻奖励
        $.http.get(myRequest).then(response => {
            console.log('【阅读5篇新闻奖励】:' + unescape(response.body.replace(/\\/g, "%")));
        })

        await $.wait(1000);

        //阅读20篇新闻奖励
        myRequest.url = myRequest.url.replace('read_article_video_reward_five', 'watch_article_reward');
        $.http.get(myRequest).then(response => {
            console.log('【阅读20篇新闻奖励】:' + unescape(response.body.replace(/\\/g, "%")));
        })

        await $.wait(1000);

        //看20个视频奖励
        myRequest.url = myRequest.url.replace('watch_article_reward', 'watch_video_reward');
        $.http.get(myRequest).then(response => {
            console.log('【看20个视频奖励】:' + unescape(response.body.replace(/\\/g, "%")));
        })

        await $.wait(1000);

        //看5次福利视频
        await watch5Videos(cookie, myRequest);

        await $.wait(1000);

        //看5次福利视频奖励
        myRequest.url = myRequest.url.replace('watch_video_reward', 'new_fresh_five_video_reward');
        $.http.get(myRequest).then(response => {
            console.log('【看5次福利视频奖励】:' + unescape(response.body.replace(/\\/g, "%")));
        })

        await $.wait(1000);

        //每日签到
        myRequest.url = 'https://kd.youth.cn/WebApi/NewTaskIos/sign?is_install_tb=false&request_time=' + Math.round(new Date() / 1000) + '&' + cookie;
        myRequest.headers.Referer = "https://kd.youth.cn/h5/20190301taskcenter/ios/index.html?" + cookie;
        $.http.get(myRequest).then(response => {
            console.log('【每日签到】:' + unescape(response.body.replace(/\\/g, "%")));
        })

        await $.wait(1000);

        //打卡赚钱
        myRequest.url = 'https://kd.youth.cn/WebApi/PunchCard/doCard?' + cookie;
        myRequest.headers.Referer = "https://kd.youth.cn/h5/20190603cardactive/?" + cookie;
        $.http.post(myRequest).then(response => {
            console.log('【打卡赚钱】:' + unescape(response.body.replace(/\\/g, "%")));
        })

        await $.wait(1000);

        //打卡赚钱报名
        myRequest.url = 'https://kd.youth.cn:443/WebApi/PunchCard/signUp?' + cookie;
        myRequest.headers.Referer = "https://kd.youth.cn/h5/20190603cardactive/?" + cookie;
        $.http.post(myRequest).then(response => {
            console.log('【打卡赚钱报名】:' + unescape(response.body.replace(/\\/g, "%")));
        })

        await $.wait(1000);
    }


})().catch((e) => {
    console.log('', `❌失败! 原因: ${e}!`, '');
}).finally(() => {
    $.done();
})

//看5次福利视频
async function watch5Videos(cookie, myRequest) {
    return new Promise(async resolve => {
        let option = {
            url: 'https://kd.youth.cn/WebApi/NewTaskIos/recordNum?action=new_fresh_five_video_reward&' + cookie,
            headers: myRequest.headers,
            body: myRequest.body
        }

        for (let index = 0; index < 5; index++) {
            $.http.get(option).then(response => {
                console.log('【开始看第' + (index + 1) + '个福利视频】:' + unescape(response.body.replace(/\\/g, "%")));
            })
            await $.wait(1000);

        }
        resolve();
    })
}

/*********************************** API *************************************/
function ENV() { const e = "undefined" != typeof $task, t = "undefined" != typeof $loon, s = "undefined" != typeof $httpClient && !t, n = "function" == typeof require && "undefined" != typeof $jsbox, i = "function" == typeof require && !n, o = "undefined" != typeof $request, r = "undefined" != typeof importModule; return { isQX: e, isLoon: t, isSurge: s, isNode: i, isJSBox: n, isRequest: o, isScriptable: r } } function HTTP(e = { baseURL: "" }) { function t(t, u) { u = "string" == typeof u ? { url: u } : u; const c = e.baseURL; c && !a.test(u.url || "") && (u.url = c ? c + u.url : u.url), u.body && u.headers && !u.headers["Content-Type"] && (u.headers["Content-Type"] = "application/x-www-form-urlencoded"), u = { ...e, ...u }; const h = u.timeout, l = { onRequest: () => { }, onResponse: e => e, onTimeout: () => { }, ...u.events }; let f, d; if (l.onRequest(t, u), s) f = $task.fetch({ method: t, ...u }); else if (n || i || r) f = new Promise((e, s) => { const n = r ? require("request") : $httpClient; n[t.toLowerCase()](u, (t, n, i) => { t ? s(t) : e({ statusCode: n.status || n.statusCode, headers: n.headers, body: i }) }) }); else if (o) { const e = new Request(u.url); e.method = t, e.headers = u.headers, e.body = u.body, f = new Promise((t, s) => { e.loadString().then(s => { t({ statusCode: e.response.statusCode, headers: e.response.headers, body: s }) }).catch(e => s(e)) }) } const p = h ? new Promise((e, s) => { d = setTimeout(() => (l.onTimeout(), s(`${t} URL: ${u.url} exceeds the timeout ${h} ms`)), h) }) : null; return (p ? Promise.race([p, f]).then(e => (clearTimeout(d), e)) : f).then(e => l.onResponse(e)) } const { isQX: s, isLoon: n, isSurge: i, isScriptable: o, isNode: r } = ENV(), u = ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH"], a = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, c = {}; return u.forEach(e => c[e.toLowerCase()] = (s => t(e, s))), c } function API(e = "untitled", t = !1) { const { isQX: s, isLoon: n, isSurge: i, isNode: o, isJSBox: r, isScriptable: u } = ENV(); return new class { constructor(e, t) { this.name = e, this.debug = t, this.http = HTTP(), this.env = ENV(), this.node = (() => { if (o) { const e = require("fs"); return { fs: e } } return null })(), this.initCache(); const s = (e, t) => new Promise(function (s) { setTimeout(s.bind(null, t), e) }); Promise.prototype.delay = function (e) { return this.then(function (t) { return s(e, t) }) } } initCache() { if (s && (this.cache = JSON.parse($prefs.valueForKey(this.name) || "{}")), (n || i) && (this.cache = JSON.parse($persistentStore.read(this.name) || "{}")), o) { let e = "root.json"; this.node.fs.existsSync(e) || this.node.fs.writeFileSync(e, JSON.stringify({}), { flag: "wx" }, e => console.log(e)), this.root = {}, e = `${this.name}.json`, this.node.fs.existsSync(e) ? this.cache = JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)) : (this.node.fs.writeFileSync(e, JSON.stringify({}), { flag: "wx" }, e => console.log(e)), this.cache = {}) } } persistCache() { const e = JSON.stringify(this.cache, null, 2); s && $prefs.setValueForKey(e, this.name), (n || i) && $persistentStore.write(e, this.name), o && (this.node.fs.writeFileSync(`${this.name}.json`, e, { flag: "w" }, e => console.log(e)), this.node.fs.writeFileSync("root.json", JSON.stringify(this.root, null, 2), { flag: "w" }, e => console.log(e))) } write(e, t) { if (this.log(`SET ${t}`), -1 !== t.indexOf("#")) { if (t = t.substr(1), i || n) return $persistentStore.write(e, t); if (s) return $prefs.setValueForKey(e, t); o && (this.root[t] = e) } else this.cache[t] = e; this.persistCache() } read(e) { return this.log(`READ ${e}`), -1 === e.indexOf("#") ? this.cache[e] : (e = e.substr(1), i || n ? $persistentStore.read(e) : s ? $prefs.valueForKey(e) : o ? this.root[e] : void 0) } delete(e) { if (this.log(`DELETE ${e}`), -1 !== e.indexOf("#")) { if (e = e.substr(1), i || n) return $persistentStore.write(null, e); if (s) return $prefs.removeValueForKey(e); o && delete this.root[e] } else delete this.cache[e]; this.persistCache() } notify(e, t = "", a = "", c = {}) { const h = c["open-url"], l = c["media-url"]; if (s && $notify(e, t, a, c), i && $notification.post(e, t, a + `${l ? "\n多媒体:" + l : ""}`, { url: h }), n) { let s = {}; h && (s.openUrl = h), l && (s.mediaUrl = l), "{}" === JSON.stringify(s) ? $notification.post(e, t, a) : $notification.post(e, t, a, s) } if (o || u) { const s = a + (h ? `\n点击跳转: ${h}` : "") + (l ? `\n多媒体: ${l}` : ""); if (r) { const n = require("push"); n.schedule({ title: e, body: (t ? t + "\n" : "") + s }) } else console.log(`${e}\n${t}\n${s}\n\n`) } } log(e) { this.debug && console.log(`[${this.name}] LOG: ${this.stringify(e)}`) } info(e) { console.log(`[${this.name}] INFO: ${this.stringify(e)}`) } error(e) { console.log(`[${this.name}] ERROR: ${this.stringify(e)}`) } wait(e) { return new Promise(t => setTimeout(t, e)) } done(e = {}) { s || n || i ? $done(e) : o && !r && "undefined" != typeof $context && ($context.headers = e.headers, $context.statusCode = e.statusCode, $context.body = e.body) } stringify(e) { if ("string" == typeof e || e instanceof String) return e; try { return JSON.stringify(e, null, 2) } catch (e) { return "[object Object]" } } }(e, t) }
/*****************************************************************************/