<template>
    <div style="width:100%">
          <bar-chart 
                id="bar" :data="barData" xkey="quize" ykeys='[ "count" ]' resize="true"
                labels='[ "Users count" ]' bar-colors='[ "#FF6384"]'
                grid="true" grid-text-weight="bold">
              </bar-chart>
    </div>
</template>

<script>
import Raphael from 'raphael/raphael'
global.Raphael = Raphael
import {  BarChart} from 'vue-morris'
import axios from 'axios';
export default {
    props:['user'],
    data(){
        return{
            barData: [],baseUrl:this.$store.getters.BaseUrl
        }
    },
     components: {
     BarChart
  },
    methods:{
        getData(){
            axios.get(this.baseUrl+'api/quize/statistic/'+this.user.Id)
            .then(response => {
                // JSON responses are automatically parsed.
                //assign list of quizes to variable to show to user in list
                if(response.data.StatusCode=="200"){
                    this.barData=response.data.Result;
                    alert(JSON.stringify(this.barData))
                }
            })
            .catch(e => {
                console.log(e);
            })
        }
    },
    created(){
        this.getData();
    }
}
</script>

<style scoped>

</style>


