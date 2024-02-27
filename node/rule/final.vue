<template>
  <ta-border-layout :show-border="false"
                    :layout="{header: '94px'}"
                    :center-cfg="center-cg"
                    :header-cfg="header-cfg">
    <div slot="header">
      <div class="tree-left">任务管理</div>
      <div class="tree-right">
        <a href="#"
           @click="show-choose-folder-modal"
           title="添加任务"
           v-if="show-data-validation !== 2"><img src="./icon/add1.png"
               id="img1"
               class="aimg" /></a>
        <a href="#"
           @click="refresh"
           title="刷新"
           v-if="show-data-validation !== 2"><img src="./icon/refresh1.png"
               id="img2"
               class="aimg"></a>
        <a href="#"
           @click="my-mission"
           v-if="show-data-validation !== 2 && is-my"><img src="./icon/my01.png"
               class="aimg"
               title="我的任务" /></a>
        <a href="#"
           @click="my-mission"
           v-if="show-data-validation !== 2 && !is-my"><img src="./icon/my02.png"
               class="aimg"
               title="我的任务" /></a>
        <a @click="to-batch-group"
           v-if="show-data-validation === 2"><ta-icon type="rollback"
                   class="aimg"></ta-icon></a>
        <a href="#"
           @click="to-manage"
           title="批量操作"><img src="./icon/positioning1.png"
               id="img4"
               class="aimg" /></a>
      </div>
      <div>
        <ta-input v-model="filter-text"
                  placeholder="请输入关键字进行搜索">
          <ta-icon slot="prefix"
                   type="search" />
        </ta-input>
      </div>
    </div>
    <div>
      <clone-mission @show-mission="get-show-mission"
                     ref="clone-mission"
                     @refresh="refresh"
                     :job-id="job-id"
                     :show-data-validation="show-data-validation"></clone-mission>
      <ta-e-tree :props="props"
                 :data="etl-tree"
                 node-key="id"
                 ref="tree"
                 :filter-node-method="filter-node-method"
                 :expand-on-click-node="false"
                 :default-expanded-keys="default-expanded-keys"
                 :highlight-current="true"
                 @node-contextmenu="right-click">
        <span class="custom-tree-node"
              slot-scope="{ node, data }"
              v-on:mouseenter="tree-mouse-enter($event.target, node)"
              v-on:mouseleave="tree-mouse-leave($event.target)">
          <div class="custom-name"
               @click="nodeclick(data)">
            <span v-if="data.type==='1' || data.type === '3' || data.type === '2' || data.type === '4'">
              <ta-icon type="deployment-unit"
                       style="margin-right: 5px;color: #00b0fb" />
            </span>
            <span style=" display :inline-block ;width: 100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap"
                  :title="data.label">{{ data.label }}</span>
          </div>
          <span class="tree-operate">
            <span v-if="data.id !== '2' && data.folder-type !== '2'">
              <!-- etl任务新增文件夹按钮 -->
              <span v-if="data.id==='0' || data.id === '1' || data.id === '3'">
                <!-- 新增文件夹 -->
                <add-folder @get-etl-tree="get-etl-tree"
                           :folder-type="data.id"></add-folder>
              </span>
              <!-- 其他情况 -->
              <span v-else>
                <!-- 文件夹 -->
                <span v-if="data.type!=='1' && data.type!=='3' && data.type !== '2' && data.type !== '4'">
                  <!-- 新增任务 -->
                  <add-misson :show-data-validation="show-data-validation"
                             ref="add-mission"
                             @get-show-mission="get-show-mission"
                             @get-etl-tree="get-etl-tree"
                             :dir-id="data.id"></add-misson>
                  <!-- 编辑按钮 -->
                  <edit-folder :folder-id="data.id"
                              @get-etl-tree="get-etl-tree"></edit-folder>
                  <!-- 删除按钮 -->
                  <span v-if="data.children!=undefined">
                    <span v-if="data.children.length===0">
                      <ta-popconfirm title="确定删除该空文件夹吗？"
                                     @confirm="delete-folder(data.id)">
                        <a>
                          <ta-icon type="delete" />
                        </a>
                      </ta-popconfirm>
                    </span>
                  </span>
                </span>
                <!-- 任务 -->
                <span v-if="data.type==='1' || data.type === '3' || data.type === '2' || data.type==='4'">
                  <div id="per-tree-menu"
                       v-if="tm-display"
                       class="tree_menu"
                       :style="{...right-menu}">
                    <ul>
                      <li @click="clone-mission(data)"><i class="el-icon-tickets"></i> 克隆任务</li>
                    </ul>
                  </div>
                  <a @click="show-drawer(data.id,data)"
                     v-if="data.is-auth !== 0">
                    <ta-icon type="edit"
                             title="编辑任务" />
                  </a>
                  <edit-mission @get-mission-list="get-mission-list"
                               ref="edit-mission"
                               :job-flow-id="data.id"
                               @get-etl-tree="get-etl-tree"></edit-mission>
                  <!-- 删除按钮 -->
                  <ta-popconfirm title="确定删除该任务吗？"
                                 @confirm="delete-mission(data.id,data)"
                                 v-if="data.is-auth !== 0">
                    <a>
                      <ta-icon type="delete"
                               title="删除任务" />
                    </a>
                  </ta-popconfirm>
                </span>
              </span>
            </span>
          </span>
        </span>
      </ta-e-tree>
      <ta-e-tree :props="props"
                 :data="recycle-tree"
                 node-key="id"
                 ref="tree2"
                 :filter-node-method="filter-node-method"
                 highlight-current
                 :default-expand-all="false">
        <span class="custom-tree-node"
              slot-scope="{ node, data }"
              v-on:mouseenter="tree-mouse-enter($event.target, node)"
              v-on:mouseleave="tree-mouse-leave($event.target)">
          <span class="custom-name"
                @click="nodeclick(data)">
            <span v-if="data.type==='1' || data.type==='3' || data.type === '2' || data.type === '4'">
              <ta-icon type="deployment-unit"
                       style="margin-right: 5px;color: lightslategray" />
            </span>
            <span style=" display :inline-block ;width: 100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap"
                  :title="data.label">{{ data.label }}</span>
          </span>
          <span class="tree-operate">
            <span v-if="data.id !== '2' && data.folder-type !== '2'">
              <span v-if="data.type!=='1' && data.type!=='3' && data.type !== '2' && data.type!=='4'">
                <!-- 清空回收站按钮 -->
                <ta-popconfirm title="确定清空回收站吗？"
                               @confirm="clear-recycle">
                  <a>
                    <ta-icon type="delete"
                             title="清空回收站" />
                  </a>
                </ta-popconfirm>
              </span>
              <span v-if="data.type==='1' || data.type==='3' || data.type === '2' || data.type === '4'">
                <!--恢复-->
                <ta-popconfirm title="确定要恢复该任务吗？"
                               @confirm="recycle(data.id)">
                  <a href="#">
                    <ta-icon type="rollback"
                             title="恢复任务" />
                  </a>
                </ta-popconfirm>
                <ta-modal title="文件夹已被删除，请重新选择"
                          :visible="folder-list-visible"
                          @ok="ok"
                          @cancel="cancel">
                  请选择文件夹：
                  <ta-select style="width:300px"
                             v-model="folder-id"
                             :options="folder-list"
                             :options-key="options-keys"></ta-select>
                </ta-modal>

                <!--彻底删除-->
                <ta-popconfirm title="确定彻底删除该任务吗？"
                               @confirm="delete-mission-true(data.id,data)">
                  <a>
                    <ta-icon type="delete"
                             title="彻底删除任务" />
                  </a>
                </ta-popconfirm>
              </span>
            </span>
          </span>
        </span>
      </ta-e-tree>
    </div>
  </ta-border-layout>
