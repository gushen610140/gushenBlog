// 这几把什么鸡毛原理解决了vue局部导入模块的问题

declare module '*.vue' {
    import type {DefineComponent} from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}
