import { configureStore } from "@reduxjs/toolkit";
import { todoReducer, addTodo, updateTodo, removeTodo } from "../slices/todoSlice";

describe("todoSlice", () => {
  let store;
  beforeEach(() => {
    const preloadedState = {
      todoData: {
        ids: ["1", "2"],
        entities: {
          1: {
            id: "1",
            createdOn: 1519211809934,
            title: "First todo",
            isCompleted: false,
          },
          2: {
            id: "2",
            createdOn: 1519211809934,
            title: "Second todo",
            isCompleted: true,
          },
        },
      },
    };

    store = configureStore({
      reducer: {
        todoData: todoReducer,
      },
      preloadedState,
    });
  });

  it("should add a todo", () => {
    const title = "Test todo";
    store.dispatch(addTodo(title));
    const state = store.getState();
    const todos = state.todoData.entities;
    const todoIds = state.todoData.ids;

    expect(todoIds).toHaveLength(3);
    expect(todos[todoIds[2]].title).toBe(title);
  });

  it("should update a todo", () => {
    const todo = {
      id: "1",
      createdOn: Date.now(),
      title: "Updated test todo",
      isCompleted: true,
    };
    store.dispatch(
      updateTodo({
        id: todo.id,
        changes: {
          title: todo.title,
          createdOn: todo.createdOn,
          isCompleted: todo.isCompleted,
        },
      }),
    );
    const state = store.getState();
    const todos = state.todoData.entities;
    const todoIds = state.todoData.ids;

    expect(todoIds).toHaveLength(2);
    expect(todos[todoIds[0]]).toEqual(todo);
  });

  it("should remove a todo", () => {
    store.dispatch(removeTodo("1"));
    const state = store.getState();
    const todos = state.todoData.entities;
    const todoIds = state.todoData.ids;

    expect(todoIds).toHaveLength(1);
    expect(todos["1"]).toBeUndefined();
  });
});
