import { track, trigger } from './effect';
import { reactive, ReactiveFlags, readonly } from './reactive';
import { isObject } from './shared';

const get = createGetter();
const set = createSetter();
const readonlyget = createGetter(true);

function createGetter(isReadonly = false) {
  return function get(target, key) {
    const res = Reflect.get(target, key);
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res);
    }
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly;
    }
    if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly;
    }
    // todo 依赖收集
    track(target, key);
    return res;
  };
}
function createSetter(isReadonly = false) {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value);
    // 触发依赖
    if (!isReadonly) {
      trigger(target, key);
    }
    return res;
  };
}

export const mutableHandlers = {
  get,
  set,
};

export const readonlyHandlers = {
  get: readonlyget,
  set(target, key, value) {
    console.warn('it is readonly obj');
    return true;
  },
};
