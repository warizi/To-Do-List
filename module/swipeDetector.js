import { $contentsContainer } from "../DOMElements/Elements.js";
import Store from "./store/store.js";

export function pageSwipeDetector(EventElement) {
  const store = new Store();
  let dragLengthX = 0;

  EventElement.addEventListener('mousedown', (eventDown) => {
    const startPoint = eventDown.clientX;

    EventElement.addEventListener('mousemove', dragEvent);

    function dragEvent(eventDrag) {
      dragLengthX = eventDrag.clientX - startPoint;
    }

    // clearEvent (clear side effect)
    EventElement.addEventListener('mouseup', clearDragEvent);

    function clearDragEvent() {
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

      EventElement.removeEventListener('mousemove', dragEvent);
      EventElement.removeEventListener('mouseup', clearDragEvent);
    }

  });

}
