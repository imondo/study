import { fromJS } from 'immutable';
import { getAlbumDetailRequest } from '../../../api/index';

const CHANGE_LOADING = 'album/CHANGE_LOADING';
const CHANGE_ALBUM = 'album/CHANGE_ALBUM';

const defaultState = fromJS({
  loaing: true,
  currentAlbum: {}
})

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_LOADING:
      return state.set('loaing', action.data);  
    case CHANGE_ALBUM:
      return state.set('currentAlbum', action.data);  
    default:
      return state;
  }
}

export const changeLoading = data => ({
  type: CHANGE_LOADING,
  data
})

const changeAlbum = data => ({
  type: CHANGE_ALBUM,
  data: fromJS(data)
})

export const getAlbum = (id) => {
  return (dispatch) => {
    getAlbumDetailRequest(id).then(res => {
      dispatch(changeLoading(false));
      dispatch(changeAlbum(res.playlist));
    }).catch(err => {
      console.log(err);
    })
  }
}

