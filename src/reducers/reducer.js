import { combineReducers } from 'redux';
import { cronmakerReducer } from './cronmakerReducer';
import menuReducer from './menuReducer';
import searchReducer from './searchReducer';
import menuConReducer from './menuConReducer';
import cascaderReducer from './cascaderReducer';

const reducer = combineReducers({
  menuReducer,
  searchReducer,
  menuConReducer,
  cascaderReducer,
  cronmakerReducer
});

export default reducer;