/* eslint-disable prettier/prettier */
export default {
  props: [ "eventsOfWeek", "monthDays", "rowIndex" ],
  data() {
    return {
      eventContainer: {},
      eventContainerWidth: 0
    };
  },
  mounted() {
    this.$nextTick( () => {
      const container = document.querySelector( "#eventColumnWidth" );

      this.eventContainer = container;
      window.addEventListener( "resize", this.getEventContainerWidth );

      // Init
      this.getEventContainerWidth();
    } );
  },
  computed: {},
  methods: {
    closeCardHover() {
      this.$emit( "closeCardHover", false );
    },
    compareDate( d1, d2 ) {
      const d1Time = new Date( d1 ),
            d1Date = d1Time.getDate(),
            d1Month = d1Time.getMonth() + 1,
            d1Year = d1Time.getFullYear(),

            d2Time = new Date( d2 ),
            d2Date = d2Time.getDate(),
            d2Month = d2Time.getMonth() + 1,
            d2Year = d2Time.getFullYear();

      return d1Date === d2Date && d1Month === d2Month && d1Year === d2Year;
    },
    eventClick( data) {
      this.$emit( "eventClick", data );
    },
    eventHover( colIndex, eventData ) {
      const dayGridMonthHeight = 779;

      // set top and left popover style
      let cardHoverHeight,
        topVal = 32 + this.rowIndex * 124 + 1,
        leftVal = this.eventContainerWidth * colIndex;

      // card hover height
      eventData.type_event === 1 ? cardHoverHeight = 124 : cardHoverHeight = 200;

      if ( this.rowIndex !== 0 ) {
        topVal = topVal + 1;
      }

      if ( colIndex !== 0 ) {
        leftVal = leftVal + 1;
      }

      if ( topVal + cardHoverHeight >= dayGridMonthHeight ) {
        topVal = topVal - cardHoverHeight + 124;
      }

      // emit data
      if ( colIndex < 4 ) {
        this.$emit( "setTopVal", topVal );
        this.$emit( "setLeftVal", leftVal + this.eventContainerWidth );
        this.$emit( "setRightVal", null );
      } else {
        this.$emit( "setTopVal", topVal );
        this.$emit( "setLeftVal", leftVal - 392 );
        this.$emit( "setRightVal", null );
      }
      this.$emit( "eventHover", eventData );
    },
    eventOfDay( day ) {
      return this.eventsOfWeek.filter( ( event ) => {
        return this.compareDate( day, event.started_at );
      } );
    },
    formatTime( d ) {
      const dateTime = new Date( d ),
        hours = String( dateTime.getHours() ).padStart( 2, "0"),
        mins = String( dateTime.getMinutes() ).padStart( 2, "0" );

      return `${hours}:${mins}`;
    },
    getEventContainerWidth() {
      this.eventContainerWidth = this.eventContainer.offsetWidth;
    },
    showEventContent( eventVal) {
      if ( eventVal=== undefined || eventVal.length === 0 ) {
        return '';
      } else {
        return `${this.formatTime( eventVal.started_at )}  ${eventVal.title}`;
      }
    },
    showMorePopover( colIndex, events ) {
      const dayGridMonthHeight = 779,
        // calculate height of more popover element
        eventCount = 6, // number of events
        popoverHeight = 50 + eventCount * 26;

      // set top and left popover style
      let topVal = 32 + this.rowIndex * 124 + 1,
        leftVal = this.eventContainerWidth * colIndex;

      if ( this.rowIndex !== 0 ) {
        topVal = topVal + 1;
      }

      if ( colIndex !== 0 ) {
        leftVal = leftVal + 1;
      }

      if ( topVal + popoverHeight >= dayGridMonthHeight ) {
        topVal = topVal - popoverHeight + 124;
      }

      // emit data
      if ( colIndex !== 6 ) {
        this.$emit( "setTopVal", topVal );
        this.$emit( "setLeftVal", leftVal );
        this.$emit( "setRightVal", null );
      } else {
        this.$emit( "setTopVal", topVal );
        this.$emit( "setLeftVal", null );
        this.$emit( "setRightVal", 0 );
      }
      this.$emit( "showMorePopover", true );
      this.$emit( "getEvents", events);
    }
  },
  beforeDestroy() {
    window.removeEventListener( "resize", this.getEventContainerWidth );
  }
};
