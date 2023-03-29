import { App } from "vue"
export default {
    install(app: App<Element>) {
        const components = import.meta.globEager("./path/**/**.vue");
        Object.entries(components).forEach(([path, definition]) => {
            const componentName = path?.split('/')?.pop()?.replace(/\.\w+$/, '')
            app.component(componentName ?? "", (definition as any).default)
        })
    },
};