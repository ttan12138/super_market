<template>
  <div id="user-info">
    <a href="#">
      <div class="user-detail">
        <div class="user-icon">
          <slot name="user-icon">
            <img src="~assets/img/profile/avatar.svg"/>
          </slot>
        </div>
        <div class="login">
          <div class="user-nickname">
            <slot  name="user-nickname">登录/注册 </slot>
          </div>
          <span class="user-mobile">
            <slot name="user-mobile">
              <img src="~assets/img/profile/phone.svg"/>
            </slot>
          </span>
          <span class="user-phoneNum">
            <slot name="user-phoneNum">暂无绑定手机号</slot>
          </span>
        </div>
        <slot name=""></slot>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
}
</script>

<style scoped>
  .user-detail {
    display: flex;
    width: 100%;
    color: #fffdee;
    background-color: var(--color-tint);
  }
  .user-icon img{
    width: 100px;
    margin: 0 10px 0 20px;
  }

  .user-nickname{
    padding-top: 10px;
    padding-left: 15px;
    font-size: 23px;
    height: 60px;
    line-height: 60px;
  }


  .user-mobile img{
    position: relative;
    top: 3px;
    margin-right: 2px;
    width: 15px;
    height: 15px;
  }
  .user-phoneNum{
    font-size: 13px;
    height: 20px;
    line-height: 20px;
  }
</style>
