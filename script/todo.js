import ListManager from "../module/ListManager.js";
import State from "../module/State.js";
import Storage from "../module/Storage.js";
import { ParseTodoItem } from "../template/parseTodoItem.js";

const $todoInputContainer = document.querySelector('.todo_input_container');

// state
const toolState = new State(null, activeTool);
function activeTool(state) {
    switch(state) {
        case 'write':
            initTools();
            $todoInputContainer.classList.add('active_todo_input');
            break;
        case 'highlight':
            initTools();
            const $listAll = document.querySelectorAll('.highlight_event_listener');
            for(let i = 0; i < $listAll.length; i++) {
                $listAll[i].classList.remove('blind');
            }
            break;
        case 'delete':
            initTools();
            $todoContainer.classList.add('active_delete');
            break;
    }
}
function initTools() {
    // write
    $todoInputContainer.classList.remove('active_todo_input');
    // highlight
    const $listAll = document.querySelectorAll('.highlight_event_listener');
    for(let i = 0; i < $listAll.length; i++) {
        $listAll[i].classList.add('blind');
    }
    // delete
    $todoContainer.classList.remove('active_delete');
}

// tool
const $tools = document.querySelectorAll('.tool');

for(let i = 0; i < $tools.length; i++) {
    $tools[i].addEventListener('click', (e) => selectTool(e));
}

function selectTool(e) {
    const toolType = e.target.id;
    for(let i = 0; i < $tools.length; i++) {
        $tools[i].classList.remove('active_tool');
    }
    if(toolState.getState() !== toolType) {
        toolState.setState(toolType);
        e.target.classList.add('active_tool');
    } else {
        initTools();
        toolState.setState(null);
    }
}


// list
const $todoContainer = document.getElementById('todo_list_container');
const $todoInput = document.querySelector('.todo_input');
const $submitBtn = document.querySelector('.submit_todo');
const todoStorage = new Storage('todo');
const todoList = new ListManager($todoContainer, ParseTodoItem);

renderList();

todoList.addEvent('click', clickListEvent);
$submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
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
})

function clickListEvent(e) {
    const id = Number(e.target.dataset.id);
    const target = e.target;
    const classList = e.target.classList;
    
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

//helper fn
function renderList() {
    return todoList.init(todoStorage.getData()).clearList().render();
}

