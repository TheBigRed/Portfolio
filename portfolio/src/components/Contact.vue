<template>
    <div class='container-fluid my-5 py-5' style="background-color:#212121;">
    <Modal v-bind:modalType="status" ref="modal"/>
    <!--
    <svg preserveAspectRatio="none" viewBox="0 0 100 102" height="75" width="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" class="svgcolor-light">
      <path d="M0 0 L50 100 L100 0 Z" fill="white" stroke="white"></path>
    </svg>-->       
        <div class="row mb-4">
            <div class="col-12 text-center mb-4">
                <h1>CONTACT</h1>
                <div class="header-bar mx-auto"></div>
                <p class="mt-4">Have a question or want to work together?</p>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-xl-5 col-md-8 col-11">
                <form v-on:submit.prevent="checkForm()">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <div class="input-group-prepend">
                            <span class="input-group-text input-prepend" id="basic-addon1"><img src="../assets/contact/person.svg"/></span>
                            <input v-model="name" v-bind:class="[{'is-invalid' : nameReq}, 'form-control input-custom']" id="" aria-describedby="basic-addon1">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="name">Subject</label>
                        <div class="input-group-prepend">
                            <span class="input-group-text input-prepend" id="basic-addon1"><img src="../assets/contact/book.svg"/></span>
                            <input v-model="subject" v-bind:class="[{'is-invalid' : subjectReq}, 'form-control input-custom']" id="" aria-describedby="basic-addon1">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="name">Email Address</label>
                        <div class="input-group-prepend">
                            <span class="input-group-text input-prepend" id="basic-addon1"><img src="../assets/contact/inbox.svg"/></span>
                            <input type="email" v-model="email" v-bind:class="[{'is-invalid' : emailReq}, 'form-control input-custom']" id="">
                        </div>
                    </div>
                    <div class="form-group">

                        <label for="exampleFormControlTextarea1">Message</label>
                        <div class="input-group-prepend">
                            <span class="input-group-text input-prepend" id="basic-addon1"><img src="../assets/contact/pencil.svg"/></span>
                            <textarea v-model="message" v-bind:class="[{'is-invalid' : messageReq}, 'form-control input-custom']" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-submit my-2">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Modal from "./Modal.vue";
const axios = require('axios')

export default {
    name: 'Contact',
    data(){

        return{

            status: null,
            name: null,
            subject: null,
            email: null,
            message: null,
            nameReq: false,
            subjectReq: false,
            emailReq: false,
            messageReq: false

        }
    
    },
    components: {
        Modal
    },
    watch: {

        name: function(){

            if(this.name){

                this.nameReq = false;
                return true;
            }else
                return false;

        },
        subject: function(){

            if(this.subject){

                this.subjectReq = false;
                return true;
            }else
                return false;

        },
        email: function(){

            if(this.email){

                this.emailReq = false;
                return true;
            }else
                return false;

        },
        message: function(){

            if(this.message){

                this.messageReq = false;
                return true;
            }else
                return false;

        }


    },
    methods: {

        submit(){
            
            //User fat arrow to prevent creating local function scope
            console.log(process.env.VUE_APP_API_ROOT);
            axios.post(process.env.VUE_APP_API_ROOT+"/api/sendMail", {headers: {"Access-Control-Allow-Origin": "*"},
            //axios.post("http://localhost:3000/api/sendMail", {headers: {"Access-Control-Allow-Origin": "*"},
                
                name: this.name, 
                email: this.email,
                subject: this.subject,
                message: this.message
                
                }).then( response => {

                    //console.log("SUCESSS");
                    console.log(response);
                    this.status = "success";
                    //Another way to access modal (child) component method
                    //this.$refs.modal.showModal();

                }).catch( error => {

                    //console.log("ERROR");
                    console.log(error);
                    this.status = "error";

                });
                
            this.status = null;

        },
        checkForm(){

            if(!this.name){

                this.nameReq = true;

            }
            if(!this.subject){

                this.subjectReq = true;

            }
            if(!this.email){

                this.emailReq = true;

            }
            if(!this.message){

                this.messageReq = true;

            }

            if(!this.nameReq && !this. subjectReq && !this.emailReq && !this.messageReq){
                
                this.submit();

            }

        }

    }
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700');

h1{

    color: #ECEFF1;

}

p{

    color: #04C2C9;
    font-size: 1.25rem;
    font-weight: 300;
}

label{

    color: #90A4AE;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    font-size: 1.25rem;    

}

.input-prepend{

    border-radius: 0;
    border-color: #455A64;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: none;
    background-color: #263238;

}

img{

    height: 21px;

}

.input-custom{

    color: #04C2C9;
    font-weight: 300;
    border-radius: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-color: #455A64;
    background-color: #37474F;
    

}

.input-custom:focus{

    color: #04C2C9;
    background-color: #37474F;
    box-shadow: 0 0 0 0.1rem #04C2C9;

}

/*
textarea{

    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

}
*/
.btn-submit{

    width: 115px;
    font-size: 1.25rem;
    background-color: #04C2C9;
    border: none;
    border-radius: 0;

}

.btn-submit:hover{

    background-color: #018786;

}

</style>



