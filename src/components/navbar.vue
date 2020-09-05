<template>
  <div class="hello">
     <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">VueShop</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
    

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input  v-if="userStatus=='false'"  v-model="email" type="email" size="sm" class="mr-sm-2 mt-2" placeholder="Username"></b-form-input>
                <b-form-input  v-if="userStatus=='false'" v-model="password" type="password" size="sm" class="mr-sm-2 mt-2" placeholder="Password"></b-form-input>
          <b-button  v-if="userStatus=='false'"  class="my-2 my-sm-0" @click="logindeliveryboy" type="submit">Login</b-button>
        </b-nav-form>
        <b-nav-form>
          <b-button v-if="userStatus=='true'"  class="my-2 my-sm-0"  @click="logout" type="submit">Logout</b-button>
        </b-nav-form>

      

        
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
  </div>
</template>

<script>
  import {fb,db} from '../firebase';
export default {
  name: 'navbar',
  props: {
    msg: String
  },
  data(){
        return{
            email:"",
            password:"",
            userStatus:""
        }
  },
  created(){
      var user = fb.auth().currentUser;

if (user) {
  this.userStatus="true"
} else {
  this.userStatus="false"
}


  },
  methods:{
        logindeliveryboy(){
       fb.auth().signInWithEmailAndPassword(this.email, this.password)
                        .then(() => {
                            alert("sucess")
                            this.userStatus="true"
                                       
                        })
                        .catch(function(error) {
                            // Handle Errors here.
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            if (errorCode === 'auth/wrong-password') {
                                alert('Wrong password.');
                            } else {
                                alert(errorMessage);
                            }
                            console.log(error);
                    });

      },
       logout() {
        fb.auth().signOut()
          .then(() => {
              this.userStatus="false"
          })
          .catch((err) => {
            console.log(err);
          });
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
