--
-- PostgreSQL database dump
--

-- Dumped from database version 11.6
-- Dumped by pg_dump version 11.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: news-aggregator; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "news-aggregator" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_El Salvador.1252' LC_CTYPE = 'Spanish_El Salvador.1252';


ALTER DATABASE "news-aggregator" OWNER TO postgres;

\connect -reuse-previous=on "dbname='news-aggregator'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: article; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.article (
    "articleId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "webUrl" character varying NOT NULL
);


ALTER TABLE public.article OWNER TO postgres;

--
-- Name: new; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.new (
    "newId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "webUrl" character varying NOT NULL
);


ALTER TABLE public.new OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    username character varying(200) NOT NULL,
    password character varying(300) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "modifiedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userId" uuid DEFAULT public.uuid_generate_v4() NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: users_to_articles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_to_articles (
    "usersToArticlesId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "savedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userUserId" uuid,
    "articleArticleId" uuid
);


ALTER TABLE public.users_to_articles OWNER TO postgres;

--
-- Name: users_to_news; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_to_news (
    "usersToNewsId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "savedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "userUserId" uuid,
    "articleNewId" uuid
);


ALTER TABLE public.users_to_news OWNER TO postgres;

--
-- Data for Name: article; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.article ("articleId", "webUrl") FROM stdin;
14edc9f4-f731-4c0a-a29d-984d812186a8	https://www.engadget.com/2019/12/04/serato-studio-music-production-software-dj-edit-tool/
41472670-045f-49de-bfbf-197076edf76a	https://www.engadget.com/2019/12/04/serato-studio-music-production-software-dj-edit-tool
4a4c7c90-ce4a-4ced-903c-f4babf00f6a0	https://www.engadget.com/2019/serato-studio-music-production-software-dj-edit-tool
5f276560-89e4-45ae-ba24-d6fbb9667016	https://www.engadget.com/2019/serato--music-production-software-dj-edit-tool
2f6eae7d-a8ff-4843-a209-419ca590345d	https://www.engadget.com/2019/-music-production-software-dj-edit-tool
b0125969-7f46-4fa2-ae33-9d635002c685	www.google.com
\.


--
-- Data for Name: new; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.new ("newId", "webUrl") FROM stdin;
0beae3f1-3829-4aaf-bfe7-f22a227053e0	https://www.engadget.com/2019/12/04/serato-studio-music-production-software-dj-edit-tool/
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (username, password, "createdAt", "modifiedAt", "userId") FROM stdin;
Antonio Mata	$2a$10$ohtd1tAmlh2SLaRaePFjIuNQAo6ENH5rv82d8gGUtCb5b6ImMMgQO	2019-12-25 19:15:33.947645	2019-12-25 19:15:33.947645	e7e5eda0-deed-4196-b9b7-2a63477ffa23
Arely Viana	$2a$10$xZXZDIhUwdznRMtmmLG7Ru50jYSFMmrqZumRpvI3W.bp8XsLmD7Vy	2019-12-27 09:37:28.042353	2019-12-27 09:37:28.042353	6ce65411-45d5-47da-8a19-105172b6d336
\.


--
-- Data for Name: users_to_articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_to_articles ("usersToArticlesId", "savedAt", "userUserId", "articleArticleId") FROM stdin;
f608c3ad-1e03-47eb-8039-44eed853870c	2019-12-27 00:15:58.616013	e7e5eda0-deed-4196-b9b7-2a63477ffa23	14edc9f4-f731-4c0a-a29d-984d812186a8
795f65ed-48de-4bdf-90ca-f7fe36f368fb	2019-12-27 00:52:14.956593	e7e5eda0-deed-4196-b9b7-2a63477ffa23	41472670-045f-49de-bfbf-197076edf76a
11a22221-ae43-4cf7-a3d1-be5046f3ea1d	2019-12-27 00:57:44.845068	e7e5eda0-deed-4196-b9b7-2a63477ffa23	4a4c7c90-ce4a-4ced-903c-f4babf00f6a0
5a46df5f-faee-408c-a1d9-4dedfa695a11	2019-12-27 01:01:27.683243	e7e5eda0-deed-4196-b9b7-2a63477ffa23	5f276560-89e4-45ae-ba24-d6fbb9667016
9b2f8f6c-77ce-465e-82b5-14d6632aa863	2019-12-27 01:10:22.204567	e7e5eda0-deed-4196-b9b7-2a63477ffa23	2f6eae7d-a8ff-4843-a209-419ca590345d
b2275af2-5933-4084-9bc9-3191fae87888	2019-12-27 09:40:18.315505	e7e5eda0-deed-4196-b9b7-2a63477ffa23	b0125969-7f46-4fa2-ae33-9d635002c685
234a1f54-73f1-46d5-b50a-a91195240fb7	2019-12-27 10:48:23.916596	6ce65411-45d5-47da-8a19-105172b6d336	b0125969-7f46-4fa2-ae33-9d635002c685
\.


--
-- Data for Name: users_to_news; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_to_news ("usersToNewsId", "savedAt", "userUserId", "articleNewId") FROM stdin;
0b8e6bc5-46aa-4fa2-a598-b5fb5ce1f4f4	2019-12-26 22:05:20.645691	e7e5eda0-deed-4196-b9b7-2a63477ffa23	0beae3f1-3829-4aaf-bfe7-f22a227053e0
\.


--
-- Name: new PK_93fc29511522a37b37cebb44031; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.new
    ADD CONSTRAINT "PK_93fc29511522a37b37cebb44031" PRIMARY KEY ("newId");


--
-- Name: users_to_news PK_ca11f50879676d9a1b2e45a84ec; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_to_news
    ADD CONSTRAINT "PK_ca11f50879676d9a1b2e45a84ec" PRIMARY KEY ("usersToNewsId");


--
-- Name: user PK_d72ea127f30e21753c9e229891e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId");


--
-- Name: users_to_articles PK_de313eb8866a0676ab3df09f019; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_to_articles
    ADD CONSTRAINT "PK_de313eb8866a0676ab3df09f019" PRIMARY KEY ("usersToArticlesId");


--
-- Name: article PK_ee6426f930999e7fcba40f6c574; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.article
    ADD CONSTRAINT "PK_ee6426f930999e7fcba40f6c574" PRIMARY KEY ("articleId");


--
-- Name: user UQ_78a916df40e02a9deb1c4b75edb; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username);


--
-- Name: users_to_news FK_02817f4ab57f30ae137212dabb1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_to_news
    ADD CONSTRAINT "FK_02817f4ab57f30ae137212dabb1" FOREIGN KEY ("articleNewId") REFERENCES public.new("newId");


--
-- Name: users_to_articles FK_141617bdebea7d0dc618393c114; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_to_articles
    ADD CONSTRAINT "FK_141617bdebea7d0dc618393c114" FOREIGN KEY ("userUserId") REFERENCES public."user"("userId");


--
-- Name: users_to_articles FK_3aade6603bf0e4d5ffbda85789c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_to_articles
    ADD CONSTRAINT "FK_3aade6603bf0e4d5ffbda85789c" FOREIGN KEY ("articleArticleId") REFERENCES public.article("articleId");


--
-- Name: users_to_news FK_d18d286db2d1dc2d7286d3f0ad5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_to_news
    ADD CONSTRAINT "FK_d18d286db2d1dc2d7286d3f0ad5" FOREIGN KEY ("userUserId") REFERENCES public."user"("userId");


--
-- PostgreSQL database dump complete
--

