--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2026-02-26 14:18:37

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
-- TOC entry 230 (class 1259 OID 25121)
-- Name: print_frame_specs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.print_frame_specs (
    product_id integer NOT NULL,
    profile_type text,
    profile_type_ar text,
    diameter text,
    diameter_ar text,
    length text,
    length_ar text,
    weight text,
    weight_ar text,
    material text,
    material_ar text
);


ALTER TABLE public.print_frame_specs OWNER TO postgres;

--
-- TOC entry 4869 (class 0 OID 25121)
-- Dependencies: 230
-- Data for Name: print_frame_specs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.print_frame_specs (product_id, profile_type, profile_type_ar, diameter, diameter_ar, length, length_ar, weight, weight_ar, material, material_ar) FROM stdin;
23	Single PrintFrame	إطار طباعة أحادي	26 x 46 mm	26 × 46 مم	6.00 m	6.00 م	0.89 kg	0.89 كغ	Aluminium	ألمنيوم
24	Double PrintFrame	إطار طباعة مزدوج	49 x 46 mm	49 × 46 مم	6.00 m	6.00 م	0.89 kg	0.89 كغ	Aluminium	ألمنيوم
25	Cube PrintFrame	إطار طباعة مكعب	\N	\N	6.00 m	6.00 م	1.19 kg	1.19 كغ	Aluminium	ألمنيوم
26	Quadro Profile	بروفايل كوادرو	50 x 50 mm	50 × 50 مم	6 m	6 م	1.99 kg/m	1.99 كغ/م	Aluminium	ألمنيوم
27	Hexa Profile	بروفايل هيكسا	48 x 48 mm	48 × 48 مم	6 m	6 م	1.92 kg/m	1.92 كغ/م	Aluminium	ألمنيوم
28	Keder Profile	بروفايل كيدر	\N	\N	6 m	6 م	0.94 kg/m	0.94 كغ/م	Aluminium	ألمنيوم
29	Disc Frame	إطار دائري	49 x 45 mm	49 × 45 مم	6 m	6 م	1.09 kg/m	1.09 كغ/م	Aluminium	ألمنيوم
30	Curved Frame	إطار منحني	49 x 45 mm	49 × 45 مم	6 m	6 م	1.09 kg/m	1.09 كغ/م	Aluminium	ألمنيوم
31	Custom Frame	إطار مخصص	\N	\N	Made to order	حسب الطلب	\N	\N	Aluminium	ألمنيوم
\.


--
-- TOC entry 4724 (class 2606 OID 25127)
-- Name: print_frame_specs print_frame_specs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.print_frame_specs
    ADD CONSTRAINT print_frame_specs_pkey PRIMARY KEY (product_id);


--
-- TOC entry 4725 (class 2606 OID 25128)
-- Name: print_frame_specs print_frame_specs_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.print_frame_specs
    ADD CONSTRAINT print_frame_specs_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);


-- Completed on 2026-02-26 14:18:37

--
-- PostgreSQL database dump complete
--

