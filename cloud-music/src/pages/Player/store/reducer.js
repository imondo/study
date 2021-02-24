import * as actionTypes from './constants'
import { fromJS } from 'immutable'
import { playMode } from '../../../api/index'

const defaultState = fromJS({
  fullScreen: false, // 播放器是否全屏
  playing: false, // 当前是否播放
  sequencePlayList: [], // 播放顺序列表，因为随机播放模式，列表会乱，所以先保存播放顺序
  playList: [],
  mode: playMode.sequence, // 播放模式
  currentIndex: -1, // 当前歌曲在播放列表的索引位置
  showPlayList: false, // 是否显示播放列表
  currentSong: {}
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_SONG:
      return state.set ('currentSong', action.data);
    case actionTypes.SET_FULL_SCREEN:
      return state.set ('fullScreen', action.data);
    case actionTypes.SET_PLAYING_STATE:
      console.log(action.data)
      return state.set ('playing', action.data);
    case actionTypes.SET_SEQUECE_PLAYLIST:
      return state.set ('sequencePlayList', action.data);
    case actionTypes.SET_PLAYLIST:
      return state.set ('playList', action.data);
    case actionTypes.SET_PLAY_MODE:
      return state.set ('mode', action.data);
    case actionTypes.SET_CURRENT_INDEX:
      return state.set ('currentIndex', action.data);
    case actionTypes.SET_SHOW_PLAYLIST:
      return state.set ('showPlayList', action.data);
    default:
      return state;
  }
}