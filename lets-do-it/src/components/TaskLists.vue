<template>
  <v-list>
    <v-text-field
      v-model="newListName"
      label="Add a List !"
      outlined
      dense
      @keydown.enter="createList"
    ></v-text-field>

    <v-list-item
      v-for="taskList in taskLists"
      :key="taskList.name"
      @click="dispatch(taskList.name)"
    >
      <div>
        <drop @drop="handleDrop(taskList.name, ...arguments)">{{ taskList.name }}</drop>
      </div>
    </v-list-item>
  </v-list>
</template>

<script>
  import { EventBus } from '@/utils/event-bus.js';
  import { Drop } from 'vue-drag-drop';

  export default {
    components: {
      Drop
    },
    data () {
      return {
        newListName: '',
        taskLists: [
          { name: 'Study' },
          { name: 'Work' },
          { name: 'Home' },
          { name: 'Etc' },
        ],
      }
    },
    methods: {
      dispatch (selectedTaskList) {
        console.log('dispatch: ' + selectedTaskList);
        this.$router.push({name: 'TaskList', query: { taskListName: selectedTaskList }}).catch(err => console.log('Error dispatching: ' + err));
      },
      handleDrop(list, task) {
        // console.log('data: ' + JSON.stringify(task));
        // console.log('group: ' + JSON.stringify(group));
        task.list = list;
        EventBus.$emit('updateTask', task);
      },
    },
  }
</script>