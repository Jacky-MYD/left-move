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

}

export default exp
