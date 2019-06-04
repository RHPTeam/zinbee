const generalRouter = {
  path: "/admin",
  component: require("@/views/admin/layout").default,
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
          path: "blogs",
          component: require("@/views/admin/help/blogs").default,
          children: [
            {
              path: "",
              name: "blogs",
              component: require("@/views/admin/help/blogs/list").default
            },
            {
              path: "create",
              name: "blogs_new",
              component: require("@/views/admin/help/blogs/action").default
            },
            {
              path: ":id",
              name: "blogs_update",
              component: require("@/views/admin/help/blogs/action").default
            }
          ]
        }
      ]
    },
    {
      path: "simple-data",
      name: "simple_data",
      component: require("@/views/admin/simpledata").default
    }
  ]
};

export default generalRouter;