</template>

<script>
import $api_mission from "./api/index_mission";
import $api_folder from "./api/index_folder";
import addMisson from "./part/addMisson";
import addFolder from "./part/addFolder";
import editMission from "./part/editMission";
import editFolder from "./part/editFolder";
import cloneMission from "./part/cloneMission";
const headerCfg = {
  showBorder: false,
  layoutConStyle: { lineHeight: "44px", padding: "6px 6px 0 6px" },
};
const centerCg = {
  showBorder: false,
  layoutConStyle: { padding: "0 6px" },
};
export default {
  name: "left",
  props: ["showDataValidation", "groupId"],
  data() {
    return {
      headerCfg,
      centerCg,
      // etl任务树列表
      etlTree: [],
      // etl树配置信息
      props: {
        id: "id",
        label: "label",
        value: "id",
        children: "children",
      },
      // 树过滤信息
      filterText: "",
      // 用于展示的任务
      showMission: {},
      // 回收站树
      recycleTree: [],
      // 文件夹列表
      folderList: [],
      // 选择文件夹是否显示
      folderListVisible: false,
      // 选择文件夹选择框参数
      optionsKeys: {
        id: "folderId",
        value: "folderId",
        label: "folderName",
      },
      // 选择的文件夹ID
      folderId: "",
      // 任务ID
      jobId: "",
      // 是否显示我的任务
      isMy: true,
      imgUrl: "./icon/my01.png",

      rightMenu: {},
      tmDisplay: false,
      defaultExpandedKeys: ["1", "0", "2", this.groupId],
      currentKey: "",
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val.trim());
    },
    $route(to, from) {
      if (to.path === "/jobFlow") {
        this.refresh();
      }
    },
    groupId(val) {
      if (val !== undefined && val !== "") {
        this.defaultExpandedKeys = ["1", "0", "2", val];
      }
    },
  },
  components: {
    addMisson,
    addFolder,
    editMission,
    editFolder,
    cloneMission,
  },
  // 方法区
  methods: {
    // 返回批量集成
    toBatchGroup() {
      this.$router.push({
        name: "batchGroup",
        params: {},
      });
      this.$emit("back");
    },
    // 管理任务
    toManage() {
      this.$router.push({
        name: "missionsManager",
        params: {
          showDataValidation: this.showDataValidation,
          groupId: this.groupId,
        },
      });
    },
    // 克隆任务
    cloneMission(data) {
      if (data.isAuth === 0) {
        this.$message.warn("对不起，不是您的任务，没有权限克隆");
        return;
      }
      this.jobId = data.id;
      this.$refs.cloneMission.showModal();
    },
    // 清空回收站
    clearRecycle() {
      this.Base.submit(null, {
        url: "/diEtldevJobFlow/clearRecycle",
      }).then((data) => {
        if (data.serviceSuccess) {
          if (data.errors === null || data.errors.length === 0) {
            this.$message.success("清空回收站成功");
            this.refresh();
          } else {
            this.$message.error(data.errors[0].msg);
          }
        }
      });
    },
    rightClick(e, data, node, comp) {
      if (data.type !== undefined) {
        this.rightMenu = {
          top: e.pageY + "px",
          left: e.pageX + "px",
        };
        this.jobId = data.id;
        this.tmDisplay = true;
        e.path[2].children[0].style.right = node.isLeaf ? "40px" : "90px";
        e.path[2].children[1].style.display = "block";
        const self = this;
        document.onclick = function (ev) {
          if (ev.target !== document.getElementById("perTreeMenu")) {
            self.tmDisplay = false;
          }
        };
      }
    },
    // 过滤节点
    filterNodeMethod(value, data) {
      if (!value) return true;
      if (data.fullName === undefined) return false;
      return data.fullName.toUpperCase().indexOf(value.toUpperCase()) !== -1;
    },
    // 树点击事件
    nodeclick(value) {
      this.tmDisplay = false;
      if (
        value.type === "1" ||
        value.type === "3" ||
        value.type === "2" ||
        value.type === "4"
      ) {
        $api_mission.getById(this, { jobFlowId: value.id }, (data) => {
          let obj = data.data.object;
          obj.isAuth = value.isAuth;
          this.$emit("nodeClick", obj);
        });
      }
    },
    // 鼠标进入显示事件
    treeMouseEnter(e, node) {
      if (node.data.isAuth === 0) {
        return;
      }
      e.children[0].style.right = node.isLeaf ? "40px" : "90px";
      e.children[1].style.display = "block";
    },
    // 鼠标离开消失事件
    treeMouseLeave(e) {
      this.tmDisplay = false;
      e.children[0].style.right = "0px";
      e.children[1].style.display = "none";
    },
    // 删除任务
    deleteMission(jobId, data) {
      if (data.isAuth === 1) {
        if (data.pid !== undefined && data.pid !== "") {
          this.defaultExpandedKeys = ["1", "0", "2", data.pid];
        }
        $api_mission.delete(this, { jobId: jobId }, (data) => {
          if (data.serviceSuccess) {
            if (data.errors === null || data.errors.length === 0) {
              this.$message.success("删除任务成功");
              this.refresh();
              this.$emit("goToCard");
            } else {
              this.$message.error(data.errors[0].msg);
            }
          }
        });
      } else {
        this.$message.warn("对不起，这不是您的任务，没有权限删除");
      }
    },
    // 彻底删除任务
    deleteMissionTrue(jobId, data) {
      if (data.isAuth === 1) {
        $api_mission.trueDelete(this, { jobId: jobId }, (data) => {
          if (data.serviceSuccess) {
            if (data.errors === null || data.errors.length === 0) {
              this.$message.success("彻底删除任务成功");
              this.$emit("goToCard");
              this.refresh();
            } else {
              this.$message.error(data.errors[0].msg);
            }
          }
        });
      } else {
        this.$message.warn("对不起，这不是您的任务，没有权限彻底删除");
      }
    },
    // 获取左侧树
    getEtlTree(folderId, jobId) {
      this.isMy = true;
      this.etlTree = [];
      // 初始化获取ETL任务树
      $api_mission.getETLTree(
        this,
        { showDataValidation: this.showDataValidation },
        (res) => {
          // res.data.etlTree.map((data) => {
          //   this.etlTree.push(data);
          // });
          res.data.etlTree.map((data) => {
            this.etlTree.push(data);
            if (folderId !== undefined && folderId !== "") {
              this.defaultExpandedKeys = ["1", "0", "2", folderId];
            }
          });
          setTimeout(() => {
            this.$refs.tree.setCurrentKey(jobId);
          }, 100);
        }
      );
    },
    myMission() {
      this.etlTree = [];
      this.filterText = "";
      if (this.isMy) {
        this.$emit("goToMyCard");
        $api_mission.getETLTreeByUser(
          this,
          { showDataValidation: this.showDataValidation },
          (res) => {
            res.data.etlTree.map((data) => {
              this.etlTree.push(data);
            });
          }
        );
        this.isMy = false;
      } else {
        this.$emit("goToCard");
        this.getEtlTree();
        this.isMy = true;
      }
    },
    // 删除文件夹
    deleteFolder(folderId) {
      $api_folder.delete(this, { folderId: folderId }, (data) => {
        if (data.serviceSuccess) {
          if (data.errors === null || data.errors.length === 0) {
            this.$message.success("删除文件夹成功");
            this.refresh();
          } else {
            this.$message.error(data.errors[0].msg);
          }
        }
      });
    },
    getMissionList() {
      this.$emit("getMissionList");
    },
    // 展示编辑任务
    showDrawer(id, data) {
      if (data.isAuth === 1) {
        this.$refs.editMission.showDrawer(id, data.pid);
      } else {
        this.$message.warn("对不起，这不是您的任务，没有权限编辑");
      }
    },
    setShowMission(mission) {
      this.$emit("nodeClick", mission);
    },
    // 获取子组件属性
    getShowMission(object) {
      this.$emit("nodeClick", object);
    },
    // 新增
    showAddMission(folderId) {
      this.$refs.addMission.showDrawer(folderId);
    },
    // 选择文件夹新增
    showChooseFolderModal() {
      this.$emit("showChooseFolderModal");
      // let currentNode = this.$refs.tree.getCurrentKey()
      // console.log(currentNode)
    },
    // 获取回收站树
    getRecycleTree() {
      this.recycleTree = [];
      // 初始化获取ETL任务树
      $api_mission.getRecycleTree(
        this,
        { showDataValidation: this.showDataValidation },
        (res) => {
          // res.data.etlTree.map((data) => {
          //   this.etlTree.push(data);
          // });
          res.data.list.map((data) => {
            this.recycleTree.push(data);
          });
        }
      );
    },
    // 刷新树
    refresh(data) {
      this.filterText = "";
      if (data) {
        this.getEtlTree(data.dirId, data.jobId);
      } else {
        this.getEtlTree();
      }
      this.getRecycleTree();
      if (!data) {
        this.$emit("goToCard");
      }
    },
    // 恢复任务
    recycle(jobId) {
      // 检测文件夹是否还在
      $api_mission.folderIsExist(this, { jobId: jobId }, (data) => {
        if (data.serviceSuccess) {
          if (data.errors === null || data.errors.length === 0) {
            // 如果存在直接恢复
            if (data.data.res) {
              $api_mission.recycle(this, { jobId: jobId }, (data) => {
                if (data.serviceSuccess) {
                  if (data.errors === null || data.errors.length === 0) {
                    this.$message.success("恢复任务成功");
                    this.refresh();
                  } else {
                    this.$message.error(data.errors[0].msg);
                  }
                }
              });
            } else {
              // 获取所有的文件夹列表
              this.Base.submit(null, {
                url: "/diEtldevJobFlowFolder/listAll",
                data: { showDataValidation: this.showDataValidation },
              }).then((res) => {
                this.folderList = res.data.list;
              });
              this.jobId = jobId;
              this.folderListVisible = true;
            }
          } else {
            this.$message.error(data.errors[0].msg);
          }
        }
      });
    },
    // 选择文件夹确定
    ok() {
      this.folderListVisible = false;
      $api_mission.recycle(
        this,
        {
          jobId: this.jobId,
          dirId: this.folderId,
        },
        (data) => {
          if (data.serviceSuccess) {
            if (data.errors === null || data.errors.length === 0) {
              this.$message.success("恢复任务成功");
              this.refresh();
              this.folderId = "";
              this.folderListVisible = false;
              this.jobId = "";
            } else {
              this.$message.error(data.errors[0].msg);
            }
          }
        }
      );
    },
    cancel() {
      this.folderId = "";
      this.folderListVisible = false;
    },
  },
  // created钩子函数
  created() {
    this.getEtlTree();
    this.getRecycleTree();
  },
};
</script>

