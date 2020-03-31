import { Todo } from "./todo.class";

export class TodoList {

    constructor() {
        // this.todos = [];
        this.cargarLocalStorage();

    }

    nuevoTodo(tarea) {
        this.todos.push(tarea);
        this.guardarLocalStorage();
    }

    eliminarTodo(id) {

        this.todos = this.todos.filter(todo => todo.id != id); //Elimina el id enviado
        this.guardarLocalStorage();

    }

    marcarCompletado(id) {

        for (const todo of this.todos) {

            if (todo.id == id) {

                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }


    }

    eliminarCompletados() {

        this.todos = this.todos.filter(todo => !todo.completado); //Elimina los que NO estan completados
        this.guardarLocalStorage();

    }

    guardarLocalStorage() {

        localStorage.setItem('todo', JSON.stringify(this.todos)); // Transforma un objeto a string

    }

    cargarLocalStorage() {

        // //Si existe
        // if (localStorage.getItem('todo')) {

        //     this.todos = JSON.parse(localStorage.getItem('todo'));

        //     console.log('cargarlocal: ', this.todos);
        //     console.log(typeof this.todos);

        // } else {
        //     this.todos = [];
        // }

        // Con operador ternario seria asi...

        this.todos = (localStorage.getItem('todo')) ?
            JSON.parse(localStorage.getItem('todo')) : [];

        // Esto para que cuando recupere el objeto del localStorage lo recombierta en una clase con sus métodos, porque
        // JSON lo recupera como objeto y así pierde los métodos de la clase
        this.todos = this.todos.map(obj => Todo.fromJson(obj));

        // Esto se puede hacer tambien asi: this.todos = this.todos.map(Todo.fromJson);

    }

}