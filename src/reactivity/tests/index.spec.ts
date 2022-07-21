import { add } from '../index';
it('add(1+2)', () => {
  expect(2).toBe(2);
  expect(add(1, 2)).toBe(3);
});
// jest 运行的环境是nodejs，默认的模块的规范是commonjs规范，导入的是esm规范，所以需要通过babel转换一下
// yarn add --dev babel-jest @babel/core @babel/preset-env
