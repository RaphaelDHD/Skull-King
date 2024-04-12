function Nav() {
    if (document.querySelector(".sidepanel").style.width < '100px') {
        document.querySelector(".sidepanel").style.width = '45%';
        document.getElementById("Classement").style.right = '43%';
        document.querySelector('.sidepanel').setAttribute('id', 'active');
    }
    else {
        document.querySelector(".sidepanel").style.width = "0";
        document.getElementById("Classement").style.right = '-2%';
        document.querySelector(".sidepanel").setAttribute('id', '');
    }

}

function loadURL() {
    let test = getCurrentURL();
    let pseudo = document.querySelector(".hide").innerHTML;
    let url = test.substring(0,test.length-4) + ':8080/games/skullking?pseudo=' + pseudo;
    console.log(url);
    document.querySelector("#jouerBTN").href = url;
}

function getCurrentURL() {
    return window.location.origin
}