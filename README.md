# React Flip Clock

一个基于 React 的翻牌时钟组件，支持倒计时和正计时功能，具有丰富的自定义选项。

## 特性

- 🎯 支持倒计时和时钟模式
- 🎨 可自定义主题和大小
- ⚡️ 流畅的翻牌动画
- 🌗 支持暗色模式和主题自定义
- 🔧 高度可定制

## 安装
```bash
npm install react-flip-timer
```

## 基本用法

```tsx
import { FlipClock } from 'react-flip-timer';
import "react-flip-timer/dist/index.css";

// 基础时钟
const BasicClock = () => <FlipClock />;

// 倒计时
const CountdownClock = () => <FlipClock deadline="2025-03-09" />;

// 自定义格式
const CustomFormatClock = () => <FlipClock formatter="yyyy年MM月dd日 hh:mm:ss" />;

// 指定主题
const DarkThemeClock = () => <FlipClock theme="dark" />;

const App = () => {
  return (
    <div className="app">
      <BasicClock />
      <CountdownClock />
      <CustomFormatClock />
      <DarkThemeClock />
    </div>
  );
};

export default App;
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| formatter | 时间格式化模板 | `string` | `"hh:mm:ss"` |
| size | 组件大小 | `"large"` \| `"middle"` \| `"small"` \| `string` | `"middle"` |
| theme | 主题颜色 | `"auto"` \| `"dark"` \| `"light"` | `"auto"` |
| deadline | 目标时间 | `string` \| `Date` | - |
| onDeadline | 倒计时变化时的回调函数 | `(rest: number) => void` | - |
| continueAfterDeadline | 是否在到达目标时间后继续计时 | `boolean` | `false` |
| separator | 分隔符，用于分割多行显示 | `string` | - |
| title | 标题文本或标题生成函数 | `string` \| `(currentTime: number, restTime: number) => string` | - |
| ratio | 数字宽高比 | `number` | `0.66` |

### 主题配置

组件提供了三种主题模式：

- `"auto"`: 自动跟随系统主题（默认）
- `"dark"`: 强制使用暗色主题
- `"light"`: 强制使用亮色主题

主题颜色定义：
- 暗色主题：背景色 `#333`，文字颜色 `#fff`
- 亮色主题：背景色 `#efefef`，文字颜色 `#333`

#### formatter 格式说明

支持以下占位符：

- 倒计时模式 (设置了 deadline，不区分大小写):
  - `d`: 天数
  - `h`: 小时
  - `m`|`i`: 分钟
  - `s`: 秒数

- 时钟模式 (区分大小写):
  - `Y`|`y`: 年
  - `M`: 月
  - `D`|`d`: 日
  - `h`|`H`: 小时
  - `m`|`i`|`I`: 分钟
  - `s`|`S`: 秒数

注意：如果需要在格式化字符串中使用这些字母作为普通文本，请在前面添加反斜杠 `\`。

## 使用示例

### 1. 带标题的时钟

```tsx
<FlipClock title="当前时间" />
```

### 2. 动态标题

```tsx
<FlipClock 
  deadline="2026-01-01" 
  title={(current, rest) => rest > 0 ? '倒计时' : '新年快乐！'} 
/>
```

### 3. 多行显示

```tsx
<FlipClock formatter="YY年MM月DD日|hh时mm分ss秒" separator="|" />
```

### 4. 自定义主题和大小

```tsx
<FlipClock 
  theme="dark"
  size="large"
  title="深色大号时钟"
/>
```

### 5. 自定义尺寸和比例

```tsx
<FlipClock 
  size="120px"
  ratio={0.8}
  title="自定义尺寸"
/>
```

## 注意事项

1. 当使用倒计时功能时，需要设置 `deadline` 属性
2. `size` 属性除了预设值外，还支持自定义 CSS 尺寸值（如："100px"）
3. 主题颜色支持三种模式：
   - `auto`: 自动适应系统暗色模式
   - `dark`: 强制使用暗色主题
   - `light`: 强制使用亮色主题
4. `ratio` 属性用于调整数字的宽高比，建议保持在 0.6-1.0 之间
5. `continueAfterDeadline` 设置为 `true` 时，倒计时结束后会继续计时

## License

MIT
