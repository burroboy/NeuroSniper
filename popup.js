function copyToClipboard (text) {
    var sheetString = document.createElement('input');
    document.body.appendChild(sheetString);
    sheetString.setAttribute('value', text);
    sheetString.focus();
    sheetString.select();
    document.execCommand('Copy');
    document.body.removeChild(sheetString);
}

function getCoordinateValue (coordinate) {
    var inputs = document.querySelectorAll('input.position-status-coord');
    console.log(inputs)
    for(var input in inputs) {
        if( input.previousSibling === coordinate) {
            return input.value;
        }
    }
    return '';
}

function getPosition () {
    var pos = {};
    pos['x'] = getCoordinateValue('x');
    pos['y'] = getCoordinateValue('y');
    pos['z'] = getCoordinateValue('z');
    return pos;
}

function getReportData (){
    var text = '';
    var pos = getPosition();
    text = pos['x'].toString() + '\t'
         + pos['y'].toString() + '\t'
         + pos['z'].toString() + '\t';
    copyToClipboard(text);
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('getter-button').addEventListener(
        'click', getReportData)
});