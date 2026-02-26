--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2026-02-26 11:36:52

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
-- TOC entry 228 (class 1259 OID 25097)
-- Name: projection_specs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projection_specs (
    product_id integer NOT NULL,
    product_code text,
    product_code_ar text,
    roll_length text,
    roll_length_ar text,
    width text,
    width_ar text,
    weight text,
    weight_ar text,
    fr_durability text,
    fr_durability_ar text,
    fr_certification text,
    fr_certification_ar text,
    custom_dye text,
    custom_dye_ar text,
    perfect_for text,
    perfect_for_ar text,
    gain text,
    gain_ar text,
    transmittance text,
    transmittance_ar text
);


ALTER TABLE public.projection_specs OWNER TO postgres;

--
-- TOC entry 4869 (class 0 OID 25097)
-- Dependencies: 228
-- Data for Name: projection_specs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projection_specs (product_id, product_code, product_code_ar, roll_length, roll_length_ar, width, width_ar, weight, weight_ar, fr_durability, fr_durability_ar, fr_certification, fr_certification_ar, custom_dye, custom_dye_ar, perfect_for, perfect_for_ar, gain, gain_ar, transmittance, transmittance_ar) FROM stdin;
62	PVC055	PVC055	approx. 60m / 197ft	تقريباً 60 م / 197 قدم	220cm / 87"	220 سم / 87 بوصة	500gsm	500 جم/م²	DFR	DFR	BS5867	BS5867	\N	\N	Dual Projection	إسقاط مزدوج	0.5	0.5	0.45	0.45
63	PVC059	PVC059	approx. 60m / 197ft	تقريباً 60 م / 197 قدم	220cm / 87"	220 سم / 87 بوصة	500gsm	500 جم/م²	DFR	DFR	BS5867	BS5867	\N	\N	Rear Projection	إسقاط خلفي	0.25	0.25	0.45	0.45
64	PVC044	PVC044	approx. 50m / 164ft	تقريباً 50 م / 164 قدم	230cm / 90"	230 سم / 90 بوصة	500gsm	500 جم/م²	DFR	DFR	BS5867	BS5867	\N	\N	Front Projection	إسقاط أمامي	1.0	1.0	N/A	غير متاح
65	PVC042	PVC042	approx. 60m / 197ft	تقريباً 60 م / 197 قدم	220cm / 87"	220 سم / 87 بوصة	500gsm	500 جم/م²	DFR	DFR	BS5867	BS5867	\N	\N	Rear Projection	إسقاط خلفي	0.3	0.3	0.65	0.65
66	PVC030	PVC030	approx. 60m / 197ft	تقريباً 60 م / 197 قدم	220cm / 87"	220 سم / 87 بوصة	500gsm	500 جم/م²	DFR	DFR	BS5867	BS5867	\N	\N	Rear Projection	إسقاط خلفي	0.3	0.3	2.05	2.05
67	PVC048	PVC048	approx. 50m / 164ft	تقريباً 50 م / 164 قدم	137cm / 54"	137 سم / 54 بوصة	500gsm	500 جم/م²	DFR	DFR	BS5867	BS5867	\N	\N	Dual Projection	إسقاط مزدوج	\N	\N	\N	\N
68	PVC064	PVC064	approx. 60m / 197ft	تقريباً 60 م / 197 قدم	240cm / 94"	240 سم / 94 بوصة	500gsm	500 جم/م²	DFR	DFR	BS5867	BS5867	\N	\N	Dual Projection	إسقاط مزدوج	0.5	0.5	0.75	0.75
\.


--
-- TOC entry 4724 (class 2606 OID 25103)
-- Name: projection_specs projection_specs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projection_specs
    ADD CONSTRAINT projection_specs_pkey PRIMARY KEY (product_id);


--
-- TOC entry 4725 (class 2606 OID 25104)
-- Name: projection_specs projection_specs_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projection_specs
    ADD CONSTRAINT projection_specs_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);


-- Completed on 2026-02-26 11:36:52

--
-- PostgreSQL database dump complete
--

