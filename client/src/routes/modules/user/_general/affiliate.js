/** When your routing table is too long, you can split it into small modules**/
const affiliateRouter = {
  path: "/a/:aid",
  name: "affiliate",
  component: () => import("@/views/_general/affiliate")
};

export default affiliateRouter;
