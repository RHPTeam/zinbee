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
          component: require("@/views/admin/help/categories").default,
          children: [
            {
              path: "",
              name: "admin_help_categories",
              components: require("@/views/admin/help/categories/list")
            },
            {
              path: "create",
              name: "admin_help_categories_create",
              components: require("@/views/admin/help/categories/form")
            },
            {
              path: "update/:helpCategoryId",
              name: "admin_help_categories_update",
              components: require("@/views/admin/help/categories/form")
            }
          ]
        },
        {
          path: "blogs",
          component: require("@/views/admin/help/blogs").default,
          children: [
            {
              path: "",
              name: "admin_help_blogs",
              component: require("@/views/admin/help/blogs/list").default
            },
            {
              path: "create",
              name: "admin_help_blogs_create",
              component: require("@/views/admin/help/blogs/action").default
            },
            {
              path: ":id",
              name: "admin_help_blogs_update",
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
    },
    {
      path: "campaigns",
      component: require("@/views/admin/campaigns").default,
      children: [
        {
          path: "",
          name: "campaigns",
          component: require("@/views/admin/campaigns/folder").default
        },
        {
          path: "edit/:id",
          name: "campaigns_edit",
          component: require("@/views/admin/campaigns/detail").default
        }
      ]
    },
    {
      path: "agency",
      component: require("@/views/admin/agency").default,
      children: [
        {
          path: "list",
          name: "agency_list",
          component: require("@/views/admin/agency/manager").default
        },
        {
          path: "agency-package",
          name: "agency_package",
          component: require("@/views/admin/agency/package").default
        }
      ]
    }
  ]
};

export default generalRouter;
