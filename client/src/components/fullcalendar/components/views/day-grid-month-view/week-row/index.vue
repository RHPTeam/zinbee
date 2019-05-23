<template>
  <div
    class="rc--row rc--week rc--widget-content rc--rigid"
    style="height: 124px;"
  >
    <div class="rc--bg">
      <table>
        <tbody>
          <tr>
            <td
              class="rc--day rc--widget-content rc--sun"
              v-for="(v, i) in 7"
              :key="i"
              :class="
                monthDays[rowIndex * 7 + i] &&
                  monthDays[rowIndex * 7 + i].status
              "
              :date="
                monthDays[rowIndex * 7 + i] && monthDays[rowIndex * 7 + i].time
              "
            ></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="rc--content-skeleton">
      <table>
        <thead>
          <tr>
            <td
              class="rc--day-top rc--sun"
              v-for="(v, i) in 7"
              :key="i"
              :class="
                monthDays[rowIndex * 7 + i] &&
                  monthDays[rowIndex * 7 + i].status
              "
              :date="
                monthDays[rowIndex * 7 + i] && monthDays[rowIndex * 7 + i].time
              "
            >
              <a class="rc--day-number">{{
                monthDays[rowIndex * 7 + i].text
              }}</a>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(x, i) in 3" :key="i">
            <td
              class="rc--event-container"
              v-for="(v, j) in 7"
              :key="j"
              :id="[i === 0 && j === 0 ? 'eventColumnWidth' : null]"
            >
              <div
                class="rc--day-grid-event rc--h-event rc--event rc--start rc--end rc--draggable rc--resizable"
                :style="{
                  backgroundColor: eventOfDay(monthDays[rowIndex * 7 + j].time)[
                    i
                  ].color
                }"
                v-if="
                  eventOfDay(monthDays[rowIndex * 7 + j].time).length !== 0 &&
                    eventOfDay(monthDays[rowIndex * 7 + j].time)[i]
                "
                @click="
                  eventClick(eventOfDay(monthDays[rowIndex * 7 + j].time)[i])
                "
                @mouseover="
                  eventHover(j, eventOfDay(monthDays[rowIndex * 7 + j].time)[i])
                "
                @mouseleave="closeCardHover"
              >
                <div class="rc--content">
                  <span class="rc--title">
                    {{
                      showEventContent(
                        eventOfDay(monthDays[rowIndex * 7 + j].time)[i]
                      )
                    }}
                  </span>
                </div>
                <div class="rc--resizer rc--end-resizer"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td
              rowspan="1"
              v-for="(v, index) in 7"
              :key="index"
              :class="[
                eventOfDay(monthDays[rowIndex * 7 + index].time) !==
                  undefined &&
                eventOfDay(monthDays[rowIndex * 7 + index].time).length > 3
                  ? 'rc--more-cell'
                  : ''
              ]"
            >
              <div
                class="rc--more"
                @click="
                  showMorePopover(
                    index,
                    eventOfDay(monthDays[rowIndex * 7 + index].time)
                  )
                "
                v-if="
                  eventOfDay(monthDays[rowIndex * 7 + index].time) !==
                    undefined &&
                    eventOfDay(monthDays[rowIndex * 7 + index].time).length > 3
                "
              >
                +{{
                  eventOfDay(monthDays[rowIndex * 7 + index].time).length - 3
                }}
                sự kiện
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script src="./main.js"></script>

<style lang="scss">
@import "../../../../style";
</style>
