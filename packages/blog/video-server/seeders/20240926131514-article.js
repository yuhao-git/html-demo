'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const tangPoems = [
      { title: '静夜思', content: '床前明月光，疑是地上霜。举头望明月，低头思故乡。' },
      { title: '登鹳雀楼', content: '白日依山尽，黄河入海流。欲穷千里目，更上一层楼。' },
      { title: '春晓', content: '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。' },
      { title: '相思', content: '红豆生南国，春来发几枝。愿君多采撷，此物最相思。' },
      { title: '黄鹤楼送孟浩然之广陵', content: '故人西辞黄鹤楼，烟花三月下扬州。孤帆远影碧空尽，唯见长江天际流。' },
      { title: '早发白帝城', content: '朝辞白帝彩云间，千里江陵一日还。两岸猿声啼不住，轻舟已过万重山。' },
      { title: '望庐山瀑布', content: '日照香炉生紫烟，遥看瀑布挂前川。飞流直下三千尺，疑是银河落九天。' },
      { title: '夜泊牛渚怀古', content: '牛渚西江夜，青天无片云。登舟望秋月，空忆谢将军。' },
      { title: '江雪', content: '千山鸟飞绝，万径人踪灭。孤舟蓑笠翁，独钓寒江雪。' },
      { title: '枫桥夜泊', content: '月落乌啼霜满天，江枫渔火对愁眠。姑苏城外寒山寺，夜半钟声到客船。' },
      { title: '春望', content: '国破山河在，城春草木深。感时花溅泪，恨别鸟惊心。' },
      { title: '凉州词', content: '黄河远上白云间，一片孤城万仞山。羌笛何须怨杨柳，春风不度玉门关。' },
      { title: '送元二使安西', content: '渭城朝雨浥轻尘，客舍青青柳色新。劝君更尽一杯酒，西出阳关无故人。' },
      { title: '游子吟', content: '慈母手中线，游子身上衣。临行密密缝，意恐迟迟归。' },
      { title: '夜雨寄北', content: '君问归期未有期，巴山夜雨涨秋池。何当共剪西窗烛，却话巴山夜雨时。' },
      { title: '秋词', content: '自古逢秋悲寂寥，我言秋日胜春朝。晴空一鹤排云上，便引诗情到碧霄。' },
      { title: '泊秦淮', content: '烟笼寒水月笼沙，夜泊秦淮近酒家。商女不知亡国恨，隔江犹唱后庭花。' },
      { title: '题都城南庄', content: '去年今日此门中，人面桃花相映红。人面不知何处去，桃花依旧笑春风。' },
      { title: '登乐游原', content: '向晚意不适，驱车登古原。夕阳无限好，只是近黄昏。' },
      { title: '江南逢李龟年', content: '岐王宅里寻常见，崔九堂前几度闻。正是江南好风景，落花时节又逢君。' }
    ];

    const articles = [];
    for (let i = 0; i < 10*10000; i++) {
      const poem = tangPoems[i % tangPoems.length];
      articles.push({
        name: poem.title,
        content: poem.content,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('Articles', articles, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
