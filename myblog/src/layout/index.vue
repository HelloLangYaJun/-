<template>
  <div class="body">

    <div class="nav">
      <div class="container">
        <div class="left">
          <p>云笔记</p>
        </div>
        <div class="right">
          <i></i>
          <div class="button">
            <el-button @click="writeblog">写笔记</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="main-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
    export default {
        name: "index",
      methods:{
        writeblog(){
           if(!this.$loginInfo.username){
             this.$message.warning('注意你还未登陆，无法保存笔记！')
           }
          this.$router.push('/write')

        }
      },
      computed:{

      }
    }
</script>


<style scoped lang="scss">
  .body{
    overflow: hidden;
    min-height: 100vh;
    background-color: #f1f1f1;
  }
  .nav{
    height: 60px;
    width: 100%;
    position: fixed;
    z-index: 1999;
    background-color: #398dee;
    .container{
      width: 1150px;
      height: 100%;
      display: flex;
      justify-content: space-between;
      margin: 0 auto;
    }
    .left{
      width: 200px;
      p{
        color: #fff;
        height: 60px;
        line-height: 60px;
        font-size: 24px;
      }
    }
    .right{
      width: 200px;
      display: flex;
      justify-content: space-around;
      i{
        height: 60px;
        width: 60px;
        display: block;
        background:url("../assets/find.svg") no-repeat;
        background-size: 40px 40px;
        background-position: 10px 10px;
      }
      .button{
        height: 40px;

        padding: 10px;
      }
    }
  }
  .main-container{
    width: 1150px;
    min-height: 300px;
    margin: 0 auto;
    margin-top: 100px;
  }
</style>
