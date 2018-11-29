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

当用户在移动demo节点的时候，监听横坐标的滑动距离
function touchmove(event) {
    let endX = event.touches[0].pageX,
        endY = event.touches[0].pageY,
        diffX = endX - this.startX,
        diffY = endY - this.startY,
        temp = this.x + diffX;

    if (Math.abs(diffY) > Math.abs(diffX)) return;

    if (temp > 0) {
        temp = 0;
    } else if (temp < minX) {
        temp = minX;
    }
    this.x = Math.round(temp)
    this.setTransform(this.x)
    this.startX = endX
}
通过用户移动的距离与设定按钮宽度的一半作比较，即minX/2,
当用户touchEnd时移动横坐标距离x < minX/2，则回弹到原始位置
当用户touchEnd时移动横坐标距离x > minX/2，则在该demo节点添加一个样式属性'data-touchmove-active'，并且将该demo左滑置按钮的最大宽度，此时左滑成功，然后在改按钮
添加相应的事件（删除，关注，取消关注等）
function touchend(event) {
    if (this.x < minX / 2) {
        this.x = minX;

        if (!this.el.dataset.touchmoveActive) {
            this.removeActive();
            this.el.dataset.touchmoveActive = true;
        }
        this.el.classList.add('test');
    } else {
        this.x = 0;
        this.el.removeAttribute('data-touchmove-active');
    }
    this.setTransition();
    this.setTransform(this.x);
}

上述则是完整的指令执行顺序，下面我们看看页面绑定指令
```
```js
我们在注册指令的时候，有注册LeftMove这个指令，所以我们直接在页面需要左滑删除的demo节点绑定v-leftMove即可，
然后有人就会问，为什么页面会的demo上有v-leftMove="{container: '[data-touchmove-con]'}"这么一段代码，其实这里是指定该指令只监听data-touchmove-con这个集合
中所绑定v-leftMove的元素。

此处就介绍完该指令的使用方法了，有不到之处，忘见谅！
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
# left-move
