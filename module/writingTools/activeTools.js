import { $appBackground, 
  $inputBackDrop, 
  $todoContainer, 
  $todoInput, 
  $todoInputContainer 
} from "../../DOMElements/Elements.js";
import { initTools } from "./initTools.js";

export function activeTool(state) {
  switch(state) {
      case 'write':
          initTools();
          $todoInputContainer.classList.add('active_todo_input');
          $inputBackDrop.classList.remove('blind');
          $todoInput.focus();
          break;
      case 'highlight':
          initTools();
          $appBackground.style.backgroundColor = 'rgba(240,134,132, 0.3)';
          const $listAll = document.querySelectorAll('.highlight_event_listener');
          for(let i = 0; i < $listAll.length; i++) {
              $listAll[i].classList.remove('blind');
          }
          break;
      case 'delete':
          initTools();
          $todoContainer.classList.add('active_delete');
          break;
      default:
          initTools();
          break;
  }
}


