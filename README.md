# left-move-delete

> A Vue.js project

``` bash
# 商品列表、购物车或者关注商品等等
在移动端开发中，尤其是开发商城项目，可以用到该功能。
现在我们通过vue的指令（directives）来实现该功能，先看下面的效果图
```
## 效果图
![Image text](https://github.com/Jacky-MYD/left-move/blob/master/src/assets/images/gif.gif)<br />

```bash
  首先我们先注册一个自定义指令
  import LeftMove from './leftMove' // 引入指令中的一下方法

  function init(vue) {
      vue.directive('LeftMove', LeftMove);
  }

  export default {
      init: init
  }
  在main.js中全剧注册该指令
  import directives from './directives';
  directives.init(Vue);
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
# left-move
