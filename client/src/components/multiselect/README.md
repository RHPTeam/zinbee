# Multi-Select RHP Team

> **Everything you wish the HTML `<select>` element could do, wrapped up into a lightweight, zero 
dependency, extensible Vue component.** 

- Tagging
- Filtering / Searching
- Vuex Support
- AJAX Support
- SSR Support
- ~20kb Total / ~5kb CSS / ~15kb JS
- Select Single/Multiple Options
- Customizable with slots and SCSS variables
- Tested with Bootstrap 3/4, Bulma, Foundation
- +95% Test Coverage
- Zero dependencies

## Documentation

Multi-Select RHP Team get inspire of Vue.js! So If you want use deep level, please visit bellow links. Complete documentation and examples available at https://vue-select.org.

- **[API Documentation](https://vue-select.org)**
- **[Sandbox Demo](https://vue-select.org/sandbox.html)**
- **[CodePen Template](http://codepen.io/sagalbot/pen/NpwrQO)**
- **[GitHub Projects](https://github.com/sagalbot/vue-select/projects)**

Register the component

```js
import vSelect from '@/components/multiselect'

Vue.component('multiselect', vSelect)
```

You may now use the component in your markup

```html
<multiselect v-model="selected" :options="['RHP','Team']"></multiselect>
```

You can also include vue-select of vue.js directly in the browser. Check out the 
[documentation for loading from CDN.](https://vue-select.org/guide/install.html#in-the-browser).
