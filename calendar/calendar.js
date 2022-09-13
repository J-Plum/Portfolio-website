let date = new Date();

const $goPrev = document.querySelector('.go-prev').addEventListener('click', prevMonth);
const $goToday = document.querySelector('.go-today').addEventListener('click', goToday);
const $goNext = document.querySelector('.go-next').addEventListener('click', nextMonth);



function renderCalendar() {
   const year = date.getFullYear();
   const month = date.getMonth();

   const $year_month = document.querySelector('.year_month')
   $year_month.textContent = `${year}년 ${month + 1}월`;


   // 전달의 마지막 일과 요일이 필요하다

   //Date()에 인자값을 올해, 이번달을 넣고  요일 자리에 0 을 넣게되면
   // 이번달을 기준으로 전달의 마지막날이 나온다.
   // 마찬가지로 다음달을 구하려면 달에 +1을 해준상태로 인자값을 0을 넣어주면 이번달의 마지막 요일이 나온다.

   const prevLast = new Date(year, month, 0);
   const thisLast = new Date(year, month + 1, 0);

   const prevLastDate = prevLast.getDate();
   const prevLastDay = prevLast.getDay(); //요일은 일요일 기준으로 0~6 토요일까지

   const thisLastDate = thisLast.getDate();
   const thisLastDay = thisLast.getDay();


   // 전달의 마지막주
   const prevDates = [];

   /* 이번달
   위에 구해둔 이번달의 마지막날을 이용해서 만든다.
   thisLastDate는 이번날의 마지막날 = 이번달의 일수! 이기에 Array에 넣어서 
   이번달의 날을 만든다
   작성일기준 (22.07.23) thisLastDate= 31 Array(thisLastDate) = Array(31)
   [empty * 31]의 배열이 만들어진다. empty일때는 map은 동작하지 않기 떄문에
   fill()을 이용해서 undifinded를 채워주고 그후 map을 사용한다
   
   */

   const thisDates = Array(thisLastDate).fill().map((_, i) => i + 1);
   // const thisDates = [...Array(thisLastDate+1).keys()].slice(1);

   // 다음달의 첫주
   const nextDates = [];


   // 전달의 마지막날이 토요일 일 경우 전 달의 마지막주를 보여줄 필요가 없어진다.
   // 만드려는 달력은 일요일부터 시작하기 떄문에 지난달의 토요일은 제외하고 만든다.
   // 지난달의 마지막날을 이용해서 전달의 마지막주를 만든다
   // 저번주의 마지막주를 며칠을 만들어야하는지를 prevLastDay로 확인을하는 것이다

   if (prevLastDay !== 6) {
      for (let i = 0; i <= prevLastDay; i++) {
         prevDates.unshift(prevLastDate - i);
      }
   }

   // 7에서 이번달 마지막달의 요일을 빼면 다음달의 첫주를 알 수있다.
   for (let i = 1; i < 7 - thisLastDay; i++) {
      nextDates.push(i);
   }

   //  prevDates = 지난달 thisDates = 이번달 , nextDates(첫주) = 다음달
   // 을 dates에 넣는다.
   const dates = prevDates.concat(thisDates, nextDates);

   // dates에서 이번달1일의 위치
   const firstDateIndex = dates.indexOf(1);
   // dates에서 이번달 마지막날의 위치
   const lastDateIndex = dates.lastIndexOf(thisLastDate);

   // console.log(dates);
   // console.log(firstDateIndex);
   // console.log(lastDateIndex);

   //  dates를 forEach를 통해서 요소와 인덱스를 이용해 해당 값의 위치에 값을 넣고
   // join으로 배열의 문자열화를 시켜서 innerHTML에 넣는다.
   dates.forEach((date, i) => {
      // 7월기준! i가 1보다 크거나 같으면서 31보다 작거나 같은가? true = this , false = other
      // 이번달이 아닌경우엔 class = 'other' 로 별도로 css를 주기위함
      const condition = i >= firstDateIndex && i <= lastDateIndex
         ? 'this'
         : 'other';
      dates[i] = `<div class='date'><span class=${condition}>${date}</span></div>`
   });


   document.querySelector('.dates').innerHTML = dates.join('');

   const today = new Date();

   if (month === today.getMonth() && year === today.getFullYear()) {
      for (let date of document.querySelectorAll('.this')) {
         // 이거머임
         // console.log(+date.innerText === today.getDate())
         if (+date.innerText === today.getDate()) {
            // console.log(typeof(+date.innerText))
            // console.log(typeof(date.innerText))
            // console.log(typeof(today.getDate()))
            date.classList.add('today');
            break;
         }
      }
   }

}

//renderCalendar 호출
renderCalendar();

function prevMonth() {
   date.setMonth(date.getMonth() - 1);
   renderCalendar();
}

function nextMonth() {
   date.setMonth(date.getMonth() + 1);
   renderCalendar();
}

function goToday() {
   date = new Date();
   renderCalendar();
}