const helpGeneralRouter = {
  path: "/help",
  component: require("@/views/user/help/layouts").default,
  children: [
    {
      path: "",
      name: "help",
      component: require("@/views/user/help/components/home").default
    },
    {
      path: ":slug",
      name: "help_detail",
      component: require("@/views/user/help/components/detail").default
    },
    {
      path: ":parentId/:cateId",
      name: "help_detail_category",
      component: require("@/views/user/help/components/detail").default
    }
    // {
    //   path: "search",
    //   name: "help_result_search",
    //   component: require("@/views/user/help/detail/search").default
    // }
  ]
};

export default helpGeneralRouter;
