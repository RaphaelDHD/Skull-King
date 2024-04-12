let thumb = barre_noire.querySelector('.rond1');


thumb.onmousedown = function (event) {
    event.preventDefault(); // empeche le declenchement de la selection (action du navigateur)

    let shiftX = event.clientX - thumb.getBoundingClientRect().left;
    // on n'a pas besoin de shiftY , le pouce se deplace seulement horizontalement

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
        let newLeft = event.clientX - shiftX - barre_noire.getBoundingClientRect().left;

        // le pointeur est en dehors de la barre de defilement => bloque le pouce a l'interieur des limites
        if (newLeft < 0) {
            newLeft = 0;
        }
        let rightEdge = barre_noire.offsetWidth - thumb.offsetWidth;
        if (newLeft > rightEdge) {
            newLeft = rightEdge;
        }

        thumb.style.left = newLeft + 'px';

        document.querySelector('.pourcent').innerHTML = Math.trunc(newLeft/4.34) + "%";
    }

    function onMouseUp() {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
    }

};

thumb.ondragstart = function () {
    return false;
};

let thumb2 = barre_noire2.querySelector('.rond2');
thumb2.onmousedown = function (event) {
    event.preventDefault(); // empeche le declenchement de la selection (action du navigateur)

    let shiftX = event.clientX - thumb2.getBoundingClientRect().left;
    // on n'a pas besoin de shiftY , le pouce se deplace seulement horizontalement

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
        let newLeft = event.clientX - shiftX - barre_noire2.getBoundingClientRect().left;

        // le pointeur est en dehors de la barre de defilement => bloque le pouce a l'interieur des limites
        if (newLeft < 0) {
            newLeft = 0;
        }
        let rightEdge = barre_noire2.offsetWidth - thumb2.offsetWidth;
        if (newLeft > rightEdge) {
            newLeft = rightEdge;
        }

        thumb2.style.left = newLeft + 'px';

        document.querySelector('.pourcent1').innerHTML = Math.trunc(newLeft/4.34) + "%";
    }

    function onMouseUp() {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
    }

};

thumb2.ondragstart = function () {
    return false;
};

let queryString = window.location.search;
queryString = queryString.substring(6,queryString.length);
console.log(queryString);                                             

if(queryString == "true") { 
    document.querySelector('#succesfull').classList.remove('hide');
    setTimeout(function(){
        document.querySelector('#succesfull').classList.add('hide');
    }, 2000);
}