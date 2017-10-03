<template>
    <container type="source">
        <h2>{{ name }}</h2>
        <form @submit.prevent.stop="addItem">
            <input type="text" v-model="newItem">
            <button>Add</button>
        </form>
        <pre>{{ $data }}</pre>
        <portal to="lists">
            <h3>{{ name }}</h3>
            <ul>
                <li v-for="(item, i) in items" :key="i">{{ item }}</li>
            </ul>
        </portal>
    </container>
</template>

<script>
    const startingItems = [
        'carrots',
        'detergent',
        'lego',
        'mushrooms',
        'pudding',
        'risotto',
        'spaghetti',
        'super nintendo',
        'teddy bear',
        'train set',
        'yoghurt',
    ];

    function pickStartItems(count) {
        const items = []
        for (let i = 0; i < count; i++) {
            items.push(startingItems[Math.floor(Math.random() * startingItems.length)])
        }
        return items
    }

    export default {
        props: ['name'],

        data() {
            return {
                newItem: '',
                items: pickStartItems(3),
            }
        },

        methods: {
            addItem() {
                this.items.push(this.newItem)
                this.newItem = ''
            }
        }
    }
</script>