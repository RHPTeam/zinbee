<template>
  <div class="rc--view rc--dayGridMonth-view rc--dayGrid-view">
    <table class>
      <!-- Start: Month View Head -->
      <thead class="rc--head">
        <tr>
          <td class="rc--head-container rc--widget-header">
            <div class="rc--row rc--widget-header">
              <table>
                <thead>
                  <tr>
                    <th class="rc--day-header rc--widget-header rc--sun">
                      <span>CN</span>
                    </th>
                    <th class="rc--day-header rc--widget-header rc--mon">
                      <span>T2</span>
                    </th>
                    <th class="rc--day-header rc--widget-header rc--tue">
                      <span>T3</span>
                    </th>
                    <th class="rc--day-header rc--widget-header rc--wed">
                      <span>T4</span>
                    </th>
                    <th class="rc--day-header rc--widget-header rc--thu">
                      <span>T5</span>
                    </th>
                    <th class="rc--day-header rc--widget-header rc--fri">
                      <span>T6</span>
                    </th>
                    <th class="rc--day-header rc--widget-header rc--sat">
                      <span>T7</span>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </td>
        </tr>
      </thead>
      <!-- End: Month View Head -->

      <!-- Start: Month View Body -->
      <tbody class="rc--body">
        <tr>
          <td class="rc--widget-content">
            <div
              class="rc--scroller rc--day-grid-container"
              style="overflow: hidden; height: auto;"
            >
              <div class="rc--day-grid">
                <!-- Start: A week row -->
                <rc-week-row
                  v-for="(v, i) in 6"
                  :key="i"
                  :eventsOfWeek="eventsOfWeek(i)"
                  :monthDays="monthDays"
                  :rowIndex="i"
                  @closeCardHover="showCardHover = $event"
                  @eventClick="eventClick($event)"
                  @eventHover="eventHover($event)"
                  @getEvents="eventsPopupData = $event"
                  @setLeftVal="leftVal = $event"
                  @setRightVal="rightVal = $event"
                  @setTopVal="topVal = $event"
                  @showMorePopover="showMorePopover = $event"
                />
                <!-- End: A week row -->
              </div>
            </div>
          </td>
        </tr>
      </tbody>
      <!-- End: Month View Body -->
    </table>
    <!-- Popover -->
    <transition name="fade">
      <rc-more-popover
        v-if="showMorePopover"
        @closeMorePopover="showMorePopover = $event"
        @eventClick="eventClick($event)"
        :eventsPopupData="eventsPopupData"
        :leftVal="leftVal"
        :rightVal="rightVal"
        :topVal="topVal"
      />
      <rc-card-hover
        v-if="showCardHover"
        :eventData="eventHoverData"
        :leftVal="leftVal"
        :rightVal="rightVal"
        :topVal="topVal"
      />
    </transition>
  </div>
</template>

<script>
import RcCardHover from "../../popover/cardhover";
import RcMorePopover from "../../popover/more/index";
import RcWeekRow from "./week-row/index";

export default {
  components: {
    RcCardHover,
    RcMorePopover,
    RcWeekRow
  },
  props: [ "events", "monthDays" ],
  data() {
    return {
      eventsPopupData: [],
      eventHoverData: {},
      showMorePopover: false,
      showCardHover: false,
      leftVal: null,
      rightVal: null,
      topVal: null
    };
  },
  computed: {

  },
  methods: {
    eventClick( data ) {
      this.$emit( "eventClick", data );
    },
    eventHover( data ) {
      this.showCardHover = true;
      this.eventHoverData = data;
    },
    eventsOfWeek( i ) {
      let firstDayOfWeek = new Date( this.monthDays[ i * 7 ].time ).setHours( 0, 0, 0),
          lastDayOfWeek = new Date( this.monthDays[ i * 7 + 6 ].time ).setHours( 23, 59, 59);

      let res = this.events.filter( ( event ) => {
        const eventStartTime = new Date(event.started_at);

        return eventStartTime >= firstDayOfWeek && eventStartTime <= lastDayOfWeek;
      } );

      return res;
    }
  }
};
</script>

<style lang="scss">
@import "../../../style";
</style>
