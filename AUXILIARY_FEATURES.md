# 知识库辅助功能文档

本文档详细说明了知识库系统的辅助功能，包括用户反馈、文档版本对比、移动端适配以及性能监控等模块。

## 目录

1. [用户反馈组件](#用户反馈组件)
2. [文档版本对比功能](#文档版本对比功能)
3. [移动端响应式适配](#移动端响应式适配)
4. [性能监控集成](#性能监控集成)
5. [使用指南](#使用指南)

## 用户反馈组件

用户反馈组件允许用户提交问题报告、建议和其他反馈信息。

### 主要组件

- `FeedbackForm`: 核心反馈表单组件
- `FeedbackButton`: 可浮动在页面上的反馈按钮
- `FeedbackModal`: 模态窗口形式的反馈组件

### 功能特性

1. **多种反馈类型**：支持问题报告、建议、咨询和其他类型的反馈
2. **用户信息保存**：可选保存用户邮箱以便后续使用
3. **浏览器信息收集**：自动收集浏览器版本和分辨率信息
4. **可自定义位置**：反馈按钮可以放置在页面的不同位置

### 使用示例

```tsx
// 使用浮动按钮
<FeedbackButton documentId="doc123" position="bottom-right" />

// 使用模态窗口
<FeedbackModal 
  isOpen={showFeedback} 
  onClose={() => setShowFeedback(false)} 
  documentId="doc123" 
/>
```

## 文档版本对比功能

文档版本对比功能允许用户查看和比较文档的不同版本。

### 主要组件

- `VersionCompare`: 版本对比器，显示两个版本的差异
- `VersionHistoryList`: 版本历史列表，显示所有版本
- `VersionTag`: 版本标签组件

### 功能特性

1. **差异高亮显示**：自动高亮显示文档版本间的增加和删除部分
2. **多版本选择**：支持选择不同版本进行比较
3. **版本元数据**：显示每个版本的创建时间、创建者和修改说明
4. **导出功能**：支持打印差异结果

### 使用示例

```tsx
// 显示版本历史列表
<VersionHistoryList 
  versions={documentVersions} 
  currentVersionId="version-3"
  onViewVersion={handleViewVersion}
  onCompareVersions={handleCompareVersions}
/>

// 显示版本对比
<VersionCompare 
  currentVersion={currentVersion} 
  previousVersions={previousVersions} 
/>
```

## 移动端响应式适配

移动端响应式适配功能确保知识库在不同设备上都能提供良好的用户体验。

### 主要组件

- `MobileNav`: 移动端底部导航栏
- `Layout`: 响应式布局组件

### 功能特性

1. **自适应布局**：根据屏幕大小自动调整布局
2. **专用移动导航**：移动端简洁底部导航栏
3. **触控优化**：优化触控交互元素大小
4. **安全区适配**：适配新一代移动设备的安全区
5. **嵌套滚动优化**：改善移动端的滚动体验

### 使用的技术

- CSS 媒体查询响应式设计
- Tailwind CSS 工具类
- React 状态管理响应屏幕大小变化
- 移动端浏览器兼容性修复

## 性能监控集成

性能监控集成可以对应用进行全面的性能的错误监控。

### 主要组件

- `ErrorBoundary`: 错误边界组件，捕获并处理组件错误
- `PerformanceIndicator`: 性能指标显示组件
- `monitoring.ts`: 监控服务模块

### 功能特性

1. **Sentry 集成**：可集成到 Sentry 错误跟踪系统
2. **性能指标收集**：自动收集页面加载时间、组件渲染时间等指标
3. **可视化性能面板**：开发模式下的实时性能监控
4. **全局错误处理**：优雅处理应用程序错误

### 使用方法

1. **配置 Sentry**：
   - 在环境变量中设置 `VITE_SENTRY_DSN`
   - 设置 `VITE_ENABLE_MONITORING` 为 'true'

2. **使用 ErrorBoundary**：
   ```tsx
   <ErrorBoundary>
     <YourComponent />
   </ErrorBoundary>
   ```

3. **使用性能监控**：
   ```tsx
   import { startMeasurement, endMeasurement } from '@/services/monitoring'

   // 开始测量
   startMeasurement('operation-name')
   
   // 执行操作...
   
   // 结束测量
   endMeasurement('operation-name')
   ```

## 使用指南

### 用户反馈组件

1. 在页面中添加 `FeedbackButton` 组件，可以选择所需位置。
2. 可以在某些操作后显示 `FeedbackModal` 组件来主动获取反馈。
3. 反馈数据在实际产品中应该发送到后端保存。

### 版本对比功能

1. 在文档详情页面添加 `VersionHistoryList` 组件。
2. 点击版本历史中的比较按钮可以显示版本差异。
3. 用户可以选择两个不同版本进行对比。

### 移动端适配

1. 应用已自动适配不同屏幕大小的设备。
2. 移动端下会显示底部导航栏代替侧边栏。
3. 使用响应式工具类可以提高响应式开发效率。

### 性能监控

1. 在应用启动时已自动初始化监控服务。
2. 开发者可以使用 `startMeasurement` 和 `endMeasurement` 函数测量特定操作的性能。
3. 错误会被自动捕获并向监控服务报告。
4. 在开发模式下可以看到实时性能指标面板。