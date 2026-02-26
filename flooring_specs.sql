--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2026-02-26 11:42:22


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
-- TOC entry 227 (class 1259 OID 25085)
-- Name: flooring_specs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.flooring_specs (
    product_id integer NOT NULL,
    product_code text,
    product_code_ar text,
    width text,
    width_ar text,
    fabric_thickness text,
    fabric_thickness_ar text,
    fr_durability text,
    fr_durability_ar text,
    roll_length text,
    roll_length_ar text,
    weight text,
    weight_ar text,
    fr_certification text,
    fr_certification_ar text,
    custom_dye text,
    custom_dye_ar text
);


ALTER TABLE public.flooring_specs OWNER TO postgres;

--
-- TOC entry 4869 (class 0 OID 25085)
-- Dependencies: 227
-- Data for Name: flooring_specs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.flooring_specs (product_id, product_code, product_code_ar, width, width_ar, fabric_thickness, fabric_thickness_ar, fr_durability, fr_durability_ar, roll_length, roll_length_ar, weight, weight_ar, fr_certification, fr_certification_ar, custom_dye, custom_dye_ar) FROM stdin;
56	ACD001	ACD001	2m	2 متر	1.5mm	1.5 مم	Bfl-s1	Bfl-s1	30m	30 متر	2.5kg/m2	2.5 كغ/م²	EN 13501-1	EN 13501-1	Black / Grey	أسود / رمادي
57	WES001	WES001	2m	2 متر	2.5mm	2.5 مم	Bfl-s1	Bfl-s1	20m	20 متر	3.45kg/m2	3.45 كغ/م²	EN 13501-1	EN 13501-1	Black / Grey	أسود / رمادي
58	JMT001	JMT001	2m	2 متر	1.2mm	1.2 مم	Bfl-s1	Bfl-s1	35m	35 متر	1.8kg/m2	1.8 كغ/م²	EN 13501-1	EN 13501-1	Black / Grey	أسود / رمادي
59	JMTG01	JMTG01	2m	2 متر	1.2mm	1.2 مم	Bfl-s1	Bfl-s1	35m	35 متر	1.8kg/m2	1.8 كغ/م²	EN 13501-1	EN 13501-1	Black / Grey	أسود / رمادي
60	JMTM01	JMTM01	2m	2 متر	1.2mm	1.2 مم	Bfl-s1	Bfl-s1	20m	20 متر	2.2kg/m2	2.2 كغ/م²	EN 13501-1	EN 13501-1	Black / Grey	أسود / رمادي
\.


--
-- TOC entry 4724 (class 2606 OID 25091)
-- Name: flooring_specs flooring_specs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flooring_specs
    ADD CONSTRAINT flooring_specs_pkey PRIMARY KEY (product_id);


--
-- TOC entry 4725 (class 2606 OID 25092)
-- Name: flooring_specs flooring_specs_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flooring_specs
    ADD CONSTRAINT flooring_specs_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);


-- Completed on 2026-02-26 11:42:22

--
-- PostgreSQL database dump complete
--

