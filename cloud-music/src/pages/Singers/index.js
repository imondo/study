import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePageCount,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList
} from './store/actionCreators';
import LazyLoad, { forceCheck } from 'react-lazyload';
import Horizen from '../../baseUI/HorizenItem/index';
import Scroll from '../../baseUI/Scroll/index';
import Loading from '../../baseUI/Loading/index';
import { NavContainer, List, ListItem, ListContainer } from './style';
import { getSingers } from '../../api/index';

import { CategoryDataContext, CHANGE_ALPHA, CHANGE_CATEGORY } from './store.js';

function Singers(props) {
  const {
    singerList,
    enterLoading,
    pullUpLoading,
    pullDownLoading,
    pageCount,
    getHotSingerDispatch,
    updateDispatch,
    pullDownRefreshDispatch,
    pullUpRefreshDispatch
  } = props;
  const {data, dispatch} = useContext(CategoryDataContext);
  // 拿到 category 和 alpha 的值

  const {category, alpha} = data.toJS ();
  const { categoryTypes, alphaTypes } = getSingers();

  // const [category, setCategory] = useState('');
  // const [alpha, setAlpha] = useState('');

  useEffect(() => {
    if (!singerList.size) {
      getHotSingerDispatch ();
    }
    // eslint-disable-next-line
  }, []);

  const onUpdateAlpha = val => {
    // setAlpha(val);
    dispatch ({type: CHANGE_ALPHA, data: val});
    updateDispatch(category, val);
  };

  const onUpdateCategory = val => {
    // setCategory(val);
    dispatch ({type: CHANGE_CATEGORY, data: val});
    updateDispatch(val, alpha);
  };

  const onPullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === '', pageCount);
  };

  const onPullDown = () => {
    pullDownRefreshDispatch(category, alpha);
  };

  const renderSingerList = () => {
    const list = singerList ? singerList.toJS() : [];
    return (
      <List>
        {list.map((item, index) => {
          return (
            <ListItem key={item.accountId + '' + index}>
              <div className="img_wrapper">
                <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="music"/>}>
                  <img
                    src={`${item.picUrl}?param=300x300`}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <div>
      <NavContainer>
        <Horizen
          list={categoryTypes}
          title={'分类 (默认热门):'}
          oldVal={category}
          onClick={e => onUpdateCategory(e)}
        ></Horizen>
        <Horizen
          list={alphaTypes}
          title={'首字母:'}
          oldVal={alpha}
          onClick={e => onUpdateAlpha(e)}
        ></Horizen>
      </NavContainer>
      <ListContainer>
        <Scroll
          pullUp={onPullUp}
          pullDown={onPullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          onScroll={forceCheck}
        >
          {renderSingerList()}
        </Scroll>
        <Loading show={enterLoading}></Loading>
      </ListContainer>
    </div>
  );
}

const mapStateToProps = state => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount'])
});

const mapDispatchToProps = dispatch => ({
  getHotSingerDispatch() {
    dispatch(getHotSingerList());
  },
  updateDispatch(category, alpha) {
    dispatch(changePageCount(0)); // 由于改变了分类，所以pageCount清零
    dispatch(changeEnterLoading(true)); // loading
    dispatch(getSingerList(category, alpha));
  },
  pullUpRefreshDispatch(category, alpha, hot, count) {
    dispatch(changePullUpLoading(true));
    dispatch(changePageCount(count + 1));
    if (hot) {
      dispatch(refreshMoreHotSingerList());
    } else {
      dispatch(refreshMoreSingerList(category, alpha));
    }
  },
  pullDownRefreshDispatch(category, alpha) {
    dispatch(changePullDownLoading(true));
    dispatch(changePageCount(0)); // 属于重新获取数据
    if (category === '' && alpha === '') {
      dispatch(getHotSingerList());
    } else {
      dispatch(getSingerList(category, alpha));
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Singers);
