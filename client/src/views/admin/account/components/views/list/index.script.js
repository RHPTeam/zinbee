import EditPopup from "../../popups/edit";
import InfoPopup from "../../popups/info";
import DeletePopup from "../../popups/delete";

export default {
  data() {
    return {
      showEdit: false,
      showInfo: false,
      showDeleteDialog: false,
      userSelectInfo: null,
      userSelectEdit: null,
      selected: []
    };
  },
  filters: {
    formatDate( d ) {
      const newDate = new Date( d ),
        year = newDate.getFullYear(),
        month = newDate.getMonth() + 1,
        date = newDate.getDate(),
        hour = newDate.getHours(),
        minutes = newDate.getMinutes();

      return `${hour}:${minutes}, ${date}/${month}/${year}`;
    }
  },
  components: {
    EditPopup,
    InfoPopup,
    DeletePopup
  },
  computed: {
    users() {
      return this.$store.getters.usersFilter;
    },
    selectAll: {
      get: function() {
        return this.users ? this.selected.length === this.users.length : false;
      },
      set: ( value ) => {
        let selected = [];

        if ( value ) {
          this.users.forEach( ( user ) => {
            selected.push( user._id );
          } );
        }

        this.selected = selected;
      }
    }
  },
  methods: {
    openPopupInfo( user ) {
      this.showInfo = true;
      this.userSelectInfo = user;
    },
    openPopupEdit( user ) {
      this.showEdit = true;
      this.userSelectEdit = user;
    },
    userStatus( startDate, endDate ) {
      const startDateTime = new Date( startDate ),
        endDateTime = new Date( endDate ),
        time = endDateTime.getTime() - startDateTime.getTime();

      return time > 0;
    }
  }
};
