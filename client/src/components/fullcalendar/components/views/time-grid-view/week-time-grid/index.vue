<template>
  <div class="rc--time-grid-container" style="overflow: hidden;">
    <div class="rc--time-grid">
      <div class="rc--bg">
        <table>
          <tbody>
            <tr>
              <td class="rc--axis rc--widget-content" style="width: 42px;"></td>
              <td
                class="rc--day rc--widget-content"
                v-for="(day, i) in weekDays"
                :key="i"
                :data="day.time"
                :class="day.status"
              ></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="rc--slats">
        <table>
          <tbody>
            <tr
              v-for="(time, index) in timePoint"
              :key="index"
              :data-time="time"
              :class="[index % 2 !== 0 ? 'rc--minor' : '']"
            >
              <!-- Even Hours -->
              <td
                v-if="index % 2 === 0"
                class="rc--axis rc--time rc--widget-content"
                style="width: 42px; height: 28px; font-size: .85rem;"
              >
                <span>{{ time }}</span>
              </td>
              <td v-if="index % 2 === 0" class="rc--widget-content"></td>

              <!-- Odd hours -->
              <td
                v-if="index % 2 !== 0"
                class="rc--axis rc--time rc--widget-content"
                style="width: 42px; height: 28px; font-size: .85rem;"
              ></td>
              <td v-if="index % 2 !== 0" class="rc--widget-content"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr class="rc--divider rc--widget-header" style="display:none" />
      <div class="rc--content-skeleton">
        <table>
          <tbody>
            <tr>
              <td class="rc--axis" style="width: 42px;"></td>
              <!--Start: Day Loop-->
              <td
                v-for="(v, i) in 7"
                :key="i"
                :id="[ i === 0 ? 'eventColumnWidth' : null ]"
              >
                <div class="rc--content-col">
                  <div class="rc--event-container rc--mirror-container"></div>
                  <div class="rc--event-container">
                    <!--Start: Time Loop-->
                    <div v-for="(t, j) in 24" :key="j">
                      <div
                        class="rc--time-grid-event rc--event rc--start rc--end rc--draggable rc--resizable"
                        :style="[ {backgroundColor: filterEventsByTime( j, filterEventsByDay( weekDays[i].time ) )[0].color },
                                {top: j*2*29 + 'px'}, {bottom: -j*2*29 - 29 + 'px'}, {zIndex: 1}, {left: 0 + '%'}, {right: 0 + '%'} ]"
                        v-if="filterEventsByTime( j, filterEventsByDay( weekDays[i].time ) ).length !== 0
                              && filterEventsByTime( j, filterEventsByDay( weekDays[i].time ) )"
                        @click="
                        eventClick( filterEventsByTime( j, filterEventsByDay( weekDays[i].time ) )[0] )
                      "
                        @mouseover="eventHover(i, j, filterEventsByTime( j, filterEventsByDay( weekDays[i].time ) )[0] )"
                        @mouseleave="isShowCardHover = false"
                      >
                        <div class="rc--content">
                          <div class="rc--title">
                            {{ showEventContent( filterEventsByTime( j, filterEventsByDay( weekDays[i].time ) )[ 0 ]) }}
                          </div>
                        </div>
                        <div class="rc--resizer rc--end-resizer"></div>
                      </div>
                      <div
                        class="rc--time-grid-event rc--event rc--start rc--end rc--draggable rc--resizable"
                        v-if="filterEventsByTime( j, filterEventsByDay( weekDays[i].time ) ).length > 1
                              && filterEventsByTime( j, filterEventsByDay( weekDays[i].time ) )"
                        :style="[ {top: j*2*29 + 29 + 'px'}, {bottom: -j*2*29 - 58 + 'px'} ]"
                      >
                        <div class="rc--content">
                          <div class="rc--more" @click="showMorePopover(i, j, filterEventsByTime( j, filterEventsByDay( weekDays[i].time ) ))">
                            +{{ filterEventsByTime( j, filterEventsByDay( weekDays[i].time ) ).length - 1 }} sự kiện
                          </div>
                        </div>
                        <div class="rc--resizer rc--end-resizer"></div>
                      </div>
                    </div>
                    <!--End: Time Loop-->
                  </div>
                  <div class="rc--highlight-container"></div>
                  <div class="rc--bgevent-container"></div>
                  <div class="rc--business-container"></div>
                </div>
              </td>
              <!--End: Day Loop-->
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Popover -->
    <transition name="fade">
      <rc-more-popover
        v-if="isShowMorePopover"
        @closeMorePopover="isShowMorePopover = $event"
        @eventClick="eventClick($event)"
        :eventsPopupData="eventsPopupData"
        :leftVal="leftVal"
        :rightVal="rightVal"
        :topVal="topVal"
      ></rc-more-popover>
      <rc-card-hover
        v-if="isShowCardHover"
        :eventData="eventHoverData"
        :leftVal="leftVal"
        :rightVal="rightVal"
        :topVal="topVal"
      ></rc-card-hover>
    </transition>
  </div>
</template>

<script src="./main.js"></script>

<style lang="scss">
@import "../../../../style";
</style>
