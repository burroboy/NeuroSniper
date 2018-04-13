document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('getter-button').addEventListener(
        'click', buttonPress)
});

window.onloadstart = function() {
    document.getElementById("user").addEventListener('change', function () {
        console.log('user changes');
    });
}

function buttonPress () {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "origin-data"}, function (response) {
            let user = document.getElementById("user").value;
            let assignment = document.getElementById("assignment").value;
            let supervoxel = document.getElementById("supervoxel").value;
            let comment = document.getElementById("comment").value;
            let text = user+"\t"+
                       response.segID+"\t"+
                       assignment+"\t"+
                       supervoxel+"\t"+
                       response.x+","+response.y+","+response.z+"\t"+
                       comment;

            copyToClipboard(text);
        });
    });
}

function copyToClipboard (text) {
    var sheetString = document.createElement('input');
    document.body.appendChild(sheetString);
    sheetString.setAttribute('value', text);
    sheetString.focus();
    sheetString.select();
    document.execCommand('Copy');
    document.body.removeChild(sheetString);
}