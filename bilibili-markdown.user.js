// ==UserScript==
// @name                    Bilibili-Markdown
// @namespace               https://github.com/LuckyPuppy514
// @version                 1.0.1
// @author                  LuckyPuppy514
// @copyright               2022, Grant LuckyPuppy514 (https://github.com/LuckyPuppy514)
// @license                 MIT
// @description             B站专栏 Markdown 编辑器
// @homepage                https://github.com/LuckyPuppy514/Bilibili-Markdown
// @icon                    http://article.biliimg.com/bfs/article/3e927f211d063b57cd39c4041ac2d07fd959726c.png
// @updateURL               https://greasyfork.org/zh-CN/scripts/452683-bilibili-markdown
// @downloadURL             https://greasyfork.org/zh-CN/scripts/452683-bilibili-markdown
// @match                   https://member.bilibili.com/article-text/home*
// @require                 https://unpkg.com/jquery@3.2.1/dist/jquery.min.js
// ==/UserScript==

"use strict";

console.log(`

🅱️Ⓜ️🅱️Ⓜ️🅱️Ⓜ️🅱️Ⓜ️🅱️Ⓜ️🅱️Ⓜ️🅱️Ⓜ️🅱️Ⓜ️🅱️Ⓜ️🅱️Ⓜ️🅱️Ⓜ️🅱️Ⓜ️
Ⓜ️                                                       🅱️
🅱️                   Bilibili-Markdown                   Ⓜ️
Ⓜ️                                                       🅱️
🅱️  https://github.com/LuckyPuppy514/Bilibili-Markdown   Ⓜ️
Ⓜ️                                                       🅱️
🅱️                  2022 @LuckyPuppy514                  Ⓜ️
Ⓜ️                                                       🅱️
🅱️Ⓜ️🅱️Ⓜ️🅱️Ⓜ️🅱️Ⓜ️🅱️Ⓜ️🅱️Ⓜ️🅱️Ⓜ️🅱️Ⓜ️🅱️Ⓜ️🅱️Ⓜ️🅱️Ⓜ️🅱️Ⓜ️

`);

// markdown 编辑器地址
// const BILIBILI_MARKDOWN_URL = "http://127.0.0.1:5500/web/tampermonkey/Bilibili-Markdown/index.html";
const BILIBILI_MARKDOWN_URL = "https://www.lckp.top/bilibili-markdown/index.html";
// id / name 公共前缀
const PREFIX = "bilibili-markdown-";
// 等待时间（ms）
const waitTime = {
    long: 2500,
    normal: 1000,
    short: 600,
};
// localStorage key
const key = {
    isMarkdown: "isMarkdown",
    isFullscreen: "isFullscreen"
}
// element id
const eid = {
    button: {
        switchToHtmlEditor: `${PREFIX}switch-to-html-editor-button`
    },
    iframe: {
        main: `${PREFIX}main-iframe`
    }
};
// element
const elements = {
    // 附加
    switchToMarkdownEditorButton: undefined,
    mainIframe: undefined,
    // 原有
    editorBox: undefined,
    loading: undefined,
    save: undefined,
    mbpreview: undefined
};
// class name
const cname = {
    fullscreen: `${PREFIX}fullscreen`,
    toast: `${PREFIX}toast`,
};
// z-index
const zIndex = {
    first: 999999,
    second: 999998
};
// display
const display = {
    none: "none",
    block: "block"
}

var needReload;
var bilibili;
var bilibiliMarkdown;

