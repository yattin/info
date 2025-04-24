import { Document } from '@/store/slices/documentsSlice'

export const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'React 基础知识',
    content: `# React 基础知识

## 组件

React 应用程序由组件组成。组件是 UI 的可重用部分，它们将应用程序分解为独立的、可重用的部分，每个部分都可以独立思考。

### 函数组件

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### 类组件

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

## Props

Props 是将数据从父组件传递到子组件的方法。Props 是只读的，不应该被修改。

## State

State 是组件的内部数据，可以通过 setState() 方法更新。状态更新可能是异步的。

```jsx
const [count, setCount] = useState(0);

// 更新状态
setCount(count + 1);
```

## 生命周期

React 类组件有几个生命周期方法，让你在组件的不同阶段运行代码：

- **componentDidMount()** - 组件挂载后运行
- **componentDidUpdate()** - 组件更新后运行
- **componentWillUnmount()** - 组件卸载前运行

对于函数组件，你可以使用 useEffect Hook 来模拟生命周期行为。
`,
    createdAt: '2024-01-02T10:00:00Z',
    updatedAt: '2024-01-15T14:30:00Z',
    tags: ['React', '前端', 'JavaScript'],
    category: '前端开发',
  },
  {
    id: '2',
    title: 'Redux 状态管理',
    content: `# Redux 状态管理

Redux 是 JavaScript 应用的状态容器，提供可预测的状态管理。

## 核心概念

### Action

Action 是一个简单的 JavaScript 对象，用于描述发生了什么。例如：

```js
{ type: 'ADD_TODO', text: '学习 Redux' }
```

### Reducer

Reducer 是纯函数，根据之前的状态和一个 action 来计算新的状态。例如：

```js
function todoReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { text: action.text, completed: false }];
    default:
      return state;
  }
}
```

### Store

Store 是将 action 和 reducer 联系在一起的对象。例如：

```js
import { createStore } from 'redux';
const store = createStore(todoReducer);
```

## Redux Toolkit

Redux Toolkit 是官方推荐的编写 Redux 逻辑的方法。它包含了实用工具，简化了常见的 Redux 用例。

```js
import { createSlice, configureStore } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({ text: action.payload, completed: false });
    },
  },
});

const store = configureStore({
  reducer: todosSlice.reducer,
});
```
`,
    createdAt: '2024-01-03T11:00:00Z',
    updatedAt: '2024-01-16T09:30:00Z',
    tags: ['Redux', '状态管理', 'JavaScript', 'React'],
    category: '前端开发',
  },
  {
    id: '3',
    title: 'TypeScript 入门指南',
    content: `# TypeScript 入门指南

TypeScript 是 JavaScript 的超集，添加了类型定义和其他功能。

## 基本类型

TypeScript 提供了几种基本类型：

```typescript
// 布尔值
let isDone: boolean = false;

// 数字
let decimal: number = 6;

// 字符串
let color: string = "blue";

// 数组
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

// 元组
let x: [string, number] = ["hello", 10];

// 枚举
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// Any
let notSure: any = 4;

// Void
function warnUser(): void {
  console.log("This is a warning message");
}
```

## 接口

接口是 TypeScript 的核心特性之一，用于定义对象的结构。

```typescript
interface Person {
  firstName: string;
  lastName: string;
  age?: number; // 可选属性
  readonly id: number; // 只读属性
}

function greet(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}
```

## 类

TypeScript 支持基于类的面向对象编程。

```typescript
class Animal {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }
  
  bark() {
    console.log('Woof! Woof!');
  }
  
  move(distanceInMeters = 5) {
    console.log('Running...');
    super.move(distanceInMeters);
  }
}
```

## 泛型

泛型允许创建可重用的组件，一个组件可以支持多种类型的数据。

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");
```
`,
    createdAt: '2024-01-05T09:15:00Z',
    updatedAt: '2024-01-18T16:45:00Z',
    tags: ['TypeScript', '前端', '编程语言'],
    category: '前端开发',
  },
  {
    id: '4',
    title: 'Node.js 基础',
    content: `# Node.js 基础

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境，使开发者能够使用 JavaScript 来编写服务器端的代码。

