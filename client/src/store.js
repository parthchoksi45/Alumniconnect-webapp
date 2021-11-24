import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import index from './reducers/index';

const initialState = {} ;

const middleware = [thunk];

const store =createStore(
index,
initialState,
composeWithDevTools(applyMiddleware(...middleware))

);

export default store;

//
//                                              *
//                                         -----* * REDUCER FN.------                       
//                                         |    *                   | 
//                                         |                        | CHANGES STORE DATA
//                             FORWARDED   |                        |
//                                         |                       ***
//                                         |                        *               
//                                       ACTIONS              REDUX STORE(CENTRAL DATABASE FOR MANAGING STATE)   
//                                         *                        |
//                                        ***                       | SUBSCRIBE
//                                         |                        |
//                                         |                        |
//                                         |                       ***
//                                         |                        *   
//                                         -------------------- COMPONENTS
//                                                  Dispatch             