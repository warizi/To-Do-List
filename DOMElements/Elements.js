// background
const $appBackground = document.querySelector('.container');
// today
const $todaySpan = document.getElementById('today');
// todo input
const $todoInput = document.querySelector('.todo_input');
const $todoInputContainer = document.querySelector('.todo_input_container');
const $inputBackDrop = document.querySelector('.input_back_drop');
const $submitTodoInputBtn = document.querySelector('.submit_todo');
// list
const $todoContainer = document.getElementById('todo_list_container');
// tool
const $allTools = document.querySelectorAll('.tool');
// container
const $mainContainer = document.querySelector('main');
const $contentsContainer = document.querySelector('.main_contents_container');
export {
  $todaySpan,
  $todoInputContainer,
  $inputBackDrop,
  $appBackground,
  $todoInput,
  $todoContainer,
  $allTools,
  $submitTodoInputBtn,
  $mainContainer,
  $contentsContainer
}
