function confirmMdp() {
  const password = document.getElementById("pw");
  const confirm = document.getElementById("pw_conf");
  const longer = document.getElementById("id");
  console.log(password.value);
  console.log(confirm.value);
  if (confirm.value === password.value) {
    confirm.style.color = "black";
    console.log("noir");
    document.getElementById("errorPassword").style.display = "none";
    if (longer.value.length !== 0 && password.value.length !== 0 && confirm.value.length !== 0) {
      document.getElementById("sub").disabled = false;
    }
  } else {
    document.getElementById("errorPassword").style.display = "unset";
    confirm.style.color = "red";
    document.getElementById("sub").disabled = true;
    console.log("rouge");
  }
}

function confirmLonger() {
  const longer = document.getElementById("id");
  console.log(longer.value);
  if (longer.value.length >= 16 && longer.value !== "") {
    longer.style.color = "red";
    document.getElementById("sub").disabled = true;
    console.log("depassement");
    document.getElementById("errorPseudo").style.display = "unset";
  } else {
    longer.style.color = "black";
    document.getElementById('errorPseudo').style.display = 'none';
  }
}
