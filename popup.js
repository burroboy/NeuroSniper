document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('getter-button').addEventListener(
        'click', buttonPress)
});

chrome.storage.local.get(["user", "assignment", "supervoxel", "comment"], function(results) {
    document.getElementById("user").value = typeof results.user !== "undefined" ? results.user : "";
    document.getElementById("assignment").value = typeof results.assignment !== "undefined" ? results.assignment : "";
    document.getElementById("supervoxel").value = typeof results.supervoxel !== "undefined" ? results.supervoxel : "";
    document.getElementById("comment").value = typeof results.comment !== "undefined" ? results.comment : "";
});

window.onload = function() {
    document.getElementById("user").addEventListener('change', function () {
        let user = document.getElementById("user").value;
        chrome.storage.local.set({"user": user}, function () {
            console.log("Changing user: " + user);
        });
    });

    document.getElementById("assignment").addEventListener('change', function () {
        let assignment = document.getElementById("assignment").value;
        chrome.storage.local.set({"assignment": assignment}, function () {
            console.log("Changing assignment: " + assignment);
        });
    });

    document.getElementById("supervoxel").addEventListener('change', function () {
        let supervoxel = document.getElementById("supervoxel").value;
        chrome.storage.local.set({"supervoxel": supervoxel}, function () {
            console.log("Changing supervoxel: " + supervoxel);
        });
    });

    document.getElementById("comment").addEventListener('change', function () {
        let comment = document.getElementById("comment").value;
        chrome.storage.local.set({"comment": comment}, function () {
            console.log("Changing comment: " + comment);
        });
    });
};


function buttonPress () {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "origin-data"}, function (response) {
            let user = document.getElementById("user").value? document.getElementById("user").value: "";
            let assignment = document.getElementById("assignment").value? document.getElementById("assignment").value: "";
            let supervoxel = document.getElementById("supervoxel").value? document.getElementById("supervoxel").value: "";
            let comment = document.getElementById("comment").value? document.getElementById("comment").value: "";
            let x = response.x? response.x: "";
            let y = response.y? response.y: "";
            let z = response.z? response.z: "";
            let text = user+"\t"+
                       response.segID+"\t"+
                       assignment+"\t"+
                       supervoxel+"\t"+
                       x+", "+y+", "+z+"\t"+
                       comment;
            console.log("pressed button");
            console.log(text);

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