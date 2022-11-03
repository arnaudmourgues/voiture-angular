var el = document.getElementById("showHide")

function myFunction() {
  window.alert("test");
}

if(el) {
  el.addEventListener('click', myFunction);
}else{
  window.alert("not find");
}