const CSS = `
/*切换 markdown 编辑器按钮*/
#${eid.button.switchToHtmlEditor} {
    font-size: 22px;
    border-width: 0px 1px 0px 0px;
    border-style: solid;
    border-color: white;
    margin-left: -9px;
    padding-right: 5px;
}
/*markdown 编辑器 iframe*/
#${eid.iframe.main} {    
    width: 100%;
    height: 480px;
    z-index: ${zIndex.second};
    border: none;
    display: none;
}
/*全屏*/
.${cname.fullscreen} {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    bottom: 0 !important;
    right: 0 !important;
    width: 100% !important;
    height: 100% !important;
    border: none !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
    z-index: ${zIndex.second} !important;
}
/*消息*/
.${cname.toast} {
    max-width: 60%;
    min-width: 160px;
    padding: 0 14px;
    height: 50px;
    color: rgb(255, 255, 255);
    line-height: 50px;
    text-align: center;
    border-radius: 4px;
    position: fixed;
    top: 6%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: ${zIndex.first};
    background: rgba(119, 199, 104, 0.9);
    font-size: 14px;
    box-shadow: 0px 0px 10px rgba(119, 199, 104, 0.9);
}
/*手机端预览*/
.preview-mask[data-v-e7c642f4],
.preview-mask .preview-content[data-v-e7c642f4] {
    padding-top: 35px !important;
    z-index: ${zIndex.first} !important;
}
`;
const HTML = `
<iframe id="${eid.iframe.main}" src="${BILIBILI_MARKDOWN_URL}"></iframe>
`;

function appendCSS() {
    let css = document.createElement("style");
    css.innerHTML = CSS.trim();
    document.head.appendChild(css);
}
function appendHTML() {
    let div = document.createElement("div");
    div.innerHTML = HTML.trim();
    document.getElementsByClassName("editor-wrap")[0].appendChild(div);
}
function appendSwitchToMarkdownEditorButton() {
    let button = document.createElement('li');
    button.id = eid.button.switchToHtmlEditor;
    button.className = 'toolbar-item left';
    button.innerHTML = 'Ⓜ️';
    document.getElementsByClassName('editor-toolbar clearfix')[0].prepend(button);
}
function getAllElement() {
    elements.switchToMarkdownEditorButton = document.getElementById(eid.button.switchToHtmlEditor);
    elements.mainIframe = document.getElementById(eid.iframe.main);

    elements.editorBox = document.getElementsByClassName("editor-box")[0];
    elements.save = document.getElementsByClassName("ui-btn white")[0];
    elements.mbpreview = document.getElementsByClassName("ui-btn white")[1];
    elements.loading = document.getElementById("loading");
    elements.loading.innerHTML = elements.loading.innerHTML.replace("玩儿命加载中", "处理中，请稍后");
    elements.loading.style.zIndex = zIndex.first;
}
function addListener() {
    elements.switchToMarkdownEditorButton.onclick = async function () {
        if (!bilibili.aid) {
            bilibili.aid = await bilibili.getAidFromLocalStorage();
        }
        if (bilibili.aid) {
            bilibili.switchToMarkdownEditor();
        } else {
            Toast("矮油，起码写个标题嘛~");
        }
    }
    elements.save.onclick = function () {
        if (localStorage.getItem(key.isMarkdown)) {
            bilibili.loading();
            setTimeout(() => {
                bilibiliMarkdown.save();
            }, waitTime.normal);
        }
    }
    elements.mbpreview.onclick = function () {
        if (localStorage.getItem(key.isMarkdown) && needReload) {
            setTimeout(() => {
                bilibiliMarkdown.save();
                bilibili.mbpreview();
            }, waitTime.normal);
        }
    }
}
// 显示消息
function Toast(msg, duration) {
    duration = isNaN(duration) ? 2000 : duration;
    let div = document.createElement("div");
    div.innerHTML = msg;
    div.className = cname.toast;
    document.body.appendChild(div);
    setTimeout(function () {
        div.style.opacity = "0";
        setTimeout(function () { document.body.removeChild(div) }, 500);
    }, duration);
}

