import { createI18n } from "vue-i18n";
// 语言包
import zhCn from "./lang/zh-cn";
import en from "./lang/en";
const i18n = createI18n({
    legacy: false,
    // locale: JSON.parse(localStorage.getItem('longStore') || '').language || "zhCn",
    locale: "zhCn",
    messages: {
        zhCn,
        en,
    },
});
export default i18n;