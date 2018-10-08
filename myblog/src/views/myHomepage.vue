<template>
    <div class="main">
      <div class="left">
        <div class="top">
          <div class="img">
            <img :src="loginInfo.avatar" alt="">
          </div>
          <div class="top-Info">
            <h2>{{loginInfo.username}}</h2>
            <div >
              <div>
                <svg data-v-282a39d4="" width="21" height="18" viewBox="0 0 21 18" class="icon position-icon"><g data-v-282a39d4="" fill="none" fill-rule="evenodd"><path data-v-282a39d4="" fill="#72777B" d="M3 8.909V6.947a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1V8.92l-6 2.184v-.42c0-.436-.336-.79-.75-.79h-1.5c-.414 0-.75.354-.75.79v.409L3 8.909zm0 .7l6 2.184v.47c0 .436.336.79.75.79h1.5c.414 0 .75-.354.75-.79v-.46l6-2.183V16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.609zm6.75 1.075h1.5v1.58h-1.5v-1.58z"></path> <path data-v-282a39d4="" stroke="#72777B" d="M7.5 5.213V4A1.5 1.5 0 0 1 9 2.5h3A1.5 1.5 0 0 1 13.5 4v1.213"></path></g></svg>
              </div>
              <p>{{detailedInformation.job}}</p>
            </div>
            <div class="desc">
              <div>
                <svg data-v-282a39d4="" width="21" height="18" viewBox="0 0 21 18" class="icon intro-icon"><path data-v-282a39d4="" fill="#72777B" fill-rule="evenodd" d="M4 4h13a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm9 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3 3a3 3 0 0 0-6 0h6zM5 7v1h4V7H5zm0 2.5v1h4v-1H5zM5 12v1h4v-1H5z"></path></svg>
              </div>
              <p>{{detailedInformation.desc}}</p>
            </div>
          </div>
          <div class="settingInfo" v-if="this.isMy.isedit">
            <button class="setting">编辑个人资料</button>
          </div>
        </div>
        <div class="main-content">
          <el-tabs v-model="activeName" @tab-click="handleClick" >
            <el-tab-pane :label="isMy.article+ ' '+ articles.length.toString()" name="first" >
              <div class="none" v-if="!articles.length">
                <svg data-v-815abe10="" width="66" height="68" viewBox="0 0 66 68" class="icon empty-icon"><g data-v-815abe10="" fill="none" fill-rule="evenodd" transform="translate(4 3)"><g data-v-815abe10="" fill="#F7F7F7"><path data-v-815abe10="" d="M9 10h23.751v3.221H9zM9 16.494h41.083v4.026H9zM9 26.104h23.751v3.221H9zM9 42.208h23.751v3.221H9zM9 33.351h41.083v4.026H9zM9 49.455h41.083v4.026H9z"></path></g> <rect data-v-815abe10="" width="56" height="60" x="1.139" y="1.338" stroke="#EBEBEB" stroke-width="2" rx="6"></rect></g></svg>
                <div data-v-815abe10="" class="empty-text">这里什么都没有</div>
              </div>
              <!--循环生成属于自己的笔记-->
              <div class="article">
                <div class="article-item" v-for="item in articles">
                  <div class="item-top"><span class="author">{{item.author}}</span><span>·{{item.time}}</span>
                    <el-tag size="small" v-if="item.tags[0]">Html</el-tag>
                    <el-tag type="success" size="small" v-if="item.tags[1]">Css</el-tag>
                    <el-tag type="info" size="small" v-if="item.tags[2]">Javascript</el-tag>
                    <el-tag type="warning" size="small" v-if="item.tags[3]">Node.js</el-tag>
                    <el-tag type="danger" size="small" v-if="item.tags[4]">小程序</el-tag>
                    <el-tag size="small" v-if="item.tags[5]">其他</el-tag>
                  </div>
                  <div class="item-title"><h2 @click="openread(item)">{{item.title}}</h2></div>
                  <div class="item-content"><p>{{item.content}}</p></div>
                  <div class="item-look"><img src="../assets/read.svg" alt="">
                    <p>{{item.looknums}}阅读</p></div>
                </div>
              </div>
              <!--循环生成属于自己的笔记-->
            </el-tab-pane>
            <el-tab-pane label="关注了" name="second" >
              <div class="none">
                <svg data-v-815abe10="" width="66" height="68" viewBox="0 0 66 68" class="icon empty-icon"><g data-v-815abe10="" fill="none" fill-rule="evenodd" transform="translate(4 3)"><g data-v-815abe10="" fill="#F7F7F7"><path data-v-815abe10="" d="M9 10h23.751v3.221H9zM9 16.494h41.083v4.026H9zM9 26.104h23.751v3.221H9zM9 42.208h23.751v3.221H9zM9 33.351h41.083v4.026H9zM9 49.455h41.083v4.026H9z"></path></g> <rect data-v-815abe10="" width="56" height="60" x="1.139" y="1.338" stroke="#EBEBEB" stroke-width="2" rx="6"></rect></g></svg>
                <div data-v-815abe10="" class="empty-text">这里什么都没有</div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="关注者" name="third">
              <div class="none">
                <svg data-v-815abe10="" width="66" height="68" viewBox="0 0 66 68" class="icon empty-icon"><g data-v-815abe10="" fill="none" fill-rule="evenodd" transform="translate(4 3)"><g data-v-815abe10="" fill="#F7F7F7"><path data-v-815abe10="" d="M9 10h23.751v3.221H9zM9 16.494h41.083v4.026H9zM9 26.104h23.751v3.221H9zM9 42.208h23.751v3.221H9zM9 33.351h41.083v4.026H9zM9 49.455h41.083v4.026H9z"></path></g> <rect data-v-815abe10="" width="56" height="60" x="1.139" y="1.338" stroke="#EBEBEB" stroke-width="2" rx="6"></rect></g></svg>
                <div data-v-815abe10="" class="empty-text">这里什么都没有</div>
              </div>
            </el-tab-pane>
            <el-tab-pane :label=" '收藏文章 '+ colarticlesId.length.toString()" name="fourth">
              <div class="none"  v-if="!colarticles.length">
                <svg data-v-815abe10="" width="66" height="68" viewBox="0 0 66 68" class="icon empty-icon"><g data-v-815abe10="" fill="none" fill-rule="evenodd" transform="translate(4 3)"><g data-v-815abe10="" fill="#F7F7F7"><path data-v-815abe10="" d="M9 10h23.751v3.221H9zM9 16.494h41.083v4.026H9zM9 26.104h23.751v3.221H9zM9 42.208h23.751v3.221H9zM9 33.351h41.083v4.026H9zM9 49.455h41.083v4.026H9z"></path></g> <rect data-v-815abe10="" width="56" height="60" x="1.139" y="1.338" stroke="#EBEBEB" stroke-width="2" rx="6"></rect></g></svg>
                <div data-v-815abe10="" class="empty-text">这里什么都没有</div>
              </div>
              <!--循环生成收藏的笔记的笔记-->
              <div class="article">
                <div class="article-item" v-for="item in colarticles">
                  <div class="item-top"><span class="author">{{item.author}}</span><span>·{{item.time}}</span>
                    <el-tag size="small" v-if="item.tags[0]">Html</el-tag>
                    <el-tag type="success" size="small" v-if="item.tags[1]">Css</el-tag>
                    <el-tag type="info" size="small" v-if="item.tags[2]">Javascript</el-tag>
                    <el-tag type="warning" size="small" v-if="item.tags[3]">Node.js</el-tag>
                    <el-tag type="danger" size="small" v-if="item.tags[4]">小程序</el-tag>
                    <el-tag size="small" v-if="item.tags[5]">其他</el-tag>
                  </div>
                  <div class="item-title"><h2 @click="openread(item)">{{item.title}}</h2></div>
                  <div class="item-content"><p>{{item.content}}</p></div>
                  <div class="item-look"><img src="../assets/read.svg" alt="">
                    <p>{{item.looknums}}阅读</p></div>
                </div>
              </div>
              <!--循环生成属于自己的笔记-->
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>

      <div class="right">
        <div class="achivement">
          <p class="onep">{{ isMy.achievment}}</p>
          <div class="info">
            <div class="item">
              <svg data-v-4cdfa676="" data-v-3f216172="" xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" class="zan"><g data-v-4cdfa676="" data-v-3f216172="" fill="none" fill-rule="evenodd" transform="translate(0 .57)"><ellipse data-v-4cdfa676="" data-v-3f216172="" cx="12.5" cy="12.57" fill="#E1EFFF" rx="12.5" ry="12.57"></ellipse> <path data-v-4cdfa676="" data-v-3f216172="" fill="#7BB9FF" d="M8.596 11.238V19H7.033C6.463 19 6 18.465 6 17.807v-5.282c0-.685.483-1.287 1.033-1.287h1.563zm4.275-4.156A1.284 1.284 0 0 1 14.156 6c.885.016 1.412.722 1.595 1.07.334.638.343 1.687.114 2.361-.207.61-.687 1.412-.687 1.412h3.596c.38 0 .733.178.969.488.239.317.318.728.21 1.102l-1.628 5.645a1.245 1.245 0 0 1-1.192.922h-7.068v-7.889c1.624-.336 2.623-2.866 2.806-4.029z"></path></g></svg>
              <p>获得收藏{{Info.likenums}}次</p>
            </div>
            <div class="item">
              <svg data-v-4cdfa676="" data-v-3f216172="" width="25" height="25" viewBox="0 0 25 25" class="icon stat-view-icon"><g data-v-4cdfa676="" data-v-3f216172="" fill="none" fill-rule="evenodd"><circle data-v-4cdfa676="" data-v-3f216172="" cx="12.5" cy="12.5" r="12.5" fill="#E1EFFF"></circle> <path data-v-4cdfa676="" data-v-3f216172="" fill="#7BB9FF" d="M4 12.5S6.917 7 12.75 7s8.75 5.5 8.75 5.5-2.917 5.5-8.75 5.5S4 12.5 4 12.5zm8.75 2.292c1.208 0 2.188-1.026 2.188-2.292 0-1.266-.98-2.292-2.188-2.292-1.208 0-2.188 1.026-2.188 2.292 0 1.266.98 2.292 2.188 2.292z"></path></g></svg>
              <p>获得阅读{{Info.looknums}}次</p>
            </div>
          </div>
        </div>

        <div class="focus">
          <div class="focusto item" @click="tosecond">
            <p>关注了</p>
            <p >9</p>
          </div>
          <div class="focusbe item" @click="tothird">
            <p>关注者</p>
            <p>1219 </p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "my-homepage",
      data(){
        return{
          activeName: 'first',
          loginInfo:{},
          detailedInformation:{},
          colarticlesId:[],
          colarticles:[],
          articles:[],
          isMy:{
            article:'我的文章',
            achievment:'我的成就',
            isedit:true,
          },
          Info:{
            looknums:0,
            likenums:0
          }
        }
      },
      methods:{
        tosecond(){
          this.activeName="second"

        },
        tothird(){
          this.activeName="third"
        },
        handleClick(tab) {
          if(tab.name=="second"){

          }
          else  if(tab.name=="third"){

          }
          else  if(tab.name=="fourth"){
            this.$axios.post(`/articles/collections`,{colarticals:this.colarticlesId}).then(res =>{
              if (res.code == 200) {
                res.data.forEach(i => {
                  i.time = this.$axios.transformtime(i.createdAt)
                })
                this.colarticles=res.data
              }
              else {
                this.$message.error('登陆失效')
                this.$router.push(`/`)
              }
            })
          }
          // console.log(tab)
        },
        openread(item){
          this.$router.push(`/read?id=${item._id}`)
        },
        getloginInfo(){
          this.$axios.get(`/user/${this.$route.query.id}`).then(res =>{
            if (res.code == 200) {
              this.loginInfo = res.data
              this.detailedInformation=this.loginInfo.detailedInformation
              this.colarticlesId=this.loginInfo.colarticles
              if(res.msg!="本人"){
                this.isMy.article="他的文章"
                this.isMy.achievment="他的成就"
                this.isMy.isedit=false
              }
              // Vue.prototype.$loginInfo = res.data
            }
            else {
              this.$message.error('登陆失效')
              this.$router.push(`/`)
            }
          })
        },
        getArticles(){
          this.$axios.get(`/articles/user/${this.$route.query.id}`).then(res =>{
            if (res.code == 200) {
              var looknums=0
              var likenums=0
              this.articles = res.data
              this.articles.forEach(i => {
                i.time = this.$axios.transformtime(i.createdAt)
                i.looknums? looknums+=i.looknums:looknums
                i.likenums? likenums+=i.likenums:likenums
              })
              this.Info.looknums=looknums
              this.Info.likenums=likenums
              // Vue.prototype.$loginInfo = res.data
            }
            else {
              // Vue.prototype.$loginInfo = {}
            }
          })
        }
      },
      created(){
          this.getloginInfo()
          this.getArticles()
      }
    }
