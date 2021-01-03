import { combineReducers } from "redux";
import loginReducer from './loginReducer';
import userRegister from './userRegister';
import todoReducer from './todoReducer';

const rootReducer = combineReducers({
    auth: loginReducer,
    register:userRegister,
    todo:todoReducer,
});

export default rootReducer;