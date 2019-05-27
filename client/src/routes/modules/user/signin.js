/** When your routing table is too long, you can split it into small modules**/
const signInRouter = {
  path: "/signin",
  component: () => import("@/views/_general/signin")
};

export default signInRouter;
