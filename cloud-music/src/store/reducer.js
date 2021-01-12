import { combineReducers } from "redux-immutable";
import { reducer as recommendReducer  } from '../pages/Recommend/store';

export default combineReducers({
  recommend: recommendReducer 
});