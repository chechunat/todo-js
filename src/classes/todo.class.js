export class Todo {

    // Método statico para recombertir el ojeto recuperado de JSON.parse en una clase de Todo y pueda
    // acceder a los métodos de la clase Todo
    static fromJson({ id, tarea, completado, creado }) {

        const tempTodo = new Todo(tarea);

        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;
    }

    constructor(tarea) {

        this.tarea = tarea;

        this.id = new Date().getTime(); // recibiremos algo así 1235465135
        this.completado = false;
        this.creado = new Date();

    }

    imprimirClase() {

        console.log(`${ this.tarea } - ${ this.id}`);

    }
}