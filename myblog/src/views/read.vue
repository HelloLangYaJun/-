<template>
    <div class="main" >
      <div>
       <div class="backpage">
         <el-button-group>
           <el-button type="primary" icon="el-icon-arrow-left" @click="backpage">返回</el-button>
         </el-button-group>
       </div>
        <mavon-editor v-model="editor" :ishljs = "true" :toolbars="toolbars" :fontSize="fontsize"></mavon-editor>
        <div class="all-comment-reply" id="message">
          <div class="comment"  >
            <div class="top"  >
              <img v-if="loginInfo.avatar" :src="loginInfo.avatar" alt="" class="image"><el-input v-model="comment" placeholder="请输入评论"  @focus="focus"></el-input>
            </div>
            <div class="btn"> <div><el-button type="primary" :disabled="!loginInfo.avatar" v-if="visibility" @click="gocomment">评论</el-button></div></div>
          </div >
          <div class="message" v-for="(item,index) in comments">
            <div class="top">
              <img :src="item.authorMsg.avatar" alt="" class="image">
              <div class="top-right">
                <p class="name">{{item.authorMsg.username}}</p>
                <p >{{item.content}}</p>
              </div>
            </div>
            <div class="buttom">
              <p >{{item.time}}</p ><p @click="openreply(index)">回复</p>
            </div>
            <div class="reply">
              <div class='top' v-if="item.flag">
                <el-input v-model="reply" placeholder="请输入回复"  @focus="focus2"></el-input>
              </div>
              <div class="btn"> <div><el-button type="primary" :disabled="!loginInfo.avatar" v-if="item.flag" @click="goreply(item.authorMsg)">回复</el-button></div></div>
              <div class="bottom"  v-for="(item2,index2) in item.reply ">
                <!--。。。。。。。。。。。。。。。。。。。。回复信息。。。。。。。。。。。。。。。。。。-->
                <div class="top">
                  <img :src="item2.authorMsg.avatar" alt="" class="image">
                  <div class="top-right">
                    <p class="name">{{item2.authorMsg.username}} 回复{{item.authorMsg.username}}</p>
                    <p >{{item2.content}}</p>
                  </div>
                </div>
                <div class="buttom">
                  <p >{{item2.time}}</p >
                </div>
                <!--。。。。。。。。。。。。。。。。。回复信息。。。。。。。。。。。。。。。。。。。-->
              </div>
            </div>
          </div>
        </div>
       </div>
     <div class="setting">
       <a href="#"><i class="backtop item"></i></a>
       <a href="#message" class="gotomessage item">
         <el-badge :value="12":max="99" class="item">
         <el-button size="small">评论</el-button>
       </el-badge></a>
       <a href="#"><i class="like item"></i></a>
     </div>
    </div>

