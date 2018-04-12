chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // console.log("Recieved messages");
        // console.log(sender.tab ?
        //     "from a content script:" + sender.tab.url :
        //     "from the extension");
        console.log(getReportData());
        if (request.greeting == "hello")
            sendResponse({farewell: "goodbye"});
    });

function getCoordinateValue (coordinate) {
    let inputs = document.querySelectorAll("input.position-status-coord");
    for(let input of inputs) {
        if( input.previousSibling.textContent.trim() === coordinate) {
            console.log(input.value);
            return input.value;
        }
    }
    console.log("Nothing found at input for " + coordinate);
    return "";
}

function getPosition () {
    var pos = {};
    pos["x"] = getCoordinateValue("x");
    pos["y"] = getCoordinateValue("y");
    pos["z"] = getCoordinateValue("z");
    return pos;
}

function getReportData (){
    var pos = getPosition();
    var segmentationIDs = getSegmentationIDs();
    return text;
}

function getSegmentationIDs (){
    let url = window.location.href;
    let re = /(?<=segmentation'_'segments':\[)[^\]]*/i;
    var text = url.match(re)[0];
    arr = text.match(/[0-9]*/)
    return arr;
}
console.log(getSegmentationIDs());

function copyToClipboard (text) {
    var sheetString = document.createElement("input");
    document.body.appendChild(sheetString);
    sheetString.setAttribute("value", text);
    sheetString.focus();
    sheetString.select();
    document.execCommand("Copy");
    document.body.removeChild(sheetString);
}