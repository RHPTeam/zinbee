const helpGeneralRouter = {
  path: "/help",
  component: require("@/views/user/help/layouts").default,
  children: [
    {
      path: "",
      name: "help",
      component: require("@/views/user/help/home").default
    },
    {
      path: "detail",
      name: "help_detail",
      component: require("@/views/user/help/detail").default
    }
  ]
};

export default helpGeneralRouter;
