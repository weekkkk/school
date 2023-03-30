export default class ColorVars {
    "--color-default" = "#fff";
    "--color-light-gray" = "#eee";
    "--color-gray" = "#afafaf";
    "--color-active" = "#4f7aec";
    "--color-text" = "#484848";
    "--border-radius-default" = "20px";
    "--page-width" = "1024px";

    static setVars(vars: ColorVars) {
        Object.keys(vars).forEach((key) => document.documentElement.style.setProperty(key, vars[key]));
    }

    constructor(obj?: Partial<ColorVars>) {
        if (obj) Object.assign(this, obj);
    }
}