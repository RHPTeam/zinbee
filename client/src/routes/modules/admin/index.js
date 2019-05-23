const generalRouter = {
  path: "/admin",
  component: require("@/views/admin/layout").default,
  // meta: {
  //   requiredAdmin: true
  // },
  children: [
    {
      path: "",
      name: "admin_dashboard",
      component: require("@/views/admin/dashboard").default
    },
    {
      path: "libraries",
      component: require("@/views/admin/library").default,
      children: [
        {
          path: "",
          name: "libraries",
          component: require("@/views/admin/library/list").default
        },
        {
          path: ":id",
          name: "libraries_details",
          component: require("@/views/admin/library/detail").default
        }
      ]
    },
    {
      path: "users",
      name: "admin_users",
      component: require("@/views/admin/account").default
    },
    {
      path: "vps",
      name: "admin_server",
      component: require("@/views/admin/vps").default
    },
    {
      path: "help",
      component: require("@/views/admin/help").default,
      children: [
        {
          path: "",
          name: "admin_help",
          component: require("@/views/admin/help/popular").default
        },
        {
          path: "categories",
          name: "admin_categories",
          component: require("@/views/admin/help/category").default
        },
        {
          path: "categories/:id",
          name: "categories_detail",
          component: require("@/views/admin/help/category/action").default
        },
        {
          path: "blogs",
          name: "admin_blogs",
          component: require("@/views/admin/help/blogs").default
        },
        {
          path: "blogs/:id",
          name: "blogs_detail",
          component: require("@/views/admin/help/blogs/action").default
        }
      ]
    }
  ]
};

export default generalRouter;
