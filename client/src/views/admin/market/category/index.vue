<template>
  <div class="modal--wrapper">
    <div class="modal--content">
      <div class="create mb_3">
        <h3>Tao danh muc moi</h3>
        <form action class="card card_body">
          <div class="form_group">
            <label for class>Ten tiet de</label>
            <input type="text" class="form_control" placeholder="Tieu de ...">
          </div>
          <div class="form_group">
            <label for class>Danh muc cha</label>
            <multiselect label="title" placeholder="Chọn danh mục cha ..." :value="title"/>
          </div>
          <div class="btn btn_success">Tao moi</div>
        </form>
      </div>
      <div class="list">
        <h3>Danh sach danh muc</h3>
        <div class="card card_body">
            <div class="content">
                <!-- Start: title -->    
                <div class="item--list-header d_flex align_items_center">
                    <div class="title p_2">Tiêu đề</div>
                    <div class="cate--parent p_2">Danh muc cha</div>
                    <div class="creator p_2">Danh muc cha</div>
                    <div class="action px_2 py_3"></div>
                </div>
                <!-- End: title -->
                <!-- Start: Item list -->
                <div class="item--list-content d_flex align_items_center">
                    <div class="title p_2">Title 1 ne</div>
                    <div class="cate--parent p_2">Muc 1 ne</div>
                    <div class="creator p_2">Creator ne</div>
                    <div class="d_flex px_2 action">
                        <div class="btn btn_info mr_1">Update</div>
                        <div class="btn btn_danger">Delete</div>
                    </div>
                </div>
                <!-- End: Item list -->
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: [
        {
          title: "Danh muc cha 1"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style.scss";
.list {
    .item--list-header{
        background: #ffb94a;
        color: #fff;
    }
    .item--list-content{
        padding: 0.325rem 0;
        transition: 0.4s;
        &:hover{
            background: #ccc;
        }
    }
    .content{
        border: 1px solid #ccc;
    }
    .header{
        border: 0;
        &.creator{
            border: 0;
        }
        
    }
    .title{
        flex: 2;
        border-right: 1px solid #ccc;
    }
    .cate--parent, .creator{
        flex: 1;
        border-right: 1px solid #ccc;
        // border-left: 0;
    }
    .creator, .action{
        flex: 1;
    }
}
</style>