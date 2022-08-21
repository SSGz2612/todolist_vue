<template>
  <h3 class="container">Todolist</h3>
  <div class="container d-flex">
    <!-- v-model -->
    <form class="container">
      <input v-model="content" type="text" class="form-control">
      <button @click="submit" class="btn btn-primary" style="margin: 20px;">Add</button>
    </form>
  </div>
  <table class="container table table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col" colspan="2">Description</th>
        <th scope="col">Status</th>
        <th scope="col" colspan="2">Handle</th>
      </tr>
    </thead>
    <tbody>
      <!-- v-for -->
      <tr v-for="task in tasks" :key="task.id">
        <td scope="row">{{ task.id }}</td>
        <td>{{ task.task }}</td>
        <td colspan="2">{{ task.status }}</td>
        <td @click="edit(task.id)">
            <span class="fa fa-pen"></span>
        </td>
        <td @click="delet(task.id)">
            <span class="fa fa-trash"></span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";

export default {
  name: 'MainComponent',
  data(){
    return {
      content: "",
      tasks: []
    }
  },
  mounted(){
    axios.get('http://localhost:4000/')
    .then((res) => {
      this.tasks = res.data.data
    })
    .catch((e) => {
      console.log(e);
    })
  },
  methods: {
    submit(){
      this.content,
      axios.post('http://localhost:4000/', {
        "id": 0,
        "task": this.content,
        "status": "to-do"
      })
      .then((res) => console.log(res))
      .catch((e) => {
        console.log(e);
      })
    },
    edit(i){
      console.log("edit" + i);
    },
    delet(i){
      axios.post('http://localhost:4000/', {
        "action": "delete",
        "idToDelete": i
      })
      .then((res) => console.log(res))
      .catch((e) => {
        console.log(e);
      })
    }
  }
}
</script>

<style scoped>
</style>