<style scoped>
.etl {
  width: 50px;
  height: 12px;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 36px;
  letter-spacing: 0px;
  color: #555555;
}

.custom-name {
  width: 10px;
  flex: 1;
  display: flex;
  @include text-overflow();
}

.tree-operate {
  display: none;
}

.tree-operate a {
  margin-left: 10px;
}

.tree-operate i {
  margin-right: 4px;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.aimg {
  background-color: #f2f2f2;
  margin-right: 6px;
}

#img1:hover {
  content: url("icon/add2.png");
  background-color: #d2eaff;
}

#img2:hover {
  content: url("icon/refresh2.png");
  background-color: #d2eaff;
}

/*#img3:hover {*/
/*    content: url('icon/my02.png');*/
/*    background-color: #d2eaff;*/
/*}*/

#img4:hover {
  content: url("icon/Positioning2.png");
  background-color: #d2eaff;
}

.tree_menu {
  position: fixed;
  display: block;
  z-index: 20000;
  background-color: #fff;
  padding: 5px 0;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

ul {
  margin: 0;
  padding: 0;
}

ul li {
  list-style: none;
  margin: 0;
  padding: 0 15px;
  font-size: 14px;
  line-height: 30px;
  cursor: pointer;
}

ul li:hover {
  background-color: #ebeef5;
}
.tree-left {
  float: left;
  display: inline-block;
  width: 30%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.tree-right {
  float: left;
  display: inline-block;
  width: 70%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: right;
}
</style>
