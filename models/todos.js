const Todo = require("./todo");

class Todos {
    _list = {};

    constructor() {
        this._list = {};
    }


    get listArr() {
        return Object.values(this._list);
    }

    loadTodosFromArray(array=[]) {
        array.forEach(todo => {
            this._list[todo.id] = todo;
        });
    }

    createTodo(description) {
        const todo = new Todo(description);
        this._list[todo.id] = todo;
    }

    fullList() {
        let fullList = '\n';
        this.listArr.forEach((todo, index) => {
            const idx = `${index + 1}.`.green;
            const status = todo.completedDate ? `${todo.completedDate} ✅`.green : 'Uncompleted ❌'.red;
            fullList += `${idx} ${todo.description} :: ${status}\n`;
        });

        return fullList;
    }

    listCompleted(completed=true){
        let fullList = '\n';
        let counter = 0;
        this.listArr.forEach((todo, index) => {
            const status = todo.completedDate ? `${todo.completedDate} ✅`.green : 'Uncompleted ❌'.red;
            
            if(Boolean(todo.completedDate) === completed){
                const idx = `${++counter}.`.green;
                fullList += `${idx} ${todo.description} :: ${status}\n`;
            }
        });

        return fullList;
    }

    deleteTodo (id='') {
        if (this._list[id]){
            delete this._list[id];
        }
    }

    toggleCompletedTodos(ids=[]) {
        ids.forEach(id => {
            const todo = this._list[id];
            if (todo.completedDate) {
                todo.completedDate = null;
            } else {
                todo.completedDate = new Date().toISOString();
            }
        });
    }
}

module.exports = Todos;