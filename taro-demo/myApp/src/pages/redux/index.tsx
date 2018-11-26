import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtList, AtListItem, AtForm, AtInput, AtButton, AtIcon } from 'taro-ui';
import { connect } from '@tarojs/redux';

import './index.scss';

import { add, del } from './../../actions';

interface Props {
  add,
  del,
  todos
}

class Index extends Component<Props, object> {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: 'redux'
  };

  state = {
    newTodo: ''
  };

  constructor(props) {
    super(props);
    console.log(this.props);
  }

  addItem() {
    let { add }:{add: any} = this.props;
    let { newTodo }:{newTodo: string} = this.state;
    if (!newTodo) return;
    add(newTodo);
    this.setState({
      newTodo: ''
    });
  }

  delItem(index) {
    let { del } = this.props;
    del(index);
  }

  inputHandler(val) {
    let { newTodo } = this.state;
    if (!val || newTodo === val) return;
    this.setState({
      newTodo: val
    });
  }

  render() {
    let { newTodo } = this.state;
    let { todos } = this.props;
    const todoJsx = todos.map(todo => {
      return (
        <View className="at-row at-row__align--center">
          <View className="at-col at-col-8">
            <AtListItem
              title={todo.text}
              iconInfo={{
                size: 14,
                color: '#78A4FA',
                value: 'calendar'
              }}
            />
          </View>
          <View
            className="at-col at-col-2"
            onClick={this.delItem.bind(this, todo.id)}
          >
            <AtIcon value="close" size="16" color="#F00" />
          </View>
        </View>
      );
    });

    return (
      <View className="index text-center">
        <Text>Redux Todo list</Text>
        <AtForm>
          <View className="at-row at-row__align--center">
            <View className="at-col at-col-8">
              <AtInput
                name="input"
                type="text"
                value={newTodo}
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
        <AtList>{todoJsx}</AtList>
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
