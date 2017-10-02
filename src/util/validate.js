function isUndefined(object) {
    return typeof (object) === 'undefined';
}

function unescapeHtml(str) {
    var s = "";
    if(str.length == 0) return "";
    s = str.replace(/&amp;/g,"&");
    s = s.replace(/&lt;/g,"<");
    s = s.replace(/&gt;/g,">");
    s = s.replace(/&nbsp;/g," ");
    s = s.replace(/&#39;/g,"\'");
    s = s.replace(/&quot;/g,"\"");
    return s;
}

export default {
    isUndefined: isUndefined,
    unescapeHtml: unescapeHtml
};