import { 
  $allTools,
  $appBackground, 
  $inputBackDrop, 
  $todoContainer, 
  $todoInputContainer 
} from "../../DOMElements/Elements.js";
import { weekContainers, weeks } from "../repeat/repeatList.js";

export function initTools() {
  for(let i = 0; i < $allTools.length; i++) {
    $allTools[i].classList.remove('active_tool');
  }
  // write
  $todoInputContainer.classList.remove('active_todo_input');
  $inputBackDrop.classList.add('blind');
  // highlight
  const $listAll = document.querySelectorAll('.highlight_event_listener');
  $appBackground.style.backgroundColor = 'rgb(255, 253, 246)';
  for(let i = 0; i < $listAll.length; i++) {
      $listAll[i].classList.add('blind');
  }
  // delete
  $todoContainer.classList.remove('active_delete');
  weeks.forEach((week) => {
    weekContainers[week].classList.remove('active_delete');
  })
}
