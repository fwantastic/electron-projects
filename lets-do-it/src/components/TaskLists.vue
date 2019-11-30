<template>
  <v-list>
    <v-list-item>
      <v-text-field
        v-model="newListName"
        label="Add a List !"
        outlined
        @keydown.enter="createList"
      ></v-text-field>
    </v-list-item>

    <v-list-item
      v-for="taskList in taskLists"
      :key="taskList.name"
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
      handleDrop(list, task) {
        // console.log('data: ' + JSON.stringify(task));
        // console.log('group: ' + JSON.stringify(group));
        task.list = list;
        EventBus.$emit('updateTask', task);
      },
    },
  }
</script>