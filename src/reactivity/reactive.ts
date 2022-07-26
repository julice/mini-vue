import { mutableHandlers, readonlyHandlers } from './basezHandlers';
import { track, trigger } from './effect';

function createActiveObject(raw, handler) {
  return new Proxy(raw, handler);
}
export function reactive(raw) {
  return createActiveObject(raw, mutableHandlers);
}

export function readonly(raw) {
  {
    return createActiveObject(raw, readonlyHandlers);
  }
}
