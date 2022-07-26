import { isReactive, isReadonly, readonly } from '../reactive';

describe('readonly', () => {
  it('happy path', () => {
    const original = { foo: 1, bar: { baz: 2 } };
    const wrapped = readonly(original);
    expect(wrapped).not.toBe(original);
    expect(wrapped.foo).toBe(1);
    expect(isReactive(wrapped)).toBe(false);
    expect(isReactive(original)).toBe(false);
    expect(isReadonly(original)).toBe(false);
    expect(isReadonly(wrapped)).toBe(true);
  });
  it('warn then call set', () => {
    console.warn = jest.fn();
    const user = readonly({ foo: 10 });
    user.foo = 11;
    expect(console.warn).toBeCalled();
  });
});
