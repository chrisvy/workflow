import { combineReducers } from 'redux';
import { cronmakerReducer } from './cronmakerReducer';
// import menuReducer from './menuReducer';
// import menuConReducer from './menuConReducer';
import menusReducer from './menusReducer';
import searchReducer from './searchReducer';
import cascaderReducer from './cascaderReducer';

const reducer = combineReducers({
  // menuReducer,
  // menuConReducer,
  menusReducer,
  searchReducer,
  cascaderReducer,
  cronmakerReducer
});

export default reducer;