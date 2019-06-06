import AppFooter from  "./desktop/footer";
import AppHeader from  "./desktop/header";
import AppRootBanner from "./desktop/notification/hot";
import AppNavigation from "./desktop/navigation";

export default {
  components: {
    AppFooter,
    AppHeader,
    AppRootBanner,
    AppNavigation
  },
  data() {
    return {
      timer: "",
      interval: null
    };
  },
  created() {
    this.startUpdateTimer();
  },
  beforeDestroy() {
    this.stopUpdateTimer();
    clearInterval( this.interval );
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    setTimer() {
      this.timer = new Date( Date.now() );
    },
    startUpdateTimer() {
      this.timer = setInterval( this.setTimer, 1000 );
    },
    stopUpdateTimer() {
      clearInterval( this.timer );
    }
  },
  watch: {
    timer( value ) {
      if ( !value ) {
        return;
      }
      if ( typeof value === "number" ) {
        return;
      }
      if ( parseInt( value.getHours() ) > 5 && parseInt( value.getHours() ) < 18 ) {
        this.$store.dispatch( "changeThemeName", "light" );
      } else if (
        ( parseInt( value.getHours() ) >= 18 && parseInt( value.getHours() ) <= 23 ) || ( parseInt( value.getHours() ) >= 0 && parseInt( value.getHours() ) <= 5 )
      ) {
        this.$store.dispatch( "changeThemeName", "light" );
      }
    }
  }
};
