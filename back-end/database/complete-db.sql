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

 Date: 04/05/2020 08:06:22
*/


-- ----------------------------
-- Sequence structure for chats_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."chats_id_seq";
CREATE SEQUENCE "public"."chats_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for chats_messages_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."chats_messages_id_seq";
CREATE SEQUENCE "public"."chats_messages_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for comments_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."comments_id_seq";
CREATE SEQUENCE "public"."comments_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for groupsMemberships_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."groupsMemberships_id_seq";
CREATE SEQUENCE "public"."groupsMemberships_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for groups_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."groups_id_seq";
CREATE SEQUENCE "public"."groups_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for invitations_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."invitations_id_seq";
CREATE SEQUENCE "public"."invitations_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for posts_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."posts_id_seq";
CREATE SEQUENCE "public"."posts_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for users_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."users_id_seq";
CREATE SEQUENCE "public"."users_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for chats
-- ----------------------------
DROP TABLE IF EXISTS "public"."chats";
CREATE TABLE "public"."chats" (
  "id" int4 NOT NULL DEFAULT nextval('chats_id_seq'::regclass),
  "group_id" int4 NOT NULL
)
;

-- ----------------------------
-- Records of chats
-- ----------------------------
INSERT INTO "public"."chats" VALUES (1, 7);
INSERT INTO "public"."chats" VALUES (2, 8);
INSERT INTO "public"."chats" VALUES (3, 9);

-- ----------------------------
-- Table structure for chats_messages
-- ----------------------------
DROP TABLE IF EXISTS "public"."chats_messages";
CREATE TABLE "public"."chats_messages" (
  "id" int4 NOT NULL DEFAULT nextval('chats_messages_id_seq'::regclass),
  "user_id" int4 NOT NULL,
  "chat_id" int4 NOT NULL,
  "message" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(6) NOT NULL
)
;

-- ----------------------------
-- Records of chats_messages
-- ----------------------------

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS "public"."comments";
CREATE TABLE "public"."comments" (
  "id" int4 NOT NULL DEFAULT nextval('comments_id_seq'::regclass),
  "user_id" int4 NOT NULL,
  "post_id" int4 NOT NULL,
  "comment_text" text COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(6) NOT NULL
)
;

-- ----------------------------
-- Records of comments
-- ----------------------------

-- ----------------------------
-- Table structure for groups
-- ----------------------------
DROP TABLE IF EXISTS "public"."groups";
CREATE TABLE "public"."groups" (
  "id" int4 NOT NULL DEFAULT nextval('groups_id_seq'::regclass),
  "description" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(6) NOT NULL,
  "group_title" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "group_owner" int4 NOT NULL
)
;

-- ----------------------------
-- Records of groups
-- ----------------------------
INSERT INTO "public"."groups" VALUES (6, '', '2020-05-03 20:49:46.425237', 'test', 1);
INSERT INTO "public"."groups" VALUES (7, '', '2020-05-03 20:50:56.603809', 'test', 1);
INSERT INTO "public"."groups" VALUES (8, '', '2020-05-04 07:57:13.532721', 'ab', 1);
INSERT INTO "public"."groups" VALUES (9, 'bb', '2020-05-04 07:58:29.647732', 'a', 1);

-- ----------------------------
-- Table structure for groupsMemberships
-- ----------------------------
DROP TABLE IF EXISTS "public"."groupsMemberships";
CREATE TABLE "public"."groupsMemberships" (
  "id" int4 NOT NULL DEFAULT nextval('"groupsMemberships_id_seq"'::regclass),
  "user_id" int4 NOT NULL,
  "group_id" int4 NOT NULL,
  "is_admin" bool DEFAULT false
)
;

-- ----------------------------
-- Records of groupsMemberships
-- ----------------------------
INSERT INTO "public"."groupsMemberships" VALUES (16, 1, 6, 't');
INSERT INTO "public"."groupsMemberships" VALUES (17, 1, 7, 't');
INSERT INTO "public"."groupsMemberships" VALUES (18, 1, 8, 't');
INSERT INTO "public"."groupsMemberships" VALUES (19, 1, 9, 't');

-- ----------------------------
-- Table structure for invitations
-- ----------------------------
DROP TABLE IF EXISTS "public"."invitations";
CREATE TABLE "public"."invitations" (
  "id" int4 NOT NULL DEFAULT nextval('invitations_id_seq'::regclass),
  "from_id" int4 NOT NULL,
  "to_id" int4 NOT NULL,
  "group_id" int4 NOT NULL,
  "invited_at" timestamp(6) NOT NULL,
  "is_read" bool NOT NULL DEFAULT false
)
;

-- ----------------------------
-- Records of invitations
-- ----------------------------

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS "public"."posts";
CREATE TABLE "public"."posts" (
  "id" int4 NOT NULL DEFAULT nextval('posts_id_seq'::regclass),
  "user_id" int4 NOT NULL,
  "group_id" int4 NOT NULL,
  "file_uploaded" json,
  "post_text" text COLLATE "pg_catalog"."default",
  "created_at" timestamp(6) NOT NULL
)
;

