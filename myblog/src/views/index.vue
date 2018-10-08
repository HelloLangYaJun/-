<template>
  <div class="main-container">
    <div class="top">
      <div class="left">
        <p></p>
        <p>十三亿人都会用的云笔记</p>
      </div>
      <div class="right">
        <form action="/login" method="post" class="form" v-if="!loginInfo.username">
          <el-input v-model="email" placeholder="请输入邮箱" name="email"></el-input>
          <el-input v-model="password" placeholder="请输入内容" name="password"></el-input>
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button @click="registe">注册</el-button>
        </form>
        <div class="Info" v-if="loginInfo.username">

          <el-dropdown>
            <span class="el-dropdown-link">
               <img :src="loginInfo.avatar" alt="">
           </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item ><p @click="openupdateimg">更换头像</p></el-dropdown-item>
              <el-dropdown-item><p @click="myHomepage(loginInfo)">我的主页</p></el-dropdown-item>
              <el-dropdown-item>我的收藏</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <p>{{loginInfo.username}}</p>
          <p>{{loginInfo.email}}</p>
          <el-button type="warning" @click="logout">退出登陆</el-button>
        </div>
      </div>
    </div>
    <div class="article">
    <div class="article-item" v-for="item in article">
      <div class="item-top"><span class="author">{{item.author}}</span><span>·{{item.time}}</span>
        <el-tag size="small" v-if="item.tags[0]">Html</el-tag>
        <el-tag type="success" size="small" v-if="item.tags[1]">Css</el-tag>
        <el-tag type="info" size="small" v-if="item.tags[2]">Javascript</el-tag>
        <el-tag type="warning" size="small" v-if="item.tags[3]">Node.js</el-tag>
        <el-tag type="danger" size="small" v-if="item.tags[4]">小程序</el-tag>
        <el-tag size="small" v-if="item.tags[5]">其他</el-tag>
      </div>
      <div class="item-title"><h2 @click="openread(item)">{{item.title}}</h2></div>
      <div class="item-look"><img src="../assets/read.svg" alt="">
        <p>{{item.looknums}}阅读</p></div>
    </div>
  </div>

    <div class="select">
      <el-autocomplete
        v-model="state1"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入搜索内容（模糊搜索）"
        @select="handleSelect"
      ></el-autocomplete>
    </div>


    <!--弹出层信息-->

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>修改头像</span>
      <div class="updateimg">
        <el-upload
          class="my-uploader"
          action="https://upload-z1.qiniup.com"
          :show-file-list="false"
          :data="ToKen"
          :on-success="handleAvatarSuccess">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateimg">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'

  export default {
    name: "index",
    data() {
      return {
        email: '',
        password: '',
        loginInfo: {},
        article: [],
        state1: '',
        ToKen: {},
        imageUrl: '',
        newImg: '',
        dialogVisible: false
      }
    },
    methods: {
      myHomepage(loginInfo){
        this.$router.push(`/homePage?id=${loginInfo._id}`)
      },
      handleClose() {
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.newImg = res.url
      },
      openupdateimg(){
        this.dialogVisible = true
      },
      updateimg() {
        this.$axios.put(`/user`, {avatar: this.newImg}).then(res => {
          if (res.code == 200) {
            this.getloginInfo()
            this.$message.success('修改成功')
          }
          else {
            this.$message.warning('修改失败')
          }
        })
        this.dialogVisible = false
      },
      querySearchAsync(queryString, cb) {
        if (queryString) {
          this.$axios.get(`/articles/title/${queryString}`).then(res => {
            if (res.code == 200) {
              var arr = []
              this.article = res.data
              for (let i = 0; i < res.data.length; i++) {
                arr[i] = res.data[i]
                arr[i].value = arr[i].title
              }
              this.timeout = setTimeout(() => {
                cb(arr);
              }, 100 * Math.random());
            }
            else if (res.code == 308) {
              this.$message.warning('未登录，查询为空')
            }
          })
        }
        else {
          this.getArticles()
        }
        // var arr = queryString ? arr.filter(this.createStateFilter(queryString)) : arr;
        // cb(arr);
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item)
      },
      login() {
        var pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        var strEmail = pattern.test(this.email);
        if (strEmail && this.password) {
          this.$axios.post('/login', {email: this.email, password: this.password}).then(res => {
            if (res.code == 200) {
              this.$message.success('登陆成功')
              this.getloginInfo()
              this.getArticles()
              this.loginInfo = res.data
            }
            else {
              this.$message.error('登录失败');
            }
          })
        } else {
          alert('邮箱格式不正确或密码为空')
          console.log(strEmail, this.password)
        }
      },
      openread(item) {
        console.log(item)
        this.$router.push(`/read?id=${item._id}`)
      },
      registe() {
        this.$router.push('/registe')
      },
      getloginInfo() {
        // this.loginInfo={}
        // if(localStorage.getItem('logininfo')){
        //   this.loginInfo=JSON.parse(localStorage.getItem('logininfo'))
        //   this.loginInfo.flag=true
        //   console.log(this.loginInfo)
        // }
        this.$axios.get('/').then(res => {
          if (res.code == 200) {
            this.loginInfo = res.data
            Vue.prototype.$loginInfo = res.data
          }
          else {
            Vue.prototype.$loginInfo = {}
          }
        })
      },
      logout() {
        // localStorage.clear()
        this.$axios.delete('/logOut').then(res => {
          if (res.code == 200) {
            this.loginInfo = {}
            // this.article = []
            Vue.prototype.$loginInfo = {}
            console.log(this.$loginInfo)
            this.$message.success('退出登陆成功')
          }
          else {
            this.$message.error('退出登陆失败')
          }
        })
      },
      getArticles() {
        this.$axios.get('/articles').then(res => {
          if (res.code == 200) {
            this.article = res.data
            this.article.forEach(i => {
              i.time = this.$axios.transformtime(i.createdAt)
            })
          }
          else {
            this.$message.warning('未登录，无法查看笔记')
          }
        })
      }
    },
    computed: {},
    created() {
      this.getloginInfo()
      this.getArticles()
      axios.get('http://upload.yaojunrong.com/getToken').then(res => {
        this.ToKen = {token: res.data.data}
        console.log(this.ToKen)
      })
    }
  }
