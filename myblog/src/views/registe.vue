<template>
    <div class="main">
       <div class="Form">
         <form action="/login" method="post" class="form">
           <el-input v-model="username" placeholder="请输入用户名" name="username"></el-input>
           <el-input v-model="email" placeholder="请输入邮箱" name="email"></el-input>
           <el-input v-model="password" placeholder="请输入密码" name="password"></el-input>
           <el-button type="primary" @click="registe">注册</el-button>
         </form>
       </div>
    </div>
</template>

<script>
    export default {
        name: "registe",
      data(){
          return{
            username:'',
            email:'',
            password:''
          }
      },
      methods:{
        registe(){
          var pattern= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
          var strEmail=pattern.test(this.email);
          if(strEmail&&this.password&&this.username){
            this.$axios.post('/user',{username:this.username, email:this.email,password:this.password}).then(res => {
              if (res.code == 200) {
                localStorage.setItem('logininfo',JSON.stringify(res.data))
                this.$message.success('注册成功')
                this.$router.push('/')
              }
              else {
                this.$message.error('注册失败');
              }
            })
          }else{
            alert('邮箱格式不正确或信息填写不完整')
          }
        }
      }
    }
</script>

<style scoped lang="scss">
  .main{
    width: 100%;
    height: 100%;
    .Form{
      color: #333;
      padding-top: 30px;
      padding-bottom: 50px;
      width: 714px;
      margin: 100px auto 0;
      border-radius: 6px;
      background: #fff;
      .form{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 300px;
        padding: 50px 150px;
      }
    }
  }
</style>
