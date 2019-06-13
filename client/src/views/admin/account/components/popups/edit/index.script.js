import Datepicker from "@/components/datepicker";
export default {
  components: {
    Datepicker
  },
  computed: {
    roles() {
      return this.$store.getters.roles;
    },
    user() {
      return this.$store.getters.userInfo;
    },
    formatDateCreate: {
      get() {
        const newDate = new Date(this.user.expireDate),
          year = newDate.getFullYear(),
          month = newDate.getMonth() + 1,
          date = newDate.getDate();

        return `${date}-${month}-${year}`;
      },
      set(val) {
        let valArr = val.split("-");
        const newDate = new Date(valArr[2], valArr[1] - 1, valArr[0]),
          year = newDate.getFullYear(),
          month = newDate.getMonth() + 1,
          date = newDate.getDate();

        this.user.expireDate = `${year}-${month}-${date}`;
      }
    },
    userStatus() {
      const startDateTime = new Date(this.user.created_at),
        endDateTime = new Date(this.user.expireDate),
        time = endDateTime.getTime() - startDateTime.getTime();

      if (time > 0) {
        this.radio = true;
      } else {
        this.radio = false;
      }
    }
  },
  methods: {
    closeAddEdit() {
      this.$emit("closeAddEdit", false);
    },
    updateStatus(val) {
      const dataSender = {
        status: val.target.checked,
        userId: this.user._id
      };
      this.$store.dispatch("changeStatusOfUser", dataSender);
      this.user.status = !this.user.status;
    },
    changeDateSetup(value) {
      const dataSender = {
        userId: this.user._id,
        value: new Date(
          new Date(value).getFullYear(),
          new Date(value).getMonth(),
          new Date(value).getDate(),
          new Date(value).getHours(),
          new Date(value).getMinutes(),
          0
        )
      };
      this.$store.dispatch("changeExpireDateOfUser", dataSender);
    },
    updateAccount() {
      const dataSender = {
        _id: this.user._id,
        expireDate: this.user.expireDate,
        maxAccountFb: this.user.maxAccountFb,
        _role: this.user._role.level,
        status: this.user.status
      };

      this.$store.dispatch("updateUserByAdmin", dataSender);
      this.$emit("closeAddEdit", false);
    }
  },
  async created() {
    await this.$store.dispatch("getRoles");
  },
  filters: {
    getFirstLetter(string) {
      return string.charAt(0).toUpperCase();
    }
  },
  data() {
    return {
      radio: true
    };
  }
};
