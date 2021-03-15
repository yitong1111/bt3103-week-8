<template>
    <div>
        <p v-for = "(count, item, index) in datapacket" v-bind:key = "index">
            {{item}}: {{count}} <br>
            <input v-bind:id = "index" type = "number"  min="0" v-model = "inputs[index]"><br>
        </p>
        <button type = "button" v-on:click = "updateOrder">Update Order</button>
    </div>
</template>

<script> 
import database from './firebase.js'

export default{
    data(){
        return{
            datapacket: [],
            inputs: []
        }
    },
    props: ['order_id'], 

    methods: {
        fetchItems: function(){
            database.collection('orders').doc(this.order_id)
                .get().then(snapshot => {
                    this.datapacket = snapshot.data()
                })
        },

        updateOrder: function(){
            console.log(this.inputs)
            var keys = Object.keys(this.datapacket)
            var value = Object.values(this.datapacket)
            var update = {}
            for (let i = 0; i < keys.length; i++){
                if (this.inputs[i]){
                    update[keys[i]] = Number(this.inputs[i])
                } else {
                    update[keys[i]] = Number(value[i])
                } 
            }
            console.log(update)
            database.collection('orders').doc(this.order_id).update(update)
                .then(() => {this.$router.push({name: 'orders'})})

        }

    },

    created(){
        this.fetchItems()
    }
}
</script>

<style scoped> 
button {
  height: 30px;
  background-color: antiquewhite;
  border-radius: 10px;
  border-width: 1px;
}
</style>