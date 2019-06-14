/** When your routing table is too long, you can split it into small modules**/

const marketRouter = {
  path: "/market",
  component: require("@/views/user/market/layouts").default,
  children: [
    {
      path: "",
      name: "market_home",
      component: require("@/views/user/market/home").default
    },
    {
      path: "category/:categoryParent/:subCategory",
      component: require("@/views/user/market/list").default,
      children: [
        {
          path: "",
          name: "market_list",
          component: require("@/views/user/market/list/desktop/components/main")
            .default
        },
        {
          path: "/market/products/search/:keyword",
          name: "market_search",
          component: require("@/views/user/market/list/desktop/components/search")
            .default
        }
      ]
    }
  ]
};

export default marketRouter;
