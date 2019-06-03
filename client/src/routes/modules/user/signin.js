/** When your routing table is too long, you can split it into small modules**/
const signInRouter = {
  path: "/signin",
  name: "user_signin",
  component: require("@/views/_general/signin").default
};

export default signInRouter;
