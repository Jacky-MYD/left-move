/**
 * Created by 缪耀东 on 2017-7-13.
 * 用于适配苹果安卓手机左滑取消关注商品，或者删除商品
 */
// v-leftMove="{methods:showConfirm}"
import util from '../js/util'
   const minX = -60;

function TouchMove(el, bind) {
    this.el = el;
    this.bind = bind;
    this.startX = 0;
    this.startY = 0;
    this.x = 0;
    this.transformed = false;
    this.timer = null;

    if (bind.value.container) {
        this.closest = util.closest(el, bind.value.container)
    }
    this.touchstart = touchstart.bind(this)
    this.touchmove = util.rafThrottle(touchmove).bind(this)
    this.touchend = touchend.bind(this)
    this.bindEvents();
}

TouchMove.prototype.bindEvents = function() {
    this.unbindEvents();
    this.el.style.transform = 'translateX(0)';
    this.el.addEventListener('touchstart', this.touchstart, false);
    this.el.addEventListener('touchmove', this.touchmove, false);
    this.el.addEventListener('touchend', this.touchend, false);
};

TouchMove.prototype.unbindEvents = function() {
    this.el.style.transform = 'translateX(0)';
    this.el.removeEventListener('touchstart', this.touchstart);
    this.el.removeEventListener('touchmove', this.touchmove);
    this.el.removeEventListener('touchend', this.touchend);
};

TouchMove.prototype.setTransform = function(x) {
    this.el.style[util.prefixStyle('transform')] = 'translateX(' + x + 'px)';
}
TouchMove.prototype.setTransition = function(isRemove) {
    if (isRemove) {
        this.el.style[util.prefixStyle('transition')] = '';
    } else {
        this.el.style[util.prefixStyle('transition')] = 'transform .3s';
    }
}
TouchMove.prototype.removeActive = function() {
    if (this.closest) {
        let old = this.closest.querySelector('[data-touchmove-active]')
        if (old && old._touchdel) {
            old._touchdel.x = 0;
            old._touchdel.setTransform(0);
            old.removeAttribute('data-touchmove-active');
        }
    }
};
TouchMove.prototype.reset = function() {
    this.el.style.translateX = "0px";
};
function touchstart(event) {
    this.startX = event.touches[0].pageX;
    this.startY = event.touches[0].pageY;
    this.setTransition(true);
}
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

export default {
    inserted(el, bind) {
        let touchdelt = new TouchMove(el,bind);

        el._touchdel = touchdelt;
    }
}
