<template>
  <div class="todo">
    <div class="left-todo">
      <input
        type="checkbox"
        name="completed"
        :checked="localTodo.completed"
        @change="updateCompletedTodo($event)"
      />
      <span
        v-if="!isEditing"
        @click="editTodo()"
        :class="crossed"
        class="todo-title"
      >{{ localTodo.title }}</span>
      <input
        v-else
        type="text"
        ref="inputEditing"
        v-model="localTodo.title"
        class="input todo-title"
        @blur="endEditing()"
        @keyup.enter="endEditing($event)"
        name="title"
      />
    </div>
    <button @click.prevent="deleteTodo()" class="btn-trash">
      <i class="far fa-trash-alt"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    todo: Object
  },
  data() {
    return {
      isEditing: false,
      localTodo: { ...this.todo }
    };
  },
  computed: {
    crossed() {
      return {
        crossed: this.localTodo.completed == 1 || this.localTodo.completed
      };
    }
  },
  methods: {
    editTodo() {
      this.isEditing = true;
      this.$nextTick(() => this.$refs.inputEditing.focus());
    },
    endEditing() {
      this.isEditing = false;
      this.$store.dispatch("todo/updateTodo", this.localTodo);
    },
    deleteTodo() {
      this.$store.dispatch("todo/deleteTodo", this.todo);
    },
    updateCompletedTodo(e) {
      this.localTodo.completed = e.target.checked;
      this.$store.dispatch("todo/updateTodo", this.localTodo);
    }
  }
};
</script>

<style scoped>
.crossed {
  text-decoration: line-through;
}

.todo {
  padding: 15px 0;
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--grey);
}

.left-todo {
  display: flex;
  align-items: center;
  flex: 1;
  margin-right: 25px;
}

.todo-title {
  margin-left: 25px;
  flex: 1;
}

.todo-title:focus {
  outline-width: 0;
  background-color: rgb(250, 250, 250);
}
</style>
