const aFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    }

const _vendor = (function() {
    var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
        transform,
        i = 0,
        l = vendors.length,
        _elementStyle = document.createElement('div').style

    for (; i < l; i++) {
        transform = vendors[i] + 'ransform';
        if (transform in _elementStyle) return vendors[i].substr(0, vendors[i].length - 1);
    }
    return false;
})();
var exp = {
    // 节流函数, 保证一段时间内函数只执行一次
    throttle(fn, delay) {
        var now, lastExec, timer, context, args

        var execute = function() {
            fn.apply(context, args)
            lastExec = now
        }

        return function() {
            context = this
            args = arguments

            now = Date.now()

            if (timer) {
                clearTimeout(timer)
                timer = null
            }

            if (lastExec) {
                var diff = delay - (now - lastExec)
                if (diff < 0) {
                    execute()
                } else {
                    timer = setTimeout(() => {
                        execute()
                    }, diff)
                }
            } else {
                execute()
            }
        }
    },
    // 防抖函数，让某个函数在上一次执行后，满足等待某个时间内不再触发此函数后再执行，而在这个等待时间内再次触发此函数，等待时间会重新计算
    debounce(func, wait, immediate) {
        var timeout, args, context, timestamp, result;

        var later = function() {
            var last = Date.now() - timestamp;

            if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    if (!timeout) context = args = null;
                }
            }
        };

        return function() {
            context = this;
            args = arguments;
            timestamp = Date.now();
            var callNow = immediate && !timeout;
            if (!timeout) timeout = setTimeout(later, wait);
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }

            return result;
        };
    },
    // 动画节流
    rafThrottle(fn) {
        let locked,context,args
        return function() {
            if(locked) return
            context = this
            args = arguments
            locked = true
            aFrame(()=>{
                locked = false
                fn.apply(context, args)
            })
        }
    },
    // 隐藏元素
    hide() {
        [].forEach.call(arguments, (el) => {
            el.style.display = 'none'
        })
    },
    // 显示元素
    show() {
        let args = arguments,
            ifInline = args[args.length - 1]
        if (typeof ifInline === 'boolean') {
            args = [].slice.call(args, 0, args.length - 1)
        } else {
            ifInline = false
        };
        [].forEach.call(args, (el) => {
            el.style.display = ifInline ? 'inline-block' : 'block'
        })
    },
    // 查找最近的滚动父元素
    closestScroll(el) {
        let parent = el
        while (parent && parent.tagName != 'HTML' && parent.nodeType === 1) {
            const style = getComputedStyle(parent)
            if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
                return parent
            } else {
                parent = parent.parentNode
            }
        }
        return window;
    },
    closest(el, selector) {
        if(el.closest){
            return el.closest(selector)
        }
        let matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector

        while (el) {
            if (matchesSelector.call(el, selector)) {
                break;
            }
            el = el.parentElement;
        }
        return el;
    },
    aFrame: aFrame.bind(window),
    prefixStyle(style) {
        if (_vendor === false) return false;
        if (_vendor === '') return style;
        return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
    },
    prefixCss(cssText) {
        if (!_vendor) return cssText;
        return '-' + _vendor.toLowerCase() + '-' + cssText;
    },
    getScrollTop(scroller) {
        if (scroller === window) {
            return window.pageYOffset
        } else {
            return scroller.scrollTop
        }
    }
}

export default exp
