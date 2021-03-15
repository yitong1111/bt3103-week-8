<template>
<div>
    <nav>
        <ul id = "links">
            <li><router-link to = '/'>Home</router-link></li>
            <li><router-link to = '/orders'>Orders</router-link></li>
        </ul> 
    </nav>
    <ul id = "itemsList">
        <li v-for= "item in items" v-bind:key = "item.id">
            <div id = "itemName">{{item.name}}</div>
            <img v-bind:src = "item.imageURL">
            <div id = "price">${{item.price}}</div>
            <br>
            <QuantityCounter v-bind:item = "item" v-on:counter = "onCounter"></QuantityCounter>
        </li>
    </ul>
    <Basket id = "shoppingBasket" v-bind:itemsSelected = "itemsSelected"
        :items = "items"></Basket>
</div>
</template>

<script> 
import QuantityCounter from './QuantityCounter.vue'
import Basket from './Basket.vue'
import database from './firebase.js'

    export default {
        data() {
            return{
                items: [],
                itemsSelected: [],
            }
        },
        components:{
            QuantityCounter,
            Basket,
        },
        methods: {
            fetchItems: function() {
                database.collection('menu').get().then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        this.items.push(doc.data());
                    });
                });
            },

            onCounter: function (item, count) {
                if (this.itemsSelected.length === 0 && count > 0) {
                    this.itemsSelected.push([item.name, count, item.price]);
                } else {
                    for (let i = 0; i < this.itemsSelected.length; i++) {
                        const curr_item = this.itemsSelected[i];
                        const item_name = curr_item[0];

                        if (item_name == item.name && count > 0){
                            this.itemsSelected.splice(i, 1, [item.name, count, item.price]);
                            return this.itemsSelected;

                        } else if (item_name == item.name && count == 0) {
                            this.itemsSelected.splice(i, 1);
                            return this.itemsSelected;
                        }
                    }
                    this.itemsSelected.push([item.name, count, item.price]);
                    return this.itemsSelected;
                }
            }
        },
        created(){
            this.fetchItems()
        }
    }
</script>

<style scoped>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
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
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 15px;
}

#itemName {
  font-size: 20px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}
</style>
