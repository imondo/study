import { fromJS } from 'immutable';
import * as actionTypes from './constants'

import { getRankListRequest } from '../../../api/index';

export const changeRankList = data => ({
  type: actionTypes.CHANGE_RANK_LIST,
  data: fromJS(data)
})

export const changeLoading = data => ({
  type: actionTypes.CHANGE_LOADING,
  data
})

export const getRankList = () => {
  return dispatch => {
    getRankListRequest().then(res => {
      const data = res && res.list;
      dispatch(changeRankList(data));
      dispatch(changeLoading(false));
    }).catch(err => {
      console.log(err);
    })
  }
}


