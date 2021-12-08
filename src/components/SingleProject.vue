<template>
  <div class="project" :class="{ complete: project.complete }"><!--if project.complete is true, it gets the complete class-->
      <div class="actions">
        <h3 @click="showDetails">{{ project.title }}</h3>
        <div class="icons">
            <router-link :to="{ name: 'EditProject', params: { id: project.id } }">
                <span class="material-icons">edit</span>
            </router-link>
            <span @click="deleteProject" class="material-icons">delete</span>
            <span @click="toggleComplete" class="material-icons tick">done</span>
        </div>
      </div>
      <div v-if="showDetail" class="details">
        <p>{{ project.details }}</p>
      </div>
  </div>
</template>

<script>
export default {
    props: ['project'],

    data() {
        return {
            showDetail: false,
            uri: "http://localhost:3000/projects/" + this.project.id
        }
    },

    methods: {
        showDetails() {
            this.showDetail = !this.showDetail
        },

        deleteProject() {
            // 2nd argument needed to make a delete request
            // 2nd argument is an options object
            // method property to say that we need a DELETE request
            fetch(this.uri, { method: 'DELETE' })
            //but we need to delete the data locally as well
            //so we emit a custom event with arguments ((name of the custom event),(data we want to send with the event))
            .then(() => this.$emit('delete', this.project.id))
            //this event is listened inside App.vue <SingleProject> tag
            .catch(err => console.log(err.message))
        },

        toggleComplete() {
            fetch(this.uri, {
                method: 'PATCH',
                // headers: we're sending some data with this request that is type of JSON :
                headers: { 'Content-Type': 'application/json' },
                // data: send the data : || JSON.stringify(): stringifies an object into JSON format
                // reverse the current value of complete property
                body: JSON.stringify({ complete: !this.project.complete })
            }).then(() => {
                this.$emit('complete', this.project.id)
                console.log(this.project)
            }).catch((err) => console.log(err))
        }
    }

}
</script>

<style>
.project{
    margin: 20px auto;
    background: white;
    padding: 10px 20px;
    border-radius: 4px;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
    border-left: 4px solid #e90074;
}
h3{
    cursor: pointer;
}
.actions{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.material-icons{
    font-size: 24px;
    margin-left: 10px;
    color: #bbb;
    cursor: pointer;
}
.material-icons:hover{
    color: #777;
}
/* *** completed projects *** */
.project.complete{
    border-left: 4px solid #00ce89;
}
.project.complete .tick{
    color: #00ce89
}
</style>