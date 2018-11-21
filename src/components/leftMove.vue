<style lang="less">
  @import '../assets/style/leftMove.less';
</style>

<template>
  <div class="shopping_page" data-touchmove-con>
    <div class="header bd_bottom">左滑删除</div>
    <div class="production_list" v-for="(item, index) in productionList" ref="touchmove" v-leftMove="{container: '[data-touchmove-con]'}">
      <div class="item_box bd_bottom">
        <span>型号：</span>
        <span>{{item.productionNmae}}</span>
      </div>
      <div class="item_box">
        <span>数量：</span>
        <span>{{index}}</span>
      </div>
      <div class="delete_item" @click="deleteItem(index)">
        删除
      </div>
    </div>
    <div class="continueAdd" @click="addShort">
      <div style="padding-bottom: 15px;" class="bd-bottom">
        <i class="icon-tianjiax iconfont"></i>
        <span>继续添加</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        productionList: [
          {
            productionNmae: 'iPhone X'
          },
          {
            productionNmae: 'iPhone XR'
          },
          {
            productionNmae: 'iPhone XS'
          },
          {
            productionNmae: 'iPhone XS Max'
          }
        ]
      }
    },
    methods: {
      // 继续添加
      addShort () {
        var addObj = {productionNmae: '商品' + this.productionList.length};
        this.productionList.push(addObj)
      },
      // 删除当前机型
      deleteItem(ind) {
        if (this.$refs['touchmove'][ind]) {
          this.$refs['touchmove'][ind].style.transform = "translateX(0px)";
        }
        this.productionList.splice(ind, 1);
      },
    }
  }
</script>
