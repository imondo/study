import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtList, AtListItem, AtForm, AtInput, AtButton, AtIcon } from 'taro-ui';
import './index.scss';

export default class Index extends Component {
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
    this.setState({
      list,
      inputVal: ''
    });
  }

  delItem(index) {
    let { list } = this.state;
    list.splice(index, 1);
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
      <View className="index text-center">
        <Text>Todo list</Text>
        <AtForm>
          <View className="at-row at-row__align--center">
            <View className="at-col at-col-8">
              <AtInput
                name="input"
                type="text"
                value={inputVal}
                onChange={this.inputHandler.bind(this)}
              />
            </View>
            <View className="at-col at-col-2 flex-center">
              <AtButton
                type="primary"
                size="small"
                onClick={this.addItem.bind(this)}
              >
                添加
              </AtButton>
            </View>
          </View>
        </AtForm>
        <AtList>
          {list.map((v, i) => {
            return (
              <View className="at-row at-row__align--center">
                <View className="at-col at-col-8">
                  <AtListItem title={v} />
                </View>
                <View
                  className="at-col at-col-2 text-center"
                  onClick={this.delItem.bind(this, i)}
                >
                  <AtIcon value="close" size="16" color="#F00" />
                </View>
              </View>
            );
          })}
        </AtList>
      </View>
    );
  }
}
