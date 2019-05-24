# Vue.js full calender.

It is inpired by the nice (but limited by design) https://fullcalendar.io/

[Live demo here](http://rhp/library/vue-rhp-fullcalendar/)

### Install

```bash
npm install vue-rhp-fullcalendar --save
```

### Import
This components is registered as a global component.

### Use

```xml

<fullcalendar
    :view = "calendarView"
/>

```

### Properties

| Name            | Type              | Default     | Description                        |
| ---             | ---               | ---         | ---                                |
| view            | String            | `month`     | Selected calendar view. Value must be: `month`, `week`, `day` or `list` |

### Events

| Name       | Description                                |
| ---        | ---                                        |
| eventClick | Triggered whenever click on calendar event.|

