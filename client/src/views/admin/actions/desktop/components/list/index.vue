<template>
  <div class="list mt_3" :data-theme="currentTheme">
    <!-- Start: Day -->
    <div class="text_center day mb_3">
      <button class="rc--btn-prev" @click="getActiveDay(-1)">
        <icon-base
          class="icon--arrow-left"
          icon-name="Prev"
          width="16"
          height="16"
          viewBox="0 0 24 24"
        >
          <icon-arrow-left></icon-arrow-left>
        </icon-base>
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
        <icon-base
          class="icon--arrow-right"
          icon-name="Prev"
          width="16"
          height="16"
          viewBox="0 0 24 24"
        >
          <icon-arrow-left></icon-arrow-left>
        </icon-base>
      </button>
    </div>
    <!-- End: Day -->

    <!-- Start: List -->
    <div class="list--items">
      <!-- Create -->
      <app-create @showInfoEvent="isShowInfoCreateEvent = $event" />
      <!-- Update  -->
      <app-update
        @showInfoPostgroup="isShowInfoPostgroup = $event"
        @showInfoUpdateEvent="isShowInfoUpdateEvent = $event"
      />
      <!-- Delete -->
      <app-delete />
      <!-- Duplicate -->
      <app-duplicate />
      <!-- Post now -->
      <app-post-now @showPopupPostNow="isShowPopupPostNow = $event" />
      <!-- signup -->
      <app-sign-up />
      <!-- post success or fail -->
      <app-post @showPopupInfoPostEvent="isShowPopupInfoPostEvent = $event" />
      <!-- Start: Transtion Popup -->
      <transition name="popup">
        <create-event
          v-if="isShowInfoCreateEvent === true"
          @closePopup="isShowInfoCreateEvent = $event"
        />
        <update-event
          v-if="isShowInfoUpdateEvent === true"
          @closePopup="isShowInfoUpdateEvent = $event"
        />
        <update-post-group
          v-if="isShowInfoPostgroup === true"
          @closePopup="isShowInfoPostgroup = $event"
        />
        <popup-post-now
          v-if="isShowPopupPostNow === true"
          @closePopup="isShowPopupPostNow = $event"
        />
        <popup-post
          v-if="isShowPopupInfoPostEvent === true"
          @closePopup="isShowPopupInfoPostEvent = $event"
        />
      </transition>
      <!-- End: Transtion Popup -->
    </div>
    <!-- End: List -->
  </div>
</template>

<script>
import AppCreate from "./components/create";
import AppDelete from "./components/delete";
import AppDuplicate from "./components/duplicate";
import AppPostNow from "./components/postnow";
import AppUpdate from "./components/update";
import AppSignUp from "./components/signup";
import AppPost from "./components/post";
import CreateEvent from "./popup/create/campaign";
import UpdateEvent from "./popup/update/campaign";
import UpdatePostGroup from "./popup/update/postgroup";
import PopupPost from "./popup/post";
import PopupPostNow from "./popup/postnow";
export default {
  data() {
    return {
      activeDay: new Date(),
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
      ],
      isShowInfoCreateEvent: false,
      isShowInfoUpdateEvent: false,
      isShowInfoPostgroup: false,
      isShowPopupPostNow: false,
      isShowPopupInfoPostEvent: false
    };
  },
  components: {
    AppCreate,
    AppDelete,
    AppDuplicate,
    AppPostNow,
    AppPost,
    AppUpdate,
    AppSignUp,
    CreateEvent,
    UpdateEvent,
    UpdatePostGroup,
    PopupPost,
    PopupPostNow
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    getActiveDay(flag) {
      this.activeDay.setDate(this.activeDay.getDate() + flag);
      this.activeDay = new Date(this.activeDay);
    }
  }
};
</script>

<style scoped lang="scss">
.list {
  .day {
    align-items: center;
    border-radius: 0.625rem;
    background-color: #fdfdfd;
    display: flex;
    height: 48px;
    justify-content: space-between;
    width: 100%;
    .rc--btn-prev,
    .rc--btn-next {
      background-color: #f7f7f7;
      border: 0;
      border-radius: 100%;
      color: #ccc;
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      width: 30px;
      &:hover {
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
        color: #444444;
      }
      &:focus,
      &:active {
        outline: 0;
      }
    }
    .rc--btn-prev {
      margin-left: 0.5rem;
    }
    .rc--btn-next {
      margin-right: 0.5rem;
      .icon--arrow-right {
        transform: rotate(-180deg);
      }
    }
    .rc--time-info {
      font-weight: 600;
      text-transform: uppercase;
    }
  }
  // list
  .create {
    border-left: 3px solid green;
  }
  .update {
    border-left: 3px solid orange;
  }
  .delete {
    border-left: 3px solid red;
  }
  .copy {
    border-left: 3px solid purple;
  }
  .postnow {
    border-left: 3px solid yellow;
  }
  .signup {
    border-left: 3px solid blue;
  }
  .success {
    border-left: 3px solid greenyellow;
  }
  .fail {
    border-left: 3px solid pink;
  }
}
/*Transition popup*/
.popup-enter-active,
.popup-leave-active {
  transition: opacity 1s;
}
.popup-enter,
.popup-leave-to {
  opacity: 0;
}
// Change Color
.list[data-theme="light"] {
  .day {
    background-color: #fdfdfd;
    .rc--btn-prev,
    .rc--btn-next {
      background-color: #f7f7f7;
      color: #ccc;
      &:hover {
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
        color: #444444;
      }
    }
  }
}
.list[data-theme="dark"] {
  .day {
    background-color: rgba(39, 41, 45, 0.8);
    .rc--btn-prev,
    .rc--btn-next {
      background-color: #2f3136;
      color: #999;
      &:hover {
        box-shadow: 0 0 6px rgb(255, 255, 255);
        color: #f7f7f7;
      }
    }
  }
  .rc--time-info {
    color: #f7f7f7;
  }
}
</style>
