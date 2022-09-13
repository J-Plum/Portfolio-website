const horozontal = document.querySelector(".horozontal");
const vertical = document.querySelector(".vertical");
const target = document.querySelector(".target");
const lineHorozontal = document.querySelector(".horozontal");
const lineVertical = document.querySelector(".vertical");
const tag = document.querySelector(".tag");

window.addEventListener("load", () => {
   const targetHalfWidth = target.getBoundingClientRect().width / 2;
   const targetHalfHwight = target.getBoundingClientRect().height / 2;
   const choose = confirm("ok == black.ver | no == white.ver");
   if (!choose) {
      document.body.style.backgroundColor = "white";
      lineHorozontal.style.backgroundColor = "black";
      lineVertical.style.backgroundColor = "black";
      target.setAttribute("src", "img/target_black.png");
      tag.style.color = "black";
   }
   console.log("load!");
   document.addEventListener("mousemove", (e) => {
      const x = e.clientX;
      const y = e.clientY;

      // vertical.style.left = `${x}px`;
      // horozontal.style.top = `${y}px`;
      // target.style.left = `${x}px`;
      // target.style.top = `${y}px`;
      // tag.style.top = `${y}px`;
      // tag.style.left = `${x}px`;
      tag.textContent = `${x}px,${y}px`;

      vertical.style.transform = `translateX(${x}px)`;
      horozontal.style.transform = `translateY(${y}px)`;
      target.style.transform = `translate(${x - targetHalfWidth}px,${
         y - targetHalfHwight
      }px)`;
      tag.style.transform = `translate(${x}px,${y}px)`;
   });
});
