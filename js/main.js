const API_KEY = "0c94401fb333b60c5bb57af1f0af56d6";
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;

const $home = document.querySelector(".menu__list");
const $weatherMonth = document.querySelector(".weather__month");
const $weatherDay = document.querySelector(".weather__day");
const $weatherWeek = document.querySelector(".weather__week");
const $weatherHours = document.querySelector(".weather__hours");
const $weatherMinute = document.querySelector(".weather__minute");
const $weather = document.querySelector(".weather");
const $weatherSecond = document.querySelector(".weather__second");
const $weatherAmPm = document.querySelector(".weather__ampm");
const $weatherGeo = document.querySelector(".weather__geo");
const $weatherImage = document.querySelector(".weather__image");
const $weatherMain = document.querySelector(".weather__main");
const $weatherTemp = document.querySelector(".weather__temp");
const $weatherRh = document.querySelector(".weather__rh");
const $contactList = document.querySelector("#contact__list");
const $contactGithub = document.querySelector(".contact__github");
const $contactGmail = document.querySelector(".contact__gmail");

const $profileMenuList = document.querySelector(".profile__menu__list");
const $projectLink = document.querySelector(".project__link");
const $project = document.querySelector(".project");
const $projects = document.querySelectorAll(".project");
const $items = document.querySelector(".items");
const $textarea = document.querySelector(".emailAddress");

const WEATHER__RESET = 1000 * 60 * 10;
// const $todoSearchBox = document.querySelector('.todo__searchBox');

let clock = false;

weather();

// weather
function weather() {
   const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
   const date = new Date();
   const days = date.getDay();
   const month = date.getMonth();
   const dates = date.getDate();
   const hours = date.getHours();
   const minute = date.getMinutes();
   const seconds = date.getSeconds();

   // console.log(month);

   $weatherWeek.textContent = day[days];
   $weatherMonth.textContent = parseToDateAndTime(month + 1);
   $weatherDay.textContent = String(dates).padStart(2, "0");
   $weatherHours.textContent = String(hours).padStart(2, "0");
   $weatherMinute.textContent = String(minute).padStart(2, "0");
   $weatherSecond.textContent = String(seconds).padStart(2, "0");
}

function parseToDateAndTime(object) {
   return object.toString().padStart(2, "0");
}

function flash() {
   const hasActiveClock = $weather.classList.contains("weather__active");

   if (hasActiveClock) {
      $weather.classList.remove("weather__active");
   } else {
      $weather.classList.add("weather__active");
   }
}

// $weatherMain.textContent = date.

function onGeoOk(position) {
   console.log("onGeoOk");
   const lat = position.coords.latitude;
   const lon = position.coords.longitude;
   const url = WEATHER_URL + `&lat=${lat}&lon=${lon}`;

   fetch(url)
      .then((response) => {
         return response.json();
      })
      .then((data) => {
         // console.log(data);
         let weather = data.weather[0].main;
         const temp = data.main.temp;
         const humidity = data.main.humidity; //습도

         switch (weather) {
            case "Clear":
            case "few clouds":
            case "scattered clouds":
            case "shower rain":
            case "Rain":
            case "Thunderstorm":
            case "Snow":
               const selectedWeather = weather
                  .toLowerCase()
                  .replaceAll(" ", "_");
               $weatherImage.setAttribute(
                  "src",
                  `images/weather/${selectedWeather}.png`
               );
               break;
            default:
               $weatherImage.setAttribute("src", "images/weather/fog.png");
         }

         // console.log(name, weather, temp, country, humidity);
         if (weather === "Thunderstorm") {
            weather = "Thunder";
         } else if (weather === "scattered clouds") {
            weather = "Clouds";
         } else if (weather === "few clouds") {
            weather = "Clouds";
         } else if (weather === "shower rain") {
            weather = "Rain";
         }
         $weatherMain.textContent = weather;
         $weatherTemp.textContent = Math.round(temp);
         $weatherRh.textContent = humidity;
      });
}
function onGeoError(position) {
   alert("can't find you. No weather for you.");
   console.log(position);
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

setInterval(() => {
   navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
}, WEATHER__RESET);

setInterval(() => {
   weather();
}, 1000);

setInterval(() => {
   flash();
}, 500);

// ----------------------------------------------------------

$profileMenuList.addEventListener("click", (e) => {
   let target = e.target.dataset.id;
   if (e.target.tagName === "SPAN") {
      target = e.target.parentNode.dataset.id;
      if (target === "project") {
         target = "work";
      }
   }
   // console.log(target);
   location.href = "sub.html?menu=" + target;
});

$contactGithub.addEventListener("click", (e) => {
   window.open("https://github.com/J-Plum");
});
$contactGmail.addEventListener("click", (e) => {
   const temp = document.createElement("textarea");
   document.body.appendChild(temp);
   temp.value = "Dev.J.Plum@gmail.com";
   temp.select();
   document.execCommand("copy");
   document.body.removeChild(temp);
   alert("이메일 주소 복사 완료");
   const loaction = window.confirm("바로 메일을 보내시겠습니까?");
   if (loaction) {
      alert(
         "잠시후 gmail 새창이 열립니다..\n열리지 않는다면 팝업을 확인해주세요"
      );
      setTimeout(() => {
         window.open("https://mail.google.com/mail/u/0/#inbox?compose=new");
      }, 2000);
   }
});

$projects.forEach((e) => {
   e.addEventListener("click", (e) => {
      const target = e.target.getAttribute("alt");
      console.log(target);
      // console.log(target);
      if (target === "paint") {
         window.open("js/Project/Front-end/js-Paint/index.html");
      } else if (target === "shooting game") {
         window.open("js/Project/Front-end/js-game/index.html");
      } else if (target === "coordinates") {
         window.open("js/Project/Front-end/js-coordinates/index.html");
      }
   });
});

$projectLink.addEventListener("click", () => {
   location.href = "sub.html";
});

// Project
$(function () {
   let project_index = 1;
   $(".project__row").append($(".project").first().clone());
   $(".project__row").prepend($(".project").eq(-2).clone());

   $(".project__row > div").click(function () {
      project_index = $(this).index();
   });

   moveSlide(project_index);
   $(".slide__button > img").click(function () {
      const btn = $(this).attr("class");
      // console.log(btn);
      if (btn === "left_btn") {
         if (project_index > 1) {
            project_index--;
            moveSlide(project_index);
         } else {
            $(".project__row").css("left", -2350);
            project_index = 4;
            moveSlide(project_index);
         }
      } else if (btn === "right_btn") {
         if (project_index < 4) {
            project_index++;
            moveSlide(project_index);
         } else {
            $(".project__row").css("left", 0);
            project_index = 1;
            moveSlide(project_index);
         }
      } else {
         // console.error('error')
      }
   });

   function moveSlide(index) {
      $(".project__row").animate(
         {
            left: -(index * 470),
         },
         300
      );
   }
});
