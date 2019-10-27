<template>
  <v-container>
    <v-list>
      <v-list-item>
        <v-text-field
          v-model="newTaskName"
          label="Task"
          @keydown.enter="updateTask"
        ></v-text-field>
      </v-list-item>

      <v-list-item>
        <v-switch v-model="task.isCompleted" :label="`Completed`"></v-switch>
      </v-list-item>

      <v-list-item>
        <v-switch v-model="task.isImportant" :label="`Important`"></v-switch>
      </v-list-item>

      <v-list-item>
        <v-menu
          ref="displayDueDateDatePicker"
          v-model="displayDueDateDatePicker"
          :close-on-content-click="false"
          :return-value.sync="task.dueDate"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="task.dueDate"
              label="Due Date"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="task.dueDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="displayDueDateDatePicker = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.displayDueDateDatePicker.save(task.dueDate)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-list-item>

      <v-list-item>
        <v-textarea
          v-model="newDescription"
          outlined
          label="Description"
          @keyup="updateTask"
        ></v-textarea>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        displayDueDateDatePicker: false,
        newTaskName: this.task.name,
        newDescription: this.task.description,
      }
    },
    methods: {
      updateTask () {
        if (!this.newTaskName) {
          console.log('Invalid task name');
          this.newTaskName = this.task.name;
          return;
        }

        this.task.name = this.newTaskName;
        this.task.description = this.newDescription;
      },
    },
    props: ['task'],
    watch: {
      task: function(newVal, oldVal) {
        oldVal;
        this.newTaskName = newVal.name;
        this.newDescription = newVal.description;
      }
    }
  }
</script>