let smartPhones = [
   "iphone",
   "ipod",
   "ipad",
   "opera mini",
   "opera mobi",
   "nokia",
   "android",
   "webos",
   "windows ce",
   "blackberry",
   "iemobile",
   "sonyericssion",
];

// alert(navigator.userAgent());

for (let i in smartPhones) {
   if (navigator.userAgent.toLowerCase().match(new RegExp(smartPhones[i]))) {
      document.location = "http://jplum.dothome.co.kr/m_index.html";
   }
}

// smartPhones.forEach((e) => {
//    if (navigator.userAgent.toLowerCase().match(new RegExp(e))) {
//    }
// });
