接口数据字段项说明
接口数据如下，我简单说明下每个字段的含义

targetField：目标，对应图的 target

refFields：来源：对应图的 source

> 一个目标可以有多个来源

fieldName： 数据库、表、字段使用 “.“ 分隔

level：层次布局层级

index：同一层的排序

final：是否是最后一层，true 最后一层，false：不是最后一层

```js
[
  {
    "refFields": [
      {
        "fieldName": "default._u1.cal_date",
        "final": false,
        "index": 0,
        "level": 1
      }
    ],
    "targetField": {
      "fieldName": "dws.dws_comm_shop_linkshop_da.cal_date",
      "final": false,
      "index": 0,
      "level": 0
    }
  },
  {
    "refFields": [
      {
        "fieldName": "default._u1.brand_code",
        "final": false,
        "index": 0,
        "level": 1
      }
    ],
    "targetField": {
      "fieldName": "dws.dws_comm_shop_linkshop_da.brand_code",
      "final": false,
      "index": 0,
      "level": 0
    }
  }
]
```