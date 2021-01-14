import { combineReducers } from "redux-immutable";
import { reducer as recommendReducer  } from '../pages/Recommend/store';
import { reducer as singersReducer  } from '../pages/Singers/store';
import { reducer as rankReducer  } from '../pages/Rank/store';

export default combineReducers({
  recommend: recommendReducer,
  singers: singersReducer,
  rank: rankReducer
});