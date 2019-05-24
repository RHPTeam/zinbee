/* eslint-disable prettier/prettier */
import RcDayGridMonthView from "./components/views/day-grid-month-view/index";
import RcListWeekView from "./components/views/list-week-view/index";
import RcTimeGridView from "./components/views/time-grid-view/index";

export default {
  props: {
    events: {
      type: Array,
      default: [],
    },
    theme: {
      type: String,
      default: "light"
    },
    view: {
      type: String,
      default: "month"
    }
  },
  data() {
    return {
      activeDay: new Date(),
      activeMonth: new Date(),
      activeWeek: new Date(),
      timePoint: [
        "00:00",
        "00:30",
        "01:00",
        "01:30",
        "02:00",
        "02:30",
        "03:00",
        "03:30",
        "04:00",
        "04:30",
        "05:00",
        "05:30",
        "06:00",
        "06:30",
        "07:00",
        "07:30",
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00",
        "21:30",
        "22:00",
        "22:30",
        "23:00",
        "23:30"
      ],
      dayName: [ "CN", "T2", "T3", "T4", "T5", "T6", "T7" ],
      dayFullName: [
        "Chủ Nhật",
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy"
      ],
      monthName: [
        "Tháng 01",
        "Tháng 02",
        "Tháng 03",
        "Tháng 04",
        "Tháng 05",
        "Tháng 06",
        "Tháng 07",
        "Tháng 08",
        "Tháng 09",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12"
      ]
    };
  },
  computed: {
    activeWeekInfo() {
      let firstDay = new Date( this.weekDays[ 0 ].time ),
        lastDay = new Date( this.weekDays[ 6 ].time );

      if ( firstDay.getFullYear() === lastDay.getFullYear() ) {
        return (
          `${String( firstDay.getDate() ).padStart( 2, "0" ) }/${ String( firstDay.getMonth() + 1 ).padStart( 2, "0" ) } - ${ String( lastDay.getDate() ).padStart( 2, "0" ) }/${ String( lastDay.getMonth() + 1 ).padStart( 2, "0" ) }, ${ firstDay.getFullYear()}`
        );
      }
      return (
        `${String( firstDay.getDate() ).padStart( 2, "0" ) }/${ String( firstDay.getMonth() + 1 ).padStart( 2, "0" ) }/${ firstDay.getFullYear() } - ${ String( lastDay.getDate() ).padStart( 2, "0" ) }/${ String( lastDay.getMonth() + 1 ).padStart( 2, "0" ) }/${ lastDay.getFullYear()}`
      );
      
    },
    eventOfDay() {
      return this.events.filter( ( event ) => {
        return this.compareDate( this.activeDay, event.started_at );
      } );
    },
    eventsOfWeek() {
      let firstDayOfWeek = new Date( this.weekDays[ 0 ].time ).setHours( 0, 0, 0),
        lastDayOfWeek = new Date( this.weekDays[ 6 ].time ).setHours( 23, 59, 59);

      let res = this.events.filter( ( event ) => {
        const eventStartTime = new Date(event.started_at);

        return eventStartTime >= firstDayOfWeek && eventStartTime <= lastDayOfWeek;
      } );

      return res;
    },
    monthDays() {
      // set days in active month function
      let arr = [],
        time = new Date( this.activeMonth ),
        firstDayOfThisMonth,
        lastDayOfPrevMonth,
        lastDayOfThisMonth,
        j = 1;

      time.setMonth( time.getMonth(), 1 ); // set the first day of this month
      firstDayOfThisMonth = time.getDay();

      firstDayOfThisMonth === 0 && ( firstDayOfThisMonth = 7 );

      time.setDate( 0 ); // set the last day of prev month
      lastDayOfPrevMonth = time.getDate();

      for ( let i = firstDayOfThisMonth; i > 0; i-- ) {
        arr.push( {
          text: lastDayOfPrevMonth - i + 1,
          time: new Date(
            time.getFullYear(),
            time.getMonth(),
            lastDayOfPrevMonth - i + 1
          ),
          status: "rc--past"
        } );
      }

      time.setMonth( time.getMonth() + 2, 0 ); // set the last day of this month
      lastDayOfThisMonth = time.getDate(); // get the last day of this month
      time.setDate( 1 ); // fix bug when month change

      for ( let i = 0; i < lastDayOfThisMonth; i++ ) {
        let tmpTime = new Date( time.getFullYear(), time.getMonth(), i + 1 ),
          status = "";

        if ( this.isToday( tmpTime ) ) {
          status = "rc--today";
        }
        arr.push( {
          text: i + 1,
          time: tmpTime,
          status: status
        } );
      }

      while ( arr.length < 42 ) {
        arr.push( {
          text: j,
          time: new Date( time.getFullYear(), time.getMonth() + 1, j ),
          status: "rc--future"
        } );
        j++;
      }
      return arr;
    },
    weekDays() {
      // set days in active week function
      let arr = [],
        time = new Date( this.activeWeek ), // get active week
        first = time.getDate() - time.getDay(), // first day is the day of the month - the day of the week
        firstday = new Date( time.setDate( first ) ), // set first day
        day,
        text;

      for ( let i = 0; i < 7; i++ ) {
        let dayNum,
          status = "";

        if ( i === 0 ) {
          dayNum = firstday.getDate();
        } else {
          dayNum = new Date( arr[ i - 1 ].time ).getDate() + 1;
        }

        day = new Date( firstday.setDate( dayNum ) );
        text = `${this.dayName[ day.getDay() ]} ${String( day.getDate() ).padStart( 2, "0" )}/${String( day.getMonth() + 1 ).padStart( 2, "0" )}`;

        if ( this.isToday( day ) ) {
          status = "rc--today";
        }
        arr.push( {
          text: text,
          time: day,
          status: status
        } );
      }
      return arr;
    }
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
    eventClick( data ) {
      this.$emit( "eventClick", data );
    },
    isToday( day ) {
      const now = new Date(); // now date time

      let today = new Date( now.getFullYear(), now.getMonth(), now.getDate() ); // now date at 00:00:00

      return day.toDateString() === today.toDateString();
    },
    getActiveDay( flag ) {
      this.activeDay.setDate( this.activeDay.getDate() + flag );
      this.activeDay = new Date( this.activeDay );
    },
    getActiveMonth( flag ) {
      this.activeMonth.setMonth( this.activeMonth.getMonth() + flag, 1 );
      this.activeMonth = new Date( this.activeMonth );
    },
    getActiveWeek( flag ) {
      this.activeWeek.setDate( this.activeWeek.getDate() + flag );
      this.activeWeek = new Date( this.activeWeek );
    }
  },
  components: {
    RcDayGridMonthView,
    RcListWeekView,
    RcTimeGridView
  }
};
