//提取大数据
import request from 'axios'
export default {
  //决策首页
  getMapData(areaCode) {
    return request({
      method: 'get',
      // url: process.env.BASE_URL + `maps/${areaCode}.json`
      url: import.meta.env.VITE_APP_BASEPATH + `maps/${areaCode}.json`
    });
  },
}
