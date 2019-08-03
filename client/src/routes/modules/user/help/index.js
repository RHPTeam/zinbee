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
      path: ":id",
      name: "help_detail",
      component: require("@/views/user/help/detail").default
    },
    {
      path: "search/query",
      name: "help_search",
      component: require("@/views/user/help/search").default
    }
  ]
};

export default helpGeneralRouter;
