<template>
  <form @submit.prevent="submitEdit">
    <label>Title:</label>
    <input type="text" v-model="title" required>
    <label>Details:</label>
    <textarea v-model="details" required></textarea>
    <button>Edit Project</button>
  </form>
</template>

<script>
export default {
    props: [ 'id' ], // we have access to project id as a prop as we did with route param (index.js, props: true)

    data() {
        return {
            title: '',
            details: '',
            uri: "http://localhost:3000/projects/" + this.id //this refers to this component
        }
    },

    mounted() {
        //fetch current project's title and details to edit them
        fetch(this.uri) //we don't send any data, we just use GET method
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            this.title = data.title
            this.details = data.details
        })
        .catch((err) => console.log(err))
    },

    methods: {
        submitEdit() {
            fetch(this.uri, {
                method: 'PATCH',
                // headers: we're sending some data with this request that is type of JSON :
                headers: { 'Content-Type': 'application/json' },
                
                body: JSON.stringify({ 
                    title: this.title,
                    details: this.details
                })
            }).then(() => {
                // redirect to home page when we submit edit
                // data is changed locally too because on home page data is re-rendered on mount()
                // so we don't have to change data locally as we did with handleComplete and handleDelete
                this.$router.push('/')
            }).catch((err) => console.log(err))
        }
    }
}
</script>

<style>

</style>