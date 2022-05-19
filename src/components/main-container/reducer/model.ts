export interface Todo {
    action: string;
    todo?: string;
}

export interface TodoReducer {
    todoList: Todo[];
}