</template>
<script>
  import Vue from 'vue'
    export default {
        name: "read",
      data(){
        return{
          fontsize:'18px',
          editor:'',
          toolbars:{},
          comment:'',
          reply:'',
          comments:[],
          loginInfo:'',
          articleMsg:'',
          visibility:false,
          visibility2:false,
        }
      },

      methods:{
        openreply(index){
          this.comments[index].flag=true
          Vue.set(this.comments,index,this.comments[index])
        },
        backpage(){
          this.$router.push('/')
        },
        focus(){
          this.visibility=true
          this.visibility2=false
        },
        focus2(){

        },
        blur(){
          this.visibility=false
        },
        //评论
        gocomment(){
          console.log(this.comment)
          this.$axios.post('/message',{content:this.comment,type:'message',toauthor:this.articleMsg,toArticle:this.$route.query.id}).then(res =>{
            if (res.code == 200) {
              this.$message.success('评论成功');
              this.comment=''
              this.visibility=false
              this.getcomment()
            }
            else {
              this.$message.error('评论失败');
            }
          })
        },
        //回复
        goreply(id){
          this.$axios.post('/message/reply',{content:this.reply,type:'reply',toauthor:id,toArticle:this.$route.query.id}).then(res =>{
            if (res.code == 200) {
              this.$message.success('回复成功');
              this.reply=''
              this.visibility2=false
              this.getcomment()
            }
            else {
              this.$message.error('评论失败');
            }
          })
        },
        //获取评论
        getcomment(){
          this.$axios.get(`/message/${this.$route.query.id}`).then(res =>{
            if (res.code == 200){
              res.data.forEach(i=>{
                i.time=this.$axios.transformtime(i.createdAt)
                i.flag=''
              })
              let reply=[]
              let message=[]
              res.data.forEach(i=>{
                if(i.type=='message'){
                  message.push(i)
                }
                else {
                  reply.push(i)
                }
              })
              message.forEach(i=>{
                i.reply=[]
                reply.forEach(j=>{
                 if(i.authorMsg._id==j.toauthor._id){
                   i.reply.push(j)
                 }
                })
              })
              this.comments=message
              console.log(this.comments)
            }
            else {
              this.$message.error('获取评论失败');
            }
          })
        },
        getloginInfo(){
          // this.loginInfo={}
          // if(localStorage.getItem('logininfo')){
          //   this.loginInfo=JSON.parse(localStorage.getItem('logininfo'))
          //   this.loginInfo.flag=true
          //   console.log(this.loginInfo)
          // }
          this.$axios.get('/').then(res =>{
            if (res.code == 200) {
              this.loginInfo = res.data
              this.articleMsg=res.data
            }
            else {
              this.$message.error('未找到登陆信息');
            }
          })
        },

      },
      created(){
          this.getloginInfo()
          this.getcomment()
          this.$axios.get(`/articles/${this.$route.query.id}`).then(res => {
            if (res.code == 200) {
              this.editor=res.data[0].content
            }
            else {
              this.$message.error('获取内容失败');
            }
          })

      }
    }
</script>

<style scoped lang="scss">
 .main{
   position: relative;
   /deep/ .v-note-show{
       flex-basis: 100%!important;
       width: 100%!important;
     /deep/.v-show-content {
       background: #fff!important;
     }
     }

  /deep/ .v-note-edit{
     display: none;
   }
   .all-comment-reply{
     margin-bottom: 80px;
   }
   .comment,.message{
     background-color: #fafbfc;
     padding: 20px 30px;
     display: flex;
     flex-direction: column;
     .top{
       display: flex;
       .image{
         margin-right: 20px;
         width: 35px;
         height: 35px;
         border-radius: 50%;
       }
       input{
         height: 35px;
       }
     }
     .btn{
       width: 100%;
       margin-top: 10px;
       display: flex;
       flex-direction: column;
       align-items: flex-end;
       div{
         width: 100px;
       }
     }
   }
   .message{
     background-color: white;
     padding-left: 120px;
     border-bottom: 1px solid #ccc;
     .top-right{
       text-align: left;
       .name{
         color: #555;
       }
     }
     .buttom{
       margin-top: 10px;
       display: flex;
       justify-content: space-between;
     }
     .reply{
       margin-left: 30px;
       background-color: #fafbfc;
       .bottom{

       }
     }
   }
  .setting{
    width: 40px;
    height: 120px;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin-left: -5rem;
    top: 17rem;
    .item{
      display: block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .gotomessage{
     /deep/ .el-badge{
      /deep/ .el-button--small{
        padding: 5px 3px;
       }
       /deep/.el-badge__content{
         font-size: 10px;
       }
      }
    }
    .backtop{
      background: url("../assets/backtop.svg") no-repeat;
      background-size: 30px 30px ;
    }
    .like{
      background: url("../assets/like.svg") no-repeat;
      background-size: 28px 28px ;
    }
  }
   .backpage{
     position: absolute;
     z-index: 1998;
   }
 }
</style>
