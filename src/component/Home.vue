<template>
    <section style="width:100%">
        <div class="row form-group"></div>
        <div class="row form-group">
            <div class="col-md-6">
                <button type="button" class="btn btn-primary" @click="resetForm()" :disabled="quizename==''">New Quize</button>
            </div>
            
        </div>
        <form >
            <div class="row form-group">
                <div class="col-md-6">
                    <label >Quize Name</label>
                    <input type="text" class="form-control" ref="name" id="name" v-model="quizename" aria-describedby="emailHelp" placeholder="Enter name">
                    <small id="nameHelp" class="form-text text-muted">Max length 50 character</small>
                    
                </div>
               
            </div>
            <div class="row form-group">
                <div class="col-md-6">
                    <button type="button" @click.prevent="saveQuize()" class="btn btn-primary">Save</button>
                </div>
            </div>
        </form>
       
        <div id="question" v-if="show">
            <form>
                <div class="row form-group" id="">
                    <div class="col-md-6">
                        <label >Question</label>
                        <input type="text" class="form-control" ref="question" id="question" v-model="question" maxlength="50" placeholder="Enter Question">
                        <small id="nameHelp" class="form-text text-muted">Max length 50 character</small>
                    </div>
                    <div class="col-md-6">
                        <label >Answer</label>
                        <input type="text" class="form-control" ref="answer" id="answer" v-model="answer" maxlength="50"  placeholder="Enter Answer">
                        <small id="nameHelp" class="form-text text-muted">Max length 50 character</small>
                    </div>
                    
                </div>
                <div class="row form-group">
                    <div class="col-md-6">
                        <button type="submit" class="btn btn-primary" @click.prevent="addQuestion()">Add Question</button>
        
                    </div>
                </div>
            </form>
            
        </div>
    </section>
</template>


<script>
import axios from 'axios';
export default {
    props:['user'],
    data(){
        return{
            quizename:"",
            show:false,
            question:"",
            answer:"",
            quizeId:0,
            auth:false,
            baseUrl:this.$store.getters.BaseUrl
        }
    },
    methods:{
        //reset value to empty string
        resetForm(){
            this.quizename="";
            this.show=false;
            this.answer="";
            this.question="";
        },
        //add quize without question just name
        saveQuize(){
           //Save quize to database
            axios.post(this.baseUrl+"api/quize",{Name:this.$refs.name.value,userId:this.user.Id},{headers: {
                'Content-type': 'application/json','Access-Control-Allow-Origin':'*',
              }} )
            .then(response => {
                if(response.data.StatusCode=="200"){
                //set add quize Id to quizeId variable
                 this.quizeId=response.data.Result;
                this.show=true;
                }
                //if status code 400 quize name already exist
                else if(response.data.StatusCode=="400")
                {
                    alert(response.data.message);
                }
               
            })
            .catch(e => {
                console.log(e)
            
            })
        },
        //add question to added quize
        addQuestion(){
            
            //Save quize question in database
            axios.post(this.baseUrl+'api/quize/question', {question:this.$refs.question.value,userId:this.user.Id
            ,quizeId:this.quizeId,answer:this.$refs.answer.value}, 
            {headers: {'Access-Control-Allow-Origin': '*'}}
            ).then(response => {
                if(response.data.StatusCode=="200"){
                   
                    this.$refs.question.value="";
                    this.$refs.answer.value="";
                }
                //if status code 400 question is already exist in this quize
                else if(response.data.StatusCode=="400")
                {
                    alert(response.data.message);
                }
            
            }
            
            );


            
        }
    }
}
</script>

<style>

</style>

