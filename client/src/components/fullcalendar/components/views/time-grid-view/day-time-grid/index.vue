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
                :data="activeDay"
                :class="[isToday(new Date(activeDay)) ? 'rc--today' : '']"
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
              <td>
                <div class="rc--content-col">
                  <div class="rc--event-container rc--mirror-container"></div>
                  <div class="rc--event-container">
                    <div
                      class="rc--time-grid-event rc--event rc--start rc--end rc--draggable rc--resizable"
                      v-for="(v, i) in 24"
                      :key="i"
                      :style="[
                        { top: i * 2 * 29 + 'px' },
                        { bottom: -i * 2 * 29 - 29 + 'px' }
                      ]"
                    >
                      <div class="rc--content">
                        <div class="rc--content-flex">
                          <div
                            class="rc--content-bg"
                            v-for="(event, index) in filterEventsByTime(
                              i
                            ).slice(0, 3)"
                            :key="index"
                            :style="{ backgroundColor: event.color }"
                          >
                            <div class="rc--title" @click="eventClick(event)">
                              {{ showEventContent(event) }}
                            </div>
                          </div>
                          <div
                            class="rc--more"
                            v-if="filterEventsByTime(i).length > 2"
                            @click="showMorePopover(i, filterEventsByTime(i))"
                          >
                            +{{ filterEventsByTime(i).length - 3 }} sự kiện
                          </div>
                        </div>
                      </div>
                      <div class="rc--resizer rc--end-resizer"></div>
                    </div>
                  </div>
                  <div class="rc--highlight-container"></div>
                  <div class="rc--bgevent-container"></div>
                  <div class="rc--business-container"></div>
                </div>
              </td>
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
    </transition>
  </div>
</template>

<script src="./main.js"></script>

<style lang="scss">
@import "../../../../style";
</style>
