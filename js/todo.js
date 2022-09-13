const LOCAL_STORAGE_KEY = "todos";

const $todoSearchBox = document.querySelector(".todo__searchBox");
const items = document.querySelector(".items");

//~~Item : UI관련, ~~ToDo 기능관련

function selectToDo() {
   const todos = localStorage.getItem(LOCAL_STORAGE_KEY);

   if (todos == null) {
      return [];
   }

   return JSON.parse(todos);
}

function createToDo(newTodo) {
   const todos = [...selectToDo(), newTodo];
   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
}

function deleteToDo(id) {
   // console.log(id);
   const todos = [...selectToDo()];
   const newTodos = todos.filter((todo) => todo.id !== parseInt(id));
   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTodos));
}

function updateTodo(id, hasCompleted) {
   const todos = [...selectToDo()];
   const newTodos = todos.map((todo) => {
      if (todo.id === Number(id)) {
         return { ...todo, hasCompleted: hasCompleted };
      }
      return todo;
   });
   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTodos));
}

function selectCompleteTodoPercent() {
   const todos = [...selectToDo()];
   return Math.ceil(
      (todos.filter((todo) => todo.hasCompleted).length / todos.length) * 100
   );
}

function paintPercent() {
   /* Code By Webdevtrick ( https://webdevtrick.com ) */
   Circlle();
}

function Circlle() {
   const todos = [...selectToDo()];
   const percent = selectCompleteTodoPercent() / 100;
   $(".round")
      .circleProgress({
         size: 200,
         //그래프 크기
         startAngle: -Math.PI / 2,
         //시작지점 (기본값 Math.PI)
         value: percent,
         //그래프에 표시될 값
         animation: true,
         //그래프가 그려지는 애니메이션 동작 여부
         fill: {
            gradient: ["#8FAADC"],
         },
      })
      .on("circle-animation-progress", function (event, progress, stepValue) {
         // $(el).find('strong').text(String(stepValue.toFixed(2)).substr(2) + '%');
         if (percent === 1) {
            $(".round strong").html("100%");
         } else {
            $(this)
               .find("strong")
               .text(stepValue.toFixed(2).substr(2) + "%");
         }
      });

   $(".round span").html(
      `${Math.ceil(todos.filter((todo) => todo.hasCompleted).length)}/${
         todos.length
      } `
   );
}

function paintItem(newTodo) {
   const li = document.createElement("li");
   const div = document.createElement("div");
   const input = document.createElement("input");
   const span = document.createElement("span");
   const button = document.createElement("button");
   const i = document.createElement("i");
   const divider = document.createElement("div");

   li.setAttribute("class", "item__row");
   li.id = newTodo.id;

   div.setAttribute("class", "item");
   divider.setAttribute("class", "item__divider");
   input.setAttribute("class", "item__check");
   input.setAttribute("type", "checkbox");
   input.setAttribute("data-id", newTodo.id);
   input.checked = newTodo.hasCompleted;
   input.addEventListener("click", handleChangeComplete);

   span.setAttribute("class", "item__name");
   button.setAttribute("class", "item__delete");
   i.setAttribute("class", "fa-solid fa-trash");
   span.textContent = newTodo.text;
   li.appendChild(div);
   div.appendChild(input);
   div.appendChild(span);
   div.appendChild(button);
   button.appendChild(i);
   li.addEventListener("click", handleDeleteItem);
   li.appendChild(divider);
   return li;
}

function createItem(newTodo) {
   items.appendChild(paintItem(newTodo));
}

function deleteItem(todo) {
   items.removeChild(todo);
}

function handleDeleteItem(e) {
   const target = this;

   // console.log(target.id);
   if (e.target.tagName === "I") {
      deleteItem(target);
      deleteToDo(target.id);
      paintPercent();
   }
}

function handleChangeComplete(e) {
   const id = e.target.dataset.id;
   const hasCompleted = e.target.checked;
   console.log(id);
   console.log(hasCompleted);
   updateTodo(id, hasCompleted);
   paintPercent();
}

$todoSearchBox.addEventListener("keypress", (e) => {
   if (e.key === "Enter") {
      const target = e.target;
      const content = target.value;
      if (content === "") {
         target.focus();
         return alert("아무것도 입력하지 않았습니다!");
      }
      target.value = "";

      const newTodo = {
         id: Date.now(),
         text: content,
         hasCompleted: false,
      };

      createItem(newTodo);
      createToDo(newTodo);
      paintPercent();
   }
});

const todos = [...selectToDo()];
console.log(todos);
if (todos.length === 0) {
   const newTodo = {
      id: Date.now(),
      text: "Do your to-dos!",
      hasCompleted: true,
   };
   createItem(newTodo);
   createToDo(newTodo);
}
todos.forEach(createItem);
paintPercent();
