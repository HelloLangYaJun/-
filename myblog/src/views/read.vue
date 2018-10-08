<template>
    <div class="main"  id="main">
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
              <img :src="item.authorMsg.avatar" alt="" class="image" @click="inHomepage(item)">
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
                  <img :src="item2.authorMsg.avatar" alt="" class="image"  @click="inHomepage(item2)">
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
       <a @click.prevent="custormAnchor('body')"><i class="backtop item"></i></a>
       <a @click.prevent="custormAnchor('message')" class="gotomessage item">
         <el-badge :value="commentnum":max="10" class="item">
         <el-button size="small">评论</el-button>
       </el-badge></a>
       <a @click="collection"><i v-bind:class="{like:isCollection,nolike:!isCollection,item:true}"></i></a>
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
          commentnum:0,
          visibility:false,
          visibility2:false,
          isCollection:false,
        }
      },

      methods:{
        collection(){
          this.$axios.put(`/user/articles/${this.$route.query.id}`,{isCollection:this.isCollection}).then(res =>{
            if (res.code == 200) {
              this.isCollection=!this.isCollection
              this.$message.success(res.msg);
            }
            else {
              this.$message.error('操作失败');
            }
          })
        },
        inHomepage(item){
          this.$router.push(`/homepage?id=${item.authorMsg._id}`)
          console.log(item)
        },
        custormAnchor(anchorName) {
          // 找到锚点
          let anchorElement = document.getElementById(anchorName);
          // 如果对应id的锚点存在，就跳转到锚点
          if(anchorElement) { anchorElement.scrollIntoView(); }
        },
        openreply(index){
          this.comments[index].flag=true
          Vue.set(this.comments,index,this.comments[index])
        },
        backpage(){
          this.$router.go(-1)
          // this.$router.push('/')
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
              this.commentnum=res.data.length
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
              let queryid=this.$route.query.id
              this.loginInfo.colarticles.forEach(i=>{
                if(i==queryid){
                  this.isCollection=true
                }
              })
              console.log(this.loginInfo)
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
    .nolike{
      background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNyIgaGVpZ2h0PSIxNyIgdmlld0JveD0iMCAwIDE3IDE3Ij4KICAgIDxwYXRoIGZpbGw9IiNCMkJBQzIiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTkuMzMyIDE0Ljk2OGMtLjQ2LS4yNTUtMS4yMDUtLjI1NS0xLjY2NiAwTDQuMzUgMTYuNzk0Yy0uOTIxLjUwNi0xLjUyMy4wNDQtMS4zNDktMS4wMjdsLjYzNS0zLjg2N2MuMDg4LS41MzctLjE0Mi0xLjI4LS41MTYtMS42NkwuNDM2IDcuNWMtLjc0NS0uNzYtLjUxMS0xLjUwNC41MTYtMS42NmwzLjcwNy0uNTY0Yy41MTQtLjA4IDEuMTE5LS41MzggMS4zNDgtMS4wMjdMNy42NjUuNzMxYy40NjItLjk3NiAxLjIwOC0uOTczIDEuNjY3IDBsMS42NiAzLjUxOWMuMjMuNDg5LjgzMy45NSAxLjM0OSAxLjAyN2wzLjcwOC41NjRjMS4wMjkuMTU2IDEuMjU4LjkwMi41MTUgMS42NmwtMi42ODUgMi43MzljLS4zNzIuMzgtLjYwMyAxLjEyMy0uNTE1IDEuNjZsLjYzNCAzLjg2N2MuMTc2IDEuMDc0LS40MyAxLjUzMy0xLjM0OCAxLjAyN2wtMy4zMTgtMS44MjZ6Ii8+Cjwvc3ZnPgo=);
      background-size: 28px 28px ;
    }
    .like{
     background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNyIgaGVpZ2h0PSIxNyIgdmlld0JveD0iMCAwIDE3IDE3Ij4KICAgIDxwYXRoIGZpbGw9IiNGRkMzNDciIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTkuMzMyIDE0Ljk2OGMtLjQ2LS4yNTUtMS4yMDUtLjI1NS0xLjY2NiAwTDQuMzUgMTYuNzk0Yy0uOTIxLjUwNi0xLjUyMy4wNDQtMS4zNDktMS4wMjdsLjYzNS0zLjg2N2MuMDg4LS41MzctLjE0Mi0xLjI4LS41MTYtMS42NkwuNDM2IDcuNWMtLjc0NS0uNzYtLjUxMS0xLjUwNC41MTYtMS42NmwzLjcwNy0uNTY0Yy41MTQtLjA4IDEuMTE5LS41MzggMS4zNDgtMS4wMjdMNy42NjUuNzMxYy40NjItLjk3NiAxLjIwOC0uOTczIDEuNjY3IDBsMS42NiAzLjUxOWMuMjMuNDg5LjgzMy45NSAxLjM0OSAxLjAyN2wzLjcwOC41NjRjMS4wMjkuMTU2IDEuMjU4LjkwMi41MTUgMS42NmwtMi42ODUgMi43MzljLS4zNzIuMzgtLjYwMyAxLjEyMy0uNTE1IDEuNjZsLjYzNCAzLjg2N2MuMTc2IDEuMDc0LS40MyAxLjUzMy0xLjM0OCAxLjAyN2wtMy4zMTgtMS44MjZ6Ii8+Cjwvc3ZnPgo=);
      background-size: 28px 28px ;
    }
  }
   .backpage{
     position: absolute;
     z-index: 1998;
   }
 }
</style>