</script>

<style scoped lang="scss">
  .main-container {
    width: 1150px;
    min-height: 300px;
    .select {
      position: fixed;
      margin-left: 47rem;
      top: 10px;
      /*right: 200px;*/
      z-index: 1999;
    }
  }

  .top {
    display: flex;
    /*height: 300px;*/
    justify-content: space-between;
    .left {
      border-radius: 10px;
      background: url("../assets/banner.jpg");
      background-size: 750px 340px;
      width: 750px;
      height: 340px;
      position: relative;
      p {
        width: 100%;
        position: absolute;
        bottom: 0px;
        height: 40px;
        color: #fff;
        font-size: 24px;
        line-height: 40px;
      }
      p:nth-child(1) {
        opacity: .5;
        background-color: #000;
      }
    }
    .right {
      width: 350px;
      height: 320px;
      border-radius: 5px;
      background-color: #fff;
      .form {
        height: 80%;
        width: 80%;
        margin: 0 auto;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
      .Info {
        height: 80%;
        width: 80%;
        margin: 0 auto;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: space-around;
        img {
          width: 100px;
          min-height: 100px;
          margin: 0 auto;
        }
      }
    }
  }

  .article {
    margin-top: 60px;
    width: 750px;
    min-height: 100px;
    background-color: white;
    .article-item {
      text-align: left;
      height: 75px;
      padding: 20px 30px;
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid #ddd;
      justify-content: space-between;
      .item-top {
        color: #aaa;
        font-size: 14px;
        .author {
          color: #f40;
        }
      }
      .item-look {
        display: flex;
        img {
          width: 30px;
          height: 20px;
        }
        p {
          height: 20px;
          line-height: 20px;
        }
      }
    }
  }

  .updateimg {
    /*.....................上传样式....................................*/
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
      border: 1px dotted #000;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
</style>
