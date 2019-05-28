/** When your routing table is too long, you can split it into small modules**/
const password = {
  path: "/reset-password",
  component: require("@/views/_general/password").default,
  children: [
    {
      path: "",
      name: "check_mail",
      component: require("@/views/_general/password/email").default
    },
    {
      path: "code",
      name: "check_code",
      component: require("@/views/_general/password/code").default
    },
    {
      path: "final",
      name: "change_final",
      component: require("@/views/_general/password/password").default
    }
  ]
};

export default password;
