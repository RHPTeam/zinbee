const replaceAll = ( str, search, replacement ) => {
  return str.split( search ).join( replacement );
};

export default {
  name: "contenteditable",
  props: {
    tag: String,
    contenteditable: {
      type: Boolean,
      default: true
    },
    value: String,
    noHTML: {
      type: Boolean,
      default: true
    },
    noNL: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.updateContent( this.value );
  },
  computed: {},
  data() {
    return {};
  },
  methods: {
    currentContent() {
      return this.noHTML ? this.$refs.element.innerText : this.$refs.element.innerHTML;
    },
    updateContent( newcontent ) {
      if ( this.noHTML ) {
        this.$refs.element.innerText = newcontent;
      } else {
        this.$refs.element.innerHTML = newcontent;
      }
    },
    update() {
      this.$emit( "input", this.currentContent() );
    },
    onPaste( event ) {
      event.preventDefault();
      let text = ( event.originalEvent || event ).clipboardData.getData(
        "text/plain"
      );

      if ( this.noNL ) {
        text = replaceAll( text, "\r\n", " " );
        text = replaceAll( text, "\n", " " );
        text = replaceAll( text, "\r", " " );
      }
      window.document.execCommand( "insertText", false, text );
      this.fwdEv( event );
    },
    onKeypress( event ) {
      if ( event.key === "Enter" && this.noNL ) {
        event.preventDefault();
        this.$emit( "returned", this.current_content );
      }
      this.fwdEv( event );
    },
    fwdEv( event ) {
      this.$emit( event.type, event );
    }
  },
  watch: {
    value( newval ) {
      if ( newval !== this.currentContent() ) {
        this.updateContent( newval );
      }
    }
  }
};