class Bilibili {
    constructor() {
        this.api = {
            upcover: "https://api.bilibili.com/x/article/creative/article/upcover",
            addupdate: "https://api.bilibili.com/x/article/creative/draft/addupdate",
        }
        this.page = {
            edit: "https://member.bilibili.com/platform/upload/text/edit",
            pcpreview: "https://www.bilibili.com/read/pcpreview",
            home: "https://member.bilibili.com/article-text/home"
        }
        this.csrf = this.getCsrf();
        this.aid = this.getAidFromLocation();
        this.addListener();
    }
    getCsrf() {
        let cookie = document.cookie;
        let csrf = cookie.substring(cookie.indexOf("bili_jct"));
        csrf = csrf.substring(9, csrf.indexOf(";"));
        return csrf;
    }
    getAidFromLocation() {
        let aid = undefined;
        let aids = window.location.href.match(/aid=[0-9]+/g);
        if (aids && aids.length > 0) {
            aid = aids[0].replace("aid=", "");
        }
        if (aid && aid.toString().length > 5) {
            return aid;
        }
        return undefined;
    }
    async getAidFromLocalStorage() {
        let aid = undefined;
        // 等待 TIMEOUT_TIME 后读取 localStorage (更新需要时间)
        this.loading();
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                aid = JSON.parse(localStorage.bili_localDraft).id;
                resolve();
            }, waitTime.long);
        })
        this.hideLoading();

        if (aid && aid.toString().length > 5) {
            // 新建专栏跳转编辑页面
            if (window.location.href.endsWith("?")) {
                top.location.href = this.page.edit + "?aid=" + aid;
            }
            return aid;
        }
        return undefined;
    }
    addListener() {
        window.addEventListener("message", function (event) {
            bilibili[event.data.method](event.data.param);
        }, false);
    }
    switchToMarkdownEditor() {
        localStorage.setItem(key.isMarkdown, true);
        elements.mainIframe.style.display = display.block;
        elements.editorBox.style.display = display.none;
        if (localStorage.getItem(key.isFullscreen)) {
            localStorage.removeItem(key.isFullscreen);
            this.switchToFullscreen();
        }
    }
    switchToHtmlEditor() {
        localStorage.removeItem(key.isMarkdown);
        elements.mainIframe.style.display = display.none;
        elements.editorBox.style.display = display.block;
        document.body.style.overflowY = "";
        if (needReload) {
            needReload = false;
            location.reload();
        }
    }
    switchToFullscreen(param) {
        if (param && param.isFullscreen != undefined) {
            if (param.isFullscreen === true) {
                fullscreen();
                if (top != self) {
                    top.location.href = bilibili.page.home + "?aid=" + bilibili.aid;
                }
            } else {
                exitFullscreen();
            }
        } else {
            if (localStorage.getItem(key.isFullscreen)) {
                exitFullscreen();
            } else {
                fullscreen();
            }
        }

        function fullscreen() {
            localStorage.setItem(key.isFullscreen, true);
            elements.mainIframe.className = cname.fullscreen;
            document.body.style.overflowY = "hidden";
        }
        function exitFullscreen() {
            localStorage.removeItem(key.isFullscreen);
            elements.mainIframe.className = "";
            document.body.style.overflowY = "";
        }
    }
    loading() {
        elements.loading.style.display = display.block;
        setTimeout(this.hideLoading, waitTime.long);
    }
    hideLoading() {
        elements.loading.style.display = display.none;
    }
    pcpreview() {
        window.open(this.page.pcpreview + "?aid=" + this.aid);
    }
    mbpreview() {
        if (needReload) {
            localStorage.setItem(key.needMbpreview, true);
            location.reload();
        } else {
            localStorage.removeItem(key.needMbpreview);
            document.getElementsByClassName("ui-btn white")[1].click();
        }
    }
    appendImage(param) {
        bilibiliMarkdown.appendImage(this.uploadImage(param.image));
    }
    toBLink(param) {
        this.loading();
        let link = param.link;
        let xhr = new XMLHttpRequest();
        xhr.open("get", link, true);
        xhr.responseType = "blob";
        xhr.onload = function () {
            let image = new File([xhr.response], link.substring(link.lastIndexOf('/') + 1));
            let bLink = bilibili.uploadImage(image);
            bilibiliMarkdown.toBLink(link, bLink);
            bilibili.hideLoading();
        }
        xhr.send();
    }
    uploadImage(image) {
        let bLink = "图片上传B站失败，请重试";
        let formData = new FormData();
        formData.append("binary", image);
        formData.append("csrf", this.csrf);
        $.ajax({
            type: "POST",
            contentType: false,
            processData: false,
            async: false,
            data: formData,
            url: bilibili.api.upcover,
            xhrFields: {
                withCredentials: true
            },
            success: function (res) {
                if (res && res.data) {
                    bLink = res.data.url;
                } else {
                    Toast("上传失败：" + JSON.stringify(res));
                }
            }
        })
        return bLink;
    }
    tableToImage(html, tables) {
        if (tables && tables.size > 0) {
            for (let [oldHtml, image] of tables) {
                let bLink = this.uploadImage(image);
                let newHtml = `<figure contenteditable="false" class="img-box"><img referrerpolicy="no-referrer" src="${bLink}"><figcaption class="caption" contenteditable="false"></figcaption></figure>`;
                html = html.replaceAll(oldHtml, newHtml);
            }
        }
        return html;
    }
    save(param) {
        let html = param.html ? param.html : "";
        // 保存到本地
        localStorage.setItem(PREFIX + this.aid, param.markdown);
        // 表格转图片
        html = this.tableToImage(html, param.tables);
        // 提取内容
        let words = html.replace(/<(h[1-6]|code)[^>]*>[^<]*<\/\1>/g, "")
            .replace(/<[^>]*>/g, "")
            .replace(/[\s| |\n\|\r]*/g, "");
        // 提取总结
        let summary = words.slice(0, 100);
        // B站接口参数
        let biliLocalDraft = JSON.parse(localStorage.bili_localDraft);
        $.ajax({
            type: "POST",
            data: {
                title: biliLocalDraft.title,
                content: html,
                summary: summary,
                words: words.length,
                category: biliLocalDraft.category,
                list_id: biliLocalDraft.list_id,
                tid: biliLocalDraft.template.id,
                reprint: 0,
                media_id: biliLocalDraft.media_id,
                spoiler: biliLocalDraft.is_spoiler ? "1" : "0",
                original: biliLocalDraft.isOriginal,
                aid: biliLocalDraft.id,
                csrf: this.csrf
            },
            url: bilibili.api.addupdate,
            xhrFields: {
                withCredentials: true
            },
            success: function (res) {
                bilibili.hideLoading();
                if (res && res.code == 0) {
                    if (localStorage.getItem(key.needMbpreview)) {
                        location.reload();
                    } else {
                        needReload = true;
                        Toast(" 草稿已保存 ");
                    }
                } else {
                    Toast("保存失败: " + JSON.stringify(res));
                }
            },
            error: function(err){
                Toast("保存失败: " + JSON.stringify(err.message));
            }
        });
    }
}

