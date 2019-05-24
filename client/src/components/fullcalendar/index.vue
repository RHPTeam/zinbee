<template>
  <div id="rcalender" class="rc rc--ltr" :data-theme="theme">
    <div class="rc--toolbar rc--header-toolbar">
      <!-- Start: Month View Toolbar -->
      <div class="rc--toolbar-action" v-if="view === 'month'">
        <button class="rc--btn-prev" @click="getActiveMonth(-1)">
          <span class="rc--icon rc--icon-chevron-left"></span>
        </button>
        <div class="rc--time-info">
          {{
            monthName[activeMonth.getMonth()] + ", " + activeMonth.getFullYear()
          }}
        </div>
        <button class="rc--btn-next" @click="getActiveMonth(1)">
          <span class="rc--icon rc--icon-chevron-right"></span>
        </button>
      </div>
      <!-- End: Month View Toolbar -->

      <!-- Start: Week View Toolbar -->
      <div class="rc--toolbar-action" v-if="view === 'week'">
        <button class="rc--btn-prev" @click="getActiveWeek(-7)">
          <span class="rc--icon rc--icon-chevron-left"></span>
        </button>
        <div class="rc--time-info">{{ activeWeekInfo }}</div>
        <button class="rc--btn-next" @click="getActiveWeek(7)">
          <span class="rc--icon rc--icon-chevron-right"></span>
        </button>
      </div>
      <!-- End: Week View Toolbar -->

      <!-- Start: Day View Toolbar -->
      <div class="rc--toolbar-action" v-if="view === 'day'">
        <button class="rc--btn-prev" @click="getActiveDay(-1)">
          <span class="rc--icon rc--icon-chevron-left"></span>
        </button>
        <div class="rc--time-info">
          {{
            String(activeDay.getDate()).padStart(2, "0") +
              " " +
              monthName[activeDay.getMonth()] +
              ", " +
              activeDay.getFullYear()
          }}
        </div>
        <button class="rc--btn-next" @click="getActiveDay(1)">
          <span class="rc--icon rc--icon-chevron-right"></span>
        </button>
      </div>
      <!-- End: Day View Toolbar -->

      <!-- Start: Week View Toolbar -->
      <div class="rc--toolbar-action" v-if="view === 'list'">
        <button class="rc--btn-prev" @click="getActiveWeek(-7)">
          <span class="rc--icon rc--icon-chevron-left"></span>
        </button>
        <div class="rc--time-info">{{ activeWeekInfo }}</div>
        <button class="rc--btn-next" @click="getActiveWeek(7)">
          <span class="rc--icon rc--icon-chevron-right"></span>
        </button>
      </div>
      <!-- End: Week View Toolbar -->
    </div>
    <div class="rc--view-container">
      <rc-day-grid-month-view
        v-if="view === 'month'"
        :events="events"
        :monthDays="monthDays"
        @eventClick="eventClick($event)"
      ></rc-day-grid-month-view>
      <rc-time-grid-view
        v-if="view === 'week' || view === 'day'"
        :activeDay="activeDay"
        :eventsOfWeek="eventsOfWeek"
        :eventOfDay="eventOfDay"
        :dayFullName="dayFullName"
        :timePoint="timePoint"
        :view="view"
        :weekDays="weekDays"
        @eventClick="eventClick($event)"
      ></rc-time-grid-view>
      <rc-list-week-view
        v-if="view === 'list'"
        :eventsOfWeek="eventsOfWeek"
        :dayFullName="dayFullName"
        :monthName="monthName"
        :weekDays="weekDays"
        @eventClick="eventClick($event)"
      ></rc-list-week-view>
    </div>
  </div>
</template>

<script src="./main.js"></script>

<style lang="scss">
@import "./style";
</style>
