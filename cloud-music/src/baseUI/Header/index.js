import React from 'react';
import styled from 'styled-components';
import style from '../../assets/global-style';
import PropTypes from 'prop-types';
import { Marquee } from './style';

const HeaderContainer = styled.div`
  position: fixed;
  padding: 5px 10px;
  padding-top: 0;
  height: 40px;
  width: 100%;
  z-index: 100;
  display: flex;
  line-height: 40px;
  color: ${style["font-color-light"]};
  /* background-color: #333; */
  .back{
    margin-right: 5px;
    font-size: 20px;
    width: 20px;
  }
  >h1{
    font-size: ${style["font-size-l"]};
    font-weight: 700;
  }
`

// 处理函数组件拿不到 ref 的问题，所以用 forwardRef
const Header = React.forwardRef((props, ref) => {
  const { title, onClick, isMarquee } = props;
  return (
    <HeaderContainer ref={ref}>
      <i className="iconfont back" onClick={onClick}>&#xe655;</i>
      {
        // eslint-disable-next-line jsx-a11y/no-distracting-elements
        isMarquee ? <Marquee><h1 className="text">{title}</h1></Marquee>:
        <h1>{title}</h1>
      }
    </HeaderContainer>
  )
})

Header.defaultProps = {
  onClick: () => {},
  title: 'title',
  isMarquee: false
}

Header.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  isMarquee: PropTypes.bool
}

export default React.memo(Header);