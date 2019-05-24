import Datepicker from "@/components/datepicker";
export default {
  props: ["user"],
  components: {
    Datepicker
  },
  computed: {
    roles() {
      return this.$store.getters.roles;
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
    updateStatus() {
      this.user.status = !this.user.status;
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
