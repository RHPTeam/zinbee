<template>
  <div class="list mt_3" :data-theme="currentTheme">
    <!-- Start: Day -->
    <div class="text_center day">
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
    <div class="post">
      <!-- Create -->
      <div class="items create">
        <div class="content pl_3">
          <div class="user item d_flex align_items_center">
            <div class="avt"></div>
            <div class="id"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- End: List -->
  </div>
</template>

<script>
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
      ]
    };
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
  .post {
  }
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