</script>

<style scoped lang="scss">
  .main{
    min-height: 100vh;
    display: flex;
    background-color: transparent;
    justify-content: space-around;

    //左边内容区
    .left{
      width: 70%;
      .top{
        display: flex;
        background-color: white;
        padding: 30px;
        height: 90px;
        .img{
          width: 90px;
          height: 90px;
          border-radius: 50%;
          overflow: hidden;
          img{
            width: 90px;
            min-height: 90px;
          }
        }
        //头部个人信息
        .top-Info{
          text-align: left;
          margin-left: 30px;
          width: 523px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          div{
            display: flex;
            div{
              width: 21px;
              height: 100%;
            }
            p{
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
            }
          }
        }
        //头部个人信息
        .settingInfo{
          width: 110px;
          height: 100%;
          position: relative;
          .setting{
            position: absolute;
            width: 100%;
            bottom: 0px;
            left: 0px;
            height: 34px;
            outline: none;
            color: #3780f7;
            border: 1px solid #3780f7;
            border-radius: 5px;
            background: white;
            transition: background-color .2s ease 0s
          }
          .setting:active{
            background-color: #3780f7;
          }
        }
      }
    }
    //左边内容区
    //右边内容区
    .right{
      width: 25%;

    }
    //右边内容区
  }
  //左边主内容区
  .main-content{
    min-height: 194px;
    padding-left: 20px;
    margin-top: 30px;
    width: 783px;
    background-color: white;
  }
  //左边主内容区

  //笔记样式
  .article {
    width: 750px;
    min-height: 100px;
    background-color: white;
    .article-item {
      text-align: left;
      height: 155px;
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
      .item-content{
        height: 85px;
        p{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }
    }
  }
  //笔记样式

  //右边样式
  .right{
    text-align: left;
    .achivement{
      background-color: white;
     .onep{
       height: 20px;
       padding: 15px;
       font-weight: 700;
       border-bottom: 1px solid #ccc;
     }
     .info{
       height: 90px;
       display: flex;flex-direction: column;justify-content: space-around;
       .item{
         padding: 0px 20px;
         display: flex;
         p{
           margin-left: 20px;
         }
       }
     }
    }
    .focus{
      margin-top: 20px;
      background-color: white;
      display: flex;
      .item{
        text-align: center;
        padding: 15px 0px;
        width: 50%;
        height: 40px;
        p{
          border-right: 1px solid #ccc;
        }
        p:nth-child(2){
          font-weight: bold;
        }
      }
    }
  }
</style>
