# 知识库系统

一个基于React、TypeScript和Vite构建的现代化知识库管理系统，用于存储、展示和搜索文档。

![知识库系统](https://raw.githubusercontent.com/yattin/info/master/docs/screenshots/home.png)

## 功能特性

### 核心功能

- ✅ 支持Markdown文档渲染和代码语法高亮
- ✅ 文档内容全文搜索功能
- ✅ 分类和标签管理
- ✅ 响应式设计，支持移动端和桌面端
- ✅ 高性能文档加载和渲染

### 辅助功能

- ✅ 用户反馈系统（表单、浮动按钮、模态窗口）
- ✅ 文档版本对比功能
- ✅ 完善的移动端适配
- ✅ 性能监控和错误跟踪集成
- ✅ 暗色模式支持
- ✅ 无障碍功能（键盘导航、字体大小控制）

## 技术栈

- **前端框架**: React 18 + TypeScript
- **状态管理**: Redux Toolkit
- **路由**: React Router v6
- **样式**: Tailwind CSS
- **构建工具**: Vite
- **Markdown渲染**: react-markdown + remark-gfm
- **性能监控**: 集成Sentry
- **版本对比**: diff.js

## 快速开始

### 环境要求

- Node.js 16+
- npm 7+

### 安装

```bash
# 克隆仓库
git clone https://github.com/yattin/info.git
cd info

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

开发服务器会在 http://localhost:3000 启动。

### 构建生产版本

```bash
npm run build
```

构建的文件会输出到 `dist` 目录。

## 项目结构

```
/
├── public/            # 静态资源
├── src/
│   ├── components/    # React组件
│   │   ├── accessibility/  # 无障碍组件
│   │   ├── common/         # 通用UI组件
│   │   ├── feedback/       # 反馈相关组件
│   │   ├── performance/    # 性能监控组件
│   │   ├── ui/             # UI组件
│   │   └── version/        # 版本对比组件
│   ├── hooks/         # 自定义React Hooks
│   ├── pages/         # 页面组件
│   ├── services/      # API服务和集成
│   ├── store/         # Redux状态管理
│   ├── styles/        # 样式文件
│   ├── types/         # TypeScript类型定义
│   └── utils/         # 工具函数
├── AUXILIARY_FEATURES.md  # 辅助功能文档
├── DEVELOPMENT.md      # 开发指南
└── README.md          # 项目说明
```

## 知识库构建建议

### 1. 内容组织
- 采用分层分类结构：领域->主题->子主题
- 使用标签系统实现多维分类
- 建立标准化的文档模板

### 2. 技术选型
- 文档存储：Markdown + Git版本控制
- 搜索方案：Elasticsearch或Algolia
- 知识图谱：Neo4j或图数据库

### 3. 协作流程
- 采用Git工作流进行内容协作
- 设立内容审核机制
- 定期进行知识库健康检查

### 4. 维护策略
- 设立内容生命周期管理
- 建立过期内容归档机制
- 定期更新技术栈和工具链

### 5. 扩展建议
- 集成自动化文档生成工具
- 开发知识库API接口
- 实现与ChatGPT等AI工具的集成

## 核心功能详解

### 文档展示

系统支持完整的Markdown语法渲染，包括：

- 标题、段落、列表
- 表格和引用块
- 代码块语法高亮
- 链接和图片

### 搜索功能

- 支持标题和内容的全文搜索
- 实时搜索结果显示
- 搜索结果高亮

### 版本对比功能

- 查看文档历史版本
- 比较不同版本的差异
- 差异高亮显示

## 辅助功能详解

请参阅 [AUXILIARY_FEATURES.md](./AUXILIARY_FEATURES.md) 文件，了解关于辅助功能的详细说明。

## 开发指南

请参阅 [DEVELOPMENT.md](./DEVELOPMENT.md) 文件，了解详细的开发指南和项目结构。

## 贡献指南

欢迎贡献代码、提交issue或提出新功能建议！

1. Fork本仓库
2. 创建特性分支：`git checkout -b feature/your-feature-name`
3. 提交更改：`git commit -m 'Add some feature'`
4. 推送到分支：`git push origin feature/your-feature-name`
5. 提交Pull Request

## 许可证

[MIT](LICENSE)