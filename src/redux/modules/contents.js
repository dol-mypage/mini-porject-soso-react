// redux/modules/todos.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const __getTodos = createAsyncThunk(
  "todos/getTodos",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/todos");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const contents = createSlice({
  name: "contents",
  initialState: {
    todos: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
      axios.post("http://localhost:3001/todos", action.payload);
    },
    deleteTodo(state, action) {
      let index = state.todos.findIndex((todo) => todo.id === action.payload);
      state.todos.splice(index, 1);
      axios.delete(`http://localhost:3001/todos/${action.payload}`);
    },
    updateTodo(state, action) {
      let index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );

      state.todos.splice(index, 1, action.payload);
      axios.patch(
        `http://localhost:3001/todos/${action.payload.id}`,
        action.payload
      );
    },
  },
  extraReducers: {
    [__getTodos.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.todos = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

export const { addTodo, deleteTodo, updateTodo } = contents.actions;
export default contents;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   todos: [],
//   isLoading: false,
//   error: null,
// };

// export const __getTodos = createAsyncThunk(
//   "todos/getTodos",
//   (payload, thunkAPI) => {}
// );

// export const todos = createSlice({
//   name: "todos",
//   initialState: [
//     // {
//     //   id: 0,
//     //   writer: "",
//     //   title: "",
//     //   body: "",
//     // },
//   ], // ':' 뒤에 다 지워야하는지

//   reducers: {
//     addTodo(state, action) {
//       state.push(action.payload);
//     },
//     deleteTodo(state, action) {
//       let index = state.findIndex((todo) => todo.id === action.payload);
//       state.splice(index, 1);
//     },
//   },

//   extraReducers: {},
// });

// export const { addTodo, deleteTodo } = todos.actions;
// export default todos;
