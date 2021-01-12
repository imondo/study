import React, { useEffect } from "react";
import { connect } from 'react-redux';
import * as actionTypes from './store/actionCreators';
import Slider from "../../components/Slider";
import RecommendList from "../../components/List";
import Scroll from "../../baseUI/Scroll";
import { Content } from "./style";

const Recommend = props => {

  const { bannerList, recommendList, getBannerDataDispatch, getRecommendDataDispatch } = props;

  useEffect(() => {
    getBannerDataDispatch();
    getRecommendDataDispatch();
  }, [])

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];

  return (
    <Content>
      <Scroll className="list">
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
