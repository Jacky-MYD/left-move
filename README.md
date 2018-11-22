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
  import LeftMove from './leftMove' // 引入指令中的一些方法
  function init(vue) {
      vue.directive('LeftMove', LeftMove);
  }
  export default {
      init: init
  }
  在main.js中全剧注册该指令
  import directives from './directives';
  directives.init(Vue);

  leftMove.js中的方法
  实例一个TouchMove对象,并且接收绑定的demo节点
  inserted(el, bind) {
      let touchdelt = new TouchMove(el,bind);
      el._touchdel = touchdelt;
  }
  创建一个构造函数，并且监听绑定对象的touchstart, touchmove, touchend事件
  function TouchMove(el, bind) {
      this.el = el;
      this.bind = bind;
      this.startX = 0;
      this.startY = 0;
      this.x = 0;

      if (bind.value.container) {
          this.closest = util.closest(el, bind.value.container)
      }
      this.touchstart = touchstart.bind(this)
      this.touchmove = util.rafThrottle(touchmove).bind(this)
      this.touchend = touchend.bind(this)
      this.bindEvents();
  }
  // 添加事件句柄
  TouchMove.prototype.bindEvents = function() {
      this.unbindEvents();
      this.el.style.transform = 'translateX(0)';
      this.el.addEventListener('touchstart', this.touchstart, false);
      this.el.addEventListener('touchmove', this.touchmove, false);
      this.el.addEventListener('touchend', this.touchend, false);
  };
   // 移除事件句柄
  TouchMove.prototype.unbindEvents = function() {
      this.el.style.transform = 'translateX(0)';
      this.el.removeEventListener('touchstart', this.touchstart);
      this.el.removeEventListener('touchmove', this.touchmove);
      this.el.removeEventListener('touchend', this.touchend);
  };

```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
# left-move
