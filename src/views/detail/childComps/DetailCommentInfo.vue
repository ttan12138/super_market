<template>
  <div class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>
    <div v-if="isComment" class="comment-info">
      <div class="info-user">
        <img  :src="commentInfo.user.avatar" alt=""/>
        <span class="info-other">
          <div class="user-name">{{commentInfo.user.uname}}</div>
          <div class="comment-param">
            <span>{{commentInfo.created | showDate}} |</span>
            <span> {{commentInfo.style}}</span>
          </div>
        </span>
      </div>
      <div class="info-detail">
        <p>{{commentInfo.content}}</p>
        <div class="info-imgs">
          <img :src="item" v-for="(item, index) in commentInfo.images"/>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="no-comment">
        <span> 暂无评价，问问买过的人</span>
        <button>去提问</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from 'common/utils'
  export default {
    name: "DetailCommentInfo",
    props: {
      commentInfo: {
        type: Object,
        default(){
          {}
        }
      },
      isComment: {
        type: Boolean,
        default: false
      }
    },
    filters: {
      showDate: function(value) {
        let date = new Date(value * 1000)
        return formatDate(date, 'yyyy-MM-dd')
      }
    }
  }
</script>

<style scoped>
  .comment-info {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }

  .header-title {
    float: left;
    font-size: 15px;
  }

  .header-more {
    float: right;
    margin-right: 10px;
    font-size: 13px;
  }

  .info-user {
    padding: 10px 0 5px;
  }

  .info-user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  .info-user .info-other {
    width: 60%;
    display: inline-block;
    margin-left: 15px;
  }

  .info-user .info-other .user-name {
    font-size: 15px;
    height: 25px;
    line-height: 25px;
  }

  .info-user .info-other .comment-param {
    font-size: 12px;
    color: #c3c3c3;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }

  .info-detail {
    padding: 0 5px 15px;
  }

  .info-detail p {
    font-size: 14px;
    color: #777;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .info-imgs {
    margin-top: 10px;
  }

  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }

  .no-comment {
    position: relative;
    height: 50px;
  }

  .no-comment span{
    margin-left: 15px;
    font-size: 13px;
    color: #777;
    position: absolute;
    height: 58px;
    line-height: 58px;
    background-color: #ffffff;
  }
  .no-comment button{
    height: 30px;
    width: 50px;
    font-size: 12px;
    color: #d75509;
    position: absolute;
    right: 5%;
    top: 25%;
    border: 1px solid #d75509;
    background-color: #ffffff;
    border-radius: 15px;
  }
</style>
