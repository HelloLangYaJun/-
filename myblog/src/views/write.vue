<template>
<div class="main">
  <input type="text" class="title" placeholder="请输入标题..."v-model="title"></input>
  <mavon-editor v-model="lefteditor" :fontSize="fontsize"  :placeholder="placeholder"/>
  <div class="bottom">
   <div class="catalog"><span>标签:</span>
     <el-checkbox v-model="tag[0]" label="Html" border></el-checkbox>
     <el-checkbox v-model="tag[1]" label="Css" border></el-checkbox>
     <el-checkbox v-model="tag[2]" label="Javascript" border></el-checkbox>
     <el-checkbox v-model="tag[3]" label="Node.js" border></el-checkbox>
     <el-checkbox v-model="tag[4]" label="小程序" border></el-checkbox>
     <el-checkbox v-model="tag[5]" label="其他" border></el-checkbox>
   </div>
    <div class=""> <el-button type="primary" @click="upwrite" >发布笔记</el-button></div>
  </div>
  <div class=".markdown-body">
    <div id="clone"></div>
  </div>

</div>
</template>

<script>
  var markdown = require( "markdown" ).markdown;
    export default {
        name: "write",
      data(){
          return{
            fontsize:'18px',
            lefteditor:'',
            title:'',
            placeholder:'支持markdown语法',
            tag:[false,false,false,false,false,false,]
          }

      },
      computed:{

      },
      methods:{
        upwrite(){
          console.log(this.tag)
          if(this.title&&this.lefteditor){
            this.$axios.post('/articles',{title:this.title,content:this.lefteditor,tags:this.tag}).then(res => {
              if (res.code == 200) {
                this.$message.success('保存成功')
                this.$router.push('/')
              }
              else {
                this.$message.error('未登录');
              }
            })
          }else{
            alert('信息不完整')
          }
        }
      }
    }
</script>

<style  lang="scss">
.main{
  background-color: white;
  .title{
    height: 60px;
    width: 100%;
    font-size: 24px;
    .v-note-edit{
      flex: 0;
    }
    .v-note-show{
      flex: 0;
      width: 100%;
    }
  }
  .bottom{
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: left;
  }
}
</style>
