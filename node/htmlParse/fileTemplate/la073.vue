<template>
<!-- 通过，success处理，不通过fail处理 -->
<approval-layout @fail="fail"
                 @success="success"
                 :processData="processData"
                 :currentPlace="content.linkname"
                 :currentStatus="content.status"
                 :taskStatus="taskStatus">

  <approval-normal-card title="单位账户注销业务信息">
    <approval-info-list :list="data1"></approval-info-list>
  </approval-normal-card>

</approval-layout>
</template>
<script>
export default {
data() {
  return {
    // 单位账户封存
    data1: [
      {
        key: "xhyy",
        name: "注销原因",
        value: "",
      },
      {
        key: "pzzxbm",
        name: "批准注销部门 ",
        value: "",
      },
      {
        key: "pzzxsj",
        name: "批准注销时间 ",
        value: "",
      },
      {
        key: "pzwsbh",
        name: "批准文书编号 ",
        value: "",
      },
      {
        key: "shyy",
        name: "审核原因",
        value: "",
      },
      {
        key: "ywbz",
        name: "备注",
        value: "",
      },
    ],
    processData: [],
    content: {},
    busData: {},
    taskStatus: "",
  };
},
mounted() {
  this.content = JSON.parse(this.$route.query.content);
  this.taskStatus = this.content.taskstatus;
},
beforeDestroy() {
  if (this.taskStatus == "待办" || this.taskStatus == "超时") {
    Base.submit(
      null,
      {
        url: "/approval/updateBusOccupy",
        data: {
          busno: this.content.busno,
          taskno: this.content.taskno,
          flowcode: this.content.flowcode,
          isoccupy: "0",
        },
      },
      {
        successCallback: (data) => {},
      }
    );
  }
},
methods: {
  fail(opinion) {
    // console.log("fail", opinion);
  },
  success(opinion) {
    // this.submitApproval(1, opinion);
  },
},
};
</script>