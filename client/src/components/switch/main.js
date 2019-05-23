/* eslint-disable prettier/prettier */
const DEFAULT_COLOR_CHECKED = "#58CE41",
  DEFAULT_COLOR_UNCHECKED = "#ccc",
  DEFAULT_LABEL_CHECKED = "On",
  DEFAULT_LABEL_UNCHECKED = "Off",
  DEFAULT_SWITCH_COLOR = "#fff",
  contains = ( object, title ) =>
    typeof object === "object" && object.hasOwnProperty( title ),
  px = ( v ) => `${v}px`,
  translate3d = ( x, y, z = "0px" ) => {
    return `translate3d(${x}, ${y}, ${z})`;
  };

export default {
  name: "ToggleButton",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    sync: {
      type: Boolean,
      default: false
    },
    speed: {
      type: Number,
      default: 300
    },
    color: {
      type: [ String, Object ],
      validator( value ) {
        return typeof value === "object" ? value.checked || value.unchecked || value.disabled : typeof value === "string";
      }
    },
    switchColor: {
      type: [ String, Object ],
      validator( value ) {
        return typeof value === "object" ? value.checked || value.unchecked : typeof value === "string";
      }
    },
    cssColors: {
      type: Boolean,
      default: false
    },
    labels: {
      type: [ Boolean, Object ],
      default: false,
      validator( value ) {
        return typeof value === "object" ? value.checked || value.unchecked : typeof value === "boolean";
      }
    },
    height: {
      type: Number,
      default: 20
    },
    width: {
      type: Number,
      default: 40
    },
    margin: {
      type: Number,
      default: 3
    },
    fontSize: {
      type: Number
    }
  },
  computed: {
    className() {
      let { toggled, disabled } = this;

      return [ "vue-js-switch", { toggled, disabled } ];
    },
    coreStyle() {
      let bgColor;

      if ( this.cssColors ) {
        bgColor = null;
      } else if ( this.disabled ) {
        bgColor = this.colorDisabled;
      } else {
        bgColor = this.colorCurrent;
      }

      return {
        width: px( this.width ),
        height: px( this.height ),
        backgroundColor: bgColor,
        borderRadius: px( Math.round( this.height / 2 ) )
      };
    },
    buttonRadius() {
      return this.height - this.margin * 2;
    },
    distance() {
      return px( this.width - this.height + this.margin );
    },
    buttonStyle() {
      const transition = `transform ${this.speed}ms`,
        margin = px( this.margin ),
        transform = this.toggled ? translate3d( this.distance, margin ) : translate3d( margin, margin ),
        background = this.switchColor ? this.switchColorCurrent : null;

      return {
        width: px( this.buttonRadius ),
        height: px( this.buttonRadius ),
        transition,
        transform,
        background
      };
    },
    labelStyle() {
      return {
        lineHeight: px( this.height ),
        fontSize: this.fontSize ? px( this.fontSize ) : null
      };
    },
    colorChecked() {
      let { color } = this;

      if ( typeof color !== "object" ) {
        return color || DEFAULT_COLOR_CHECKED;
      }
      return contains( color, "checked" ) ? color.checked : DEFAULT_COLOR_CHECKED;
    },
    colorUnchecked() {
      let { color } = this;

      return contains( color, "unchecked" ) ? color.unchecked : DEFAULT_COLOR_UNCHECKED;
    },
    colorDisabled() {
      let { color } = this;

      return contains( color, "disabled" ) ? color.disabled : this.colorCurrent;
    },
    colorCurrent() {
      return this.toggled ? this.colorChecked : this.colorUnchecked;
    },
    labelChecked() {
      const { labels } = this;

      return contains( labels, "checked" ) ? labels.checked : DEFAULT_LABEL_CHECKED;
    },
    labelUnchecked() {
      const { labels } = this;

      return contains( labels, "unchecked" ) ? labels.unchecked : DEFAULT_LABEL_UNCHECKED;
    },
    switchColorChecked() {
      const { switchColor } = this;

      return contains( switchColor, "checked" ) ? switchColor.checked : DEFAULT_SWITCH_COLOR;
    },
    switchColorUnchecked() {
      const { switchColor } = this;

      return contains( switchColor, "unchecked" ) ? switchColor.unchecked : DEFAULT_SWITCH_COLOR;
    },
    switchColorCurrent() {
      let { switchColor } = this;

      if ( typeof switchColor !== "object" ) {
        return switchColor || DEFAULT_SWITCH_COLOR;
      }
      return this.toggled ? this.switchColorChecked : this.switchColorUnchecked;
    }
  },
  watch: {
    value( value ) {
      if ( this.sync ) {
        this.toggled = !!value;
      }
    }
  },
  data() {
    return {
      toggled: !!this.value
    };
  },
  methods: {
    toggle( event ) {
      this.toggled = !this.toggled;
      this.$emit( "input", this.toggled );
      this.$emit( "change", {
        value: this.toggled,
        srcEvent: event
      } );
    }
  }
};
