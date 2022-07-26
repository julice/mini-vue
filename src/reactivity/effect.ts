import { extend } from './shared/index';
let activeEffect;
let shouldTrack;

class ReactiveEffect {
  private _fn;
  deps: any = [];
  active = true;
  onStop?: () => void;
  constructor(fn, public scheduler?) {
    this._fn = fn;
  }
  run() {
    if (!this.active) {
      return this._fn();
    }
    shouldTrack = true;
    activeEffect = this;
    const result = this._fn();
    shouldTrack = false;
    return result;
  }
  stop() {
    if (this.active) {
      cleanUpEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
    // this.deps.forEach((dep) => {
    //   dep.delete(this);
    // });
  }
}

function cleanUpEffect(effect) {
  console.log('effect', effect);
  effect.deps.forEach((dep) => {
    dep.delete(effect);
  });
  effect.deps.length = [];
}

const targetMap = new Map();

function isTracking() {
  return activeEffect !== undefined && shouldTrack;
}
export function track(target, key) {
  if (!isTracking()) return;
  let depmap = targetMap.get(target);
  if (!depmap) {
    depmap = new Map();
    targetMap.set(target, depmap);
  }
  let dep = depmap.get(key);
  if (!dep) {
    dep = new Set();
    depmap.set(key, dep);
  }
  dep.add(activeEffect);
  activeEffect.deps.push(dep);
}

export function trigger(target, key) {
  const depmap = targetMap.get(target);
  if (!depmap) {
    return;
  }
  const dep = depmap.get(key);
  if (!dep) {
    return;
  }
  dep.forEach((effect) => {
    console.log('11', effect);
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  });
}

export function effect(fn, options: any = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler);
  extend(_effect, options);
  _effect.run();
  const runner: any = _effect.run.bind(_effect);
  runner.effect = _effect;
  return runner;
}

export function stop(runner) {
  runner.effect.stop();
}
