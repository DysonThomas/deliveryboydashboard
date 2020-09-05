<template>
  <div class="hello">
      <div v-if="noAssignment=='0'" class="no-item">
        <img class="img-empty mb-2" src="../assets/box.png" alt="">
            <p>No New Cosignment Assigned to You</p>
      </div>
    <div class="mt-3" v-for="(order,index) in orders" :key="index">
      <div class="card ml-5 mt-5" style="width: 18rem;">
      <div  class="row" v-for="(item, index) in order.order_items" :key="index">
    
    
  <div class="card-body">
   Item: {{item.name}}<br>
   
  </div>

          </div>
            <p>PacakgeId:</p> <p>{{order.docId}}</p>
             Address: <p class="card-text"> {{order.hname}}<br> {{order.city}} PO. {{order.district}} <br>{{order.state}},{{order.postcode}}<br>{{order.phone}} </p>
             Status:<p> {{order.status}} </p>
            <b-button variant="success" @click="updateStatus(order)">Delivered</b-button>
</div>

</div>


  </div>
</template>

<script>
  import {fb,db} from '../firebase';
export default {
  name: 'homepage',
  props: {
    msg: String
  },
  data(){
      return{
            userStatus:"",
            userid:"",
            orders:[],
            noAssignment:"0"
      }
  },
   created(){
      var user = fb.auth().currentUser;

if (user) {
  this.userStatus="true"
  this.userid=user.uid
    db.collection("orders").where("deliveryboy","==",this.userid).where("status","==","Order Shipped").get().then((querySnapshot)=>{
    querySnapshot.forEach((doc)=> {
        this.orders.push(doc.data())
          if(this.orders.length>=0){
            this.noAssignment="1"
            }   
        else{
            this.noAssignment="0"
          }
         });
  })

} else {
  this.userStatus="false"
}
 



  },
 
  methods:{
        updateStatus(order){
              db.collection("orders").doc(order.docId).update({
              status:"Delivered"
          })
          .then(function() {
              console.log("Document successfully updated!");
          })
          .catch(function(error) {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
});
        }
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
.no-item{
  padding-top: 70%;
}
.img-empty{
  width: 30%;

}
</style>
