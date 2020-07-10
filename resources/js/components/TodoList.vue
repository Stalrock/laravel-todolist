<template>
  <div class="todo-list">
    <div class="content-todo-list">
      <h1 class="todo-list-title">Todo list</h1>
      <form @submit.prevent="addTodo()" class="form-add-todo">
        <vue-input
          type="text"
          name="todo"
          placeholder="Write task todo..."
          v-model="search.text"
          classes="input-add-todo"
        />
        <button class="btn btn-add-todo" type="submit">Add Todo</button>
      </form>
      <div v-if="todos.length > 0" class="content-select-todo">
        <select
          class="input todos-filter"
          name="filter-todo"
          id="filter-todo"
          v-model="search.filter"
        >
          <option
            v-for="filter in filters"
            :key="filter.value"
            :value="filter.value"
          >{{ filter.text }}</option>
        </select>
      </div>
      <div class="todos">
        <transition-group name="todo-list-group" tag="div">
          <todo v-for="todo in filterTodos" :key="todo.id" :todo="todo"></todo>
        </transition-group>
      </div>
    </div>
    <notifications group="todo-list" position="bottom right" />
  </div>
</template>

<script>
import Todo from "./Todo";
import VueInput from "./VueInput";
import axios from "axios";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    Todo,
    VueInput
  },
  data() {
    return {
      search: {
        text: "",
        filter: "all"
      },
      filters: [
        {
          value: "all",
          text: "All"
        },
        {
          value: "completed",
          text: "Completed"
        },
        {
          value: "uncompleted",
          text: "Uncompleted"
        }
      ]
    };
  },
  methods: {
    addTodo() {
      if (this.search.text.trim() === "")
        return Vue.notify({
          group: "todo-list",
          title: "Error !",
          type: "error",
          text: `Field is required.`
        });
      this.$store.dispatch("todo/addTodo", this.search.text);
      this.search.text = "";
    }
  },
  computed: {
    ...mapState("todo", {
      todos: state => state.todos
    }),
    ...mapGetters("todo", {
      getTodosCompleted: "getTodosCompleted",
      getTodosUncompleted: "getTodosUncompleted"
    }),
    filterTodos() {
      let todosF;
      switch (this.search.filter) {
        case "completed":
          todosF = this.getTodosCompleted;
          break;
        case "uncompleted":
          todosF = this.getTodosUncompleted;
          break;
        default:
          todosF = this.todos;
          break;
      }
      return todosF;
    }
  },
  created() {
    this.$store.dispatch("todo/setTodos");
  }
};
</script>

<style>
.todo-list-title {
  text-align: center;
  margin-bottom: 50px;
  font-size: 3em;
}

.todo-list {
  max-width: 450px;
  margin: 150px auto;
  padding: 50px;
  border-radius: 0px;
  background: #f5f5f5;
  box-shadow: 20px 20px 60px #d0d0d0, -20px -20px 60px #ffffff;
}

.form-add-todo {
  display: flex;
}

.form-add-todo input {
  flex: 1;
}

.btn-add-todo {
  color: var(--white);
  background-color: rgb(61, 61, 255);
}

.btn-add-todo:hover {
  background-color: rgb(16, 16, 252);
}

.todos {
  margin: 50px 0;
}

.input-add-todo {
  padding: 10px 25px;
  border: 1px solid var(--grey) !important;
}

.todo-list-group-enter-active,
.todo-list-group-leave-active {
  transition: all 0.5s;
}
.todo-list-group-enter,
.todo-list-group-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.todos-filter {
  border: 1px solid var(--grey);
  padding: 10px 15px;
}

.content-select-todo {
  display: flex;
  justify-content: flex-end;
  margin: 75px 0 0 0;
}
</style>
