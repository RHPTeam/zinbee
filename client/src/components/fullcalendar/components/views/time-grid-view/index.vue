<template>
  <div class="rc--view rc--timeGridWeek-view rc--timeGrid-view">
    <table>
      <thead class="rc--head">
        <tr>
          <td class="rc--head-container rc--widget-header">
            <div class="rc--row rc--widget-header">
              <table>
                <thead>
                  <tr v-if="view === 'week'">
                    <th
                      class="rc--axis rc--widget-header"
                      style="width: 42px;"
                    ></th>
                    <th
                      class="rc--day-header rc--widget-header"
                      v-for="(day, i) in weekDays"
                      :key="i"
                      :data="day.time"
                    >
                      {{ day.text }}
                    </th>
                  </tr>
                  <tr v-if="view === 'day'">
                    <th
                      class="rc--axis rc--widget-header"
                      style="width: 42px;"
                    ></th>
                    <th class="rc--day-header rc--widget-header">
                      {{ dayFullName[activeDay.getDay()] }}
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </td>
        </tr>
      </thead>
      <tbody class="rc--body">
        <tr>
          <td class="fc-widget-content">
            <rc-week-time-grid
              v-if="view === 'week'"
              :eventsOfWeek="eventsOfWeek"
              :timePoint="timePoint"
              :weekDays="weekDays"
              @eventClick="eventClick($event)"
            />
            <rc-day-time-grid
              v-if="view === 'day'"
              :eventOfDay="eventOfDay"
              :timePoint="timePoint"
              :activeDay="activeDay"
              @eventClick="eventClick($event)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import RcDayTimeGrid from "./day-time-grid/index";
import RcWeekTimeGrid from "./week-time-grid/index";
export default {
  components: {
    RcDayTimeGrid,
    RcWeekTimeGrid
  },
  props: [ "activeDay", "eventOfDay", "eventsOfWeek", "dayFullName", "timePoint", "view", "weekDays" ],
  data() {
    return {
      showMorePopover: false,
      topVal: 0,
      leftVal: 0
    };
  },
  methods: {
    eventClick( data ) {
      this.$emit( "eventClick", data );
    }
  }
};
</script>

<style lang="scss">
@import "../../../style";
</style>
