const buttonADD = document.querySelector('#add');
const inputADD = document.querySelector('#new');

function switchFunc(id) {
    if(!document.querySelector("#modify" + id).classList.contains("hide")) {
        document.querySelector("#modify" + id).classList.add('hideLite');
        document.querySelector("#newPseudo" + id).classList.remove('hide');

        setTimeout(function(){
            document.querySelector("#modify" + id).classList.remove('hideLite');
            document.querySelector("#newPseudo" + id).classList.add('hide');
        }, 5000);
    }
}

function switchFunc3(id) {
    if(!document.querySelector("#modifyScore" + id).classList.contains("hide")) {
        document.querySelector("#modifyScore" + id).classList.add('hideLite');
        document.querySelector("#newScore" + id).classList.remove('hide');

        setTimeout(function(){
            document.querySelector("#modifyScore" + id).classList.remove('hideLite');
            document.querySelector("#newScore" + id).classList.add('hide');
        }, 5000);
    }
}

function switchFunc2() {
    if(!buttonADD.classList.contains("hide")) {
        buttonADD.classList.add('hideLite');
        inputADD.classList.remove('hide');

        setTimeout(function(){
            buttonADD.classList.remove('hideLite');
            inputADD.classList.add('hide');
        }, 5000);
    }
}