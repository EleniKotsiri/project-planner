<template>
  <div class="home">
    <FilterNav @filterChange=" currentFilter = $event " :current="currentFilter"/> <!-- $event is the data passed from FilterNav (all/completed/ongoing) -->
    <!--we pass currentFilter as a prop named current to FilterNav.vue -->
    <div v-if="projects.length">
      <div v-for="project in filteredProjects" :key="project.id"> <!--filterProjects computed property -->
        <SingleProject :project="project" @delete="handleDelete" @complete="handleComplete"/>
        <!-- Pass in each project as a prop (:project) in SingleProject -->
        <!-- delete is a custom event, when we emit it, it fires handleDelete() in SingleProject -->
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SingleProject from "../components/SingleProject.vue"
import FilterNav from "../components/FilterNav.vue"

export default {
  name: "Home",
  components: {
    SingleProject,
    FilterNav
  },
  data() {
    return {
      projects: [],
      currentFilter: 'all'
    }
  },

  mounted() {
    fetch("http://localhost:3000/projects")
      .then((res) => res.json())
      .then((data) => this.projects = data)
      
      .catch((err) => console.log(err.message))
  },

  methods: {
    handleDelete(id) {
      //keep all the projects that don't have that id (the one we deleted)
      this.projects = this.projects.filter((project) => {
        return project.id !== id
      })
    },

    handleComplete(id) {
      // find the project with that certain id and store it to p
      let p = this.projects.find((project) => {
        return project.id === id
      })
      p.complete = !p.complete
    }

  },

  // computed property to filter projects based on value (all/completed/ongoing)
  computed: {
    filteredProjects() {
      // if currentFilter=completed, return array of projects with completed: true
      if(this.currentFilter === 'completed')
        return this.projects.filter((project) => project.complete )
      // if project.complete is true, that project stays in the array
      if(this.currentFilter === 'ongoing')
        return this.projects.filter((project) => !project.complete )
      return this.projects

    }
  }



};
</script>
