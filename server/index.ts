import {
    action,
    observable,
    computed,
    autorun
} from 'mobx';

interface ToDO {
    completed: boolean,
    thing: string
}

class TodoStore {
    @observable todos: Array<ToDO> = [];

    constructor() {
        //自执行 用作查看store某个变化 类似watch
        autorun(() => {
            console.log(this.report)
            console.log(this.completedTodosCount[0])
        })
    }

    @computed 
    get completedTodosCount() {
        return this.todos.filter(todo => todo.completed === true)
    }

    @computed 
    get report() {
        if (!this.todos.length) {
            return '<none>'
        }
        return `next todo ${this.todos[0].thing}`
    }

    addTodoTask(task) {
        this.todos.push({
            thing: task,
            completed: false
        })
    }

    finishTask(idx) {
        this.todos[idx].completed = true;
    }
}

const todoStore = new TodoStore();
todoStore.addTodoTask('熟悉mobx');
todoStore.addTodoTask('熟悉mini program');
todoStore.finishTask(1);
