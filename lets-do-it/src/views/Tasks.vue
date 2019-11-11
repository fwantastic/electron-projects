<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8">
        <v-list>    
          <v-subheader>TASKS

            <v-row justify="center" cols="12">
              <v-col cols="4" />
              <v-col
                cols="4"
                md="4"
              >
                <v-select
                  :items="sortOptions"
                  label="Sort By"
                  v-model="selectedSortOption"
                  @change="findTasks()"
                ></v-select>
              </v-col>

              <v-col
                cols="4"
                md="4"
              >
                <v-select
                  :items="sortOrderOptions"
                  label="Sort Order"
                  v-model="selectedSortOrderOption"
                  @change="findTasks()"
                ></v-select>
              </v-col>
            </v-row>
          </v-subheader>

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
            @contextmenu="showRightClickOptions($event, task)"
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
                <v-list-item-subtitle v-if="task.dueDate" v-text="'Due ' + task.dueDate"></v-list-item-subtitle>
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

    <v-menu
      v-model="isShowRightClickOptions"
      :position-x="x"
      :position-y="y"
      absolute
      offset-y
    >
      <v-list>
        <v-list-item 
          v-for="rightClickOption in rightClickOptions" 
          :key="rightClickOption"
          @click="rightClick(rightClickOption)"
        >
          <v-list-item-content>
            <v-list-item-title v-text="rightClickOption"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
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
      sortOptions: ['Importance', 'Due Date', 'Completed', 'Alphabetically', 'Creation Date'],
      selectedSortOption: 'Creation Date',
      sortOrderOptions: ['Ascending', 'Descending'],
      selectedSortOrderOption: 'Descending',
      isShowRightClickOptions: false,
      x: 0,
      y: 0,
      rightClickOptions: ['Delete'],
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
    rightClick(rightClickOption){
      if (rightClickOption === 'Delete') {
        this.deleteTask(this.selectedTask);
      }
    },
    showRightClickOptions(e, task) {
      e.preventDefault();
      this.selectTask(task);
      this.isShowRightClickOptions = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.isShowRightClickOptions = true;
      });
    },
    findTasks() {
      this.$db.find()
        .then((result) => {
            // this is required to remove the cursor
            // if we return result directly then we can't modify it for some reason
            this.tasks = JSON.parse(JSON.stringify(result));

            this.filterTasks();
            this.sortTasks();
          }
        );
    },
    filterTasks() {
      if (this.filterOption === 'important') {
        this.tasks = this.tasks.filter(task => task.isImportant);
      } else if (this.filterOption === 'planned') {
        this.tasks = this.tasks.filter(task => task.dueDate);
      }
    },
    sortTasks() {
      if (this.selectedSortOption === 'Importance') {
        this.tasks = this.tasks.sort((a, b) => this.sort(a.isImportant, b.isImportant));
      } else if (this.selectedSortOption === 'Due Date') {
        this.tasks = this.tasks.sort((a, b) => this.sort(a.dueDate, b.dueDate));
      } else if (this.selectedSortOption === 'Completed') {
        this.tasks = this.tasks.sort((a, b) => this.sort(a.isCompleted, b.isCompleted));
      } else if (this.selectedSortOption === 'Alphabetically') {
        this.tasks = this.tasks.sort((a, b) => this.sort(a.name.toLowerCase(), b.name.toLowerCase()));
      } else if (this.selectedSortOption === 'Creation Date') {
        this.tasks = this.tasks.sort((a, b) => this.sort(a.createdDate, b.createdDate));
      }
    },
    sort(a, b) {
      if (this.selectedSortOrderOption === 'Ascending') {
        return this.sortAscending(a, b);
      }

      return this.sortDescending(a, b);
    },
    sortAscending(a, b) {
      if (a === null) {
        return 1;
      } else if (b === null) {
        return -1;
      } else if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      }
      return 0;
    },
    sortDescending(a, b) {
      if (a === null) {
        return 1;
      } else if (b === null) {
        return -1;
      } else if (a > b) {
        return -1;
      } else if (a < b) {
        return 1;
      }
      return 0;
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
        createdDate: new Date(),
      }

      this.$db.insert(newTask)
        .then(() => { this.newTaskName = ''; })
        .then(this.findTasks())
      ;   
    },
    selectTask(task) {
      this.selectedTask = task;
    },
    deleteTask(task) {
      this.$db.remove({ _id: task._id }, {}, function (err, numRemoved) {
        console.log('numRemoved: ' + numRemoved);
      });
      this.selectedTask = null;
      this.findTasks();
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
