import { Root } from 'postcss';

export default function transform(css: Root) {
    css.walkRules((rule) => {
        console.log(rule.selector);
    });
}
