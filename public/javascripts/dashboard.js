dayjs.locale("es-us");

const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("mode") == "light") {
    document.body.classList.toggle("light-theme-variables");
    themeToggler.querySelector("span:nth-child(1)").classList.toggle("active");
    themeToggler.querySelector("span:nth-child(2)").classList.toggle("active");
  }
});

menuBtn.addEventListener("click", () => {
  sideMenu.classList.remove("no-sidebar");
  sideMenu.classList.add("sidebar-visible");
});

closeBtn.addEventListener("click", () => {
  sideMenu.classList.remove("sidebar-visible");
  sideMenu.classList.add("no-sidebar");
});

themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("light-theme-variables");
  themeToggler.querySelector("span:nth-child(1)").classList.toggle("active");
  themeToggler.querySelector("span:nth-child(2)").classList.toggle("active");

  if (localStorage.getItem("mode") == "dark") {
    localStorage.setItem("mode", "light");
  } else {
    localStorage.setItem("mode", "dark");
  }
});

Date.prototype.toDateInputValue = function () {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};

document.getElementById("date").value = new Date().toDateInputValue();

let openReportCount = parseInt(
  document.getElementById("openReportCount").textContent
);
let closedReportCount = parseInt(
  document.getElementById("closedReportCount").textContent
);
let totalReportCount = parseInt(
  document.getElementById("totalReportCount").textContent
);
let openReportProgressCircle = document.getElementById("openReportProgress");
let closedReportProgressCircle = document.getElementById(
  "closedReportProgress"
);

let openReportPercentage = (openReportCount * 100) / totalReportCount;
let closedReportPercentage = (closedReportCount * 100) / totalReportCount;

document.getElementById("openReportPercentage").textContent = `${Math.round(
  openReportPercentage
)}%`;
document.getElementById("closedReportPercentage").textContent = `${Math.round(
  closedReportPercentage
)}%`;

openReportProgressCircle.style.strokeDashoffset =
  38 * 6 - (38 * 6 * Math.round(openReportPercentage)) / 100;
closedReportProgressCircle.style.strokeDashoffset =
  38 * 6 - (38 * 6 * Math.round(closedReportPercentage)) / 100;

let timestamp = document.querySelectorAll(".timestamp");

timestamp.forEach((element) => {
  date = new Date(parseInt(element.textContent));
  console.log(date);
  element.textContent = dayjs(date).fromNow();
});
