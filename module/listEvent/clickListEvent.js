export function clickListEvent(event, storage, renderFn) {
  const id = Number(event.target.dataset.id);
  const target = event.target;
  const classList = event.target.classList;
  
  switch(classList[0]) {
      case 'checked':
          if(classList.contains('unchecked')){
              storage.updateData(id, 'checked', true).updateStorage();
          } else {
              storage.updateData(id, 'checked', false).updateStorage();
          }
          classList.toggle('unchecked');
          break;
      case 'todo_delete':
          storage.deleteItem(id).updateStorage();
          renderFn();
          break;
      case 'highlight_event_listener':
          const $highlight = target.parentNode.querySelector('.neon_strong');
          if($highlight.classList.contains('neon_blind')) {
              storage.updateData(id, 'highlight', true).updateStorage();
          } else {
              storage.updateData(id, 'highlight', false).updateStorage();
          }
          $highlight.classList.toggle('neon_blind');
          break;
      default:
          break;
  }
}
