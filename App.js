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
import { pageSwipeDetector } from "./module/swipe/swipeDetector.js";
import Store from "./module/store/store.js";
import { pageSwipeDetectorMobile } from "./module/swipe/swipeDetectorMobile.js";
import { weekPicker } from "./module/weekPicker/weekPicker.js";
import { clickListEvent } from "./module/listEvent/clickListEvent.js";
import { renderWeeks, weeks, weeksStorage } from "./module/repeat/repeatList.js"


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
pageSwipeDetectorMobile($mainContainer);

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

todoList.addEvent('click', (event) => clickListEvent(event, todoStorage, renderList));

$submitTodoInputBtn.addEventListener('click', event => addTodoList(event));

function addTodoList(event) {
    event.preventDefault();
    const value = $todoInput.value;

    if(store.getStore().page === 'repeat' && value !== '') {
        weeks.forEach((week) => {
            const newData = {
                content: value,
                id: weeksStorage[week].createId(),
                heighlight: false,
                checked: false,
            }
            weeksStorage[week].addItem(newData).updateStorage();
        })
        renderWeeks();
        $todoInput.value = '';
        return;
    }

    if(store.getStore().page === 'common' && value !== '') {
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

// repeating page
weekPicker();

