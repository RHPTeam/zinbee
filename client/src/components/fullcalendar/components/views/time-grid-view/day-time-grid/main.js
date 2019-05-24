/* eslint-disable prettier/prettier */
import RcMorePopover from "../../../popover/more/index";
export default {
  props: [ "activeDay", "eventOfDay", "timePoint", ],
  data() {
    return {
      eventContent: {},
      eventContentWidth: 0,
      eventsPopupData: [],
      isShowMorePopover: false,
      leftVal: null,
      rightVal: 0,
      topVal: null
    };
  },
  methods: {
    eventClick( data) {
      this.$emit( "eventClick", data );
    },
    filterEventsByTime( hour) {
      return this.eventOfDay.filter( ( event ) => {
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
    isToday( day ) {
      const now = new Date(); // now date time

      let today = new Date( now.getFullYear(), now.getMonth(), now.getDate() ); // now date at 00:00:00

      return day.toDateString() === today.toDateString();

    },
    showEventContent( eventVal) {
      if ( eventVal=== undefined || eventVal.length === 0 ) {
        return '';
      } else {
        return `${this.formatTime( eventVal.started_at )}  ${eventVal.title}`;
      }
    },
    showMorePopover( timePoint, events ) {
      const timeGridContainerHeight = 1392, // 29*48
        // calculate height of more popover element
        eventCount = 6, // number of events
        popoverHeight = 50 + eventCount * 26;

      // set top and left popover style
      let topVal = timePoint * 2 * 29;

      if ( topVal + popoverHeight >= timeGridContainerHeight ) {
        topVal = topVal - popoverHeight + 57;
      }

      this.topVal = topVal;
      this.isShowMorePopover = true;
      this.eventsPopupData = events;
    }
  },
  components: {
    RcMorePopover
  }
};

