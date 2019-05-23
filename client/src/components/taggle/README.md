# Taggle RHP Team
> A Vue.js 2.0/3.0 input tag component inspired in [vue-tagsinput](https://github.com/matiastucci/vue-input-tag)

<p align="center">
  <img src="assets/demo.gif" width="750" alt="Logo"/>
</p>

Then you need to import and register it:

```js
import Taggle from '@/components/taggle'
```

```js
Vue.component('Taggle', Taggle)
```

## Usage

```html
<taggle v-model="tags"></taggle>
```

## Props
| Name | Type | Default | Description |
| ---:| --- | ---| --- |
| value | Array | [] | Tags to be render in the input |
| placeholder | String | "" | Placeholder to be shown when no tags |
| read-only | Boolean | false | Set input to readonly |
| add-tag-on-blur | Boolean | false | Add tag on input blur |
| limit | String or Number | -1 (none) | Set a limit for the amount of tags |
| validate | String or Function (allows async) or Object | "" | Apply certain validator for user input. Choose from `email`, `url`, `text`, `digits` or `isodate`. Or pass a `function` or a `RegExp` object for custom validation |
| add-tag-on-keys | Array | [ 13 (return), 188 (comma), 9 (tab) ] | Keys that are going to add the new tag
| allow-duplicates | Boolean | false | Allow duplicate tags
| before-adding | Function | null | Function (allows async) to normalize tag before adding. E.g `(tag) => tag.toUpperCase()`
