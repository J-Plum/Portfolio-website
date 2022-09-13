const $todoSearchBox = document.querySelector('.todo__searchBox');
const items = document.querySelector('.items');
let toDos = [];

function saveToDos() {
   localStorage.setItem('todos', JSON.stringify(toDos));
}

function deleteTodo(e) {
   const target = this;
   if (e.target.tagName === 'I') {
      target.remove();
      toDos = toDos.filter((toDo) => toDo.id !== parseInt(target.id));
      saveToDos();
   }
}

function paintTodo(newTodoObj) {
   const li = document.createElement('li');
   const div = document.createElement('div');
   const input = document.createElement('input');
   const span = document.createElement('span');
   const button = document.createElement('button');
   const i = document.createElement('i');
   const divider = document.createElement('div');


   li.setAttribute('class', 'item__row');
   li.id = newTodoObj.id;

   div.setAttribute('class', 'item');
   divider.setAttribute('class', 'item__divider');
   input.setAttribute('class', 'item__check');
   input.setAttribute('type', 'checkbox');
   span.setAttribute('class', 'item__name');
   button.setAttribute('class', 'item__delete');
   i.setAttribute('class', 'fa-solid fa-trash');
   span.textContent = newTodoObj.text;
   li.appendChild(div);
   div.appendChild(input);
   div.appendChild(span);
   div.appendChild(button);
   button.appendChild(i);
   li.addEventListener('click', deleteTodo);
   li.appendChild(divider);
   return li;
}

function createTodo() {
   const newTodo = $todoSearchBox.value;
   if (newTodo === '') {
      $todoSearchBox.focus();
      return alert('아무것도 입력하지 않았습니다!');
   }
   $todoSearchBox.value = '';
   const newTodoObj = {
      id: Date.now(),
      text: newTodo
   }
   const item = paintTodo(newTodoObj);
   items.appendChild(item);
   toDos.push(newTodoObj);
   saveToDos();
}

$todoSearchBox.addEventListener('keypress', (e) => {
   if (e.key === 'Enter') {
      createTodo();
   }
});


const savedToDos = localStorage.getItem('todos');
if (savedToDos !== null) {
   const parsedToDos = JSON.parse(savedToDos);
   toDos = parsedToDos;
   parsedToDos.forEach((todos) => {
      items.appendChild(paintTodo(todos));
   });
   console.log(toDos);
}
