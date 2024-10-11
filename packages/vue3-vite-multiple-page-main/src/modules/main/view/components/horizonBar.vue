<!--缴存归集银行类似的横向柱状图-->
<template>
  <div class="horizonBar"
       :style="{padding: widthFull ? '0' : '0 30px'}">
    <div class="c"
         :class="direction == 'horizon' ? 'horizon' : 'vertial'"
         v-for="(item, index) in data"
         :key="index">
      <div class="title">{{ item.name }}</div>
      <div class="bar">
        <div class="content-border"
             :class="`border_${index % 8}`">
          <div class="content"
               :style="{ width: item.width + '%' }"
               :class="colorful ? `content-bg${index % 8}` : 'content-bg1'"></div>
        </div>
        <div class="num"
             :class="`font16-num-${themeNum}`"
             :style="{ width: numWidth }">
          {{ item.value }}
          <span class="common-data14-unit"> {{ percent ? "%" : unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "horizonBar",
  props: {
    colorful: { default: true },
    widthFull: { default: true },
    limitMoveNum: { default: 10 },
    direction: { default: "horizon" },
    barData: {
      type: Array,
      default: () => [
        { value: 30, name: "建设银行" },
        { value: 20, name: "工商银行" },
        { value: 28, name: "农业银行" },
        { value: 49, name: "中国银行" },
      ],
    },
    percent: {
      default: true,
    },
    unit: {
      default: "元",
    },
    themeNum: {
      default: 1,
    },
    numWidth: {
      default: "15%",
    },
    scrollNum: {
      default: 8,
    },
  },
  computed: {
    data() {
      let max = Math.max(...this.barData.map(item => Number(item.value)));
      max = max == 0 ? 1 : max / 0.9;
      if (this.percent) {
        max = 100;
      }
      return this.barData.map(item => {
        return {
          name: item.name,
          value: formatNumThree(item.value),
          width: this.percent ? item.value : ((item.value * 100) / max).toFixed(0),
        };
      });
    },
    scrollOption() {
      return {
        limitMoveNum: this.limitMoveNum,
        step: 0.3,
      };
    },
  },
};
</script>

<style scoped lang="less">
.legend {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.horizonBar {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  width: 100%;
}
.horizon {
  display: flex;
  font-size: 16px;
  flex-direction: row;
  .title {
    width: 100px;
    line-height: 35px;
    overflow: hidden;
    text-align: right;
    margin-right: 10px;
  }
  .num {
    line-height: 35px;
    display: flex;
    justify-content: flex-end;
  }
  .bar {
    width: 90%;
    .content-border {
      margin: 13.5px 0;
      overflow: hidden;
    }
  }
}
.vertial {
  font-size: 18px;
  .title {
    height: 30px;
  }
  .bar {
    .content-border {
      margin-top: 10px;
      overflow: hidden;
    }
  }
  .num {
    line-height: 25px;
    display: flex;
    justify-content: flex-end;
  }
}
.title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #afd9ff;
}
.bar {
  display: flex;
  .content-border {
    width: 100%;
    height: 10px;
    border-radius: 5px;
    overflow: hidden;
    padding: 1px;
    .content {
      height: 6px;
      border-radius: 5px;
    }
  }
  .num {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 15%;
    text-align: right;
    font-family: "DIN-Medium";
    color: #09c3ff;
    text-align: left;
    margin-left: 10px;
    display: flex;
    justify-content: flex-end;
  }
}
.border_0 {
  border: 1px solid rgba(251, 204, 20, 0.3);
}
.border_1 {
  border: 1px solid rgba(21, 186, 222, 0.3);
}
.border_2 {
  border: 1px solid rgba(0, 255, 228, 0.3);
}
.border_3 {
  border: 1px solid rgba(134, 205, 255, 0.3);
}
.border_4 {
  border: 1px solid rgba(131, 122, 255, 0.3);
}
.border_5 {
  border: 1px solid rgba(248, 212, 67, 0.3);
}
.border_6 {
  border: 1px solid rgba(245, 248, 29, 0.3);
}
.border_7 {
  border: 1px solid rgba(32, 132, 230, 0.3);
}
.content-bg0 {
  background-color: rgba(251, 204, 20, 0.8);
}
.content-bg1 {
  background-color: rgba(21, 186, 222, 0.8);
}
.content-bg2 {
  background-color: rgba(0, 255, 228, 0.8);
}
.content-bg3 {
  background-color: rgba(134, 205, 255, 0.8);
}
.content-bg4 {
  background-color: rgba(131, 122, 255, 0.8);
}
.content-bg5 {
  background-color: rgba(248, 212, 67, 0.8);
}
.content-bg6 {
  background-color: rgba(245, 248, 29, 0.8);
}
.content-bg7 {
  background-color: #03bffc;
}
.content-bg8 {
  background-color: #03bffc;
}
.content-bg9 {
  background-color: #03bffc;
}
</style>
