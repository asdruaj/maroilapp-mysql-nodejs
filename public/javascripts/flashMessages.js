let flash = document.querySelector(".alert");
if (flash) {
  document.querySelector(".closebtn").addEventListener("click", () => {
    // Set the opacity of div to 0 (transparent)
    flash.style.opacity = 0;
    // Hide the div after 600ms (the same amount of milliseconds it takes to fade out)
    setTimeout(function () {
      flash.style.display = "none";
    }, 600);
  });
  if (localStorage.getItem("mode") == "light") {
    document.querySelector(".alert").style.background = "#ffab2cc5";
    document.querySelector(".alert").style.color = "#252525";
  }
}
