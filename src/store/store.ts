import {createStore, combineReducers} from "redux";
import calcReducer from "./reducers/calcReducer";

const reducers = combineReducers({
    calcPage: calcReducer
});

const store = createStore(reducers);

export type StateType = ReturnType<typeof reducers>;
export type CombineActions<T> = T extends { [key: string]: infer U } ? U : never;

export default store;