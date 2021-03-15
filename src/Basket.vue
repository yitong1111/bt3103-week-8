<template>
    <div>
        <p>Menu:</p>
        <ul>
            <li v-for = "item in itemsSelected" v-bind:key = "item[0]">
                {{item[0]}} x {{item[1]}}
            </li>
        </ul>
        <button v-on:click = "calculate(); sendOrder();">Calculate Total</button>
        <div v-show = "this.show">
            Subtotal: ${{findTotal}} <br>
            Grand Total: ${{grand}}
        </div>
    </div>
</template>

<script> 
import database from './firebase.js'
    
    export default{
        name: 'Basket',
        data() {
            return {
                show: false,
            }
        },
        props: ['itemsSelected', 'items'],
        methods: {
            calculate: function() {
                this.show = true;
            },
            sendOrder: function(){
                var dict = {}
                for(let i = 0; i < this.itemsSelected.length; i++){
                    var curr_item = this.itemsSelected[i]
                    dict[curr_item[0]] = curr_item[1]
                }
                for (let i = 0; i < this.items.length; i++) {
                    if (!(this.items[i].name in dict)) {
                        dict[this.items[i].name] = 0
                    }
                }
                console.log(dict)
                database.collection('orders').add(dict).then(() => location.reload())

            },
        },
        computed: {
            findTotal: function() {
                var sub = 0;
                for (let i = 0; i < this.itemsSelected.length; i++){
                    sub += this.itemsSelected[i][1] * this.itemsSelected[i][2];
                }
                return sub;e
            },
            grand: function() {
                var sub = 0;
                for (let i = 0; i < this.itemsSelected.length; i++){
                    sub += this.itemsSelected[i][1] * this.itemsSelected[i][2];
                }
                return (sub * 1.07).toFixed(2);
            }
        }
    }
    
</script>

<style scoped> 

</style>