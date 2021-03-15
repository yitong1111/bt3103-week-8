<template>
    <div>
        <nav>
        <ul id = "links">
            <li><router-link to = '/'>Home</router-link></li>
            <li><router-link to = '/orders'>Orders</router-link></li>
        </ul> 
        </nav>

        <ul id = "ordersList" v-for = "order in orders" v-bind:key = "order[0]">
            <li>
                <div id = "txt" v-for = "(key, val) in order[1]" v-bind:key = "val">
                    {{val}}: {{key}}
                </div>
                
                <div id = "buttons">
                <button type="button" v-bind:id = "order[0]" 
                    v-on:click = "deleteItem($event)">
                    Delete
                </button>
                <button type = "button" v-bind:id = "order[0]"
                    v-on:click = "route($event)">
                    Modify
                </button>
                </div>

            </li>
        </ul>
    </div>
</template>

<script> 
import database from './firebase.js'

export default {
    data() {
        return {
            orders: [],
        }
    },
    
    methods: {
        fetchItems: function() {
            database.collection('orders').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    this.orders.push([doc.id, doc.data()])
                })
            })
        },

        deleteItem: function(event){
            let doc_id = event.target.getAttribute("id")
            database.collection('orders').doc(doc_id).delete().then(() => {location.reload()})
        },

        route: function(event){
            let doc_id = event.target.getAttribute("id")
            this.$router.push({name: "modify", params: {order_id: doc_id}})
        }
    },

    created() {
        this.fetchItems()
    }
}

</script>

<style scoped>

ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

button {
  
  height: 30px;
  background-color: antiquewhite;
  border-radius: 10px;
  border-width: 1px;
}

</style>