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

const form = document.getElementById("form");

form.addEventListener("submit", () => {
  if (document.getElementById("status").checked) {
    document.getElementById("statusHidden").disabled = true;
  }
});

var date1 = document.getElementById("startTime");
var date2 = document.getElementById("endTime");

if (date2.value == undefined) {
  date2.defaultValue = "0000-00-00 00:00:00.000000";
}

function calculateTime() {
  var timeStart = new Date(date1.value).getTime();
  var timeEnd = new Date(date2.value).getTime();

  if (timeStart <= timeEnd && date2.value !== undefined) {
    var hourDiff = timeEnd - timeStart; //in ms
    var secDiff = hourDiff / 1000; //in s
    var minDiff = hourDiff / 60 / 1000; //in minutes
    var hDiff = hourDiff / 3600 / 1000; //in hours
    var humanReadable = {};
    humanReadable.hours = Math.floor(hDiff);
    humanReadable.minutes = minDiff - 60 * humanReadable.hours;
    timeElapsed.value = `${humanReadable.hours} hrs ${humanReadable.minutes} min`;
  } else if (timeStart > timeEnd) {
    timeElapsed.value = "Fechas Inválidas";
  } else {
  }
}

date1.addEventListener("change", calculateTime);
date2.addEventListener("change", calculateTime);

equipmentSelect = document.getElementById("equipment");
equipmentOptions = document.querySelectorAll(".equipmentOptions");
specialtySelect = document.getElementById("specialty");
specialtyOptions = document.querySelectorAll(".specialtyOptions");
failureSelect = document.getElementById("failure");
failureOptions = document.querySelectorAll(".failureOptions");

equipmentSelect.onchange = function (event) {
  var equipmentid =
    event.target.options[event.target.selectedIndex].dataset.equipmentid;

  specialtySelect.value = "";
  failureSelect.value = "";

  for (let i = 0; i < specialtyOptions.length; i++) {
    if (specialtyOptions[i].dataset.specequipmentid !== equipmentid) {
      specialtyOptions[i].style.display = "none";
      failureOptions[i].style.display = "none";
    } else {
      specialtyOptions[i].style.display = "block";
      failureOptions[i].style.display = "none";
    }
  }
};

specialtySelect.onchange = function (event) {
  var specialtyId =
    event.target.options[event.target.selectedIndex].dataset.specialtyid;

  failureSelect.value = "";

  for (let i = 0; i < failureOptions.length; i++) {
    if (failureOptions[i].dataset.failurespecialtyid !== specialtyId) {
      failureOptions[i].style.display = "none";
    } else {
      failureOptions[i].style.display = "block";
    }
  }
};

editUserForm = document.querySelector(".editUserForm")

editUserForm.addEventListener("submit", (e)=>{
  e.preventDefault()

  if (document.getElementById("password").value === document.getElementById("confirm-password").value) {
    editUserForm.submit();
  } else {
    alert("Las contraseñas no coinciden")
    document.getElementById("password").value = ""
    document.getElementById("confirm-password").value = ""
  }
});
