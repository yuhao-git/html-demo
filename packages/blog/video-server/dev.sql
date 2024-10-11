/*
 Navicat Premium Dump SQL

 Source Server         : mysql数据库
 Source Server Type    : MySQL
 Source Server Version : 80300 (8.3.0)
 Source Host           : localhost:3306
 Source Schema         : dev

 Target Server Type    : MySQL
 Target Server Version : 80300 (8.3.0)
 File Encoding         : 65001

 Date: 26/09/2024 23:06:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for Articles
-- ----------------------------
DROP TABLE IF EXISTS `Articles`;
CREATE TABLE `Articles`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of Articles
-- ----------------------------
INSERT INTO `Articles` VALUES (1, '静夜思', '床前明月光，疑是地上霜。举头望明月，低头思故乡。', '2024-09-26 21:20:17', '2024-09-26 21:20:17');
INSERT INTO `Articles` VALUES (2, '登鹳雀楼', '白日依山尽，黄河入海流。欲穷千里目，更上一层楼。', '2024-09-26 21:20:17', '2024-09-26 21:20:17');
INSERT INTO `Articles` VALUES (3, '春晓', '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。', '2024-09-26 21:20:17', '2024-09-26 21:20:17');
INSERT INTO `Articles` VALUES (4, '相思', '红豆生南国，春来发几枝。愿君多采撷，此物最相思。', '2024-09-26 21:20:17', '2024-09-26 21:20:17');
INSERT INTO `Articles` VALUES (5, '黄鹤楼送孟浩然之广陵', '故人西辞黄鹤楼，烟花三月下扬州。孤帆远影碧空尽，唯见长江天际流。', '2024-09-26 21:20:17', '2024-09-26 21:20:17');
INSERT INTO `Articles` VALUES (6, '早发白帝城', '朝辞白帝彩云间，千里江陵一日还。两岸猿声啼不住，轻舟已过万重山。', '2024-09-26 21:20:17', '2024-09-26 21:20:17');
INSERT INTO `Articles` VALUES (7, '望庐山瀑布', '日照香炉生紫烟，遥看瀑布挂前川。飞流直下三千尺，疑是银河落九天。', '2024-09-26 21:20:17', '2024-09-26 21:20:17');
INSERT INTO `Articles` VALUES (8, '夜泊牛渚怀古', '牛渚西江夜，青天无片云。登舟望秋月，空忆谢将军。', '2024-09-26 21:20:17', '2024-09-26 21:20:17');
INSERT INTO `Articles` VALUES (9, '江雪', '千山鸟飞绝，万径人踪灭。孤舟蓑笠翁，独钓寒江雪。', '2024-09-26 21:20:17', '2024-09-26 21:20:17');
INSERT INTO `Articles` VALUES (10, '枫桥夜泊', '月落乌啼霜满天，江枫渔火对愁眠。姑苏城外寒山寺，夜半钟声到客船。', '2024-09-26 21:20:17', '2024-09-26 21:20:17');
INSERT INTO `Articles` VALUES (11, '春望', '国破山河在，城春草木深。感时花溅泪，恨别鸟惊心。', '2024-09-26 21:20:17', '2024-09-26 21:20:17');
INSERT INTO `Articles` VALUES (12, '凉州词', '黄河远上白云间，一片孤城万仞山。羌笛何须怨杨柳，春风不度玉门关。', '2024-09-26 21:20:17', '2024-09-26 21:20:17');
INSERT INTO `Articles` VALUES (13, '送元二使安西', '渭城朝雨浥轻尘，客舍青青柳色新。劝君更尽一杯酒，西出阳关无故人。', '2024-09-26 21:20:17', '2024-09-26 21:20:17');
INSERT INTO `Articles` VALUES (14, '游子吟', '慈母手中线，游子身上衣。临行密密缝，意恐迟迟归。', '2024-09-26 21:20:17', '2024-09-26 21:20:17');
INSERT INTO `Articles` VALUES (15, '夜雨寄北', '君问归期未有期，巴山夜雨涨秋池。何当共剪西窗烛，却话巴山夜雨时。', '2024-09-26 21:20:17', '2024-09-26 21:20:17');
INSERT INTO `Articles` VALUES (16, '秋词', '自古逢秋悲寂寥，我言秋日胜春朝。晴空一鹤排云上，便引诗情到碧霄。', '2024-09-26 21:20:17', '2024-09-26 21:20:17');
INSERT INTO `Articles` VALUES (17, '泊秦淮', '烟笼寒水月笼沙，夜泊秦淮近酒家。商女不知亡国恨，隔江犹唱后庭花。', '2024-09-26 21:20:17', '2024-09-26 21:20:17');
INSERT INTO `Articles` VALUES (18, '题都城南庄', '去年今日此门中，人面桃花相映红。人面不知何处去，桃花依旧笑春风。', '2024-09-26 21:20:17', '2024-09-26 21:20:17');
INSERT INTO `Articles` VALUES (19, '登乐游原', '向晚意不适，驱车登古原。夕阳无限好，只是近黄昏。', '2024-09-26 21:20:17', '2024-09-26 21:20:17');
INSERT INTO `Articles` VALUES (20, '江南逢李龟年', '岐王宅里寻常见，崔九堂前几度闻。正是江南好风景，落花时节又逢君。', '2024-09-26 21:20:17', '2024-09-26 21:20:17');

-- ----------------------------
-- Table structure for Categories
-- ----------------------------
DROP TABLE IF EXISTS `Categories`;
CREATE TABLE `Categories`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `rank` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `categories_rank`(`rank` ASC) USING BTREE,
  UNIQUE INDEX `categories_name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of Categories
-- ----------------------------
INSERT INTO `Categories` VALUES (1, '前端开发', 1, '2024-09-26 21:32:07', '2024-09-26 21:32:07');
INSERT INTO `Categories` VALUES (2, '后端开发', 2, '2024-09-26 21:32:07', '2024-09-26 21:32:07');
INSERT INTO `Categories` VALUES (3, '移动开发', 3, '2024-09-26 21:32:07', '2024-09-26 21:32:07');
INSERT INTO `Categories` VALUES (4, '数据科学', 4, '2024-09-26 21:32:07', '2024-09-26 21:32:07');
INSERT INTO `Categories` VALUES (5, '网络安全', 5, '2024-09-26 21:32:07', '2024-09-26 21:32:07');
INSERT INTO `Categories` VALUES (6, '公关', 6, '2024-09-26 21:32:07', '2024-09-26 21:32:07');
INSERT INTO `Categories` VALUES (13, '分类95', 95, '2024-09-26 22:40:41', '2024-09-26 22:48:38');
INSERT INTO `Categories` VALUES (14, '分类111', 99, '2024-09-26 22:51:11', '2024-09-26 22:51:11');
INSERT INTO `Categories` VALUES (18, '分123', 992123, '2024-09-26 22:51:29', '2024-09-26 22:51:29');
INSERT INTO `Categories` VALUES (20, '分1231', 992, '2024-09-26 22:51:39', '2024-09-26 22:51:39');

-- ----------------------------
-- Table structure for Chapters
-- ----------------------------
DROP TABLE IF EXISTS `Chapters`;
CREATE TABLE `Chapters`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `courseId` int UNSIGNED NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `video` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `rank` int NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `chapters_course_id`(`courseId` ASC) USING BTREE,
  INDEX `chapters_rank`(`rank` ASC) USING BTREE,
  CONSTRAINT `chapters_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `Courses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of Chapters
-- ----------------------------

-- ----------------------------
-- Table structure for Courses
-- ----------------------------
DROP TABLE IF EXISTS `Courses`;
CREATE TABLE `Courses`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `categoryId` int UNSIGNED NULL DEFAULT NULL,
  `userId` int UNSIGNED NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `recommended` tinyint NULL DEFAULT NULL,
  `introductory` tinyint NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `likesCount` int NULL DEFAULT NULL,
  `chaptersCount` int NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `categoryId`(`categoryId` ASC) USING BTREE,
  INDEX `userId`(`userId` ASC) USING BTREE,
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `Categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of Courses
-- ----------------------------

-- ----------------------------
-- Table structure for Likes
-- ----------------------------
DROP TABLE IF EXISTS `Likes`;
CREATE TABLE `Likes`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `courseId` int UNSIGNED NULL DEFAULT NULL,
  `userId` int UNSIGNED NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `likes_course_id`(`courseId` ASC) USING BTREE,
  INDEX `likes_user_id`(`userId` ASC) USING BTREE,
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `Courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of Likes
-- ----------------------------

-- ----------------------------
-- Table structure for SequelizeMeta
-- ----------------------------
DROP TABLE IF EXISTS `SequelizeMeta`;
CREATE TABLE `SequelizeMeta`  (
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`) USING BTREE,
  UNIQUE INDEX `name`(`name` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of SequelizeMeta
-- ----------------------------
INSERT INTO `SequelizeMeta` VALUES ('20240922132742-create-article.js');
INSERT INTO `SequelizeMeta` VALUES ('20240922132829-create-category.js');
INSERT INTO `SequelizeMeta` VALUES ('20240922132834-create-setting.js');
INSERT INTO `SequelizeMeta` VALUES ('20240922132848-create-user.js');
INSERT INTO `SequelizeMeta` VALUES ('20240922132854-create-course.js');
INSERT INTO `SequelizeMeta` VALUES ('20240922132916-create-chapter.js');
INSERT INTO `SequelizeMeta` VALUES ('20240922132923-create-like.js');

-- ----------------------------
-- Table structure for Settings
-- ----------------------------
DROP TABLE IF EXISTS `Settings`;
CREATE TABLE `Settings`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `icp` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `copyright` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of Settings
-- ----------------------------

-- ----------------------------
-- Table structure for Users
-- ----------------------------
DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sex` tinyint NOT NULL DEFAULT 9,
  `company` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `introduce` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `role` tinyint NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `email`(`email` ASC) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE,
  UNIQUE INDEX `users_email`(`email` ASC) USING BTREE,
  UNIQUE INDEX `users_username`(`username` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of Users
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
