const generalRouter = {
  path: "/admin",
  meta: {
    requiredAdmin: true
  },
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
      component: require("@/views/admin/simpledata").default,
      children: [
        {
          path: "",
          name: "simple_data",
          component: require("@/views/admin/simpledata/folder").default
        },
        {
          path: "edit/:id",
          name: "simple_edit",
          component: require("@/views/admin/simpledata/detail").default
        }
      ]
    },
    {
      path: "manage-market",
      component: require("@/views/admin/market").default,
      children: [
        {
          path: "product",
          name: "manage_product",
          component: require("@/views/admin/market/product").default
        },
        {
          path: "product/create",
          name: "product_create",
          component: require("@/views/admin/market/product/create").default
        },
        {
          path: "categories",
          name: "manage_categories",
          component: require("@/views/admin/market/category").default
        },
        {
          path: "posts",
          component: require("@/views/admin/market/post").default,
          children: [
            {
              path: "",
              name: "market_post",
              component: require("@/views/admin/market/post/list").default
            },
            {
              path: "create",
              name: "market_post_create",
              component: require("@/views/admin/market/post/create").default
            },
            {
              path: "update/:marketPostId",
              name: "market_post_update",
              component: require("@/views/admin/market/post/update").default
            }
          ]
        }
      ]
    }
  ]
};

export default generalRouter;
