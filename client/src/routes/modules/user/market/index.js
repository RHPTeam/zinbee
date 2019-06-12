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
      name: "market_list",
      component: require("@/views/user/market/list").default
    },
    {
      path: "products/search/:keyword",
      name: "market_search",
      component: require("@/views/user/market/search").default
    }
  ]
};

export default marketRouter;
