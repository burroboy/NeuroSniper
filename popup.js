function copyToClipboard (text) {
    var sheetString = document.createElement('input');
    document.body.appendChild(sheetString);
    sheetString.setAttribute('value', text);
    sheetString.focus();
    sheetString.select();
    document.execCommand('Copy');
    document.body.removeChild(sheetString);
}

function getPosition () {
    return '1\t2\t3\t'
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('getter-button').addEventListener(
        'click', copyToClipboard('Test1'));
});