chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type === "origin-data")
            var prefixes = request.prefixes;
            prefixes = prefixes.match(/\d+/g);
            let pos = getPosition();
            let segmentationID = { "segID": getSegmentationID(prefixes)};
            let data = Object.assign({}, pos, segmentationID);
            console.log(data);
            sendResponse(data);
    });

function getPosition () {
    var pos = {};
    pos["x"] = getCoordinateValue("x");
    pos["y"] = getCoordinateValue("y");
    pos["z"] = getCoordinateValue("z");
    return pos;
}

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

function getSegmentationID (prefixes){
    let url = window.location.href;
    let re = /(?<=segmentation'_'segments':\[)[^\]]*/i;
    let text = url.match(re)? url.match(re)[0]: "";
    if (text === ""){
        return "";
    }
    let arr = text.match(/\d+/g);
    if (prefixes === null){
        return arr[0];
    }
    if(arr.length === 0) {
        return null;
    } else if (arr.length === 1 && arr){
        return arr[0];
    } else {
        for( var i = 0; i < arr.length; i++){
            for( var j = 0;  j < arr.length; j++ ){
                if(i !== j) {
                    if(in_prefix_set(arr[i], arr[j], prefixes)){
                        return arr[j];
                    } else if (in_prefix_set(arr[j], arr[i], prefixes)){
                        return arr[i];
                    }
                }
            }
        }

        // Reaches this if no string is found as a substring of another
        console.log("Returning first segmentation id as the default: " + arr[0]);
        return arr[0];
    }
}

function in_prefix_set(segId, root, prefixes){
    for(prefix of prefixes){
        if(segId === prefix + root){
            return true
        }
    }
    return false
}