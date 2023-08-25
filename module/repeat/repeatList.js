import { $friContainer, $monContainer, $satContainer, $sunContainer, $thuContainer, $tueContainer, $wedContainer } from "../../DOMElements/repeatElements.js";
import { ParseTodoItem } from "../../template/parseTodoItem.js";
import ListManager from "../ListManager.js";
import Storage from "../Storage.js";
import { clickListEvent } from "../listEvent/clickListEvent.js";

export const weeks = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const weeksStorage = {
  Mon: new Storage('Mon'),
  Tue: new Storage('Tue'),
  Wed: new Storage('Wed'),
  Thu: new Storage('Thu'),
  Fri: new Storage('Fri'),
  Sat: new Storage('Sat'),
  Sun: new Storage('Sun'),
}

export const weekList = {
  Mon: new ListManager($monContainer, ParseTodoItem),
  Tue: new ListManager($tueContainer, ParseTodoItem),
  Wed: new ListManager($wedContainer, ParseTodoItem),
  Thu: new ListManager($thuContainer, ParseTodoItem),
  Fri: new ListManager($friContainer, ParseTodoItem),
  Sat: new ListManager($satContainer, ParseTodoItem),
  Sun: new ListManager($sunContainer, ParseTodoItem),
}

renderWeeks()
export function renderWeeks() {
  weeks.forEach((week) => {
    weekRenderList(weekList[week], weeksStorage[week]);
  })
}

export const weekContainers = {
  Mon: $monContainer,
  Tue: $tueContainer,
  Wed: $wedContainer,
  Thu: $thuContainer,
  Fri: $friContainer,
  Sat: $satContainer,
  Sun: $sunContainer,
}

weeks.forEach((week) => {
  weekContainers[week].addEventListener('click', (event) => {
    clickListEvent(event, weeksStorage[week], () => weekRenderList(weekList[week], weeksStorage[week]))
  });
})


export function weekRenderList(weekList, storage) {
  return weekList.init(storage.getData()).removeAllItems().render();
}

