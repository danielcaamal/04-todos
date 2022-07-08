require('colors');

const showMenu = () => {
    return new Promise((resolve, reject) => {
        console.clear();
        console.log('======================================='.blue);
        console.log('       Welcome to the Todo App'.blue);
        console.log('=======================================\n'.blue);
        console.log(`Choose an option:`);
        console.log(`${ '1.'.blue } Create a new todo`);
        console.log(`${ '2.'.blue } List all todos`);
        console.log(`${ '3.'.blue } List completed todos`);
        console.log(`${ '4.'.blue } List uncompleted todos`);
        console.log(`${ '5.'.blue } Complete a todo`);
        console.log(`${ '6.'.blue } Delete a todo`);
        console.log(`${ '7.'.blue } Exit\n`);
        
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        readline.question('Choose an option: ', (answer) => {
            // console.log({ answer });
            readline.close();
            resolve(answer);
        });
    });
}

const pause = () => {
    return new Promise((resolve, reject) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPress ${ 'ENTER'.green } to continue\n`, (answer) => {
            readline.close();
            resolve();
        });
    });
}

module.exports = {
    showMenu,
    pause
};