class BilibiliMarkdown {
    constructor() {
        setTimeout(() => {
            this.hello();

            if (bilibili.aid) {
                if (localStorage.getItem(key.isMarkdown)) {
                    bilibili.switchToMarkdownEditor();
                }

                let markdown = localStorage.getItem(PREFIX + bilibili.aid);
                if (markdown) {
                    this.setMarkdown(markdown);
                }
                if (localStorage.getItem(key.needMbpreview)) {
                    bilibili.mbpreview();
                }
            }
        }, waitTime.short);
    }
    message(method, param) {
        elements.mainIframe.contentWindow.postMessage({ method: method, param: param }, BILIBILI_MARKDOWN_URL);
    }
    hello() {
        this.message(this.hello.name);
    }
    save() {
        this.message(this.save.name);
    }
    toBLink(link, bLink) {
        this.message(this.toBLink.name, { link: link, bLink: bLink });
    }
    appendImage(bLink) {
        this.message(this.appendImage.name, { bLink: bLink });
    }
    setMarkdown(markdown) {
        this.message(this.setMarkdown.name, { markdown: markdown });
    }
}

window.onload = function () {
    setTimeout(() => {
        let saveButton = document.getElementsByClassName("ui-btn white")[0];
        if(!saveButton || saveButton.innerHTML != "存草稿"){
            console.log("文章已提交");
            return;
        }

        appendCSS();
        appendHTML();
        appendSwitchToMarkdownEditorButton();
        getAllElement();
        addListener();

        bilibili = new Bilibili();
        bilibiliMarkdown = new BilibiliMarkdown();
    }, waitTime.short);
}
