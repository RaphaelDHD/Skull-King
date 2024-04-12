function activePseudo() {
    if (document.getElementById("id").disabled) {
        document.getElementById("id").disabled = false;
        document.getElementById("sub3").style.display = "unset";  
        document.getElementById("sub").style.display = "none";      
    }
    else {
        document.getElementById("id").disabled = true;
        document.getElementById("sub3").style.display = "none"; 
        document.getElementById("sub").style.display = "unset";
    }
}

function activeMdp() {
    if (document.getElementById("pw").disabled) {
        document.getElementById("pw").disabled = false;
        document.getElementById("sub4").style.display = "unset";  
        document.getElementById("sub1").style.display = "none";      
    }
    else {
        document.getElementById("pw").disabled = true;
        document.getElementById("sub1").style.display = "none"; 
        document.getElementById("sub4").style.display = "unset";
    }
}

function viewMdp() {
    var psw = document.getElementById("pw");
    var image = document.getElementById("image");

    if(psw.type === "password") {
        psw.type = "text";
        image.src ="img/eye_open.png";
    } else {
        psw.type = "password";
        image.src ="img/eye_close.png";
    }
}

let queryString = window.location.search;
queryString = queryString.substring(7,queryString.length);
console.log(queryString);                                             

if(queryString == "false1") { 
    document.querySelector('#error').classList.remove('hide');
    setTimeout(function(){
        document.querySelector('#error').classList.add('hide');
    }, 2000);
}

if(queryString == "false2") { 
    document.querySelector('#error2').classList.remove('hide');
    setTimeout(function(){
        document.querySelector('#error2').classList.add('hide');
    }, 2000);
}

if(queryString == "false3") { 
    document.querySelector('#error3').classList.remove('hide');
    setTimeout(function(){
        document.querySelector('#error3').classList.add('hide');
    }, 2000);
}

