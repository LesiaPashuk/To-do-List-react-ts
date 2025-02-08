import { Action, combineReducers, configureStore, createStore, Reducer } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducerForAllToDoList } from '../state/reducerForAllToDoList';
export const rootReducer= combineReducers({
        todoList:reducerForAllToDoList ,
});
export const store = configureStore({
    reducer: rootReducer,
  });
  export type RootState = ReturnType<typeof rootReducer>;