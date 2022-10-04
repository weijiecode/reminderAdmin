/* eslint-disable */
// declare module '*.vue' {
//   import type { DefineComponent } from 'vue'
//   const component: DefineComponent<{}, {}, any>
//   export default component
// }

declare module '*vue' {
  import { ComponentOptions } from "vue";
  const ComponentOptions: ComponentOptions
  export default ComponentOptions
}

declare module '*.json' {
  const value: any;
  export default value;
}

declare module '*.svg'