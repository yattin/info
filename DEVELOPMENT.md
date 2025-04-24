# 知识库开发文档

## 项目概述

知识库是一个基于 React + TypeScript 的前端应用，用于存储、展示和搜索文档。它具有以下功能：

- Markdown 文档渲染
- 按标题和内容搜索
- 基于 Redux 的状态管理
- 响应式设计

## 技术栈

- React 18
- TypeScript
- Redux Toolkit
- React Router
- Tailwind CSS
- Vite

## 本地开发

### 环境要求

- Node.js 16+
- npm 7+

### 安装依赖

```bash
npm install
```

### 运行开发服务器

```bash
npm run dev
```

这将启动开发服务器，通常在 http://localhost:3000 上运行。

### 构建产品版本

```bash
npm run build
```

构建文件将位于 `dist` 文件夹中。

### 预览构建结果

```bash
npm run preview
```

## 项目结构

```
/
├── public/            # 静态资源
├── src/
│   ├── components/    # React 组件
│   ├── hooks/         # 自定义 React Hook
│   ├── pages/         # 页面组件
│   ├── services/      # API 服务
│   ├── store/         # Redux 状态管理
│   ├── types/         # TypeScript 类型定义
│   ├── utils/         # 工具函数
│   ├── App.tsx        # 应用根组件
│   ├── main.tsx       # 应用入口
│   └── index.css      # 全局样式
├── index.html         # HTML 模板
├── package.json       # 项目依赖和脚本
├── tsconfig.json      # TypeScript 配置
├── vite.config.ts     # Vite 配置
└── README.md          # 项目概述
```

## 核心功能

### Markdown 渲染

应用使用 `react-markdown` 库来渲染 Markdown 内容。主要组件是 `MarkdownRenderer`，它负责

1. 解析 Markdown 内容
2. 渲染各种 Markdown 元素（标题、列表、表格等）
3. 语法高亮代码块

它还包含性能优化，如延迟加载大型文档。

### 搜索功能

搜索功能由以下组件组成：

1. `SearchPage` - 搜索结果页面
2. `searchSlice` - 管理搜索状态的 Redux 切片
3. API 服务中的 `searchDocuments` 方法

搜索功能执行全文本搜索，匹配文档标题和内容。

### API 集成

应用使用 `axios` 与后端 API 进行通信。在开发模式下，我们使用模拟数据。

API 服务包括以下方法：

- `getDocuments()` - 获取所有文档
- `getDocumentById(id)` - 获取特定文档
- `searchDocuments(query)` - 搜索文档

## 性能注意事项

- 使用 React.memo 缓存组件以减少不必要的重新渲染
- 大型 Markdown 文档采用延迟加载策略
- 使用 debounce 技术处理搜索输入
- 图片使用懒加载减少初始加载时间

## 后续改进

- 增加更多的搜索过滤选项（按日期、分类等）
- 实现历史版本对比功能
- 添加文档编辑功能
- 改进移动端兼容性