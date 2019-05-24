/* eslint-disable prettier/prettier */
import RcCardHover from "../../../popover/cardhover";
import RcMorePopover from "../../../popover/more/index";

export default {
  props: [ "eventsOfWeek", "timePoint", "weekDays" ],
  data() {
    return {
      eventContainer: {},
      eventContainerWidth: 0,
      eventHoverData: {},
      eventsPopupData: [],
      isShowMorePopover: false,
      isShowCardHover: false,
      leftVal: null,
      rightVal: null,
      topVal: null
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
  methods: {
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
    eventHover( colIndex, timePoint, eventData ) {
      const timeGridContainerHeight = 1392;

      // set top and left popover style
      let cardHoverHeight,
        topVal = timePoint * 2 * 29,
        leftVal = 50 + ( this.eventContainerWidth + 0.5 ) * colIndex;

      // card hover height
      eventData.type_event === 1 ? cardHoverHeight = 124 : cardHoverHeight = 200;

      if ( topVal + cardHoverHeight >= timeGridContainerHeight ) {
        topVal = topVal - cardHoverHeight + 57;
      }

      if ( colIndex < 4 ) {
        this.topVal = topVal;
        this.leftVal = leftVal + this.eventContainerWidth;
        this.rightVal = null;
      } else {
        this.topVal = topVal;
        this.leftVal = leftVal - 395;
        this.rightVal = null;
      }
      this.isShowCardHover = true;
      this.eventHoverData = eventData;
    },
    filterEventsByDay( day ) {
      return this.eventsOfWeek.filter( ( event ) => {
        return this.compareDate( day, event.started_at );
      } );
    },
    filterEventsByTime( hour, events ) {
      return events.filter( ( event ) => {
        const eventStartTime = new Date( event.started_at ).getHours();

        return eventStartTime === hour;
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
    showMorePopover( colIndex, timePoint , events) {
      const timeGridContainerHeight = 1392, // 29*48
        // calculate height of more popover element
        eventCount = 6, // number of events
        popoverHeight = 50 + eventCount * 26;

      // set top and left popover style
      let topVal = timePoint * 2 * 29,
        leftVal = 50 + ( this.eventContainerWidth + 0.5 ) * colIndex;

      if ( topVal + popoverHeight >= timeGridContainerHeight ) {
        topVal = topVal - popoverHeight + 57;
      }

      if ( colIndex !== 6 ) {
        this.topVal = topVal;
        this.leftVal = leftVal;
        this.rightVal = null;
      } else {
        this.topVal = topVal;
        this.leftVal = null;
        this.rightVal = 0;
      }
      this.isShowMorePopover = true;
      this.eventsPopupData = events;
    }
  },
  beforeDestroy() {
    window.removeEventListener( "resize", this.getEventContainerWidth );
  },
  components: {
    RcCardHover,
    RcMorePopover
  }
};

