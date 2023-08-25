import { $contentsContainer } from "../../DOMElements/Elements.js";
import Store from "../store/store.js";

export function pageSwipeDetectorMobile(EventElement) {
  const store = new Store();
  let dragLengthX = 0;
  
  EventElement.addEventListener('touchstart', (eventStart) => {
    const startPoint = eventStart.changedTouches[0].clientX;

    EventElement.addEventListener('touchmove', moveEvent);

    function moveEvent(eventMove) {
      dragLengthX = eventMove.changedTouches[0].clientX - startPoint;
      console.log(dragLengthX);
    }

    // clearEvent (clear side effect)
    EventElement.addEventListener('touchend', clearMoveEvent);

    function clearMoveEvent() {
      switch(store.getStore().page) {
        case 'common':
          if(dragLengthX > 100) {
            $contentsContainer.classList.remove('page_todo');
            $contentsContainer.classList.add('page_repeat');
            store.setStore('page', 'repeat');
          }
          break;
        case 'repeat':
          if(dragLengthX < -100) {
            $contentsContainer.classList.remove('page_repeat');
            $contentsContainer.classList.add('page_todo');
            store.setStore('page', 'common');
          }
          break;
      }

      EventElement.removeEventListener('touchmove', moveEvent);
      EventElement.removeEventListener('touchend', clearMoveEvent);
    }
  })
}
