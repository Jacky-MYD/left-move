import LeftMove from './leftMove'

function init(vue) {
    vue.directive('LeftMove', LeftMove);
}

export default {
    init: init
}
