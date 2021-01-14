import React, { useEffect } from "react";
import { forceCheck } from 'react-lazyload';
import { connect } from 'react-redux';
import * as actionTypes from './store/actionCreators';
import Slider from "../../components/Slider";
import RecommendList from "../../components/List";
import Scroll from "../../baseUI/Scroll";
import Loading from "../../baseUI/Loading/index";
import { renderRoutes } from 'react-router-config';

import { Content } from "./style";

const Recommend = props => {

  const { enterLoading, bannerList, recommendList, getBannerDataDispatch, getRecommendDataDispatch } = props;

  useEffect(() => {
    // 如果页面有数据，则不发请求
    //immutable 数据结构中长度属性 size
    if (!bannerList.size){
      getBannerDataDispatch ();
    }
    if (!recommendList.size){
      getRecommendDataDispatch ();
    }
  }, [])

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];

  return (
    <Content>
      { enterLoading ? <Loading></Loading> : null }
      { renderRoutes (props.route.routes) }
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList list={recommendListJS}></RecommendList>
        </div>
      </Scroll>
    </Content>

  )
}


// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = state => ({
  // 不要在这里将数据 toJS
  // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterLoading: state.getIn (['recommend', 'enterLoading'])
})

// 映射 dispatch 到 props 上
const mapDispatchToProps = dispatch => ({
  getBannerDataDispatch() {
    dispatch(actionTypes.getBannerList())
  },
  getRecommendDataDispatch() {
    dispatch(actionTypes.getRecommendList())
  }
})

// 将 ui 组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));