-- ----------------------------
-- Records of posts
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
  "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
  "realname" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "username" varchar(25) COLLATE "pg_catalog"."default" NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "created_at" timestamp(6) NOT NULL
)
;

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

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."chats_id_seq"
OWNED BY "public"."chats"."id";
SELECT setval('"public"."chats_id_seq"', 4, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."chats_messages_id_seq"
OWNED BY "public"."chats_messages"."id";
SELECT setval('"public"."chats_messages_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."comments_id_seq"
OWNED BY "public"."comments"."id";
SELECT setval('"public"."comments_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."groupsMemberships_id_seq"
OWNED BY "public"."groupsMemberships"."id";
SELECT setval('"public"."groupsMemberships_id_seq"', 20, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."groups_id_seq"
OWNED BY "public"."groups"."id";
SELECT setval('"public"."groups_id_seq"', 10, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."invitations_id_seq"
OWNED BY "public"."invitations"."id";
SELECT setval('"public"."invitations_id_seq"', 17, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."posts_id_seq"
OWNED BY "public"."posts"."id";
SELECT setval('"public"."posts_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."users_id_seq"
OWNED BY "public"."users"."id";
SELECT setval('"public"."users_id_seq"', 15, true);

-- ----------------------------
-- Primary Key structure for table chats
-- ----------------------------
ALTER TABLE "public"."chats" ADD CONSTRAINT "chats_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table chats_messages
-- ----------------------------
ALTER TABLE "public"."chats_messages" ADD CONSTRAINT "chats_messages_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table comments
-- ----------------------------
ALTER TABLE "public"."comments" ADD CONSTRAINT "comments_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table groups
-- ----------------------------
ALTER TABLE "public"."groups" ADD CONSTRAINT "groups_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table groupsMemberships
-- ----------------------------
ALTER TABLE "public"."groupsMemberships" ADD CONSTRAINT "uniqueuserandgroupmember" UNIQUE ("user_id", "group_id");

-- ----------------------------
-- Primary Key structure for table groupsMemberships
-- ----------------------------
ALTER TABLE "public"."groupsMemberships" ADD CONSTRAINT "groupsMemberships_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table invitations
-- ----------------------------
ALTER TABLE "public"."invitations" ADD CONSTRAINT "uniqueInvitation" UNIQUE ("from_id", "to_id", "group_id");
COMMENT ON CONSTRAINT "uniqueInvitation" ON "public"."invitations" IS 'controlla che sia unico l''invito per quel determinato gruppo
';

-- ----------------------------
-- Checks structure for table invitations
-- ----------------------------
ALTER TABLE "public"."invitations" ADD CONSTRAINT "checkToIdOneId" CHECK (to_id <> from_id);

-- ----------------------------
-- Primary Key structure for table invitations
-- ----------------------------
ALTER TABLE "public"."invitations" ADD CONSTRAINT "invitations_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table posts
-- ----------------------------
ALTER TABLE "public"."posts" ADD CONSTRAINT "posts_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "emailUser" UNIQUE ("email");
ALTER TABLE "public"."users" ADD CONSTRAINT "usernameUser" UNIQUE ("username");

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table chats
-- ----------------------------
ALTER TABLE "public"."chats" ADD CONSTRAINT "groupIdchats" FOREIGN KEY ("group_id") REFERENCES "public"."groups" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table chats_messages
-- ----------------------------
ALTER TABLE "public"."chats_messages" ADD CONSTRAINT "userIdMessage" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table comments
-- ----------------------------
ALTER TABLE "public"."comments" ADD CONSTRAINT "postIdComment" FOREIGN KEY ("post_id") REFERENCES "public"."posts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."comments" ADD CONSTRAINT "userIdComment" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table groups
-- ----------------------------
ALTER TABLE "public"."groups" ADD CONSTRAINT "group_owner_id" FOREIGN KEY ("group_owner") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table groupsMemberships
-- ----------------------------
ALTER TABLE "public"."groupsMemberships" ADD CONSTRAINT "groupIdGroup" FOREIGN KEY ("group_id") REFERENCES "public"."groups" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."groupsMemberships" ADD CONSTRAINT "userIdGroup" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table invitations
-- ----------------------------
ALTER TABLE "public"."invitations" ADD CONSTRAINT "groupId" FOREIGN KEY ("group_id") REFERENCES "public"."groups" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."invitations" ADD CONSTRAINT "userOneId" FOREIGN KEY ("from_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."invitations" ADD CONSTRAINT "userTwoId" FOREIGN KEY ("to_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table posts
-- ----------------------------
ALTER TABLE "public"."posts" ADD CONSTRAINT "groupIdPost" FOREIGN KEY ("group_id") REFERENCES "public"."groups" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."posts" ADD CONSTRAINT "userIdPost" FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
