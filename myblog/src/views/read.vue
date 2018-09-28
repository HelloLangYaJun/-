<template>
    <div class="main">
      <div>
       <div class="backpage">
         <el-button-group>
           <el-button type="primary" icon="el-icon-arrow-left" @click="backpage">返回</el-button>
         </el-button-group>
       </div>
        <mavon-editor v-model="editor":toolbars="toolbars" :fontSize="fontsize"></mavon-editor>
      </div>
     <div class="backtop"><a href="#"><i class="el-icon-caret-top"></i></a></div>
    </div>
</template>

<script>
    export default {
        name: "read",
      data(){
        return{
          fontsize:'18px',
          editor:'',
          toolbars:{}
        }
      },
      methods:{
        backpage(){
          this.$router.push('/')
        }
      },
      created(){
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
     }
  /deep/ .v-note-edit{
     display: none;
   }
  .backtop{
    width: 50px;
    height: 50px;
    position: fixed;
    right: 50px;
    bottom:100px;
    background-color: #000;
    opacity: .3;
    i{
      display: block;
      width: 50px;
      height: 50px;
      color: white;
      font-size: 50px;
    }
  }
   .backpage{
     position: absolute;
     z-index: 2999;
   }
 }
</style>
