<template>
  <div class="hello">
    <Map :tagData="tagData"
         @tagClick="onClick" />
  </div>
</template>

<script>
import Map from "@/components/Map";
export default {
  name: "HelloWorld",
  components: { Map },
  props: {
    msg: String
  },
  data() {
    return {
      tagData: [
        {
          cityId: "110100",
          cityName: "大丰区",
          value: [120.470324, 33.199531],
          projectCount: 3,
          deviceCount: 1
        }
      ]
    };
  },
  methods: {
    onClick(d) {
      alert(d.cityName);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  height: 100%;
  width: 100%;
  background: #0c2138;
}
</style>
