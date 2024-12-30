"use strict";

// preloader

const preloader = document.querySelector("[data-preloader]");

window.addEventListener("DOMContentLoaded", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

// events on multiple events

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

// mobile navbar toggle

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

addEventOnElements(navTogglers, "click", function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
});

addEventOnElements(navLinks, "click", function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("nav-active");
});

//scroll from navToggler

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      const offset = targetId === "service" ? -100 : -22; // Offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = targetSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

//feature for header to show in every page

const header = document.querySelector("[data-header]");
window.addEventListener("scroll", function () {
  header.classList[window.scrollY > 100 ? "add" : "remove"]("active");
});

//photos tilt effect

const tiltElements = document.querySelectorAll("[data-tilt]");

const initTilt = function (event) {
  //get tilt element in center position

  const centerX = this.offsetWidth / 2;
  const centerY = this.offsetHeight / 2;

  const tiltPosY = ((event.offsetX - centerX) / centerX) * 10;
  const tiltPosX = ((event.offsetY - centerY) / centerY) * 10;

  this.style.transform = `perspective(1000px) rotateX(${tiltPosX}deg) rotateY(${
    tiltPosY - tiltPosY * 2
  }deg)`;
};

addEventOnElements(tiltElements, "mousemove", initTilt);

addEventOnElements(tiltElements, "mouseout", function () {
  this.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
});

//switching tabs in about section

const tabBtns = document.querySelectorAll("[data-tab-btn]");
const tabContents = document.querySelectorAll("[data-tab-content]");

let lastActiveTabBtn = tabBtns[0];
let lastActiveTabContent = tabContents[0];

const filterContent = function () {
  if (!(lastActiveTabBtn === this)) {
    lastActiveTabBtn.classList.remove("active");
    lastActiveTabContent.classList.remove("active");

    this.classList.add("active");
    lastActiveTabBtn = this;

    const currentTabContent = document.querySelector(
      `[data-tab-content="${this.dataset.tabBtn}"]`
    );

    currentTabContent.classList.add("active");
    lastActiveTabContent = currentTabContent;
  }
};

addEventOnElements(tabBtns, "click", filterContent);

const sliderList = document.querySelector(".slider-list");

let isDown = false;
let startX;
let scrollLeft;

sliderList.addEventListener("mousedown", (e) => {
  isDown = true;
  sliderList.classList.add("active");
  startX = e.pageX - sliderList.offsetLeft;
  scrollLeft = sliderList.scrollLeft;
});

sliderList.addEventListener("mouseleave", () => {
  isDown = false;
  sliderList.classList.remove("active");
});

sliderList.addEventListener("mouseup", () => {
  isDown = false;
  sliderList.classList.remove("active");
});

sliderList.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - sliderList.offsetLeft;
  const walk = (x - startX) * 3; // Adjust the scroll speed
  sliderList.scrollLeft = scrollLeft - walk;
});
