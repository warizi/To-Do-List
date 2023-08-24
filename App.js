import ListManager from "./module/ListManager.js";
import State from "./module/State.js";
import Storage from "./module/Storage.js";
import { ParseTodoItem } from "./template/parseTodoItem.js";
import { displayToday } from "./utils/displayToday.js";
import { 
    $allTools,
    $mainContainer,
    $inputBackDrop, 
    $submitTodoInputBtn, 
    $todaySpan, 
    $todoContainer, 
    $todoInput
} from "./DOMElements/Elements.js";
import { initTools } from "./module/writingTools/initTools.js";
import { activeTool } from "./module/writingTools/activeTools.js";
import { pageSwipeDetector } from "./module/swipeDetector.js";
import Store from "./module/store/store.js";
// store
const store = new Store();
// date
displayToday($todaySpan);

// state
const toolState = new State(null, activeTool);

$inputBackDrop.addEventListener('click', () => {
    initTools();
    toolState.setState(null);
});
// swipe
pageSwipeDetector($mainContainer);

// tool
for(let i = 0; i < $allTools.length; i++) {
    $allTools[i].addEventListener('click', (e) => selectTool(e));
}

function selectTool(e) {
    const toolType = e.target.id;
    initTools();
    if(toolState.getState() !== toolType) {
        toolState.setState(toolType);
        e.target.classList.add('active_tool');
    } else {
        initTools();
        toolState.setState(null);
    }
}

// list
const todoStorage = new Storage('todo');
const todoList = new ListManager($todoContainer, ParseTodoItem);

renderList();

todoList.addEvent('click', clickListEvent);

$submitTodoInputBtn.addEventListener('click', event => addTodoList(event));

function addTodoList(event) {
    event.preventDefault();
    const value = $todoInput.value;

    if(value !== '') {
        const newData = {
            content: value,
            id: todoStorage.createId(),
            highlight: false,
            checked: false,
        };
        todoStorage.addItem(newData).updateStorage();
        renderList();
    } else {
        alert('할 일을 입력해주세요.');
    }

    $todoInput.value = '';
}

function clickListEvent(event) {
    const id = Number(event.target.dataset.id);
    const target = event.target;
    const classList = event.target.classList;
    
    switch(classList[0]) {
        case 'checked':
            if(classList.contains('unchecked')){
                todoStorage.updateData(id, 'checked', true).updateStorage();
            } else {
                todoStorage.updateData(id, 'checked', false).updateStorage();
            }
            classList.toggle('unchecked');
            break;
        case 'todo_delete':
            todoStorage.deleteItem(id).updateStorage();
            renderList();
            break;
        case 'highlight_event_listener':
            const $highlight = target.parentNode.querySelector('.neon_strong');
            if($highlight.classList.contains('neon_blind')) {
                todoStorage.updateData(id, 'highlight', true).updateStorage();
            } else {
                todoStorage.updateData(id, 'highlight', false).updateStorage();
            }
            $highlight.classList.toggle('neon_blind');
            break;
        default:
            break;
    }
}

function renderList() {
    return todoList.init(todoStorage.getData()).removeAllItems().render();
}

// flag
const $flagWrapper = document.querySelector('.post_it_flag_wrapper');

$flagWrapper.addEventListener('click', (e) => {
    $flagWrapper.classList.toggle('flag_active');
    toolState.setState(null);
    initTools();
})
