import { $displaySelected, $weekFri, $weekMon, $weekSat, $weekSun, $weekThu, $weekTue, $weekWed } from "../../DOMElements/repeatElements.js";
import Store from "../store/store.js";

const weekElements = [$weekSun, $weekMon, $weekTue, $weekWed, $weekThu, $weekFri, $weekSat];
export function weekPicker() {
  const store = new Store();
  let weekState = [];

  weekElements.forEach((element) => {
    element.addEventListener('click', weekClickEvent);
  })
  
  function weekClickEvent(event) {
    const target = event.target;
    const weekValue = target.innerText;
    weekState = store.getStore().week;

    target.classList.toggle('week_selected');

    if(weekState.includes(weekValue)) {
      weekState = weekState.filter(item => item !== weekValue);
      store.setStore('week', weekState);

      setSelectWeekText(weekState);
    } else {
      weekState.push(weekValue);
      store.setStore('week', weekState);

      setSelectWeekText(weekState);
    }
  }
}

function setSelectWeekText(weekState) {
  console.log(isWeekDays(weekState));
  if(isWeekDays(weekState)) {
    $displaySelected.innerText = `평일마다 일정 추가`;
    return;
  }
  if(isWeekend(weekState)) {
    $displaySelected.innerText = `주말마다 일정 추가`;
    return;
  }
  if(weekState.length === 7) {
    $displaySelected.innerText = `매일마다 일정 추가`;
    return;
  }
  $displaySelected.innerText = `${weekState.join(', ')} 일정 추가`;
} 

function isWeekend(weekState) {
  return weekState.includes('Sun') && weekState.includes('Sat') && weekState.length === 2
}
function isWeekDays(weekState) {
  return weekState.length === 5 
      && weekState.includes('Mon')
      && weekState.includes('Tue')
      && weekState.includes('Wed')
      && weekState.includes('Thu')
      && weekState.includes('Fri')
}
