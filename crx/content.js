// Extract indicators from HTML content
chrome.runtime.onMessage.addListener(function(msg, sender, response) {
    if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
        var allHTML = document.documentElement.innerHTML;
        var re_ipv4 = /\b(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(?:\\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){3}\b/g;
        var re_md5 = /\b[A-Fa-f0-9]{32}\b/g;
        var re_sha1 = /\b[A-Fa-f0-9]{40}\b/g;
        var re_sha256 = /\b[A-Fa-f0-9]{64}\b/g;
        var domInfo = {
            url: window.location.href,
            title: document.title,
            ipv4: allHTML.match(re_ipv4),
            md5: allHTML.match(re_md5),
            sha1: allHTML.match(re_sha1),
            sha256: allHTML.match(re_sha256)
        };
        response(domInfo);
    }
});
