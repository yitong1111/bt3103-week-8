<template>
    <div>
        <button v-on:click="decrement()">-</button>
        <a>{{counter}}</a>
        <button v-on:click="increment()">+</button>
    </div>
</template>

<script>
export default{
    name: 'QuantityCounter',
    data() {
        return {
            counter: 0
        }
    },
    props: ['item'],
    methods: {
        decrement: function(){
            if(this.counter > 0){
                this.counter-=1;
            }
            this.$emit('counter', this.item, this.counter);
        },

        increment: function(){
            if(this.counter >= 10){
                alert("You cannot buy more than 10 items.")
            } else {
                this.counter+=1;
            }
            this.$emit('counter', this.item, this.counter);
        }
    }
}
</script>

<style scoped>
button{
    background-color: antiquewhite;
}
</style>