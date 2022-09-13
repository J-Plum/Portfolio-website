"use strict";
import * as sound from "./sound.js";

// const carrotSound = new Audio('sound/carrot_pull.mp3');
const bugSound = new Audio("sound/bug_pull.mp3");
const CARROT_SIZE = 80;
// const BUG_COUNT = 5;

export default class Field {
   constructor(carrotCount, bugCount) {
      // this ===> Field class
      this.carrotCount = carrotCount;
      this.bugCount = bugCount;

      this.field = document.querySelector(".game__field");
      this.fieldRect = this.field.getBoundingClientRect();
      // this.onClick = this.onClick.bind(this);
      // this.field.addEventListener('click', (e) => {
      //     this.onClick(e);
      // });
      this.field.addEventListener("click", this.onClick);
      // this.onClick = this.onClick.bind(this.field);
   }

   init() {
      this.field.innerHTML = "";
      this._addItem("carrot", this.carrotCount, "img/carrot.png");
      this._addItem("bug", this.bugCount, "img/bug.png");
   }

   setClickListener(onItemClick) {
      this.onItemClick = onItemClick;
   }

   onClick = (event) => {
      // this ==== field (DOM)
      console.log(this);
      // console.log(this.onItemClick);
      const target = event.target;
      if (target.matches(".carrot")) {
         target.remove();
         sound.playCarrot();
         this.onItemClick && this.onItemClick("carrot");
      } else if (target.matches(".bug")) {
         this.onItemClick && this.onItemClick("bug");
      }
   };

   _addItem(className, count, imgPath) {
      const x1 = 0;
      const y1 = 0;
      const x2 = this.fieldRect.width - CARROT_SIZE;
      const y2 = this.fieldRect.height - CARROT_SIZE;
      for (let i = 0; i < count; i++) {
         const item = document.createElement("img");
         item.setAttribute("class", className);
         item.setAttribute("src", imgPath);
         item.style.position = "absolute";
         const x = randomNumber(x1, x2);
         const y = randomNumber(y1, y2);
         item.style.left = `${x}px`;
         item.style.top = `${y}px`;
         this.field.appendChild(item);
      }
   }
}
function randomNumber(min, max) {
   return Math.random() * (max - min) + min;
}

function playSound(sound) {
   sound.currentTime = 0; //음악을 처음부터
   sound.play();
}