## 核心模块

Node.js 有几个核心模块，提供了基本的功能：

### 文件系统 (fs)

```javascript
const fs = require('fs');

// 同步读取文件
const data = fs.readFileSync('file.txt', 'utf8');
console.log(data);

// 异步读取文件
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

### HTTP

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Server running at http://127.0.0.1:3000/');
});
```

### 路径 (path)

```javascript
const path = require('path');

const filePath = path.join(__dirname, 'folder', 'file.txt');
console.log(filePath);

const ext = path.extname('file.txt');
console.log(ext); // .txt
```

## npm

npm 是 Node.js 的包管理器，用于安装和管理项目的依赖。

```bash
# 初始化一个新的 npm 项目
npm init

# 安装包
npm install express

# 安装开发依赖
npm install --save-dev nodemon

# 安装全局包
npm install -g pm2
```

## Express 框架

Express 是 Node.js 最流行的 Web 框架之一。

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

## 异步编程

Node.js 的一个核心特性是非阻塞 I/O，这意味着代码不会等待 I/O 操作完成。

### 回调

```javascript
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

### Promise

```javascript
function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

readFilePromise('file.txt')
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### Async/Await

```javascript
async function readFile() {
  try {
    const data = await readFilePromise('file.txt');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

readFile();
```
`,
    createdAt: '2024-01-08T13:20:00Z',
    updatedAt: '2024-01-20T10:15:00Z',
    tags: ['Node.js', '后端', 'JavaScript'],
    category: '后端开发',
  },
  {
    id: '5',
    title: 'Git 常用命令',
    content: `# Git 常用命令

Git 是一个分布式版本控制系统，用于跟踪文件的变化。以下是一些常用的 Git 命令。

## 基本配置

```bash
# 配置用户名和邮箱
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 查看配置
git config --list
```

## 创建和克隆仓库

```bash
# 在当前目录初始化一个新的 Git 仓库
git init

# 克隆一个远程仓库
git clone https://github.com/username/repository.git
```

## 基本操作

```bash
# 查看状态
git status

# 添加文件到暂存区
git add file.txt

# 添加所有更改到暂存区
git add .

# 提交更改
git commit -m "Commit message"

# 查看提交历史
git log
```

## 分支操作

```bash
# 列出所有分支
git branch

# 创建新分支
git branch branch-name

# 切换到指定分支
git checkout branch-name

# 创建并切换到新分支
git checkout -b new-branch

# 合并分支
git merge branch-name

# 删除分支
git branch -d branch-name
```

## 远程操作

```bash
# 添加远程仓库
git remote add origin https://github.com/username/repository.git

# 推送到远程仓库
git push origin branch-name

# 从远程仓库拉取
git pull origin branch-name

# 查看远程仓库
git remote -v
```

## 撤销操作

```bash
# 撤销工作区的修改
git checkout -- file.txt

# 撤销暂存区的修改
git reset HEAD file.txt

# 撤销提交
git revert commit-id

# 重置到指定提交
git reset --hard commit-id
```

## 标签

```bash
# 创建标签
git tag v1.0.0

# 给指定提交创建标签
git tag v1.0.0 commit-id

# 查看所有标签
git tag

# 推送标签到远程
git push origin v1.0.0
```

## Stash 临时存储

```bash
# 临时存储工作区的更改
git stash

# 查看所有 stash
git stash list

# 应用 stash
git stash apply

# 应用并删除 stash
git stash pop

# 清除所有 stash
git stash clear
```
`,
    createdAt: '2024-01-10T08:45:00Z',
    updatedAt: '2024-01-12T11:30:00Z',
    tags: ['Git', '版本控制', '工具'],
    category: '开发工具',
  },
]
