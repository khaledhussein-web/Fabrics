--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2026-02-26 14:19:45

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
-- TOC entry 229 (class 1259 OID 25109)
-- Name: fabric_specs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fabric_specs (
    product_id integer NOT NULL,
    product_code text,
    product_code_ar text,
    width text,
    width_ar text,
    roll_length text,
    roll_length_ar text,
    weight text,
    weight_ar text,
    fabric_type text,
    fabric_type_ar text,
    fr_durability text,
    fr_durability_ar text,
    fr_certification text,
    fr_certification_ar text,
    custom_dye text,
    custom_dye_ar text
);


ALTER TABLE public.fabric_specs OWNER TO postgres;

--
-- TOC entry 4869 (class 0 OID 25109)
-- Dependencies: 229
-- Data for Name: fabric_specs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fabric_specs (product_id, product_code, product_code_ar, width, width_ar, roll_length, roll_length_ar, weight, weight_ar, fabric_type, fabric_type_ar, fr_durability, fr_durability_ar, fr_certification, fr_certification_ar, custom_dye, custom_dye_ar) FROM stdin;
74	MOL046	MOL046	300cm/118"	300cm/118"	\N	\N	320 gsmgsm	320 gsmgsm	\N	\N	NDFR	NDFR	BS5867, B1, EN13501-1, M1	BS5867, B1, EN13501-1, M1	N/A	N/A
77	WS100	WS100	150cm / 59"	150cm / 59"	approx. 57m / 187ft	approx. 57m / 187ft	420gsm	420gsm	\N	\N	IFR	IFR	BS5867	BS5867	N/A	N/A
78	WS090	WS090	150cm / 59"	150cm / 59"	approx. 57m / 187ft	approx. 57m / 187ft	565gsm	565gsm	\N	\N	IFR	IFR	BS5867, NFPA 701, IMO, AS1530.2/3	BS5867, NFPA 701, IMO, AS1530.2/3	N/A	N/A
79	WS041	WS041	150cm / 59"	150cm / 59"	approx. 57m / 187ft	approx. 57m / 187ft	650gsm	650gsm	\N	\N	IFR	IFR	BS5867	BS5867	N/A	N/A
80	WS022	WS022	150cm / 59"	150cm / 59"	approx. 38m / 125ft	approx. 38m / 125ft	800gsm	800gsm	\N	\N	IFR	IFR	BS5867	BS5867	N/A	N/A
81	WS018	WS018	150cm / 59"	150cm / 59"	approx. 51m / 167ft	approx. 51m / 167ft	500gsm	500gsm	\N	\N	IFR	IFR	BS5867, IMO	BS5867, IMO	Custom Dye - POA 4wk lead time, MOQ 2 rolls	Custom Dye - POA 4wk lead time, MOQ 2 rolls
82	MOL030	MOL030	300cm / 118"	300cm / 118"	\N	\N	500gsm	500gsm	\N	\N	NDFR	NDFR	B55867, B1	B55867, B1	N/A	N/A
83	ACT001	ACT001	260cm / 102"	260cm / 102"	\N	\N	140gsm	140gsm	\N	\N	NDFR	NDFR	BS5867, B1, EN13773, EN13501-1	BS5867, B1, EN13773, EN13501-1	N/A	N/A
84	BT005	BT005	122cm / 48"	122cm / 48"	approx. 50m / 164ft	approx. 50m / 164ft	250gsm	250gsm	\N	\N	NDFR	NDFR	BS5867	BS5867	N/A	N/A
85	BT014	BT014	150cm / 59"	150cm / 59"	approx. 50m / 164ft	approx. 50m / 164ft	250gsm	250gsm	\N	\N	NDFR	NDFR	BS5867	BS5867	N/A	N/A
86	DIM020	DIM020	150cm / 59"	150cm / 59"	approx. 50m / 164ft	approx. 50m / 164ft	280gsm	280gsm	\N	\N	IFR	IFR	BS5867	BS5867	N/A	N/A
87	LIN006	LIN006	137cm / 54"	137cm / 54"	approx. 50m / 164ft	approx. 50m / 164ft	300gsm	300gsm	\N	\N	DFR	DFR	BS5867	BS5867	N/A	N/A
88	LIN021	LIN021	280cm / 110"	280cm / 110"	approx. 40m / 131ft	approx. 40m / 131ft	280gsm	280gsm	\N	\N	DFR	DFR	BS5867	BS5867	N/A	N/A
89	INT002	INT002	137cm / 54"	137cm / 54"	approx. 45m / 148ft	approx. 45m / 148ft	370gsm	370gsm	\N	\N	NDFR	NDFR	BS5867	BS5867	N/A	N/A
90	MOL010	MOL010	300cm / 118"	300cm / 118"	\N	\N	350gsm	350gsm	\N	\N	IFR	IFR	BS5867, EN13501-1	BS5867, EN13501-1	N/A	N/A
91	MER010	MER010	150cm / 59"	150cm / 59"	approx. 50m / 164ft	approx. 50m / 164ft	255gsm	255gsm	\N	\N	IFR	IFR	BS5867, M1, B1, EN13773, Classe Uno, NFPA 701, IMO	BS5867, M1, B1, EN13773, Classe Uno, NFPA 701, IMO	N/A	N/A
92	MER045	MER045	300cm / 118"	300cm / 118"	approx. 30m / 98ft	approx. 30m / 98ft	255gsm	255gsm	\N	\N	IFR	IFR	BS5867, M1, B1, EN13773, Classe Uno, NFPA 701, IMO	BS5867, M1, B1, EN13773, Classe Uno, NFPA 701, IMO	N/A	N/A
95	MOL028	MOL028	300cm / 118"	300cm / 118"	\N	\N	260gsm	260gsm	\N	\N	NDFR	NDFR	BS5867, M1, B1, EN13501-1	BS5867, M1, B1, EN13501-1	Custom Dye - POA, 4wk lead time, MOQ 500m	Custom Dye - POA, 4wk lead time, MOQ 500m
96	MOL021	MOL021	300cm / 118"	300cm / 118"	\N	\N	320gsm	320gsm	\N	\N	NDFR	NDFR	BS5867, M1, B1, EN13501-1	BS5867, M1, B1, EN13501-1	Custom Dye - POA, 4wk lead time, MOQ 500m	Custom Dye - POA, 4wk lead time, MOQ 500m
97	MOL001	MOL001	200cm / 79"	200cm / 79"	approx. 60m / 197ft	approx. 60m / 197ft	320gsm	320gsm	\N	\N	NDFR	NDFR	B55867, M1, B1, EN13501-1	B55867, M1, B1, EN13501-1	N/A	N/A
98	MOL003	MOL003	300cm / 118"	300cm / 118"	\N	\N	320gsm	320gsm	\N	\N	NDFR	NDFR	B55867, M1, B1, EN13501-1	B55867, M1, B1, EN13501-1	N/A	N/A
99	MOL042	MOL042	400cm /157"	400cm /157"	\N	\N	320gsm	320gsm	\N	\N	NDFR	NDFR	B55867, M1, B1	B55867, M1, B1	N/A	N/A
100	LIN002	LIN002	137cm / 54"	137cm / 54"	approx. 80m / 262ft	approx. 80m / 262ft	150gsm	150gsm	\N	\N	NDFR	NDFR	BS5867	BS5867	N/A	N/A
101	COM001	COM001	137cm / 54"	137cm / 54"	approx. 91m / 299ft	approx. 91m / 299ft	400gsm	400gsm	\N	\N	NDFR	NDFR	BS5867, M1, B1, EN13773, EN13501-1	BS5867, M1, B1, EN13773, EN13501-1	N/A	N/A
102	WAD001	WAD001	150cm / 59"	150cm / 59"	approx. 20m / 66ft	approx. 20m / 66ft	205gsm	205gsm	\N	\N	DFR	DFR	BS5867, BS5852	BS5867, BS5852	N/A	N/A
103	WS018	WS018	150cm / 59"	150cm / 59"	approx. 51m / 167ft	approx. 51m / 167ft	500gsm	500gsm	\N	\N	IFR	IFR	BS5867, IMO	BS5867, IMO	Custom Dye - POA 4wk lead time, MOQ 2 rolls	Custom Dye - POA 4wk lead time, MOQ 2 rolls
104	DIG005	DIG005	183cm / 72"	183cm / 72"	approx. 50m / 164ft	approx. 50m / 164ft	230gsm	230gsm	\N	\N	NDFR	NDFR	BS5867	BS5867	N/A	N/A
106	MOL003	MOL003	300cm / 118"	300cm / 118"	\N	\N	320gsm	320gsm	\N	\N	NDFR	NDFR	B55867, M1, B1, EN13501-1	B55867, M1, B1, EN13501-1	N/A	N/A
113	CS005	CS005	140cm / 55"	140cm / 55"	approx. 50m / 164ft	approx. 50m / 164ft	278gsm	278gsm	\N	\N	NDFR	NDFR	BS5867	BS5867	N/A	N/A
114	DEK031	DEK031	300cm / 118"	300cm / 118"	\N	\N	160gsm	160gsm	\N	\N	NDFR	NDFR	BS5867, M1, B1, EN13773, EN13501-1	BS5867, M1, B1, EN13773, EN13501-1	N/A	N/A
115	DF001	DF001	183cm / 72"	183cm / 72"	approx. 60m / 197ft	approx. 60m / 197ft	150gsm	150gsm	\N	\N	NDFR	NDFR	BS5867, EN13501-1	BS5867, EN13501-1	N/A	N/A
116	GLM005	GLM005	112cm / 44"	112cm / 44"	approx. 30m / 98ft	approx. 30m / 98ft	120gsm	120gsm	\N	\N	NDFR	NDFR	BS5867, B1	BS5867, B1	N/A	N/A
117	GLI014	GLI014	147cm / 58"	147cm / 58"	approx. 20m / 65ft	approx. 20m / 65ft	890gsm	890gsm	\N	\N	Not FR	Not FR	N/A	N/A	N/A	N/A
118	LEA015	LEA015	137cm / 54"	137cm / 54"	approx. 25m / 82ft	approx. 25m / 82ft	650gsm	650gsm	\N	\N	DFR	DFR	BS5867, BS5852	BS5867, BS5852	N/A	N/A
119	LL001	LL001	145cm / 57"	145cm / 57"	approx. 116m / 381ft	approx. 116m / 381ft	125gsm	125gsm	\N	\N	NDFR	NDFR	BS5867	BS5867	N/A	N/A
120	PVF004	PVF004	130cm / 51"	130cm / 51"	approx. 30m / 98ft	approx. 30m / 98ft	260gsm	260gsm	\N	\N	FR	FR	BS5867, BS476	BS5867, BS476	N/A	N/A
123	KLM014	KLM014	130cm / 51"	130cm / 51"	approx. 50m / 164ft	approx. 50m / 164ft	240gsm	240gsm	\N	\N	DFR	DFR	BS5867, EN13501-1	BS5867, EN13501-1	N/A	N/A
124	LGR003	LGR003	137cm / 54"	137cm / 54"	approx. 50m / 164ft	approx. 50m / 164ft	330gsm	330gsm	\N	\N	DFR	DFR	BS5867	BS5867	N/A	N/A
125	RS011	RS011	150cm / 59"	150cm / 59"	approx. 100m / 328ft	approx. 100m / 328ft	62gsm	62gsm	\N	\N	FR	FR	BS5867	BS5867	N/A	N/A
126	RS020	RS020	310cm / 122"	310cm / 122"	approx. 100m / 328ft	approx. 100m / 328ft	65gsm	65gsm	\N	\N	FR	FR	BS5867, EN13501-1	BS5867, EN13501-1	N/A	N/A
127	SLD000	SLD000	91cm / 36"	91cm / 36"	approx. Varies	approx. Varies	Varies gsm	Varies gsm	\N	\N	FR	FR	BS5867, M1	BS5867, M1	N/A	N/A
129	PAF001	PAF001	310cm / 122"	310cm / 122"	approx. 30m / 98ft	approx. 30m / 98ft	110gsm	110gsm	\N	\N	NDFR	NDFR	EN13501-1	EN13501-1	Print	Print
130	PBL001	PBL001	500cm / 197"	500cm / 197"	approx. 30m / 98ft	approx. 30m / 98ft	170gsm	170gsm	\N	\N	NDFR	NDFR	EN13501-1	EN13501-1	Print	Print
131	PBA001	PBA001	500cm / 197"	500cm / 197"	approx. 30m / 98ft	approx. 30m / 98ft	440gsm	440gsm	\N	\N	NDFR	NDFR	N/A	N/A	Print	Print
132	PBB001	PBB001	500cm / 197"	500cm / 197"	approx. 30m / 98ft	approx. 30m / 98ft	210gsm	210gsm	\N	\N	NDFR	NDFR	EN13501-1	EN13501-1	Print	Print
133	PCA001	PCA001	1200cm / 472"	1200cm / 472"	approx. 50m / 164ft	approx. 50m / 164ft	280gsm	280gsm	\N	\N	NDFR	NDFR	N/A	N/A	Print	Print
134	PCG001	PCG001	500cm / 197"	500cm / 197"	approx. 30m / 98ft	approx. 30m / 98ft	150gsm	150gsm	\N	\N	NDFR	NDFR	EN13501-1	EN13501-1	Print	Print
135	PDN001	PDN001	1200cm / 472"	1200cm / 472"	approx. 50m / 164ft	approx. 50m / 164ft	280gsm	280gsm	\N	\N	NDFR	NDFR	B1	B1	Print	Print
136	PDP001	PDP001	500cm / 197"	500cm / 197"	approx. 30m / 98ft	approx. 30m / 98ft	190gsm	190gsm	\N	\N	NDFR	NDFR	EN13501-1	EN13501-1	Print	Print
137	PFC001	PFC001	975cm / 384"	975cm / 384"	approx. 50m / 164ft	approx. 50m / 164ft	250gsm	250gsm	\N	\N	NDFR	NDFR	B1	B1	Print	Print
138	PFL001	PFL001	500cm / 197"	500cm / 197"	approx. 30m / 98ft	approx. 30m / 98ft	90gsm	90gsm	\N	\N	NDFR	NDFR	EN13501-1	EN13501-1	Print	Print
139	PGA001	PGA001	1120cm / 441"	1120cm / 441"	approx. 50m / 164ft	approx. 50m / 164ft	125gsm	125gsm	\N	\N	NDFR	NDFR	M1, B1, EN13773	M1, B1, EN13773	Print	Print
140	PGS001	PGS001	310cm / 122"	310cm / 122"	approx. 30m / 98ft	approx. 30m / 98ft	125gsm	125gsm	\N	\N	NDFR	NDFR	EN13501-1	EN13501-1	Print	Print
141	PMU001	PMU001	1200cm / 472"	1200cm / 472"	approx. 50m / 164ft	approx. 50m / 164ft	70gsm	70gsm	\N	\N	NDFR	NDFR	EN13501-1	EN13501-1	Print	Print
142	PPG001	PPG001	300cm / 118"	300cm / 118"	approx. 100m / 328ft	approx. 100m / 328ft	130gsm	130gsm	\N	\N	FR	FR	EN13501-1	EN13501-1	Print	Print
143	PJM001	PJM001	195cm / 77"	195cm / 77"	approx. 22m / 72ft	approx. 22m / 72ft	1340gsm	1340gsm	\N	\N	DFR	DFR	BS4790, EN13501-1	BS4790, EN13501-1	Print	Print
144	PPV001	PPV001	500cm / 197"	500cm / 197"	approx. 30m / 98ft	approx. 30m / 98ft	270gsm	270gsm	\N	\N	NDFR	NDFR	EN13501-1, B1	EN13501-1, B1	Print	Print
145	PTC001	PTC001	500cm / 197"	500cm / 197"	approx. 30m / 98ft	approx. 30m / 98ft	340gsm	340gsm	\N	\N	NDFR	NDFR	EN13501-1	EN13501-1	Print	Print
146	PTR001	PTR001	500cm / 197"	500cm / 197"	approx. 30m / 98ft	approx. 30m / 98ft	190gsm	190gsm	\N	\N	NDFR	NDFR	EN13501-1	EN13501-1	Print	Print
147	PBL002	PBL002	500cm / 197"	500cm / 197"	approx. 30m / 98ft	approx. 30m / 98ft	450gsm	450gsm	\N	\N	NDFR	NDFR	B1	B1	Print	Print
148	PVV001	PVV001	150cm / 59"	150cm / 59"	approx. 55m / 180ft	approx. 55m / 180ft	300gsm	300gsm	\N	\N	IFR	IFR	BS5867, NFPA 701	BS5867, NFPA 701	Print	Print
149	PVO001	PVO001	310cm / 122"	310cm / 122"	approx. 30m / 98ft	approx. 30m / 98ft	52gsm	52gsm	\N	\N	NDFR	NDFR	B1	B1	Print	Print
150	MUS003	MUS003	122cm / 48"	122cm / 48"	approx. 200m / 656ft	approx. 200m / 656ft	50gsm	50gsm	\N	\N	NDFR	NDFR	BS5867	BS5867	N/A	N/A
151	CAL002	CAL002	183cm / 72"	183cm / 72"	approx. 50m / 164ft	approx. 50m / 164ft	190gsm	190gsm	\N	\N	NDFR	NDFR	BS5867	BS5867	N/A	N/A
152	CAL003	CAL003	300cm / 118"	300cm / 118"	approx. 60m / 197ft	approx. 60m / 197ft	150gsm	150gsm	\N	\N	NDFR	NDFR	BS5867, B1, EN13773	BS5867, B1, EN13773	N/A	N/A
153	CAN073	CAN073	1000cm / 394"	1000cm / 394"	\N	\N	200gsm	200gsm	\N	\N	NDFR	NDFR	BS5867, M1, B1, EN13773, EN13501-1	BS5867, M1, B1, EN13773, EN13501-1	CUSTOM DYE price on application, 4 wk lead time, MOQ of 60m	CUSTOM DYE price on application, 4 wk lead time, MOQ of 60m
154	CAN042	CAN042	1200cm / 472"	1200cm / 472"	\N	\N	220gsm	220gsm	\N	\N	NDFR	NDFR	BS5867, M1, B1, EN13773, EN13501-1	BS5867, M1, B1, EN13773, EN13501-1	CUSTOM DYE price on application, 4 wk lead time, MOQ of 60m	CUSTOM DYE price on application, 4 wk lead time, MOQ of 60m
155	CAN102	CAN102	260cm / 102"	260cm / 102"	\N	\N	200gsm	200gsm	\N	\N	NDFR	NDFR	BS5867, M1, B1, EN13773, NFPA 701, EN13501-1	BS5867, M1, B1, EN13773, NFPA 701, EN13501-1	CUSTOM DYE price on application, 4 wk lead time, MOQ of 500m	CUSTOM DYE price on application, 4 wk lead time, MOQ of 500m
156	CAN063	CAN063	320cm / 126"	320cm / 126"	\N	\N	200gsm	200gsm	\N	\N	NDFR	NDFR	BS5867, M1, B1, EN13773, EN13501-1	BS5867, M1, B1, EN13773, EN13501-1	CUSTOM DYE price on application, 4 wk lead time, MOQ of 500m	CUSTOM DYE price on application, 4 wk lead time, MOQ of 500m
157	CAN072	CAN072	420cm / 165"	420cm / 165"	\N	\N	200gsm	200gsm	\N	\N	NDFR	NDFR	BS5867, M1, B1, EN13773, EN13501-1	BS5867, M1, B1, EN13773, EN13501-1	CUSTOM DYE price on application, 4 wk lead time, MOQ of 500m	CUSTOM DYE price on application, 4 wk lead time, MOQ of 500m
158	CAN094	CAN094	520cm / 205"	520cm / 205"	\N	\N	200gsm	200gsm	\N	\N	NDFR	NDFR	BS5867, M1, B1, EN13773, EN13501-1	BS5867, M1, B1, EN13773, EN13501-1	CUSTOM DYE price on application, 4 wk lead time, MOQ of 500m	CUSTOM DYE price on application, 4 wk lead time, MOQ of 500m
159	CAN054	CAN054	600cm / 236"	600cm / 236"	\N	\N	200gsm	200gsm	\N	\N	NDFR	NDFR	BS5867, M1, B1, EN13773, EN13501-1	BS5867, M1, B1, EN13773, EN13501-1	CUSTOM DYE price on application, 4 wk lead time, MOQ of 60m	CUSTOM DYE price on application, 4 wk lead time, MOQ of 60m
160	CAN059	CAN059	800cm / 315"	800cm / 315"	\N	\N	200gsm	200gsm	\N	\N	NDFR	NDFR	BS5867, M1, B1, EN13773, NFPA 701, EN13501-1	BS5867, M1, B1, EN13773, NFPA 701, EN13501-1	CUSTOM DYE price on application, 4 wk lead time, MOQ of 60m	CUSTOM DYE price on application, 4 wk lead time, MOQ of 60m
161	SHE001	SHE001	150cm / 59"	150cm / 59"	approx. 50m / 164ft	approx. 50m / 164ft	190gsm	190gsm	\N	\N	NDFR	NDFR	BS5867	BS5867	N/A	N/A
162	SHE003	SHE003	183cm / 72"	183cm / 72"	approx. 50m / 164ft	approx. 50m / 164ft	190gsm	190gsm	\N	\N	NDFR	NDFR	BS5867	BS5867	N/A	N/A
163	SHE006	SHE006	260cm / 102"	260cm / 102"	\N	\N	200gsm	200gsm	\N	\N	NDFR	NDFR	BS5867, B1, EN13773, EN13501-1	BS5867, B1, EN13773, EN13501-1	N/A	N/A
164	SHE010	SHE010	300cm / 118"	300cm / 118"	approx. 60m / 197ft	approx. 60m / 197ft	190gsm	190gsm	\N	\N	NDFR	NDFR	BS5867, B1, EN13773, EN13501-1	BS5867, B1, EN13773, EN13501-1	N/A	N/A
165	BRU005	BRU005	120cm / 47"	120cm / 47"	approx. 10m / 33ft	approx. 10m / 33ft	Natural - 520gsm / White - 540gsm	Natural - 520gsm / White - 540gsm	\N	\N	NDFR	NDFR	BS5867, M1	BS5867, M1	N/A	N/A
166	HES002	HES002	183cm / 72"	183cm / 72"	\N	\N	325gsm	325gsm	\N	\N	NDFR	NDFR	BS5867	BS5867	N/A	N/A
167	MOR002	MOR002	300cm / 118"	300cm / 118"	approx. 50m / 164ft	approx. 50m / 164ft	200gsm	200gsm	\N	\N	FR	FR	BS5867, B1, EN13501-1	BS5867, B1, EN13501-1	N/A	N/A
168	MOR004	MOR004	300cm / 118"	300cm / 118"	approx. 25m / 82ft	approx. 25m / 82ft	300gsm	300gsm	\N	\N	FR	FR	BS5867, B1, EN13501-1	BS5867, B1, EN13501-1	N/A	N/A
169	MOR008	MOR008	300cm / 118"	300cm / 118"	approx. 25m / 82ft	approx. 25m / 82ft	200gsm	200gsm	\N	\N	FR	FR	BS5867, B1, EN13501-1	BS5867, B1, EN13501-1	N/A	N/A
170	MOR006	MOR006	300cm / 118"	300cm / 118"	approx. 20m / 66ft	approx. 20m / 66ft	300gsm	300gsm	\N	\N	FR	FR	BS5867, B1, EN13501-1	BS5867, B1, EN13501-1	N/A	N/A
171	MUS0008	MUS0008	1000cm / 394"	1000cm / 394"	\N	\N	75gsm	75gsm	\N	\N	NDFR	NDFR	BS5867, B1, EN13773, EN13501-1	BS5867, B1, EN13773, EN13501-1	N/A	N/A
172	MUS017	MUS017	1200cm / 472"	1200cm / 472"	\N	\N	75gsm	75gsm	\N	\N	NDFR	NDFR	BS5867, M1, B1, EN13773, EN13501-1	BS5867, M1, B1, EN13773, EN13501-1	N/A	N/A
173	MUS018	MUS018	305cm / 120"	305cm / 120"	\N	\N	75gsm	75gsm	\N	\N	NDFR	NDFR	BS5867, B1, EN13773, EN13501-1	BS5867, B1, EN13773, EN13501-1	N/A	N/A
174	PS002	PS002	244cm / 96"	244cm / 96"	approx. 95m / 311ft	approx. 95m / 311ft	145gsm	145gsm	\N	\N	IFR	IFR	BS5867	BS5867	N/A	N/A
175	CAN005	CAN005	183cm / 72"	183cm / 72"	approx. 50m / 164ft	approx. 50m / 164ft	300gsm	300gsm	\N	\N	NDFR	NDFR	BS5867, B1, EN13773, EN13501-1	BS5867, B1, EN13773, EN13501-1	N/A	N/A
176	CAN008	CAN008	244cm / 96"	244cm / 96"	approx. 50m / 164ft	approx. 50m / 164ft	300gsm	300gsm	\N	\N	NDFR	NDFR	BS5867, B1, EN13773, EN13501-1	BS5867, B1, EN13773, EN13501-1	N/A	N/A
177	CAN011	CAN011	274cm / 108"	274cm / 108"	approx. 50m / 164ft	approx. 50m / 164ft	300gsm	300gsm	\N	\N	NDFR	NDFR	BS5867, B1, EN13773, EN13501-1	BS5867, B1, EN13773, EN13501-1	N/A	N/A
178	SC005	SC005	91cm / 36"	91cm / 36"	approx. 200m / 656ft	approx. 200m / 656ft	85gsm	85gsm	\N	\N	Not FR	Not FR	N/A	N/A	N/A	N/A
179	BRU013	BRU013	120cm / 47"	120cm / 47"	approx. 10m / 33ft	approx. 10m / 33ft	300gsm	300gsm	\N	\N	NDFR	NDFR	BS5867, M1	BS5867, M1	N/A	N/A
180	CAN043	CAN043	620cm / 244"	620cm / 244"	\N	\N	200gsm	200gsm	\N	\N	IFR Trevira CS	IFR Trevira CS	BS5867, B1, EN13501-1	BS5867, B1, EN13501-1	N/A	N/A
181	CAN001	CAN001	275cm / 108"	275cm / 108"	approx. 50m / 164ft	approx. 50m / 164ft	320gsm	320gsm	\N	\N	Not FR	Not FR	N/A	N/A	N/A	N/A
182	CAN013	CAN013	420cm / 165"	420cm / 165"	\N	\N	300gsm	300gsm	\N	\N	NDFR	NDFR	BS5867, M1, B1, EN13773, EN13501-1	BS5867, M1, B1, EN13773, EN13501-1	CUSTOM DYE price on application, 4 wk lead time, MOQ of 60m	CUSTOM DYE price on application, 4 wk lead time, MOQ of 60m
183	CAN018	CAN018	720cm / 283"	720cm / 283"	\N	\N	270gsm	270gsm	\N	\N	NDFR	NDFR	BS5867, M1, B1, EN13773	BS5867, M1, B1, EN13773	CUSTOM DYE price on application, 4 wk lead time, MOQ of 60m	CUSTOM DYE price on application, 4 wk lead time, MOQ of 60m
184	CAN019	CAN019	1000cm / 394"	1000cm / 394"	\N	\N	270gsm	270gsm	\N	\N	NDFR	NDFR	BS5867, M1, B1, EN13773	BS5867, M1, B1, EN13773	CUSTOM DYE price on application, 4 wk lead time, MOQ of 60m	CUSTOM DYE price on application, 4 wk lead time, MOQ of 60m
185	CAN0200	CAN0200	1200cm / 472"	1200cm / 472"	\N	\N	270gsm	270gsm	\N	\N	NDFR	NDFR	BS5867, M1, B1, EN13773	BS5867, M1, B1, EN13773	CUSTOM DYE price on application, 4 wk lead time, MOQ of 60m	CUSTOM DYE price on application, 4 wk lead time, MOQ of 60m
186	FG011	FG011	640cm / 252"	640cm / 252"	\N	\N	77gsm	77gsm	\N	\N	NDFR	NDFR	BS5867	BS5867	N/A	N/A
187	FIL007	FIL007	1160cm / 457"	1160cm / 457"	approx. 38m / 125ft	approx. 38m / 125ft	190gsm	190gsm	\N	\N	NDFR	NDFR	BS5867, B1	BS5867, B1	CUSTOM DYE price on application, 3 wk lead time, MOQ of 38m	CUSTOM DYE price on application, 3 wk lead time, MOQ of 38m
188	FIL010	FIL010	320cm / 126"	320cm / 126"	\N	\N	190gsm	190gsm	\N	\N	NDFR	NDFR	BS5867, B1	BS5867, B1	CUSTOM DYE price on application, 3 wk lead time, MOQ of 38m	CUSTOM DYE price on application, 3 wk lead time, MOQ of 38m
189	FIL006	FIL006	580cm / 228"	580cm / 228"	\N	\N	190gsm	190gsm	\N	\N	NDFR	NDFR	BS5867, B1	BS5867, B1	CUSTOM DYE price on application, 3 wk lead time, MOQ of 38m	CUSTOM DYE price on application, 3 wk lead time, MOQ of 38m
190	FIL021	FIL021	710cm / 279"	710cm / 279"	\N	\N	190gsm	190gsm	\N	\N	NDFR	NDFR	BS5867, B1	BS5867, B1	CUSTOM DYE price on application, 3 wk lead time, MOQ of 38m	CUSTOM DYE price on application, 3 wk lead time, MOQ of 38m
191	FIL001	FIL001	914cm / 360"	914cm / 360"	approx. 38m / 125ft	approx. 38m / 125ft	190gsm	190gsm	\N	\N	NDFR	NDFR	BS5867, B1	BS5867, B1	CUSTOM DYE price on application, 3 wk lead time, MOQ of 38m	CUSTOM DYE price on application, 3 wk lead time, MOQ of 38m
192	REF003	REF003	870cm / 342"	870cm / 342"	\N	\N	60gsm	60gsm	\N	\N	NDFR	NDFR	BS5867	BS5867	N/A	N/A
193	SN004	SN004	914cm / 360"	914cm / 360"	\N	\N	30gsm	30gsm	\N	\N	IFR	IFR	BS5867	BS5867	N/A	N/A
199	CSG002	CSG002	520cm / 205"	520cm / 205"	\N	\N	115gsm	115gsm	\N	\N	NDFR	NDFR	BS5867, EN13501-1, VdS	BS5867, EN13501-1, VdS	N/A	N/A
203	DIA008	DIA008	300cm / 118"	300cm / 118"	approx. 30m / 98ft	approx. 30m / 98ft	80gsm	80gsm	\N	\N	FR	FR	BS5867, B1, EN13501	BS5867, B1, EN13501	N/A	N/A
204	JS031	JS031	140cm / 55"	140cm / 55"	approx. 46m / 151ft	approx. 46m / 151ft	36gsm	36gsm	\N	\N	NDFR	NDFR	BS5867	BS5867	N/A	N/A
205	LG001	LG001	330cm / 130"	330cm / 130"	approx. 50m / 164ft	approx. 50m / 164ft	22gsm	22gsm	\N	\N	IFR	IFR	BS5867, B1, IMO, EN13773	BS5867, B1, IMO, EN13773	N/A	N/A
206	PT037	PT037	300cm / 118"	300cm / 118"	approx. 60m / 197ft	approx. 60m / 197ft	80gsm	80gsm	\N	\N	IFR	IFR	BS5867, EN13501-1	BS5867, EN13501-1	N/A	N/A
207	REG101	REG101	150cm / 59"	150cm / 59"	approx. 60m / 197ft	approx. 60m / 197ft	245gsm	245gsm	\N	\N	IFR	IFR	BS5867, M1, B1, NFPA 701, IMO	BS5867, M1, B1, NFPA 701, IMO	CUSTOM DYE price on application, 10 wk lead time, MOQ of 500m	CUSTOM DYE price on application, 10 wk lead time, MOQ of 500m
208	VOI040	VOI040	300cm / 118"	300cm / 118"	approx. 50m / 164ft	approx. 50m / 164ft	50gsm	50gsm	\N	\N	DFR	DFR	BS5867 Part 2 C, IMO	BS5867 Part 2 C, IMO	N/A	N/A
210	VOI0014	VOI0014	420cm / 165"	420cm / 165"	\N	\N	\N	\N	\N	\N	\N	\N	BS5867, M1, B1, EN13501-1	BS5867, M1, B1, EN13501-1	N/A	N/A
211	SHV001	SHV001	308cm / 122"	308cm / 122"	approx. 30m / 98ft	approx. 30m / 98ft	45gsm	45gsm	\N	\N	IFR	IFR	BS5867, B1, EN13501-1	BS5867, B1, EN13501-1	N/A	N/A
212	VOI018	VOI018	520cm / 205"	520cm / 205"	\N	\N	50gsm	50gsm	\N	\N	IFR	IFR	BS5867, M1, B1	BS5867, M1, B1	N/A	N/A
214	VEL930/5	VEL930/5	150cm / 59"	150cm / 59"	approx. 55m / 180ft	approx. 55m / 180ft	500gsm	500gsm	\N	\N	IFR	IFR	BS5867, B1, NFPA 701, EN13773, M1	BS5867, B1, NFPA 701, EN13773, M1	Custom Dye - MOQ 400m	Custom Dye - MOQ 400m
215	VEL650/00	VEL650/00	140cm / 55"	140cm / 55"	approx. 30m / 98ft	approx. 30m / 98ft	500gsm	500gsm	\N	\N	IFR	IFR	BS5867, M1, B1, IMO	BS5867, M1, B1, IMO	Available	Available
216	VEL910/10	VEL910/10	150cm / 59"	150cm / 59"	approx. 55m / 180ft	approx. 55m / 180ft	300gsm	300gsm	\N	\N	IFR	IFR	BS5867, NFPA 701, IMO, EN13773, CA1237	BS5867, NFPA 701, IMO, EN13773, CA1237	Custom Dye - MOQ 400m	Custom Dye - MOQ 400m
217	PUR001	PUR001	140cm / 55"	140cm / 55"	approx. 40m / 131ft	approx. 40m / 131ft	420gsm	420gsm	\N	\N	IFR	IFR	BS5867, M1, NFPA 701, EN13773, IMO	BS5867, M1, NFPA 701, EN13773, IMO	\N	\N
218	VEL450/00	VEL450/00	140cm / 55"	140cm / 55"	approx. 30m / 98ft	approx. 30m / 98ft	370gsm	370gsm	\N	\N	IFR	IFR	BS5867, M1, B1, IMO, NFPA 701, EN13773	BS5867, M1, B1, IMO, NFPA 701, EN13773	Available	Available
219	VEL700/00	VEL700/00	140cm / 55"	140cm / 55"	approx. 30m / 98ft	approx. 30m / 98ft	550gsm	550gsm	\N	\N	IFR	IFR	BS5867, M1, B1, IMO, EN13773	BS5867, M1, B1, IMO, EN13773	Available	Available
\.


--
-- TOC entry 4724 (class 2606 OID 25115)
-- Name: fabric_specs fabric_specs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fabric_specs
    ADD CONSTRAINT fabric_specs_pkey PRIMARY KEY (product_id);


--
-- TOC entry 4725 (class 2606 OID 25116)
-- Name: fabric_specs fabric_specs_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fabric_specs
    ADD CONSTRAINT fabric_specs_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id);


-- Completed on 2026-02-26 14:19:45

--
-- PostgreSQL database dump complete
--

