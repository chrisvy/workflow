let position = [];
let observer = null;

function emitChange() {
  observer(position);
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }

  observer = o;
  emitChange();

  return () => {
    observer = null;
  };
}

export function canMoveKnight(text) {
  return !text;
}

export function moveKnight(toX, toY) {
  position = [toX, toY];
  emitChange();
}