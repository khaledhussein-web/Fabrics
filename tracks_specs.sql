--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2026-02-26 12:17:32

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 232 (class 1259 OID 25134)
-- Name: tracks_specs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tracks_specs (
    photo_id integer NOT NULL,
    product_id integer,
    photo_url text,
    alt_text text,
    alt_text_ar text
);


ALTER TABLE public.tracks_specs OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 25133)
-- Name: product_photos_photo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_photos_photo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_photos_photo_id_seq OWNER TO postgres;

--
-- TOC entry 4877 (class 0 OID 0)
-- Dependencies: 231
-- Name: product_photos_photo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_photos_photo_id_seq OWNED BY public.tracks_specs.photo_id;


--
-- TOC entry 4723 (class 2604 OID 25137)
-- Name: tracks_specs photo_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tracks_specs ALTER COLUMN photo_id SET DEFAULT nextval('public.product_photos_photo_id_seq'::regclass);


--
-- TOC entry 4871 (class 0 OID 25134)
-- Dependencies: 232
-- Data for Name: tracks_specs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tracks_specs (photo_id, product_id, photo_url, alt_text, alt_text_ar) FROM stdin;
1	18	/uploads/Tracks/details/img1.png?v=20260226	2Way Track system image	صورة نظام مسار 2Way
2	19	/uploads/Tracks/details/img2.png?v=20260226	ChainTrack system image	صورة نظام ChainTrack
3	20	/uploads/Tracks/details/img3.png?v=20260226	Erail Track system image	صورة نظام مسار Erail
4	21	/uploads/Tracks/details/img4.png?v=20260226	UniBeam Track system image	صورة نظام مسار UniBeam
5	22	/uploads/Tracks/details/img5.png?v=20260226	UniTrack system image	صورة نظام UniTrack
\.


--
-- TOC entry 4878 (class 0 OID 0)
-- Dependencies: 231
-- Name: product_photos_photo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_photos_photo_id_seq', 5, true);


--
-- TOC entry 4725 (class 2606 OID 25141)
-- Name: tracks_specs product_photos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tracks_specs
    ADD CONSTRAINT product_photos_pkey PRIMARY KEY (photo_id);


--
-- TOC entry 4726 (class 2606 OID 25142)
-- Name: tracks_specs product_photos_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tracks_specs
    ADD CONSTRAINT product_photos_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);


-- Completed on 2026-02-26 12:17:32

--
-- PostgreSQL database dump complete
--

