<template>
    <div style="width:100%">
        <div class="row">
          <br><br>
        </div>
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6 loginmodal-container">
                <h1>Login to Your Account</h1><br>
                <input type="text" name="user" v-model="username" class="form-control" placeholder="Username">
                <input type="password" name="pass" v-model="password" class="form-control" placeholder="Password">
                <input type="button" name="login" @click="Login" class="login loginmodal-submit" value="Login">                
            </div>
            <div class="col-md-3"></div>
        </div>
        
    </div>
</template>


<script>
import axios from 'axios';
export default {
    data(){
        return{
            username:"",
            password:"",
            auth:false,
            baseUrl:this.$store.getters.BaseUrl
        }
    },
    methods:{
      //login using uername and password
        Login(){

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
          //emit event to component in app.vue to change view for user logining
          this.$emit('loginPass', true);
        }
      }

          //get username
             username=this.username
            //get password
           let password=this.password;
            
            //check if username and password not empty
            if(username!="" && password!="")
            {
              //check username and password in database
              var body={"username":username,"password":password}
               axios.post(this.baseUrl+"api/login",body,{headers: {
                'Content-type': 'application/json','Access-Control-Allow-Origin':'*',
              }} )
            .then(response => {
              
               //check if statuscode =200 login success
               if(response.data.StatusCode=="200")
               {
                 //start session for store login info
                  this.$session.start()
                  this.$session.set("auth", true);
                  this.$session.set("username", username);
                  this.$session.set("user", response.data.Result);
                  //save value that dectect if user authenticated or not in vuex store
                  this.$store.dispatch('commitAuth',true)
                  //save value of username to vuex store
                  this.$store.dispatch('commitUserName',username)
                  this.$store.dispatch('commitUser',response.data.Result)
                  this.auth=true;
                  //emit event to component in app.vue to change view for user logining
                  this.$emit('loginPass', true);
               }
               //if status code 401 user is not authorized means username or password is't correct
               else if(response.data.StatusCode=="401")
               {
                  alert("user not authorized")
               }
               
            })
            .catch(e => {
              
                console.log(e)
            
            })
                
            }
        }
    }
}
</script>

<style scoped>

.loginmodal-container {
  padding: 30px;
  max-width: 350px;
  width: 100% !important;
  background-color: #F7F7F7;
  margin: 0 auto;
  border-radius: 2px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  font-family: roboto;
}

.loginmodal-container h1 {
  text-align: center;
  font-size: 1.8em;
  font-family: roboto;
}

.loginmodal-container input[type=button] {
  width: 100%;
  display: block;
  margin-bottom: 10px;
  position: relative;
}
.loginmodal-container input[type=text], input[type=password] {
  height: 44px;
  font-size: 16px;
  width: 100%;
  margin-bottom: 10px;
  -webkit-appearance: none;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-top: 1px solid #c0c0c0;
  padding: 0 8px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}

.loginmodal-container input[type=text]:hover, input[type=password]:hover {
  border: 1px solid #b9b9b9;
  border-top: 1px solid #a0a0a0;
  -moz-box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
  -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
}

.loginmodal {
  text-align: center;
  font-size: 14px;
  font-family: 'Arial', sans-serif;
  font-weight: 700;
  height: 36px;
  padding: 0 8px;

}

.loginmodal-submit {
  border: 0px;
  color: #fff;
  text-shadow: 0 1px rgba(0,0,0,0.1); 
  background-color: #4d90fe;
  padding: 17px 0px;
  font-family: roboto;
  font-size: 14px;
}

.loginmodal-submit:hover {
  border: 0px;
  text-shadow: 0 1px rgba(0,0,0,0.3);
  background-color: #357ae8;
}

.loginmodal-container a {
  text-decoration: none;
  color: #666;
  font-weight: 400;
  text-align: center;
  display: inline-block;
  opacity: 0.6;
  transition: opacity ease 0.5s;
} 

.login-help{
  font-size: 12px;
}
</style>


