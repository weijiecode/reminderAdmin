// 主题样式
import themes from './theme.json'
 
export function addColor(init:string) {
    const keys = ['light','dark']
    const obj = themes[keys.indexOf(init) != -1 ? init : 'dark']
    // console.log(obj);
    // html 添加主题样式
    for (const key in obj) {
        document.documentElement.style.setProperty(key, obj[key]);
    }
}