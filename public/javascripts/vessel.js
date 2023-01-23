window.addEventListener("load", () => {
  if (localStorage.getItem("mode") == "light") {
    document.body.classList.toggle("light-theme-variables");
  }
});

const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
menuBtn.addEventListener("click", () => {
  sideMenu.classList.remove("no-sidebar");
  sideMenu.classList.add("sidebar-visible");
});

closeBtn.addEventListener("click", () => {
  sideMenu.classList.remove("sidebar-visible");
  sideMenu.classList.add("no-sidebar");
});

let vesselInput = document.getElementById("vessel");
let vesselIdInput = document.getElementById("vesselID")

vesselInput.addEventListener("keyup", ()=>{
  let acronym = vesselInput.value.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')
  vesselIdInput.value = acronym.toUpperCase()
})
