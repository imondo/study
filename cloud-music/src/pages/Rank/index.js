import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getRankList } from './store/actionCreators';
import Scroll from '../../baseUI/Scroll/index';
import { filterIndex } from '../../utils/utils';
import { Container, List, ListItem, SongList } from './style';
import { renderRoutes } from 'react-router-config';
import { EnterLoading } from './../Singers/style';
import Loading from '../../baseUI/Loading';

const Rank = props => {
  console.log(props);
  const { rankList: list, loading, getRankList } = props;
  useEffect(() => {
    if (!rankList.size) {
      getRankList();
    }
  }, []);

  let rankList = list ? list.toJS() : [];

  let globalStartIndex = filterIndex(rankList);
  let officialList = rankList.slice(0, globalStartIndex);
  let globalList = rankList.slice(globalStartIndex);

  const enterDetail = (name) => {
    const idx = filterIndex(name);
    if(idx === null) {
      alert("暂无相关数据");
      return;
    } 
  }

  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {list.map((item, index) => {
          return (
            <ListItem
              key={item.coverImgId+''+index}
              tracks={item.tracks}
              onClick={() => enterDetail(item.name)}
            >
              <div className="img_wrapper">
                <img src={item.coverImgUrl} alt="" />
                <div className="decorate"></div>
                <span className="update_frequecy">{item.updateFrequency}</span>
              </div>
              {renderSongList(item.tracks)}
            </ListItem>
          );
        })}
      </List>
    );
  };

  const renderSongList = list => {
    return list.length ? (
      <SongList>
        {list.map((item, index) => {
          return (
            <li key={index}>
              {index + 1}. {item.first} - {item.second}
            </li>
          );
        })}
      </SongList>
    ) : null;
  };

  // 榜单数据未加载出来之前都给隐藏
  let displayStyle = loading ? { display: 'none' } : { display: '' };

  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>
            {' '}
            官方榜{' '}
          </h1>
          {renderRankList(officialList)}
          <h1 className="global" style={displayStyle}>
            {' '}
            全球榜{' '}
          </h1>
          {renderRankList(globalList, true)}
          {loading ? (
            <EnterLoading>
              <Loading></Loading>
            </EnterLoading>
          ) : null}
        </div>
      </Scroll>
      {renderRoutes(props.route.routes)}
    </Container>
  );
};

const mapStateToProps = state => ({
  rankList: state.getIn(['rank', 'rankList']),
  loading: state.getIn(['rank', 'loading'])
});

const mapDispacthToProps = dispatch => ({
  getRankList() {
    dispatch(getRankList());
  }
});

export default connect(mapStateToProps, mapDispacthToProps)(React.memo(Rank));
