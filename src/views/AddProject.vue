<template>
  <form @submit.prevent="handleSubmit"> <!-- .prevent prevents page from loading when submiting (by default) -->
    <label>Title:</label>
    <input type="text" v-model="title" required>
    <label>Details:</label>
    <textarea v-model="details" required></textarea>
    <input type="submit" value="Add Project" id="submitBtn">
    <button @click.prevent="this.$router.push('/')">Cancel</button>
  </form>

</template>

<script>
export default {
    data() {
        return {
            title: '',
            details: '',
            uri: "http://localhost:3000/projects"
        }
    },
    methods: {
        handleSubmit() {
            let project = {
                // JSON server automatically adds id to item
                title: this.title,
                details: this.details,
                complete: false
            }
            // send project as JSON to endpoint (uri)
            fetch((this.uri), {
                method: 'POST',
                // headers: we're sending some data with this request that is type of JSON :
                headers: {'Content-Type': 'application/json'},
                //body: what data we want to send
                body: JSON.stringify(project)
            })
            // redirect to home page after adding a new project
            .then(() => {
                //push another route to the history (home)
                this.$router.push('/')
            }).catch((err) => console.log(err))
        }
    }

}
</script>

<style>
  form {
    background: white;
    padding: 20px;
    border-radius: 10px;
  }
  label {
    display: block;
    color: #bbb;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
    margin: 20px 0 10px 0
  }
  input {
    padding: 10px;
    border: 0;
    border-bottom: 1px solid #ddd;
    width: 100%;
    box-sizing: border-box;
  }
  textarea {
    border: 1px solid #ddd;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    height: 100px;
  }
  form button, #submitBtn {
    display: inline-block;
    width: 50%;
    margin: 20px auto 0;
    background: #00e699;
    color: white;
    padding: 10px;
    border: 0;
    border-radius: 6px;
    font-size: 16px;
  }

  /* #submitBtn {
    background: #00ce89;
  } */

</style>