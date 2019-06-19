<template>
  <div class="fanpage position_fixed">
    <div id="fb-root"></div>
    <!--    <div-->
    <!--      class="fb-customerchat"-->
    <!--      attribution="setup_tool"-->
    <!--      page_id="2202015053360844"-->
    <!--      logged_in_greeting="Xin chào, chúng tôi có thể giúp gì cho bạn ?"-->
    <!--      logged_out_greeting="Xin chào, chúng tôi có thể giúp gì cho bạn ?"-->
    <!--    ></div>-->
  </div>
</template>

<script>
export default {
  // created() {
  //   window.fbAsyncInit = function() {
  //     FB.init({
  //       page_id: "2202015053360844",
  //       xfbml: true,
  //       version: "v3.3"
  //     });
  //     //This function should be here, inside window.fbAsyncInit
  //     FB.getLoginStatus(function(response) {
  //       // console.log(response);
  //     });
  //   };
  //
  //   (function(d, s, id) {
  //     var js,
  //       fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) return;
  //     js = d.createElement(s);
  //     js.id = id;
  //     js.src = "https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js";
  //     fjs.parentNode.insertBefore(js, fjs);
  //   })(document, "script", "facebook-jssdk");
  // }
};
</script>

<style lang="scss" scoped>
.fanpage {
  bottom: 2rem;
  right: 2rem;
  z-index: 9;
}
</style>
