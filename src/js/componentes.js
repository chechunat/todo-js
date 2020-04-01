import { Todo } from '../classes';
import { todoList } from '../index';

// Referencias en el HTML

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');
const contPendientes = document.querySelector('.todo-count');

export const crearTodoHtml = (todo) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : ''}>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);
    contarPendientes();

    return div.firstElementChild;
}

const contarPendientes = () => {

    let pendientes = 0;
    for (let i = todoList.todos.length - 1; i >= 0; i--) {
        if (!todoList.todos[i].completado) {
            pendientes++;
        }
    }
    contPendientes.firstChild.innerText = pendientes;
}

// Eventos

// Cuando se pulsa teclas del teclado 
txtInput.addEventListener('keyup', (event) => {

    // Si se pulsa enter y hay texto
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }

});


// Cuando de presiona click con el raton
divTodoList.addEventListener('click', (event) => {

    const nombreElemento = (event.target.localName); // input, label o button
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if (nombreElemento.includes('input')) { // Si hace click en check

        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');

    } else if (nombreElemento.includes('button')) { // Borrar el todo

        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento); // Elimina del div HTML

    }
    contarPendientes();

});


btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();

    for (let i = divTodoList.children.length - 1; i >= 0; i--) {

        const elemento = divTodoList.children[i];

        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }

    }


});


ulFiltros.addEventListener('click', (event => {

    const filtro = event.target.text; // Para saber que se pulsa de los filtros

    if (!filtro) { return; } // Si pulsa en algun lugar que no sea un boton de filtros, sale sin hacer nada

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children) {

        elemento.classList.remove('hidden'); // Clase del archivo CSS
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;
        }


    }






}));