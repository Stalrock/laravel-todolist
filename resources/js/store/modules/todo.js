// initial state
const state = {
    todos: []
}

// getters
const getters = {
    getTodosCompleted: state => {
        return state.todos.filter(t => t.completed || t.completed === 1)
    },
    getTodosUncompleted: state => {
        return state.todos.filter(t => !t.completed || t.completed === 0)
    }
}

// actions
const actions = {
    setTodos: context => {
        axios.get('/api/todo')
        .then(res => {
            context.commit('SET_TODOS', res.data)
        })
        .catch(err => {
            console.log(err)
        })
    },
    addTodo: (context, _title) => {
        axios.post('/api/todo', {
            title: _title
        }).then(res => {
            context.commit('ADD_TODO', res.data);
            Vue.notify({
                group: 'todo-list',
                title: 'Success !',
                type: 'success',
                text: `Your todo "${_title}" has been added.`
            });
        }).catch(err => {
            console.log(err)
        })
    },
    deleteTodo: (context, todo) => {
        axios.delete(`/api/todo/${todo.id}`)
        .then(res => {
            context.commit('DELETE_TODO', res.data)
            Vue.notify({
                group: 'todo-list',
                title: 'Success !',
                type: 'error',
                text: `Your todo "${res.data.title}" has been removed.`
            });
        })
        .catch(err => {
             console.log(err)
        })
    },
    updateTodo: (context, todo) => {
        axios.put(`/api/todo/${todo.id}`, todo)
        .then(res => {
            context.commit('UPDATE_TODO', res.data)
            Vue.notify({
                group: 'todo-list',
                title: 'Success !',
                type: 'warn',
                text: `Your todo "${res.data.title}" has been updated.`
            });
        })
        .catch(err => {
            console.log(err)
        })
    }
}

// mutations
const mutations = {
    SET_TODOS: (state, todos) => {
        state.todos = todos;
    },
    ADD_TODO: (state, todo) => {
        state.todos.unshift(todo)
    },
    DELETE_TODO: (state, todo) => {
        state.todos.splice(state.todos.findIndex(t => t.id === todo.id), 1)
    },
    UPDATE_TODO: (state, todo) => {
        state.todos.splice(state.todos.findIndex(t => t.id === todo.id), 1, todo)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
