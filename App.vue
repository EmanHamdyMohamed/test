<template>
  <div class="container">
    <app-login  @loginPass="loginPass($event)" v-show="!auth"></app-login>
    <div class="row" v-show="auth">
      <app-header v-bind:user="user" @loginPass="loginPass($event)"></app-header>
    </div>
    <div class="row" v-show="auth">
      <router-view v-bind:user="user"></router-view>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueSession from 'vue-session'
import Header from './component/header'
import Home from './component/Home'
import Login from './component/Login'

Vue.use(VueSession)
export default {
  data(){
    return{
      auth:false,
      user:{}
    }
  },
  components:{
    appHeader:Header,
    appHome:Home,
    appLogin:Login
  },
  methods:{
    loginPass(value)
    {
      if(value!=null)
      {
        if(value)
        {
          this.auth=value;
          //get logining user object
          this.user=this.$store.getters.User
          this.$router.replace('/')
        }
        else{
          this.auth=false;
        }

      }
      else{
        this.auth=false;
      }
      console.log(value);
    }
  },
  
  beforeCreate() {
      // if (this.$store.getters.Auth == false) {
      //   this.$router.replace('/Login')
      //   this.auth=false;
      // }
      // else{
      //     this.auth=true
      // }
    },created(){
      let auth=this.$session.get("auth");
      let username=this.$session.get("username");
      let user=this.$session.get("user");
      if(auth){
        if(username!=null && user!=null)
        {
          this.$store.dispatch('commitAuth',true)
          //save value of username to vuex store
          this.$store.dispatch('commitUserName',username)
          this.$store.dispatch('commitUser',user)
          this.auth=true;
          //get logining user object
          this.user=this.$store.getters.User
        }
        else{
          this.$router.replace('/Login')
        this.auth=false;
        }
      }else{
        this.$router.replace('/Login')
         this.auth=false;
      }
    }
    // created(){
    //     if (this.$store.getters.Auth == false) {
    //      // alert(this.$store.getters.Auth)
    //       this.auth=false;
    //     }
    // }
}
</script>

<style lang="scss">

</style>
