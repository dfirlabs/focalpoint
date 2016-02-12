function getCurrentTabContent(callback) {
    /**
     * Get current tab content and send to content script
     * @param callback - Callback function to send to the content script
     */
    var queryInfo = {
        active: true,
        currentWindow: true
    };
    chrome.tabs.query(queryInfo, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {from: 'popup', subject: 'DOMInfo'}, callback)
    });
}

function uniqueArray(array) {
    /**
     * Make array unique.
     * @param array - Array to make unique or null
     * @return array - Unique array
     */
    if(!array) {
        return []
    }
    return array.filter(function(elem, pos) {
        return array.indexOf(elem) == pos;
    });
}

function createDOMList(array, id) {
    /**
     * Create a <li> list and add to the DOM.
     * @param array - Array of values to add to the list
     * @param id - DOM ID selector
     */
    var unique_array = uniqueArray(array);
    var indicatorList = document.getElementById(id);
    for (var i = 0; i < unique_array.length; i++) {
        var listItem = document.createElement("li");
        var listValue = document.createTextNode(unique_array[i]);
        listItem.appendChild(listValue);
        indicatorList.appendChild(listItem)
    }

}

function createDOMContent(info) {
    /**
     * Create content for the popup window.
     * @param info - Object with extracted indicators.
     */
    document.getElementById("title").textContent = info.title;
    document.getElementById("url").textContent = info.url;
    createDOMList(info.ipv4, "ipv4");
    createDOMList(info.md5, "md5");
    createDOMList(info.sha1, "sha1");
    createDOMList(info.sha256, "sha256");
}

document.addEventListener('DOMContentLoaded', function() {
    getCurrentTabContent(createDOMContent)
});
