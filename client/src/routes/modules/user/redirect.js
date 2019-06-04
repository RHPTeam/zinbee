/** When your routing table is too long, you can split it into small modules**/
const redirectRouter = {
  path: "/redirect",
  name: "redirect",
  component: () => import("@/views/_general/redirect")
};

export default redirectRouter;
