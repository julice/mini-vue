## 初始化项目 
### 
```
yarn init -y
```

### 初始化typescript
```
npm tsc --init
```

### 安装jest
```
yarn add jest @types/jest --dev
```

### 在tsconfig.json中添加

```
 "types": ["jest"],  
```            

#### jest 运行的环境是nodejs，默认的模块的规范是commonjs规范，导入的是esm规范，所以需要通过babel转换一下

```
yarn add --dev babel-jest @babel/core @babel/preset-env
```
在根目录下新建babel.config.js
```
module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
}
```
jest 支持typescript
`yarn add --dev @babel/preset-typescript`
在babel.config.js中添加
```
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],
};
```
`https://jestjs.io/docs/getting-started`

