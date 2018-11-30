import Loadable from 'react-loadable';
import React from 'react'

const LoadableComponent = Loadable({
  loader: () => import('./'),
  //这里是一个函数返回一个组件
  loading() {
      return <div>正在加载</div>
  }
});

// export default class App extends React.Component {
//   render() {
//     return <LoadableComponent/>;
//   }
// }

//把上面的改成无状态组件
export default () => <LoadableComponent/>