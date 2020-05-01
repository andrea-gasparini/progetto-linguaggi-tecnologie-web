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

 Date: 01/05/2020 16:03:15
*/

-- ----------------------------
-- Records of groups
-- ----------------------------
INSERT INTO "public"."groups" VALUES (1, '1', '2020-04-22 09:15:14');


-- ----------------------------
-- Records of groupsMemberships
-- ----------------------------
INSERT INTO "public"."groupsMemberships" VALUES (1, 1, 1, 't');


-- ----------------------------
-- Records of invitations
-- ----------------------------
INSERT INTO "public"."invitations" VALUES (5, 1, 13, 1, '2020-04-30 10:04:13.93307', 'f');
INSERT INTO "public"."invitations" VALUES (1, 1, 7, 1, '2020-05-01 16:01:59.371104', 'f');
INSERT INTO "public"."invitations" VALUES (3, 1, 8, 1, '2020-05-01 16:01:59.373388', 'f');
INSERT INTO "public"."invitations" VALUES (2, 1, 10, 1, '2020-05-01 16:01:59.374301', 'f');
INSERT INTO "public"."invitations" VALUES (4, 1, 12, 1, '2020-05-01 16:01:59.375482', 'f');
INSERT INTO "public"."invitations" VALUES (6, 1, 11, 1, '2020-05-01 16:01:59.377059', 'f');


-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO "public"."users" VALUES (1, 'edoardo', 'edoardo', 'test@test.vg', '$2y$10$1jxprpOOgwlZTNgr.gCvu.eYvoKg1HW3Lup/LVQLQV5nJoiqphC6K', '2020-04-23 17:17:16');
INSERT INTO "public"."users" VALUES (7, 'edoardo', 'testutente', 'edoardo@test.vg', 'asdasd', '2020-05-01 11:33:24');
INSERT INTO "public"."users" VALUES (8, 'edoardo3', 'testutente2', 'edoardo@òaa.vg', 'asdpos', '2020-04-23 12:23:34');
INSERT INTO "public"."users" VALUES (10, 'edoardo4', 'edoardo2', 'e@a.vg', 'asdpo', '2020-04-22 12:46:08');
INSERT INTO "public"."users" VALUES (11, 'edoardo5', 'edoardo3', 'e@b.vg', 'apsdopod', '2020-04-22 12:46:07');
INSERT INTO "public"."users" VALUES (12, 'edoardo6', 'edoardo5', 'e@c.vg', 'psadospdo', '2020-04-22 12:59:54');
INSERT INTO "public"."users" VALUES (13, 'tet', 'testt1', 'edoardo@edo.vg', 'asd', '2020-04-22 12:10:20');

