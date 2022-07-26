import { mutableHandlers, readonlyHandlers } from './basezHandlers';
import { track, trigger } from './effect';

export const enum ReactiveFlags {
  IS_READONLY = '__v_isReadonly',
  IS_REACTIVE = '__v_isReactive',
}
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

export function isReactive(value) {
  return !!value[ReactiveFlags.IS_REACTIVE];
}

export function isReadonly(value) {
  return !!value[ReactiveFlags.IS_READONLY];
}
