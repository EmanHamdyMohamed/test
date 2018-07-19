<template>
    <div style="width:100%">
        <div class="row form-group"></div>
        <div class="row form-group">
            <div class="col-md-4">
                <label >All Quizes</label>
                <ul >
                    <li v-for="quize in quizes" :key="quize.Id" @click="showQuizeQuestion(quize.Id,quize.quize_question)">
                        <a  >{{quize.name}} </a> 
                        <br>
                    </li>
                </ul>
            </div>

            <div class="col-md-8">
                <div  class="row" v-if="question!=''">
                    <div class="col-md-12" >
                        <label for="">{{question}}</label>
                        <input type="text" name="" id="" v-model="answer" class="form-control" style="width: 50%;display: inline;">
                        <button type="button" class="btn btn-primary" style="margin-bottom: 5px" @click="SaveQuestionAnswer()">Answer</button>
                        <button @click="Next()" class="btn btn-primary" :disabled="this.index>=this.quizeQuestions.length-1">Next</button>
                        <button @click="Prev()" class="btn btn-primary" :disabled="this.index==0">Prev</button>
                    </div> 
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
            quizes:[],
            quizeQuestion:{},
            quizeId:0,
            question:"",
            answer:"",
            index:0,
            quizeQuestions:[],
            baseUrl:this.$store.getters.BaseUrl
        }
    },
    methods:{
        getAllQuizes(){
            this.index=0;
            //get all quizes for other users from database
            axios.get(this.baseUrl+'api/quize/'+this.user.Id)
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
            this.index=0;
            //clear list of quize question
            this.quizeQuestions=[];
            //assign new value to list of quize question
            this.quizeQuestions=quize_question;
            //assign value of viewable quizeId to variable
            this.quizeId=quizeId;
            //show first question in list
            this.quizeQuestion=this.quizeQuestions[0];
            this.question=this.quizeQuestions[0].question;
        },
        SaveQuestionAnswer(){
            let questionId=this.quizeQuestion.Id;
            //save user answer to database
            axios.post(this.baseUrl+"api/quize/question/answer",
            {quizeId:this.quizeId,questionId:questionId,answer:this.answer,userId:this.user.Id},{headers: {
                'Content-type': 'application/json','Access-Control-Allow-Origin':'*',
              }} )
            .then(response => {
                //if answer saved navigate to next question
                if(response.data.StatusCode=="200"){
                    this.Next();
                }
            })
            .catch(e => {
                console.log(e)
            
            })

            
        },
        //navigation to next question
        Next(){
            this.index++;
            if(this.index<this.quizeQuestions.length){
                this.quizeQuestion=this.quizeQuestions[this.index]
                this.question=this.quizeQuestions[this.index].question;
                this.answer="";
            }
        },
        //naviagtion to prevouse question
        Prev(){
            if(this.index>0){
                this.index--;
                this.quizeQuestion=this.quizeQuestions[this.index]
                this.question=this.quizeQuestions[this.index].question;
                this.answer="";
            }
        }
    },
    created(){
        this.getAllQuizes();
    }
}
</script>
<style  scoped>
ul{
    list-style-type: none
}
</style>


