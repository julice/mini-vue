import { track, trigger } from './effect';
import { ReactiveFlags } from './reactive';

const get = createGetter();
const set = createSetter();
const readonlyget = createGetter(true);

function createGetter(readonly = true) {
  return function get(target, key) {
    const res = Reflect.get(target, key);
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !readonly;
    }
    if (key === ReactiveFlags.IS_READONLY) {
      return readonly;
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
