/*
 Navicat Premium Data Transfer

 Source Server         : postgres
 Source Server Type    : PostgreSQL
 Source Server Version : 120002
 Source Host           : localhost:5432
 Source Catalog        : maindb
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 120002
 File Encoding         : 65001

 Date: 04/05/2020 08:06:53
*/


-- ----------------------------
-- Records of chats
-- ----------------------------
INSERT INTO "public"."chats" VALUES (1, 7);
INSERT INTO "public"."chats" VALUES (2, 8);
INSERT INTO "public"."chats" VALUES (3, 9);



-- ----------------------------
-- Records of groups
-- ----------------------------
INSERT INTO "public"."groups" VALUES (6, '', '2020-05-03 20:49:46.425237', 'test', 1);
INSERT INTO "public"."groups" VALUES (7, '', '2020-05-03 20:50:56.603809', 'test', 1);
INSERT INTO "public"."groups" VALUES (8, '', '2020-05-04 07:57:13.532721', 'ab', 1);
INSERT INTO "public"."groups" VALUES (9, 'bb', '2020-05-04 07:58:29.647732', 'a', 1);



-- ----------------------------
-- Records of groupsMemberships
-- ----------------------------
INSERT INTO "public"."groupsMemberships" VALUES (16, 1, 6, 't');
INSERT INTO "public"."groupsMemberships" VALUES (17, 1, 7, 't');
INSERT INTO "public"."groupsMemberships" VALUES (18, 1, 8, 't');
INSERT INTO "public"."groupsMemberships" VALUES (19, 1, 9, 't');


-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO "public"."users" VALUES (1, 'edoardo', 'edoardo', 'test@test.vg', '$2y$10$1jxprpOOgwlZTNgr.gCvu.eYvoKg1HW3Lup/LVQLQV5nJoiqphC6K', '2020-04-23 17:17:16');
INSERT INTO "public"."users" VALUES (8, 'edoardo3', 'testutente2', 'edoardo@òaa.vg', 'asdpos', '2020-04-23 12:23:34');
INSERT INTO "public"."users" VALUES (10, 'edoardo4', 'edoardo2', 'e@a.vg', 'asdpo', '2020-04-22 12:46:08');
INSERT INTO "public"."users" VALUES (11, 'edoardo5', 'edoardo3', 'e@b.vg', 'apsdopod', '2020-04-22 12:46:07');
INSERT INTO "public"."users" VALUES (12, 'edoardo6', 'edoardo5', 'e@c.vg', 'psadospdo', '2020-04-22 12:59:54');
INSERT INTO "public"."users" VALUES (13, 'tet', 'testt1', 'edoardo@edo.vg', 'asd', '2020-04-22 12:10:20');
INSERT INTO "public"."users" VALUES (7, 'edoardo', 'testutente', 'edoardo@test.vg', '$2y$10$1jxprpOOgwlZTNgr.gCvu.eYvoKg1HW3Lup/LVQLQV5nJoiqphC6K', '2020-05-01 11:33:24');
INSERT INTO "public"."users" VALUES (14, 'edoardo', 'edoardo23', 'test@test.vgg', '$2y$10$JUgwrV3jTaB9e6Dx7kBP8OkxdqReMSNLI4Z28ngycI6IWLkFOJJqu', '2020-05-01 20:08:37.403206');

