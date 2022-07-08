const { inquirerMenu, pause, readInput, listTodosToDelete, listTodosToComplete, confirm } = require('./helpers/inquirer');
const { readFile, saveFile } = require('./helpers/saveFile');
const Todo = require('./models/todo');
const Todos = require('./models/todos');
require('colors');
console.clear();

const main = async () => {
    let opt = '';
    const todos = new Todos();

    const todoDB = readFile();

    if (todoDB) {
        todos.loadTodosFromArray(todoDB);
    }

    while (opt !== '0') {        
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // Create a new todo
                const desc = await readInput('Enter a description: ');
                todos.createTodo(desc);
            break;

            case '2':
                // List all todos
                console.log(todos.fullList());
            break;

            case '3':
                // List completed todos
                console.log(todos.listCompleted(true));
            break;

            case '4':
                // List uncompleted todos
                console.log(todos.listCompleted(false));
            break;
            case '5':
                // Completed or uncompleted a todo
                const ids = await listTodosToComplete(todos.listArr);
                todos.toggleCompletedTodos(ids);
            break;
            case '6':
                // List uncompleted todos
                const id = await listTodosToDelete(todos.listArr);
                if (id !== '0'){
                    const ok = await confirm('Delete this todo?');
                    if (ok) {
                        todos.deleteTodo(id);
                        console.log(`Todo deleted.`.red);
                    }
                }

            break;
        }

        saveFile(todos.listArr);

        if(opt !== '0') await pause();
    }

}

main();