import React, { useEffect, useRef } from 'react';
import Scroll from '../Scroll/index';
import styled from'styled-components';
import style from '../../assets/global-style';
import { PropTypes } from 'prop-types';

const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;
  >span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    vertical-align: middle;
    font-size: ${style["font-size-m"]};
  }
`
const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style["font-size-m"]};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${style["theme-color"]};
    border: 1px solid ${style["theme-color"]};
    opacity: 0.8;
  }
`

function Horizen(props) {
  const { list, oldVal, title, onClick } = props;

  const Category = useRef(null);

  useEffect(() => {
    let categoryDOM = Category.current;
    let tagElems = categoryDOM.querySelectorAll('span');
    let totalWidth = 0;
    Array.from(tagElems).forEach(ele => {
      totalWidth += ele.offsetWidth;
    })
    categoryDOM.style.width = `${totalWidth}px`;
  }, [])

  return ( 
    <Scroll direction={"horizental"}>
      <div ref={Category}>
        <List>
          <span>{title}</span>
          {
            list.map ((item) => {
              return (
                <ListItem 
                  key={item.key}
                  className={`${oldVal === item.key ? 'selected': ''}`} 
                  onClick={() => onClick(item.key)}>
                    {item.name}
                </ListItem>
              )
            })
          }
        </List>
      </div>
    </Scroll>
  );
}

/**
  * list 为接受的列表数据
  * oldVal 为当前的 item 值
  * title 为列表左边的标题
  * onClick 为点击不同的 item 执行的方法
 */
Horizen.defaultProps = {
  list: [],
  oldVal: '',
  title: '',
  onClick: null
}

Horizen.propType = {
  list: PropTypes.array,
  oldVal: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func
}

export default React.memo(Horizen);