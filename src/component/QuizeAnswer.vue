<template>
    <div style="width:100%">
        <div class="row">
            <div class="col-md-4">
                <label >All Quizes</label>
                <ul >
                    <li v-for="quize in quizes" :key="quize.Id" @click="showQuizeQuestion(quize.Id,quize.quize_question)">
                        <a  >{{quize.name}} </a> 
                        <br>
                    </li>
                </ul>
            </div>
            <div class="col-md-6" >
                <div v-for="q in quize_question">
                    <label for="">{{q.question}}</label>
                    <label for="">True Answer => {{q.answer}}</label>
                    <br>
                    <label for="" v-for="answer in q.question_answer">{{answer.user.name}} Answer is {{answer.answer}}</label>
                </div>
                
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
export default {
    props:['user'],
    data(){
        return{
            quizesAnswers:[],
            quizes:[],
            quizeId:0,
            history:[],
            quize_question:[],
            baseUrl:this.$store.getters.BaseUrl
        }
    },
    methods:{
        
        getAllQuizes(){
            this.index=0;
            //get all quizes for other users from database
            axios.get(this.baseUrl+'api/quize/user/'+this.user.Id)
            .then(response => {
                // JSON responses are automatically parsed.
                //assign list of quizes to variable to show to user in list
                if(response.data.StatusCode=="200"){
                    this.quizes=response.data.Result;
                }
            })
            .catch(e => {
                console.log(e);
            })
            
        },
        showQuizeQuestion(quizeId,quize_question){
           this.quize_question=quize_question;
           console.log(this.quize_question)
            
        },
    },
    created(){
        this.getAllQuizes();
    }
}
</script>


<style scoped>
ul{
    list-style-type: none
}
</style>


