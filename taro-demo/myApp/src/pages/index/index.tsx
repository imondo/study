import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtList, AtListItem, AtForm, AtInput, AtButton, AtIcon } from 'taro-ui';
import { connect } from '@tarojs/redux';
import './index.scss';

import { add, del } from './../../actions';

class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  };

  state = {
    list: ['get up', 'coding', 'sleep'],
    inputVal: ''
  };

  addItem() {
    let { list } = this.state;
    const inputVal: string = this.state.inputVal;
    if (inputVal === '') return;
    list.push(inputVal);
    add(inputVal);
    this.setState({
      list,
      inputVal: ''
    });
  }

  delItem(index) {
    let { list } = this.state;
    list.splice(index, 1);
    del(index);
    this.setState({
      list
    });
  }

  inputHandler(val) {
    this.state.inputVal = val;
  }

  render() {
    let { list, inputVal } = this.state;
    return (
      <View className="index">
        <Text>Todo list</Text>
        <AtList>
          {list.map((v, i) => {
            return (
              <View>
                <AtListItem title={v} />
                <AtIcon
                  value="close"
                  size="30"
                  color="#F00"
                  onClick={this.delItem.bind(this, i)}
                />
              </View>
            );
          })}
        </AtList>
        <AtForm>
          <View className="at-row">
            <View className="at-col at-col-7">
              <AtInput
                name="input"
                type="text"
                value={inputVal}
                onChange={this.inputHandler.bind(this)}
              />
            </View>
            <View className="at-col at-col-3">
              <AtButton type="primary" onClick={this.addItem.bind(this)}>
                添加
              </AtButton>
            </View>
          </View>
        </AtForm>
      </View>
    );
  }
}

export default connect(
  ({ todos }) => ({
    todos: todos.todos
  }),
  dispatch => ({
    add(data: string) {
      dispatch(add(data));
    },
    del(id: number) {
      dispatch(del(id));
    }
  })
)(Index as any);
