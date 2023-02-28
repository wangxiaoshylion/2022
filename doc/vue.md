### Vue 快速上手

Vue 声明式渲染、响应性

### API 风格

选项式 API、组合式 API

### Vue 一些 API

reactive() 基于对象
ref() 适用任何类型, 返回一个包裹对象

### Attribute 绑定

v-bind:attr="value"
:attr="value"

例子: :class="titleClass"

### 事件监听

v-on:"event"="func"
@event="func"

例子: @click="increment"

### 表单绑定

v-model="value"

例子: <input v-model="text">

### 条件渲染

v-if
v-else-if
v-else

例子：

<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>

### 列表渲染

v-for
例子： <li v-for="todo in todos" :key="todo.id">{{todo.text}}</li>

### 计算属性

computed()

### 生命周期和模板引用

onMounted()

### 侦听器

watch

### 子组件接收父组件 props

defineProps()

### Emits 子组件向父组件触发事件

defineEmits()
