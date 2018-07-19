<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" style="width: 100%">
        <a class="navbar-brand" href="#">Best Frind</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <router-link to="/Home" tag="li" active-class="active" class="nav-item" exact=""><a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a></router-link>
                <router-link to="/Quize" tag="li" active-class="active" class="nav-item" exact=""><a class="nav-link" href="quizes.html">Quizes</a></router-link>
                <router-link to="/QuizeAnswer" tag="li" active-class="active" class="nav-item" exact=""><a class="nav-link" href="quizes.html">Quizes Answer</a></router-link>
                <router-link to="/Statistic" tag="li" active-class="active" class="nav-item" exact=""><a class="nav-link" >Statistic</a></router-link>
                
            </ul>
            <ul class="navbar-nav mr-auto pull-right">
                <li class="nav-item"><span class="navbar-brand"><i class="fas fa-user"></i> {{user.name}} </span> </li>
                <li class="nav-item"><a @click="Logout" class="nav-link"><i class="fas fa-sign-out-alt"></i>Logout</a></li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    //get logining user from parent 
    props:['user'],
    data(){
        return{
            
        }
    },
    methods:{
        Logout(){
            this.$session.clear();
            this.$router.replace('/Login')
            this.$emit('loginPass', null);
        }
    }

}
</script>


<style scoped>

</style>


