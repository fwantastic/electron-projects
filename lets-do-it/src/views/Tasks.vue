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
            v-bind:class="{'blue lighten-5': selectedTask && selectedTask._id === task._id}"
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
                @click="toggleIsImportant(task)"
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
  props: ['filterOption'],
  data () {
    return {
      errors: [],
      tasks: [],
      newTaskName: '',
      counter: 0,
      selectedTask: null,
    }
  },
  created: function () {
    this.findTasks();
  },
  computed: {
    // this function copies selectedTask object to allow watcher
    // to see the old and new values with deep copy
    computedSelectedTask: function () {
      return Object.assign({}, this.selectedTask);
    }
  },
  methods: {
    findTasks() {
      this.$db.find()
        .then((result) => {
            // this is required to remove the cursor
            // if we return result directly then we can't modify it for some reason
            this.tasks = JSON.parse(JSON.stringify(result));

            if (this.filterOption === 'important') {
              this.tasks = this.tasks.filter(task => task.isImportant);
            } else if (this.filterOption === 'planned') {
              this.tasks = this.tasks.filter(task => task.dueDate);
            }
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
        .then(this.findTasks())
      ;   
    },
    selectTask(task) {
      this.selectedTask = task;
    },
    toggleIsImportant(task) {
      task.isImportant = !task.isImportant;
    },
  },
  watch: {
      computedSelectedTask: {
        handler: function(newTask, oldTask) {
          // console.log('oldTask: ' + JSON.stringify(oldTask));
          // console.log('newTask: ' + JSON.stringify(newTask));
          oldTask;
          this.$db.update(
            { _id: newTask._id },
            newTask
          );
        },
        deep: true
      },
    }
};
</script>
