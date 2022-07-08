const inquirer = require('inquirer');
require('colors');

const menuOpts = [
    {
        type: 'list',
        name: 'option',
        message: 'Choose an option:',
        choices: [
            {
                value: '1',
                name: `${ '1.'.green } Create a new todo`
            },
            {
                value: '2',
                name: `${ '2.'.green } List all todos`
            },
            {
                value: '3',
                name: `${ '3.'.green } List completed todos`
            },
            {
                value: '4',
                name: `${ '4.'.green } List uncompleted todos`
            },
            {
                value: '5',
                name: `${ '5.'.green } Complete a todo`
            },
            {
                value: '6',
                name: `${ '6.'.green } Delete a todo`
            },
            {
                value: '0',
                name: `${ '0.'.green } Exit`
            }
        ]
    }
];

const inquirerMenu = async () => {
    console.clear();
    console.log('======================================='.green);
    console.log('       Welcome to the Todo App'.white);
    console.log('=======================================\n'.green);
    const { option } = await inquirer.prompt(menuOpts);
    return option;
}

const pause = async () => {
    await inquirer.prompt([{
        type: 'input',
        name: 'pause',
        message: `\nPress ${ 'ENTER'.green } to continue\n`
    }]);
}

const readInput = async (message) => {
    const { desc } = await inquirer.prompt([{
        type: 'input',
        name: 'desc',
        message,
        validate: (value) => {
            if (value.length) {
                return true;
            } else {
                return 'Please enter a valid description';
            }
        }
    }]);
    return desc;
}

const listTodosToDelete = async (todo=[]) => {
    const choices = todo.map((todo, index) => {
        return {
            value: todo.id,
            name: `${ (index + 1 + '.').green } ${ todo.description }`
        }
    });

    choices.unshift({
        value: '0',
        name: `${ '0.'.green } Cancel`
    })

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Choose a todo to delete:',
            choices
        }
    ]

    const { id } = await inquirer.prompt(questions);

    return id;
}

const confirm = async (message) => {
    const { confirm } = await inquirer.prompt([{
        type: 'confirm',
        name: 'confirm',
        message
    }]);
    return confirm;
}

const listTodosToComplete = async (todo=[]) => {
    const choices = todo.map((todo, index) => {
        return {
            value: todo.id,
            name: `${ (index + 1 + '.').green } ${ todo.description }`,
            checked: Boolean(todo.completedDate)
        }
    });

    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Check todo(s) to completed:',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(questions);

    return ids;
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listTodosToDelete,
    listTodosToComplete,
    confirm,
};

