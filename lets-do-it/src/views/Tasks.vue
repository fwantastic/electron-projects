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
            :key="task._id"
            @click="selectTask(task)"
            v-bind:class="{'blue lighten-5': selectedTask && selectedTask.id === task.id}"
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
                <v-list-item-subtitle v-text="task.notes"></v-list-item-subtitle>
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
        <TaskDetail v-if="selectedTask" v-bind:task=selectedTask />
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
    this.findTasks();
    return {
      errors: [],
      tasks: [],
      newTaskName: '',
      counter: 0,
      selectedTask: null,
    }
  },
  methods: {
    findTasks() {
      this.$db.find()
      .then((result) => {
          this.tasks = result;
        }
      );
    },
    createTask () {
      if (!this.newTaskName) {
        this.errors.push('Invalid task name');
        return;
      }

      var newTask = {
        name: this.newTaskName,
        isCompleted: false,
        isImportant: false,
        dueDate: null,
        notes: '',
        group: 'Default',
      }

      this.$db.insert(newTask)
      .then(() => { this.newTaskName = ''; })
      .then(() => { this.findTasks(); })
      ;   
    },
    selectTask(task) {
      this.selectedTask = task;
    }
  }
};
</script>
