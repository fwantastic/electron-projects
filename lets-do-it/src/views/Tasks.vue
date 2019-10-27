<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8">
        <v-list>
          <v-subheader>TASKS</v-subheader>

          <v-list-item>
            <v-text-field
              v-model="newTaskName"
              label="Add a task !"
              outlined
              @keydown.enter="createTask"
            ></v-text-field>
          </v-list-item>

          <v-list-item
            v-for="task in tasks"
            :key="task.id"
            @click="selectTask(task)"
          >
            <template>
              <v-list-item-action>
                <v-checkbox
                  v-model="task.isCompleted"
                  color="success"
                ></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title v-text="task.name"></v-list-item-title>
                <v-list-item-subtitle v-text="task.description"></v-list-item-subtitle>
                <v-list-item-subtitle v-text="task.group"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action
                @click="task.isImportant = !task.isImportant"
              >
                <v-icon
                  v-if="task.isImportant"
                  color="yellow"
                >
                  star
                </v-icon>

                <v-icon
                  v-else
                  color="grey lighten-1"
                >
                  star_border
                </v-icon>
              </v-list-item-action>
            </template> 
          </v-list-item>
        </v-list>
      </v-col>

      <v-col sm="4">
        <TaskDetail v-if="this.selectedTask != null" v-bind:task=this.selectedTask />
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import TaskDetail from '@/components/TaskDetail';

export default {
  components: {
    TaskDetail
  },
  data () {
    return {
      errors: [],
      tasks: [
        {
          id: -1,
          name: 'Study AWS',
          isCompleted: false,
          isImportant: true,
          dueDate: null,
          description: 'Need to find a room to study',
          group: 'Default',  
        },
        {
          id: -2,
          name: 'Buy laptop stand',
          isCompleted: false,
          isImportant: false,
          dueDate: null,
          description: '',
          group: 'Default',  
        },
        {
          id: -3,
          name: 'Exercise!',
          isCompleted: true,
          isImportant: false,
          dueDate: null,
          description: '',
          group: 'Default',  
        }
      ],
      newTaskName: '',
      counter: 0,
      selectedTask: null,
    }
  },
  methods: {
    createTask () {
      if (!this.newTaskName) {
        this.errors.push('Invalid task name');
        return;
      }

      var newTask = {
        id: this.counter++,
        name: this.newTaskName,
        isCompleted: false,
        isImportant: false,
        dueDate: null,
        description: '',
        group: 'Default',
      }

      this.tasks.push(newTask);
      this.newTaskName = '';
    },
    selectTask(task) {
      this.selectedTask = task;
    }
  }
};
</script>
