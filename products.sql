--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2026-02-26 11:36:13

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
-- TOC entry 222 (class 1259 OID 16865)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    product_id integer NOT NULL,
    subcategory_id integer,
    category_id integer NOT NULL,
    name_en character varying(150),
    name_ar character varying(150),
    description_en text,
    description_ar text,
    image_path character varying(255),
    parent_id integer,
    is_folder boolean DEFAULT false
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16864)
-- Name: products_product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_product_id_seq OWNER TO postgres;

--
-- TOC entry 4877 (class 0 OID 0)
-- Dependencies: 221
-- Name: products_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_product_id_seq OWNED BY public.products.product_id;


--
-- TOC entry 4723 (class 2604 OID 16868)
-- Name: products product_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN product_id SET DEFAULT nextval('public.products_product_id_seq'::regclass);


--
-- TOC entry 4871 (class 0 OID 16865)
-- Dependencies: 222
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (product_id, subcategory_id, category_id, name_en, name_ar, description_en, description_ar, image_path, parent_id, is_folder) FROM stdin;
108	\N	1	StageWare Mat (Chroma Key)	أرضية فينيل للشاشة الخضراء/الزرقاء للاستوديو والإنتاج التلفزيوني	A versatile vinyl flooring dyed for chroma key applications, perfect for film and TV studios.	أرضية فينيل مصبوغة لتقنية الشاشة الخضراء والزرقاء مع مقاومة للهب وفق معيار BS4790، مناسبة لأرضيات الاستوديوهات والإنتاج التلفزيوني والسينمائي.	/uploads/Fabrics/ChromaKey/img3.jpg	33	f
146	\N	1	Transition — Digital Print	ترانزيشن — طباعة رقمية	Special effect fabric for transition visuals in stage and film, printable surface, flame-retardant.	قماش مؤثرات خاصة لانتقالات بصرية في المسرح والسينما، سطح قابل للطباعة ومقاوم للاشتعال، مثالي للشاشة الخضراء واستوديو تصوير.	/uploads/Fabrics/Digital Print/img23.jpg	35	f
147	\N	1	UV Backlit — Digital Print	باك لايت بالأشعة فوق البنفسجية — طباعة رقمية	Translucent fabric optimized for UV backlit graphics, vivid color reproduction, flame-retardant.	قماش شبه شفاف مخصص للرسومات المضيئة بالأشعة فوق البنفسجية مع وضوح ألوان عالي، مقاوم للاشتعال، مثالي للإنتاج السينمائي والمسرح.	/uploads/Fabrics/Digital Print/img24.jpg	35	f
148	\N	1	Velvet Velour — Digital Print	مخمل فيلور — طباعة رقمية	Luxurious velvet velour fabric for rich digital prints and stage drapery, soft pile, flame-retardant.	قماش مخملي فاخر للطباعة الرقمية الغنية وستائر المسرح، بملمس ناعم ومقاوم للاشتعال، مثالي لاستوديو تصوير والشاشة الخضراء.	/uploads/Fabrics/Digital Print/img25.jpg	35	f
149	\N	1	Voile — Digital Print	فوال — طباعة رقمية	Lightweight sheer voile fabric for translucent prints and decorative scenic use, flame-retardant.	قماش فوال خفيف للطباعة الشفافة والاستخدام الزخرفي في المشاهد، مقاوم للاشتعال، مثالي للمسرح والإنتاج السينمائي.	/uploads/Fabrics/Digital Print/img26.jpg	35	f
150	\N	1	Cheesecloth	شيزكلوث	Light open-weave cotton cheesecloth for translucent scenic effects, layering, and texturing, flame-retardant.	قماش قطني خفيف بنسج مفتوح لتأثيرات مشهدية شفافة وتعدد الطبقات وإضافة ملمس، مقاوم للاشتعال، مثالي للشاشة الخضراء واستوديو تصوير.	/uploads/Fabrics/Muslin Canvas Scenic/img1.jpg	37	f
151	\N	1	Cotton Calico	كاليكو قطني	Unbleached cotton calico for scenic construction, painting, and backdrop use, lightweight and flame-retardant.	قماش قطني غير مبيض للبناء المشهدي والرسم والخلفيات، خفيف ومقاوم للاشتعال، مثالي للمسرح والإنتاج السينمائي.	/uploads/Fabrics/Muslin Canvas Scenic/img2.jpg	37	f
152	\N	1	Cotton Calico 3.0	كاليكو قطني 3.0	Medium-weight cotton calico for durable scenic painting and masking, flame-retardant.	قماش قطني متوسط السماكة للرسم المشهدي المتين والعزل، مقاوم للاشتعال، مناسب للشاشة الخضراء والمسرح.	/uploads/Fabrics/Muslin Canvas Scenic/img3.jpg	37	f
153	\N	1	Cotton Cyclorama Canvas 10.0	كانفاس قطن سيكلوراما 10.0	Heavy cotton cyclorama canvas for large-scale backdrops and projection surfaces, flame-retardant.	قماش كانفاس قطني ثقيل للخلفيات واسعة النطاق والأسطح البصرية، مقاوم للاشتعال، مثالي للإنتاج السينمائي والمسرح.	/uploads/Fabrics/Muslin Canvas Scenic/img4.jpg	37	f
154	\N	1	Cotton Cyclorama Canvas 12.0	كانفاس قطن سيكلوراما 12.0	Extra-heavy cyclorama canvas for robust scenic construction and painted sets, flame-retardant.	قماش كانفاس قطني فائق السماكة للبناء المشهدي القوي والمجموعات المرسومة، مقاوم للاشتعال، مثالي للشاشة الخضراء واستوديو تصوير.	/uploads/Fabrics/Muslin Canvas Scenic/img5.jpg	37	f
19	\N	4	ChainTrack	مسار سحب‑سلسلة	ChainTrack is a precision motorised tracking system for medium to heavy‑duty applications. It uses a duplex chain to suspend and stack drapes, allowing easy and precise positioning, making it suitable for stages with limited fly space.	ChainTrack هو نظام مسار مُحرَّك بدقة لتطبيقات المتوسطة إلى الثقيلة. يستخدم سلسلة مزدوجة لتعليق وتجميع الستائر، مما يتيح ضبطًا دقيقًا وسهلًا للموقع، وهو مناسب للمسارح ذات المساحة المحدودة لتحريك الستائر.	img2.jpg	\N	f
23	\N	3	Single PrintFrame	برنت-فريم أحادي	A wall mounted aluminium frame for decoration purposes and advertising fixed installations.	\N	img1.jpg	\N	f
24	\N	3	Double PrintFrame	برنت-فريم مزدوج	Can be wall mounted or free standing for exhibition stands and room dividers.	\N	img2.jpg	\N	f
25	\N	3	Cube PrintFrame	برنت-فريم مكعب	For directional signage, a free standing platform, or a decorative hanging feature.	\N	img3.jpg	\N	f
26	\N	3	Quadro Profile	بروفيل كوادرو	Commonly used as corner posts on a cubed or rectangular structure.	\N	img4.jpg	\N	f
27	\N	3	Hexa Profile	بروفيل هيكسا	A profile system offering a versatile solution for curved and multidimensional solutions.	\N	img5.jpg	\N	f
33	\N	1	Chroma Key	\N	\N	\N	img2.jpg	\N	t
34	\N	1	Decorative and Display	\N	\N	\N	img3.jpg	\N	t
35	\N	1	Digital Print	\N	\N	\N	img4.jpg	\N	t
109	\N	1	Casement 1.2 Fabric — Decorative & Display	قماش كيسمنت 1.2 — ديكور وعرض	Lightweight casement fabric for scenic masking and soft drape, wide-width, flame-retardant for events and stage.	قماش خفيف لعزل المشاهد والستائر الناعمة بعرض واسع ومقاوم للاشتعال، مثالي للمسرح واستوديو تصوير وإنتاج سينمائي.	/uploads/Fabrics/Decorative and Display/img1.jpg	34	f
110	\N	1	Casement 1.4 Fabric — Decorative & Display	قماش كيسمنت 1.4 — ديكور وعرض	Medium-weight casement for backdrops and venue dressing, stable hang, flame-retardant for public spaces.	قماش متوسط السماكة للخلفيات وتزيين القاعات بثبات تعليق ومقاومة للاشتعال، مناسب للمسرح واستوديو تصوير والشاشة الخضراء.	/uploads/Fabrics/Decorative and Display/img2.jpg	34	f
111	\N	1	Casement 1.5 Fabric — Decorative & Display	قماش كيسمنت 1.5 — ديكور وعرض	Durable casement with improved opacity for scenic borders and exhibition drapes, certified flame-retardant.	قماش متين بعتامة أعلى لحواف المشاهد وستائر المعارض مع اعتماد مقاومة الاشتعال، مثالي للإنتاج السينمائي والمسرح.	/uploads/Fabrics/Decorative and Display/img3.jpg	34	f
112	\N	1	Casement 3.2 Fabric — Decorative & Display	قماش كيسمنت 3.2 — ديكور وعرض	Heavy casement for robust masking and architectural dressing, wide-width, flame-retardant for large venues.	قماش ثقيل لعزل قوي وتكسية معمارية بعرض واسع ومقاوم للاشتعال، مناسب للمسارح والقاعات واستوديوهات التصوير.	/uploads/Fabrics/Decorative and Display/img4.jpg	34	f
113	\N	1	Crushed Suede — Decorative & Display	سويـد مجعد — ديكور وعرض	Textured faux-suede with rich pile for luxe drapes and set dressing, soft hand, flame-retardant finish.	قماش سويـد صناعي بملمس غني للستائر الفاخرة وتكسية الديكور، ناعم ومقاوم للاشتعال، مثالي للمسرح والإنتاج السينمائي.	/uploads/Fabrics/Decorative and Display/img5.jpg	34	f
114	\N	1	Deko Molton — Decorative & Display	ديكو مولتون — ديكور وعرض	Matte cotton molton for light control and backdrop use, dense weave, flame-retardant for stage and studio.	مولتون قطني بسطح مطفي للتحكم بالإضاءة والخلفيات بنسج كثيف ومقاوم للاشتعال، مثالي لاستوديو تصوير ومسرح.	/uploads/Fabrics/Decorative and Display/img6.jpg	34	f
115	\N	1	Display Felt — Decorative & Display	فلت عرض — ديكور وعرض	Versatile felt for exhibition panels and soft coverings, easy to cut and shape, flame-retardant.	فلت متعدد الاستخدام لألواح المعارض والتغطيات الناعمة، سهل القص والتشكيل ومقاوم للاشتعال، مناسب للشاشة الخضراء والمسرح.	/uploads/Fabrics/Decorative and Display/img7.jpg	34	f
37	\N	1	Muslin, Canvas and Scenic	\N	\N	\N	img6.jpg	\N	t
39	\N	1	Scrim, Gauze and Netting	\N	\N	\N	img8.jpg	\N	t
116	\N	1	Glamour — Decorative & Display	غلامور — ديكور وعرض	Shimmering decorative fabric for eye-catching drapes and event accents, lightweight, flame-retardant.	قماش لامع للستائر الجذابة وتفاصيل المناسبات، خفيف ومقاوم للاشتعال، مثالي للمسرح والإنتاج السينمائي.	/uploads/Fabrics/Decorative and Display/img8.jpg	34	f
31	\N	3	Custom Frame	إطار مخصص	Frames built to your specific design for exhibition stands and room dividers.	\N	img9.jpg	\N	f
28	\N	3	Keder Profile	بروفيل كيدر	Lightweight aluminum, easy to assemble and transport for hanging prints.	\N	img6.jpg	\N	f
29	\N	3	Disc Frame	إطار دائري	Circular frame for exhibition stands, overhead hanging, or wall integration.	\N	img7.jpg	\N	f
30	\N	3	Curved Frame	إطار منحني	To create unique chandeliers, overhead lighting, and directional signage.	\N	img8.jpg	\N	f
117	\N	1	Glitter Cloth — Decorative & Display	قماش جليتر — ديكور وعرض	Sparkle fabric with embedded glitter for feature backdrops and trims, flexible, flame-retardant.	قماش بريق مع جليتر مدمج للخلفيات المميزة والحواف، مرن ومقاوم للاشتعال، مناسب لاستوديو تصوير ومسرح.	/uploads/Fabrics/Decorative and Display/img9.jpg	34	f
118	\N	1	Leatherette — Decorative & Display	جلد صناعي — ديكور وعرض	Durable faux leather for scenic panels and props, wipe-clean surface, flame-retardant.	جلد صناعي متين لألواح المشاهد والإكسسوارات بسطح سهل التنظيف ومقاوم للاشتعال، مثالي للمسرح والإنتاج السينمائي.	/uploads/Fabrics/Decorative and Display/img10.jpg	34	f
40	\N	1	Sheers, Silks and Satins	\N	\N	\N	img9.jpg	\N	t
41	\N	1	Velvet - Natural	\N	\N	\N	img10.jpg	\N	t
42	\N	1	Velvet - Synthetic	\N	\N	\N	img11.jpg	\N	t
32	\N	1	Acoustic, Masking and Blackout	\N	\N	\N	img1.jpg	\N	t
119	\N	1	Liquid Lamé — Decorative & Display	لاميه سائل — ديكور وعرض	High-sheen metallic lamé for reflective drapes and accents, fluid drape, flame-retardant.	لاميه معدني بلمعان عالٍ للستائر العاكسة والتفاصيل، انسيابي ومقاوم للاشتعال، مثالي لاستوديو تصوير ومسرح.	/uploads/Fabrics/Decorative and Display/img11.jpg	34	f
120	\N	1	Mirror — Decorative & Display	قماش مرآة — ديكور وعرض	Reflective mirror fabric for visual effects, crisp highlights, lightweight, flame-retardant.	قماش عاكس لتأثيرات بصرية مع لمعان واضح، خفيف ومقاوم للاشتعال، مناسب للشاشة الخضراء والإنتاج السينمائي.	/uploads/Fabrics/Decorative and Display/img12.jpg	34	f
22	\N	4	UniTrack	مسار يوني‑تراك	UniTrack is a heavy‑duty fabricated steel track system forming a strong runway profile for runners. It supports walk‑along, manual, corded, and motorised operation and is supplied in a matt black finish.	UniTrack هو نظام مسار فولاذي قوي ومتين، يشكل بروفيل مناسب لمسارات الحركة. يدعم التشغيل اليدوي بالسحب، بالحبال، أو المحرك، ويتوفر بلمسة نهائية سوداء غير لامعة.	img5.jpg	\N	f
65	2	1	Grey	رمادي (جري)	A rear projection surface with low transmittance, ideal for short-throw projection or edge blending multiple projectors.	سطح إسقاط خلفي ذو نفاذية منخفضة، مثالي للإسقاط قصير المدى أو لدمج حواف أجهزة عرض متعددة.	/uploads/Fabrics/Projection Screens/img4.jpg	\N	f
66	2	1	Fog	ضبابي (فوج)	A specialist projection screen designed for venues like theatres and arenas to provide high-quality visual focus.	شاشة إسقاط متخصصة مصممة لأماكن مثل المسارح والساحات لتوفير تركيز بصري عالي الجودة.	/uploads/Fabrics/Projection Screens/img5.jpg	\N	f
62	2	1	Twin White	توين وايت (أبيض مزدوج)	A dual screen providing a wide viewing angle under both front and rear projection; excellent for blending images on multiple projectors.	شاشة مزدوجة توفر زاوية عرض واسعة في كل من الإسقاط الأمامي والخلفي؛ ممتازة لدمج الصور على أجهزة عرض متعددة.	/uploads/Fabrics/Projection Screens/img1.jpg	\N	f
63	2	1	Midnight Blue	ميدنايت بلو (أزرق داكن)	A rear projection screen suitable for use with a single projector that provides a wide viewing angle.	شاشة إسقاط خلفي مناسبة للاستخدام مع جهاز عرض واحد وتوفر زاوية عرض واسعة.	/uploads/Fabrics/Projection Screens/img2.jpg	\N	f
64	2	1	Matt White	مات وايت (أبيض مطفي)	A front projection surface designed for use with multiple projectors whilst distributing light evenly to maximise viewing angles.	سطح إسقاط أمامي مصمم للاستخدام مع أجهزة عرض متعددة بينما يقوم بتوزيع الضوء بالتساوي لزيادة زوايا الرؤية.	/uploads/Fabrics/Projection Screens/img3.jpg	\N	f
67	2	1	Clear	شفاف	A transparent-style projection surface used for creating depth and specialized visual effects in events.	سطح إسقاط بنمط شفاف يستخدم لخلق العمق والمؤثرات البصرية المتخصصة في الفعاليات.	/uploads/Fabrics/Projection Screens/img6.jpg	\N	f
68	2	1	Cream	كريمي	A versatile projection surface that offers a warmer tone, ideal for specific lighting environments and theatrical depth.	سطح إسقاط متعدد الاستخدامات يوفر درجة لون أكثر دفئاً، مثالي لبيئات إضاءة معينة وعمق مسرحي.	/uploads/Fabrics/Projection Screens/img7.jpg	\N	f
121	\N	1	StageWare Elastic 3.1 — Decorative & Display	ستيج وير إيلاستيك 3.1 — ديكور وعرض	Stretch performance fabric with stable recovery for tensioned scenic shapes and event décor, flame-retardant.	قماش مطاطي بأداء ثابت لتشكيلات مشدودة وديكور الفعاليات، مقاوم للاشتعال، مثالي للمسرح واستوديو تصوير.	/uploads/Fabrics/Decorative and Display/img13.jpg	34	f
122	\N	1	PUFC 160 — Decorative & Display	PUFC 160 — ديكور وعرض	Polyurethane-coated fabric with smooth finish for durable coverings and scenic applications, flame-retardant.	قماش مطلي بولي يوريثان بسطح ناعم لتغطيات متينة وتطبيقات المشاهد، مقاوم للاشتعال، مناسب للإنتاج السينمائي والمسرح.	/uploads/Fabrics/Decorative and Display/img14.jpg	34	f
123	\N	1	PVC Kiss Laminate — Decorative & Display	PVC كيس لامينيت — ديكور وعرض	Gloss PVC laminate for sleek panels and trims, easy-clean surface, flame-retardant.	لامينيت PVC لامع لألواح أنيقة وحواف، سطح سهل التنظيف ومقاوم للاشتعال، مثالي لاستوديو تصوير ومسرح.	/uploads/Fabrics/Decorative and Display/img15.jpg	34	f
124	\N	1	PVC Leather Grain — Decorative & Display	PVC بنقشة جلد — ديكور وعرض	Textured PVC with leather grain for rugged scenic finishes and props, wipeable, flame-retardant.	PVC محبب بنقشة جلد لتشطيبات قوية وإكسسوارات المشاهد، قابل للمسح ومقاوم للاشتعال، مناسب للمسرح والإنتاج السينمائي.	/uploads/Fabrics/Decorative and Display/img16.jpg	34	f
125	\N	1	Ripstop — Decorative & Display	ريبستوب — ديكور وعرض	Lightweight ripstop fabric with reinforced grid for durability, ideal for scenic covers and event use, flame-retardant.	قماش خفيف مع شبكة معززة للمتانة، مثالي لتغطيات المشاهد والاستخدام في الفعاليات، مقاوم للاشتعال، مناسب للشاشة الخضراء واستوديو تصوير.	/uploads/Fabrics/Decorative and Display/img18.jpg	34	f
126	\N	1	Ripstop 3.1 — Decorative & Display	ريبستوب 3.1 — ديكور وعرض	Heavy-duty ripstop with stronger weave for demanding scenic applications, tear-resistant and flame-retardant.	قماش ريبستوب قوي بنسج متين للتطبيقات الصعبة في المشاهد، مقاوم للتمزق ومقاوم للاشتعال، مثالي للمسرح والإنتاج السينمائي.	/uploads/Fabrics/Decorative and Display/img19.jpg	34	f
127	\N	1	Slit Drapes — Decorative & Display	ستائر مشقوقة — ديكور وعرض	Decorative slit drapes for dynamic stage effects and event dressing, lightweight and flame-retardant.	ستائر مشقوقة للزينة وتأثيرات المسرح الديناميكية وتزيين الفعاليات، خفيفة ومقاومة للاشتعال، مثالية لاستوديو تصوير وإنتاج سينمائي.	/uploads/Fabrics/Decorative and Display/img20.jpg	34	f
128	\N	1	Trevira CS String Drape — Decorative & Display	ستائر خيوط تريفيرا CS — ديكور وعرض	Flame-retardant Trevira CS string drape for stylish partitions and scenic accents, flexible and durable.	ستائر خيوط من تريفيرا CS مقاومة للاشتعال للفواصل الأنيقة وتفاصيل المشاهد، مرنة ومتينة، مثالية للمسرح واستوديو تصوير والشاشة الخضراء.	/uploads/Fabrics/Decorative and Display/img21.jpg	34	f
155	\N	1	Cotton Cyclorama Canvas 2.6	كانفاس قطن سيكلوراما 2.6	Lightweight cyclorama canvas for smaller scenic drops and projection surfaces, flame-retardant.	قماش كانفاس قطني خفيف للخلفيات الصغيرة والأسطح البصرية، مقاوم للاشتعال، مثالي للمسرح والإنتاج السينمائي.	/uploads/Fabrics/Muslin Canvas Scenic/img6.jpg	37	f
156	\N	1	Cotton Cyclorama Canvas 3.2	كانفاس قطن سيكلوراما 3.2	Medium-weight cyclorama canvas for scenic painting and backdrop use, flame-retardant.	قماش كانفاس قطني متوسط السماكة للرسم المشهدي والخلفيات، مقاوم للاشتعال، مناسب للشاشة الخضراء واستوديو تصوير.	/uploads/Fabrics/Muslin Canvas Scenic/img7.jpg	37	f
157	\N	1	Cotton Cyclorama Canvas 4.2	كانفاس قطن سيكلوراما 4.2	Durable cyclorama canvas for scenic construction and projection surfaces, flame-retardant.	قماش كانفاس قطني متين للبناء المشهدي والأسطح البصرية، مقاوم للاشتعال، مثالي للمسرح والإنتاج السينمائي.	/uploads/Fabrics/Muslin Canvas Scenic/img8.jpg	37	f
158	\N	1	Cotton Cyclorama Canvas 5.2	كانفاس قطن سيكلوراما 5.2	Strong cyclorama canvas for painted sets and scenic masking, flame-retardant.	قماش كانفاس قطني قوي للمجموعات المرسومة والعزل المشهدي، مقاوم للاشتعال، مثالي للشاشة الخضراء واستوديو تصوير.	/uploads/Fabrics/Muslin Canvas Scenic/img9.jpg	37	f
159	\N	1	Cotton Cyclorama Canvas 6.0	كانفاس قطن سيكلوراما 6.0	Heavy cyclorama canvas for large scenic drops and durable backdrops, flame-retardant.	قماش كانفاس قطني ثقيل للخلفيات الكبيرة والمتينة، مقاوم للاشتعال، مثالي للمسرح والإنتاج السينمائي.	/uploads/Fabrics/Muslin Canvas Scenic/img10.jpg	37	f
74	\N	1	Standard Molton	قماش مولتون أساسي لعزل الضوء	Heavy cotton molton fabric designed for blackout and stage masking.	قماش مولتون قطني كثيف يستخدم لعزل الضوء وتغطية المسارح والفعاليات.	/uploads/Fabrics/Acoustic/img1.jpg	32	f
75	\N	1	Wool Serge 1.8m	قماش صوف سيرج 1.8 متر لعزل الصوت والضوء	Wool serge fabric providing effective acoustic absorption and blackout.	قماش صوف سيرج بعرض 1.8 متر يوفر عزل الصوت والضوء للمسارح.	/uploads/Fabrics/Acoustic/img2.jpg	32	f
76	\N	1	Wool Serge 3.0m	قماش صوف سيرج 3 متر لعزل الصوت والضوء	Wide wool serge fabric for professional acoustic and blackout use.	قماش صوف سيرج بعرض 3 متر مثالي لعزل الصوت والضوء في المساحات الكبيرة.	/uploads/Fabrics/Acoustic/img3.jpg	32	f
77	\N	1	Wool Serge 420	قماش صوف سيرج 420 جرام لعزل الصوت	Lightweight wool serge offering acoustic and visual control.	قماش صوف خفيف الوزن يوفر امتصاصاً للصوت وتحكماً بالإضاءة.	/uploads/Fabrics/Acoustic/img4.jpg	32	f
78	\N	1	Wool Serge 565	قماش صوف سيرج 565 جرام لعزل الصوت والضوء	Medium-weight wool serge suitable for stage masking.	قماش صوف متوسط الوزن مثالي لتغطية المسارح وعزل الصوت.	/uploads/Fabrics/Acoustic/img5.jpg	32	f
79	\N	1	Wool Serge 650	قماش صوف سيرج 650 جرام للمسارح	Heavy wool serge designed for enhanced blackout and acoustic control.	قماش صوف ثقيل يوفر عزل صوتي وضوئي عالي الأداء.	/uploads/Fabrics/Acoustic/img6.jpg	32	f
129	\N	1	Airflow — Digital Print	إيرفلو — طباعة رقمية	Lightweight polyester fabric optimized for airflow and vivid digital printing, ideal for banners and scenic displays.	قماش بوليستر خفيف مصمم لتدفق الهواء والطباعة الرقمية الزاهية، مثالي للبانرات وخلفيات المسرح واستوديو تصوير.	/uploads/Fabrics/Digital Print/img1.jpg	35	f
130	\N	1	Backlit — Digital Print	باك لايت — طباعة رقمية	Translucent fabric for backlit graphics and illuminated signage, high color saturation, flame-retardant.	قماش شبه شفاف للرسومات المضيئة واللافتات، تشبع ألوان عالي ومقاوم للاشتعال، مثالي للشاشة الخضراء والإنتاج السينمائي.	/uploads/Fabrics/Digital Print/img2.jpg	35	f
131	\N	1	Banner — Digital Print	بانر — طباعة رقمية	Durable banner fabric for indoor and outdoor use, smooth surface for sharp prints, flame-retardant.	قماش متين للبانرات الداخلية والخارجية بسطح ناعم لطباعة واضحة، مقاوم للاشتعال، مثالي للمسرح والمعارض.	/uploads/Fabrics/Digital Print/img3.jpg	35	f
132	\N	1	Black Back Stretch — Digital Print	بلاك باك ستريتش — طباعة رقمية	Stretch fabric with black backing for vivid front prints and opacity, flexible and flame-retardant.	قماش مطاطي بخلفية سوداء لطباعة أمامية زاهية وعتامة عالية، مرن ومقاوم للاشتعال، مناسب لاستوديو تصوير ومسرح.	/uploads/Fabrics/Digital Print/img4.jpg	35	f
133	\N	1	Canvas — Digital Print	كانفاس — طباعة رقمية	Heavy cotton canvas for textured prints and scenic backdrops, durable and flame-retardant.	قماش قطني ثقيل للطباعة الملمسية والخلفيات المسرحية، متين ومقاوم للاشتعال، مثالي للإنتاج السينمائي.	/uploads/Fabrics/Digital Print/img5.jpg	35	f
134	\N	1	Cotton Gauze — Digital Print	شاش قطني — طباعة رقمية	Light cotton gauze for translucent scenic effects and soft digital prints, flame-retardant.	قماش قطني خفيف لتأثيرات مشهدية شفافة وطباعة ناعمة، مقاوم للاشتعال، مثالي للشاشة الخضراء والمسرح.	/uploads/Fabrics/Digital Print/img6.jpg	35	f
135	\N	1	Day / Night — Digital Print	داي / نايت — طباعة رقمية	Dual-effect fabric for day/night transitions in scenic design, printable surface, flame-retardant.	قماش بتأثير مزدوج لانتقالات النهار/الليل في تصميم المشاهد، سطح قابل للطباعة ومقاوم للاشتعال، مثالي للإنتاج السينمائي.	/uploads/Fabrics/Digital Print/img7.jpg	35	f
80	\N	1	Wool Serge 800	قماش صوف سيرج 800 جرام عالي الكثافة	Extra heavy wool serge for maximum acoustic absorption.	قماش صوف عالي الكثافة لعزل الصوت والضوء بشكل احترافي.	/uploads/Fabrics/Acoustic/img7.jpg	32	f
81	\N	1	Coloured Wool Serge	قماش صوف سيرج ملون لعزل الصوت	Coloured wool serge combining aesthetics with acoustic performance.	قماش صوف سيرج ملون يجمع بين الجمالية وعزل الصوت.	/uploads/Fabrics/Acoustic/img8.jpg	32	f
82	\N	1	Acoustic Molton	مولتون صوتي لامتصاص الضوضاء	Molton fabric engineered for sound absorption in performance spaces.	قماش مولتون مصمم خصيصاً لامتصاص الصوت في المسارح والاستوديوهات.	/uploads/Fabrics/Acoustic/img9.jpg	32	f
83	\N	1	Acoustic Transparent	قماش صوتي شفاف لتمرير الصوت	Acoustic fabric allowing sound transmission while masking visuals.	قماش صوتي يسمح بمرور الصوت مع إخفاء المعدات.	/uploads/Fabrics/Acoustic/img10.jpg	32	f
84	\N	1	Bolton Twill 1.2	قماش بولتون تويل 1.2 لعزل الضوء	Twill-woven blackout fabric with matte finish.	قماش بولتون تويل بعرض 1.2 متر لعزل الضوء والتحكم بالإضاءة.	/uploads/Fabrics/Acoustic/img11.jpg	32	f
85	\N	1	Bolton Twill 1.5	قماش بولتون تويل 1.5 لعزل الضوء	Durable twill blackout fabric for stage applications.	قماش تويل متين بعرض 1.5 متر لعزل الضوء في المسارح.	/uploads/Fabrics/Acoustic/img12.jpg	32	f
86	\N	1	Dimalan	قماش ديمالان لعزل الضوء	Polyester blend fabric designed for blackout linings.	قماش ديمالان مخصص لعزل الضوء والتبطين الخلفي.	/uploads/Fabrics/Acoustic/img13.jpg	32	f
87	\N	1	Eclipse Lining 1.37	إيكلبس لاينينغ 1.37 لعزل الضوء	High-performance blackout lining fabric.	قماش تبطين إيكلبس يوفر عزل ضوئي عالي الجودة.	/uploads/Fabrics/Acoustic/img14.jpg	32	f
88	\N	1	Eclipse Lining 2.8	إيكلبس لاينينغ 2.8 لعزل الضوء	Wide blackout lining fabric for professional installations.	قماش تبطين واسع يوفر عزل الضوء للمساحات الكبيرة.	/uploads/Fabrics/Acoustic/img15.jpg	32	f
89	\N	1	Heavy Cotton Bump	قماش قطني ثقيل للتغطية والعزل	Dense cotton fabric used for masking and insulation.	قماش قطني كثيف يستخدم للتغطية والعزل الصوتي.	/uploads/Fabrics/Acoustic/img16.jpg	32	f
90	\N	1	IFR Molton CS	مولتون IFR مقاوم للحريق	Inherently flame-retardant molton fabric for safety compliance.	قماش مولتون مقاوم للحريق مطابق لمعايير السلامة.	/uploads/Fabrics/Acoustic/img17.jpg	32	f
91	\N	1	Mercury	قماش ميركوري لعزل الضوء	Versatile blackout fabric for general stage use.	قماش متعدد الاستخدامات لعزل الضوء في المسارح.	/uploads/Fabrics/Acoustic/img18.jpg	32	f
92	\N	1	Mercury 3.0	قماش ميركوري 3 متر لعزل الضوء	Wide blackout fabric suitable for large venues.	قماش بعرض 3 متر لعزل الضوء في المساحات الواسعة.	/uploads/Fabrics/Acoustic/img19.jpg	32	f
93	\N	1	Premier Blackout 1.5m	بلاك آوت بريميير 1.5 متر	Premium blackout fabric blocking up to 99% of light.	قماش بلاك آوت فاخر يوفر عزل ضوئي عالي الكفاءة.	/uploads/Fabrics/Acoustic/img20.jpg	32	f
94	\N	1	Premier Blackout 3.0m	بلاك آوت بريميير 3 متر	Wide premium blackout fabric for professional use.	قماش بلاك آوت بعرض 3 متر للاستخدام الاحترافي.	/uploads/Fabrics/Acoustic/img21.jpg	32	f
95	\N	1	Molton Lite	مولتون لايت خفيف الوزن	Lightweight molton fabric for easy handling.	قماش مولتون خفيف وسهل الاستخدام.	/uploads/Fabrics/Acoustic/img22.jpg	32	f
96	\N	1	Molton Twill	مولتون تويل لعزل الضوء	Molton fabric with twill weave for durability.	قماش مولتون بنسيج تويل لعزل الضوء.	/uploads/Fabrics/Acoustic/img23.jpg	32	f
97	\N	1	Premium Molton 2.0	مولتون بريميوم 2.0 لعزل الضوء	Premium-grade molton fabric for stage masking.	قماش مولتون عالي الجودة لتغطية المسارح.	/uploads/Fabrics/Acoustic/img24.jpg	32	f
98	\N	1	Premium Molton 3.0	مولتون بريميوم 3.0 لعزل الضوء	Heavy premium molton fabric for professional venues.	قماش مولتون احترافي لعزل الضوء في المسارح.	/uploads/Fabrics/Acoustic/img25.jpg	32	f
99	\N	1	Premium Molton 4.0	مولتون بريميوم 4.0 عالي الكثافة	Extra heavy molton fabric for maximum blackout.	قماش مولتون عالي الكثافة لعزل ضوئي كامل.	/uploads/Fabrics/Acoustic/img26.jpg	32	f
100	\N	1	Sateen Lining	ساتين لاينينغ لعزل الضوء	Smooth blackout lining fabric for decorative use.	قماش تبطين ساتان بلمسة ناعمة لعزل الضوء.	/uploads/Fabrics/Acoustic/img27.jpg	32	f
101	\N	1	USA Commando Cloth	قماش كوماندو أمريكي لعزل الضوء	Ultra-dense blackout fabric for demanding applications.	قماش عالي الكثافة لعزل الضوء في الاستخدامات الشاقة.	/uploads/Fabrics/Acoustic/img28.jpg	32	f
102	\N	1	Wadding	لباد عازل للصوت والحرارة	Insulating fabric used for acoustic and thermal control.	لباد يستخدم لعزل الصوت والحرارة خلف الأقمشة.	/uploads/Fabrics/Acoustic/img29.jpg	32	f
103	\N	1	Coloured Wool Serge (Chroma Key)	قماش صوف ملون للشاشة الخضراء والزرقاء	Wool serge dyed for chroma key green and blue applications in film and TV studios.	قماش صوف سيرج مصبوغ خصيصاً لتقنية الشاشة الخضراء والزرقاء، مثالي لاستوديوهات التصوير السينمائي والتلفزيوني.	/uploads/Fabrics/ChromaKey/img1.jpg	33	f
136	\N	1	Display Polyester — Digital Print	بوليستر عرض — طباعة رقمية	Polyester fabric for exhibition graphics and scenic prints, smooth finish, flame-retardant.	قماش بوليستر للرسومات والمعارض والخلفيات، بسطح ناعم ومقاوم للاشتعال، مثالي لاستوديو تصوير ومسرح.	/uploads/Fabrics/Digital Print/img8.jpg	35	f
106	\N	1	Premium Molton 3.0 (Chroma Key)	مولتون بريميوم 3.0 للشاشة الخضراء والزرقاء	Premium brushed cotton fabric dyed for chroma key applications in film and television.	قماش مولتون فاخر بملمس ناعم مصبوغ لتقنية الشاشة الخضراء والزرقاء، مثالي للإنتاج السينمائي والتلفزيوني.	/uploads/Fabrics/ChromaKey/img4.jpg	33	f
137	\N	1	Filled Cloth — Digital Print	قماش ممتلئ — طباعة رقمية	Dense cloth for bold prints and scenic masking, durable and flame-retardant.	قماش كثيف للطباعة الجريئة وعزل المشاهد، متين ومقاوم للاشتعال، مناسب للشاشة الخضراء والمسرح.	/uploads/Fabrics/Digital Print/img9.jpg	35	f
104	\N	1	Digifoam	قماش ديجيفوم للشاشة الخضراء	High-performance foam fabric designed for seamless chroma key green and blue screen backgrounds.	قماش فوم عالي الأداء مصمم لتقنية الشاشة الخضراء والزرقاء، يوفر خلفيات متجانسة وخالية من الانعكاسات.	/uploads/Fabrics/ChromaKey/img2.jpg	33	f
138	\N	1	Flag — Digital Print	قماش أعلام — طباعة رقمية	Lightweight flag fabric for outdoor and indoor graphics, vivid color reproduction, flame-retardant.	قماش خفيف للأعلام والرسومات الداخلية والخارجية، يعرض الألوان بوضوح ومقاوم للاشتعال، مثالي للإنتاج السينمائي.	/uploads/Fabrics/Digital Print/img10.jpg	35	f
139	\N	1	Gauze — Digital Print	شاش — طباعة رقمية	Translucent gauze fabric for scenic layering and soft digital prints, flame-retardant.	قماش شفاف لتعدد طبقات المشاهد والطباعة الناعمة، مقاوم للاشتعال، مثالي للمسرح واستوديو تصوير.	/uploads/Fabrics/Digital Print/img11.jpg	35	f
140	\N	1	Gloss Satin — Digital Print	ساتان لامع — طباعة رقمية	Shiny satin fabric for high-impact prints and decorative backdrops, smooth drape, flame-retardant.	قماش ساتان لامع للطباعة المؤثرة والخلفيات الزخرفية، انسيابي ومقاوم للاشتعال، مثالي للشاشة الخضراء والإنتاج السينمائي.	/uploads/Fabrics/Digital Print/img12.jpg	35	f
141	\N	1	Muslin — Digital Print	موسلين — طباعة رقمية	Plain-weave cotton muslin for wide-format prints and scenic use, lightweight and flame-retardant.	قماش موسلين قطني بنسج بسيط للطباعة واسعة النطاق والاستخدام المسرحي، خفيف ومقاوم للاشتعال، مثالي لاستوديو تصوير.	/uploads/Fabrics/Digital Print/img13.jpg	35	f
142	\N	1	Poly Gauze — Digital Print	شاش بوليستر — طباعة رقمية	Polyester gauze for translucent scenic effects and durable prints, flame-retardant.	قماش بوليستر شفاف لتأثيرات المشاهد وطباعة متينة، مقاوم للاشتعال، مثالي للمسرح والإنتاج السينمائي.	/uploads/Fabrics/Digital Print/img14.jpg	35	f
143	\N	1	StageWare Printed Mat — Digital Print	ستيج وير مات مطبوع — طباعة رقمية	Durable printed mat fabric for flooring and scenic applications, smooth surface, flame-retardant.	قماش مطبوع متين للأرضيات وتطبيقات المشاهد، سطح ناعم ومقاوم للاشتعال، مثالي لاستوديو تصوير ومسرح.	/uploads/Fabrics/Digital Print/img15.jpg	35	f
144	\N	1	PVC Mesh — Digital Print	شبك PVC — طباعة رقمية	Mesh PVC fabric for outdoor banners and large-format prints, breathable and flame-retardant.	قماش شبكي PVC للبانرات الخارجية والطباعة واسعة النطاق، يسمح بمرور الهواء ومقاوم للاشتعال، مثالي للشاشة الخضراء والإنتاج السينمائي.	/uploads/Fabrics/Digital Print/img16.jpg	35	f
145	\N	1	Theatre Canvas — Digital Print	كانفاس المسرح — طباعة رقمية	Heavy-duty theatre canvas designed for wide-format digital printing, durable texture, flame-retardant for scenic backdrops.	قماش مسرحي متين للطباعة الرقمية واسعة النطاق بخلفيات مشهدية، نسيج قوي ومقاوم للاشتعال، مثالي للمسرح والإنتاج السينمائي.	/uploads/Fabrics/Digital Print/img22.jpg	35	f
160	\N	1	Cotton Cyclorama Canvas 8.0	كانفاس قطن سيكلوراما 8.0	Thick cyclorama canvas for robust scenic painting and projection surfaces, flame-retardant.	قماش كانفاس قطني سميك للرسم المشهدي القوي والأسطح البصرية، مقاوم للاشتعال، مثالي للشاشة الخضراء واستوديو تصوير.	/uploads/Fabrics/Muslin Canvas Scenic/img11.jpg	37	f
161	\N	1	Cotton Sheeting 1.5	شيت قطني 1.5	Light cotton sheeting for scenic layering and soft backdrops, flame-retardant.	قماش قطني خفيف لتعدد الطبقات والخلفيات الناعمة، مقاوم للاشتعال، مثالي للمسرح واستوديو تصوير.	/uploads/Fabrics/Muslin Canvas Scenic/img12.jpg	37	f
162	\N	1	Cotton Sheeting 1.83	شيت قطني 1.83	Medium-weight cotton sheeting for scenic painting and decorative use, flame-retardant.	قماش قطني متوسط السماكة للرسم المشهدي والاستخدام الزخرفي، مقاوم للاشتعال، مناسب للشاشة الخضراء والإنتاج السينمائي.	/uploads/Fabrics/Muslin Canvas Scenic/img13.jpg	37	f
163	\N	1	Cotton Sheeting 2.6	شيت قطني 2.6	Durable cotton sheeting for scenic construction and painted sets, flame-retardant.	قماش قطني متين للبناء المشهدي والمجموعات المرسومة، مقاوم للاشتعال، مثالي للمسرح واستوديو تصوير.	/uploads/Fabrics/Muslin Canvas Scenic/img14.jpg	37	f
164	\N	1	Cotton Sheeting 3.0	شيت قطني 3.0	Heavy cotton sheeting for robust scenic backdrops and layering, flame-retardant.	قماش قطني ثقيل لخلفيات مشهدية قوية وتعدد الطبقات، مقاوم للاشتعال، مثالي للشاشة الخضراء والإنتاج السينمائي.	/uploads/Fabrics/Muslin Canvas Scenic/img15.jpg	37	f
165	\N	1	Double Sided Brusan Scenic	بروسـان مشهدي مزدوج الوجه	Special double-sided scenic fabric for versatile stage effects and painting, flame-retardant.	قماش مشهدي خاص مزدوج الوجه لتأثيرات مسرحية متعددة واستخدامات الرسم، مقاوم للاشتعال، مثالي للمسرح والإنتاج السينمائي.	/uploads/Fabrics/Muslin Canvas Scenic/img16.jpg	37	f
166	\N	1	Hessian	خيش	Coarse jute hessian fabric for rustic scenic textures and props, strong weave, flame-retardant.	قماش خيش خشن لإضفاء ملمس ريفي على المشاهد والإكسسوارات، نسج قوي ومقاوم للاشتعال، مثالي للمسرح والإنتاج السينمائي.	/uploads/Fabrics/Muslin Canvas Scenic/img17.jpg	37	f
167	\N	1	Morass Fine	موراس ناعم	Fine-weave morass fabric for delicate scenic effects and layering, lightweight and flame-retardant.	قماش موراس بنسج ناعم لتأثيرات مشهدية دقيقة وتعدد الطبقات، خفيف ومقاوم للاشتعال، مثالي للشاشة الخضراء واستوديو تصوير.	/uploads/Fabrics/Muslin Canvas Scenic/img18.jpg	37	f
168	\N	1	Morass Large	موراس كبير	Large-weave morass fabric for bold scenic textures and translucent effects, flame-retardant.	قماش موراس بنسج كبير لإضافة ملمس مشهدي جريء وتأثيرات شفافة، مقاوم للاشتعال، مثالي للمسرح والإنتاج السينمائي.	/uploads/Fabrics/Muslin Canvas Scenic/img19.jpg	37	f
169	\N	1	Morass O	موراس O	Open-weave morass fabric for translucent scenic layers and reveal effects, lightweight and flame-retardant.	قماش موراس بنسج مفتوح لتعدد الطبقات وتأثيرات الكشف المشهدية، خفيف ومقاوم للاشتعال، مناسب للشاشة الخضراء واستوديو تصوير.	/uploads/Fabrics/Muslin Canvas Scenic/img20.jpg	37	f
170	\N	1	Morass Super	موراس سوبر	Super-weave morass fabric for strong scenic textures and durable layering, flame-retardant.	قماش موراس سوبر بنسج قوي لإضافة ملمس مشهدي متين وتعدد الطبقات، مقاوم للاشتعال، مثالي للمسرح والإنتاج السينمائي.	/uploads/Fabrics/Muslin Canvas Scenic/img21.jpg	37	f
171	\N	1	Muslin 10.0	موسلين 10.0	Heavy cotton muslin for robust scenic backdrops and painted sets, flame-retardant.	قماش موسلين قطني ثقيل لخلفيات مشهدية قوية ومجموعات مرسومة، مقاوم للاشتعال، مثالي للشاشة الخضراء واستوديو تصوير.	/uploads/Fabrics/Muslin Canvas Scenic/img22.jpg	37	f
172	\N	1	Muslin 12.0	موسلين 12.0	Extra-heavy cotton muslin for maximum durability in scenic construction and backdrops, flame-retardant.	قماش موسلين قطني فائق السماكة لأقصى متانة في البناء المشهدي والخلفيات، مقاوم للاشتعال، مثالي للمسرح والإنتاج السينمائي.	/uploads/Fabrics/Muslin Canvas Scenic/img23.jpg	37	f
173	\N	1	Muslin 3.05	موسلين 3.05	Lightweight cotton muslin for translucent scenic effects and layering, flame-retardant.	قماش موسلين قطني خفيف لتأثيرات مشهدية شفافة وتعدد الطبقات، مقاوم للاشتعال، مثالي للشاشة الخضراء واستوديو تصوير.	/uploads/Fabrics/Muslin Canvas Scenic/img24.jpg	37	f
174	\N	1	Polyester Sheeting	شيت بوليستر	Durable polyester sheeting for scenic construction and painted sets, smooth surface, flame-retardant.	قماش بوليستر متين للبناء المشهدي والمجموعات المرسومة، سطح ناعم ومقاوم للاشتعال، مثالي للمسرح والإنتاج السينمائي.	/uploads/Fabrics/Muslin Canvas Scenic/img25.jpg	37	f
175	\N	1	Scene & Artist Canvas 1.83	كانفاس فني 1.83	Medium-weight artist canvas for scenic painting and backdrop use, flame-retardant.	قماش كانفاس متوسط السماكة للرسم الفني والمشهدية والخلفيات، مقاوم للاشتعال، مثالي للشاشة الخضراء واستوديو تصوير.	/uploads/Fabrics/Muslin Canvas Scenic/img26.jpg	37	f
176	\N	1	Scene & Artist Canvas 2.44	كانفاس فني 2.44	Durable artist canvas for scenic construction and painted sets, flame-retardant.	قماش كانفاس متين للبناء المشهدي والمجموعات المرسومة، مقاوم للاشتعال، مثالي للمسرح والإنتاج السينمائي.	/uploads/Fabrics/Muslin Canvas Scenic/img27.jpg	37	f
177	\N	1	Scene & Artist Canvas 2.74	كانفاس فني 2.74	Heavy artist canvas for robust scenic painting and backdrop use, flame-retardant.	قماش كانفاس ثقيل للرسم الفني القوي والخلفيات، مقاوم للاشتعال، مثالي للشاشة الخضراء واستوديو تصوير.	/uploads/Fabrics/Muslin Canvas Scenic/img28.jpg	37	f
178	\N	1	Scrim	سكرم	Open-weave scrim fabric for reveal effects and translucent scenic layers, lightweight and flame-retardant.	قماش سكرم بنسج مفتوح لتأثيرات الكشف والطبقات الشفافة، خفيف ومقاوم للاشتعال، مثالي للمسرح والإنتاج السينمائي.	/uploads/Fabrics/Muslin Canvas Scenic/img29.jpg	37	f
179	\N	1	Single Sided Brusan Scenic	بروسـان مشهدي وجه واحد	Special single-sided scenic fabric for versatile stage effects and painting, flame-retardant.	قماش مشهدي خاص بوجه واحد لتأثيرات مسرحية متعددة واستخدامات الرسم، مقاوم للاشتعال، مثالي للشاشة الخضراء واستوديو تصوير.	/uploads/Fabrics/Muslin Canvas Scenic/img30.jpg	37	f
180	\N	1	Trevira CS Cyclorama Canvas 6.2	كانفاس سيكلوراما تريفيرا CS 6.2	Flame-retardant Trevira CS cyclorama canvas for scenic backdrops and projection surfaces.	قماش سيكلوراما من تريفيرا CS مقاوم للاشتعال للخلفيات المشهدية والأسطح البصرية، مثالي للمسرح والإنتاج السينمائي.	/uploads/Fabrics/Muslin Canvas Scenic/img31.jpg	37	f
181	\N	1	Walking Canvas	كانفاس مشي	Durable walking canvas for stage floors and scenic construction, flame-retardant.	قماش كانفاس متين لأرضيات المسرح والبناء المشهدي، مقاوم للاشتعال، مثالي للشاشة الخضراء واستوديو تصوير.	/uploads/Fabrics/Muslin Canvas Scenic/img32.jpg	37	f
182	\N	1	Wide Width Canvas 4.2	كانفاس واسع 4.2	Medium-weight canvas with wide format for scenic backdrops and painted sets, flame-retardant.	قماش كانفاس متوسط السماكة بعرض واسع للخلفيات المشهدية والمجموعات المرسومة، مقاوم للاشتعال، مثالي للمسرح واستوديو تصوير.	/uploads/Fabrics/Muslin Canvas Scenic/img33.jpg	37	f
183	\N	1	Wide Width Canvas 7.2	كانفاس واسع 7.2	Durable wide canvas for large scenic drops and textured painting, flame-retardant.	قماش كانفاس متين بعرض واسع للخلفيات الكبيرة والرسم المشهدي، مقاوم للاشتعال، مثالي للشاشة الخضراء والإنتاج السينمائي.	/uploads/Fabrics/Muslin Canvas Scenic/img34.jpg	37	f
184	\N	1	Wide Width Canvas 10.0	كانفاس واسع 10.0	Heavy wide canvas for robust scenic construction and painted backdrops, flame-retardant.	قماش كانفاس ثقيل بعرض واسع للبناء المشهدي القوي والخلفيات المرسومة، مقاوم للاشتعال، مثالي للمسرح واستوديو تصوير.	/uploads/Fabrics/Muslin Canvas Scenic/img35.jpg	37	f
185	\N	1	Wide Width Canvas 12.0	كانفاس واسع 12.0	Extra-heavy wide canvas for demanding scenic applications and architectural backdrops, flame-retardant.	قماش كانفاس فائق السماكة بعرض واسع للتطبيقات المشهدية الصعبة والخلفيات المعمارية، مقاوم للاشتعال، مثالي للشاشة الخضراء والإنتاج السينمائي.	/uploads/Fabrics/Muslin Canvas Scenic/img36.jpg	37	f
186	\N	1	Double Fine Gauze	جوز ناعم مزدوج	Lightweight fine-weave gauze for theatrical lighting effects, diffusion, and scenic layering, flame-retardant.	قماش جوز خفيف بنسج ناعم لتأثيرات الإضاءة المسرحية والانتشار وتعدد الطبقات المشهدية، مقاوم للاشتعال.	/uploads/Fabrics/Scrim Gauze Netting/img1.jpg	39	f
187	\N	1	Filled Cloth 11.6	قماش ممتلئ 11.6	Dense cotton filled cloth for bold scenic painting, masking, and backdrop construction, flame-retardant.	قماش قطني كثيف للرسم المشهدي الجريء والعزل وبناء الخلفيات، مقاوم للاشتعال.	/uploads/Fabrics/Scrim Gauze Netting/img2.jpg	39	f
188	\N	1	Filled Cloth 3.2	قماش ممتلئ 3.2	Medium-weight filled cloth for scenic painting and decorative use, flame-retardant.	قماش ممتلئ متوسط السماكة للرسم المشهدي والاستخدام الزخرفي، مقاوم للاشتعال.	/uploads/Fabrics/Scrim Gauze Netting/img3.jpg	39	f
189	\N	1	Filled Cloth 5.8	قماش ممتلئ 5.8	Durable filled cloth for scenic construction and painted sets, flame-retardant.	قماش ممتلئ متين للبناء المشهدي والمجموعات المرسومة، مقاوم للاشتعال.	/uploads/Fabrics/Scrim Gauze Netting/img4.jpg	39	f
190	\N	1	Filled Cloth 7.1	قماش ممتلئ 7.1	Heavy filled cloth for robust scenic backdrops and masking, flame-retardant.	قماش ممتلئ ثقيل لخلفيات مشهدية قوية والعزل، مقاوم للاشتعال.	/uploads/Fabrics/Scrim Gauze Netting/img5.jpg	39	f
191	\N	1	Filled Cloth 9.14	قماش ممتلئ 9.14	Extra-heavy filled cloth for maximum durability in scenic painting and backdrop use, flame-retardant.	قماش ممتلئ فائق السماكة لأقصى متانة في الرسم المشهدي والخلفيات، مقاوم للاشتعال.	/uploads/Fabrics/Scrim Gauze Netting/img6.jpg	39	f
192	\N	1	Reflective Fine Gauze	جوز ناعم عاكس	Special reflective gauze for lighting effects, diffusion, and projection surfaces, flame-retardant.	قماش جوز خاص عاكس لتأثيرات الإضاءة والانتشار والأسطح البصرية، مقاوم للاشتعال.	/uploads/Fabrics/Scrim Gauze Netting/img7.jpg	39	f
193	\N	1	Scenery Netting	شبك مشهدي	Strong netting fabric for scenic reinforcement, cut-out stabilization, and decorative effects, flame-retardant.	قماش شبكي قوي لتدعيم المشاهد وتثبيت القصاصات وإضافة تأثيرات زخرفية، مقاوم للاشتعال.	/uploads/Fabrics/Scrim Gauze Netting/img8.jpg	39	f
194	\N	1	8pt Sharkstooth 10.97	شاش سن سمك القرش 10.97	Open-weave sharkstooth gauze for reveal effects, layering, and projection, flame-retardant.	قماش شاش سن سمك القرش بنسج مفتوح لتأثيرات الكشف وتعدد الطبقات والإسقاط، مقاوم للاشتعال.	/uploads/Fabrics/Scrim Gauze Netting/img9.jpg	39	f
195	\N	1	8pt Sharkstooth 12.0	شاش سن سمك القرش 12.0	Heavy sharkstooth gauze for robust scenic effects and large-scale reveals, flame-retardant.	قماش شاش سن سمك القرش ثقيل لتأثيرات مشهدية قوية وكشف واسع النطاق، مقاوم للاشتعال.	/uploads/Fabrics/Scrim Gauze Netting/img10.jpg	39	f
196	\N	1	8pt Sharkstooth 3.6	شاش سن سمك القرش 3.6	Light sharkstooth gauze for translucent scenic effects and layering, flame-retardant.	قماش شاش سن سمك القرش خفيف لتأثيرات مشهدية شفافة وتعدد الطبقات، مقاوم للاشتعال.	/uploads/Fabrics/Scrim Gauze Netting/img11.jpg	39	f
197	\N	1	8pt Sharkstooth 6.1	شاش سن سمك القرش 6.1	Medium-weight sharkstooth gauze for scenic painting and reveal effects, flame-retardant.	قماش شاش سن سمك القرش متوسط السماكة للرسم المشهدي وتأثيرات الكشف، مقاوم للاشتعال.	/uploads/Fabrics/Scrim Gauze Netting/img12.jpg	39	f
198	\N	1	8pt Sharkstooth 9.75	شاش سن سمك القرش 9.75	Durable sharkstooth gauze for scenic construction, layering, and projection surfaces, flame-retardant.	قماش شاش سن سمك القرش متين للبناء المشهدي وتعدد الطبقات والأسطح البصرية، مقاوم للاشتعال.	/uploads/Fabrics/Scrim Gauze Netting/img13.jpg	39	f
199	\N	1	Sprinkler Gauze	جوز رشاش	Special sprinkler gauze for stage safety, diffusion, and scenic effects, flame-retardant.	قماش جوز خاص للسلامة المسرحية والانتشار والتأثيرات المشهدية، مقاوم للاشتعال.	/uploads/Fabrics/Scrim Gauze Netting/img14.jpg	39	f
200	\N	1	Polysilk Black	بولي سيلك أسود	Durable black polysilk fabric for elegant drapery, scenic decoration and event dressing, flame-retardant.	قماش بولي سيلك أسود متين للستائر الأنيقة والزينة المشهدية وتزيين الفعاليات، مقاوم للاشتعال.	/uploads/Fabrics/Sheers Silks Satins/img1.jpg	40	f
201	\N	1	Polysilk White	بولي سيلك أبيض	Classic white polysilk fabric for projection, drapery and decorative scenic use, flame-retardant.	قماش بولي سيلك أبيض كلاسيكي للإسقاط والستائر والاستخدامات المشهدية الزخرفية، مقاوم للاشتعال.	/uploads/Fabrics/Sheers Silks Satins/img2.jpg	40	f
202	\N	1	1/4 Stop Silk	حرير 1/4 ستوب	Lightweight silk fabric for soft diffusion, drapery and translucent scenic effects, flame-retardant.	قماش حرير خفيف لتأثيرات الانتشار الناعم والستائر والتأثيرات المشهدية الشفافة، مقاوم للاشتعال.	/uploads/Fabrics/Sheers Silks Satins/img3.jpg	40	f
203	\N	1	Diamond Satin	ساتان دايموند	Smooth satin fabric with luxurious finish for decorative drapery, scenic layering and reflective effects.	قماش ساتان ناعم بلمسة فاخرة للستائر الزخرفية وتعدد الطبقات المشهدية والتأثيرات العاكسة، مقاوم للاشتعال.	/uploads/Fabrics/Sheers Silks Satins/img4.jpg	40	f
204	\N	1	Habotai Silk	حرير هابوتاي	Traditional lightweight habotai silk for elegant scenic drapery and decorative use, flame-retardant.	قماش حرير هابوتاي خفيف تقليدي للستائر المشهدية الأنيقة والاستخدامات الزخرفية، مقاوم للاشتعال.	/uploads/Fabrics/Sheers Silks Satins/img5.jpg	40	f
205	\N	1	Laser Gauze	شاش ليزر	Special gauze fabric with reflective properties for lighting effects, diffusion and scenic decoration.	قماش شاش خاص بخصائص عاكسة لتأثيرات الإضاءة والانتشار والزينة المشهدية، مقاوم للاشتعال.	/uploads/Fabrics/Sheers Silks Satins/img6.jpg	40	f
206	\N	1	Poly Silk	بولي سيلك	Versatile poly silk fabric for scenic drapery, event decoration and projection surfaces, flame-retardant.	قماش بولي سيلك متعدد الاستخدامات للستائر المشهدية وتزيين الفعاليات والأسطح البصرية، مقاوم للاشتعال.	/uploads/Fabrics/Sheers Silks Satins/img7.jpg	40	f
207	\N	1	Regal Satin Double Sided	ساتان ملكي مزدوج الوجه	Double-sided satin fabric for luxurious drapery, scenic decoration and reflective stage effects.	قماش ساتان ملكي مزدوج الوجه للستائر الفاخرة والزينة المشهدية وتأثيرات المسرح العاكسة، مقاوم للاشتعال.	/uploads/Fabrics/Sheers Silks Satins/img8.jpg	40	f
208	\N	1	Voile 3.0 DFR	فوال 3.0 DFR	Lightweight decorative flame-retardant voile for soft draping, diffusion and translucent scenic effects.	قماش فوال خفيف مزخرف مقاوم للاشتعال للستائر الناعمة والانتشار والتأثيرات المشهدية الشفافة.	/uploads/Fabrics/Sheers Silks Satins/img9.jpg	40	f
209	\N	1	Voile 3.0 IFR	فوال 3.0 IFR	Inherently flame-retardant voile with soft hand and excellent light diffusion for drapery and event dressing.	قماش فوال مقاوم للاشتعال ذاتيًا بملمس ناعم وانتشار ضوئي ممتاز للستائر وتزيين الفعاليات.	/uploads/Fabrics/Sheers Silks Satins/img10.jpg	40	f
210	\N	1	Voile 4.2	فوال 4.2	Medium-weight voile offering balanced translucency for scenic layering, drapery and projection effects.	قماش فوال متوسط السماكة يوفر شفافية متوازنة لتعدد الطبقات المشهدية والستائر وتأثيرات الإسقاط.	/uploads/Fabrics/Sheers Silks Satins/img11.jpg	40	f
211	\N	1	Voile 45	فوال 45	Classic lightweight voile (approx. 45 gsm) for airy drapes, soft diffusion and decorative backdrops.	قماش فوال خفيف (حوالي 45 جم/م²) لستائر هوائية وانتشار ناعم وخلفيات زخرفية.	/uploads/Fabrics/Sheers Silks Satins/img12.jpg	40	f
212	\N	1	Voile 5.2	فوال 5.2	Durable voile with higher weight for structured drapery, scenic masking and translucent partitions.	قماش فوال متين بوزن أعلى لستائر أكثر تماسكًا والعزل المشهدي والفواصل الشفافة.	/uploads/Fabrics/Sheers Silks Satins/img13.jpg	40	f
213	\N	1	Duchess Velvet	مخمل دوقة	Cotton velvet with luxurious pile, matte or rich finish; improves acoustics and absorbs light; flame-retardant (NDFR).	مخمل قطني بملمس فاخر، بسطح مطفي أو غني؛ يحسن الصوت ويمتص الضوء؛ مقاوم للاشتعال (NDFR).	/uploads/Fabrics/Velvet Natural/img1.jpg	41	f
214	\N	1	Coliseum	مخمل كولوسيوم	Inherently flame-retardant synthetic velvet with rich pile; durable and ideal for stage curtains.	مخمل صناعي مقاوم للاشتعال ذاتيًا بسطح غني؛ متين ومثالي لستائر المسرح.	/uploads/Fabrics/Velvet Synthetic/img1.jpg	42	f
215	\N	1	Norland	مخمل نورلاند	Medium-weight IFR synthetic velvet; versatile for scenic drapery and decorative use.	مخمل صناعي متوسط السماكة مقاوم للاشتعال ذاتيًا؛ متعدد الاستخدامات للستائر والزينة المشهدية.	/uploads/Fabrics/Velvet Synthetic/img2.jpg	42	f
216	\N	1	Palladium	مخمل بالاديوم	West End Collection knitted synthetic velvet; luxurious sheen with IFR properties.	مخمل صناعي من مجموعة ويست إند بسطح محبوك فاخر؛ مقاوم للاشتعال ذاتيًا.	/uploads/Fabrics/Velvet Synthetic/img3.jpg	42	f
217	\N	1	Pure Jet Black Velvet	مخمل أسود نقي	Deep black IFR synthetic velvet; excellent for masking and light absorbency.	مخمل صناعي أسود نقي مقاوم للاشتعال ذاتيًا؛ ممتاز للعزل وامتصاص الضوء.	/uploads/Fabrics/Velvet Synthetic/img4.jpg	42	f
218	\N	1	Rishworth	مخمل ريشوورث	Heavy IFR synthetic velvet; robust and durable for front-of-house drapery.	مخمل صناعي ثقيل مقاوم للاشتعال ذاتيًا؛ قوي ومتين لستائر المسرح الأمامية.	/uploads/Fabrics/Velvet Synthetic/img5.jpg	42	f
219	\N	1	Sowerby	مخمل سووربي	Lightweight IFR synthetic velvet; suitable for decorative scenic use.	مخمل صناعي خفيف مقاوم للاشتعال ذاتيًا؛ مناسب للاستخدامات المشهدية الزخرفية.	/uploads/Fabrics/Velvet Synthetic/img6.jpg	42	f
18	\N	4	2Way Track	مسار 2‑Way	2Way Track is a medium‑duty track system designed for walk‑along operation. It is suitable for side masking drapes, perimeter tracks, window tracks, and dividing drapes, with flexibility to be curved to a minimum radius. Available in silver or black finish.	يُعد 2Way Track نظام مسار متوسط التحمل مصممًا للتشغيل بالسحب اليدوي. مناسب للاستخدام مع الستائر الجانبية، المسارات المحيطية، مسارات النوافذ، والفواصل القماشية، ويمكن ثنيه حتى نصف قطر أدنى. يتوفر بلمسة فضية أو سوداء.	img1.jpg	\N	f
20	\N	4	Erail Track	مسار إيريل	Erail Track is a medium‑duty compact extruded aluminium track, suitable for walk‑along manual, corded, or motorised operation. It bends to tight radii and operates almost silently, ideal for small venues, conference halls, hotels, schools, and similar spaces.	Erail Track هو مسار معدني مدمج من الألومنيوم متوسط التحمل، مناسب للاستخدام اليدوي بالسحب أو بالحبال أو بالتشغيل المحرك. يمكن ثنيه إلى أنصاف أقطار ضيقة ويعمل بصمت تقريبًا، مما يجعله مثاليًا للمسارح الصغيرة، قاعات المؤتمرات، الفنادق، والمدارس.	img3.jpg	\N	f
21	\N	4	UniBeam Track	مسار يونيبيم	UniBeam Track is a heavy‑duty rigid aluminium extrusion designed to be a suspension beam. It can be curved to a minimum radius and accepts standard channel nuts in its slots, making it perfect for permanent heavy installations.	UniBeam Track هو مسار من الألومنيوم عالي التحمل ومتين، مصمم ليكون شعاع تعليق. يمكن ثنيه إلى نصف قطر معين، ويقبل الصواميل القياسية في فتحاته، مما يجعله مثالياً للتركيبات الثقيلة الدائمة.	img4.jpg	\N	f
56	\N	2	StageWare Acoustic Dance	أرضيات راقصة عازلة للصوت للمسارح والاستوديوهات	StageWare Acoustic Dance is a heavy-duty flooring with a flexible cushion backing ideal for stage or studio sound insulation.	أرضية ستاج وير أكوستيك دانس مصممة خصيصًا لتوفير سطح متين ومرن للرقص والعروض المسرحية. تتميز بقدرتها على امتصاص الصدمات وتقليل الضوضاء، مما يجعلها مثالية للاستوديوهات وقاعات التدريب والعروض الحية. أرضياتنا مقاومة للاشتعال ومعتمدة وفق BS 5867، ومتوفرة بألوان متعددة وصباغة مخصصة لتلبية جميع الاحتياجات.	img1.jpg	\N	f
57	\N	2	StageWare Westend	أرضيات متعددة الاستخدامات للفعاليات والمعارض	StageWare Westend is a versatile reversible flooring, perfect for use as a loose-lay covering for events.	أرضية ستاج وير ويست إند مثالية للمسارح وقاعات العروض، حيث توفر سطحًا أنيقًا ومتينًا يتحمل الاستخدام المكثف. تتميز بمقاومتها العالية للتآكل وسهولة التركيب، مما يجعلها مناسبة للإنتاجات المسرحية طويلة الأمد.	img2.jpg	\N	f
58	\N	2	StageWare Mat	أرضيات فعاليات احترافية للمسارح والمعارض	StageWare Mat is a versatile event flooring, perfect for all applications in the event and entertainment industries.	أرضية ستاج وير مات مصممة لتقديم سطح متين وعملي بلمسة نهائية طبيعية غير لامعة. مثالية للاستخدام في العروض المسرحية والمعارض، حيث توفر مظهرًا بسيطًا وأنيقًا مع مقاومة عالية للاستخدام المتكرر.	img3.jpg	\N	f
59	\N	2	StageWare Mat Gloss	أرضيات فينيل لامعة للمسارح وعروض الأزياء	StageWare Mat Gloss is a vinyl flooring with a high-gloss finish suitable for stages, catwalks and award ceremonies.	أرضية ستاج وير مات جلاس تمنح مظهرًا لامعًا وعصريًا مثاليًا للمعارض والعروض التفاعلية. تضيف لمسة جمالية مميزة لأي مساحة، مع سطح مقاوم للخدوش وسهل التنظيف، مما يجعلها مثالية للأحداث التي تتطلب مظهرًا راقيًا.	img4.jpg	\N	f
60	\N	2	StageWare Mat Mirror	أرضيات بسطح عاكس للفعاليات والعروض	StageWare Mat Mirror is a semi-permanent PVC-based mat with a reflective silver or gold laminated top layer.	أرضية ستاج وير مات ميرور توفر لمسة نهائية عاكسة مثالية للعروض والمعارض التي تحتاج إلى مظهر فريد وجذاب. تتميز بمتانتها وسهولة صيانتها، مما يجعلها خيارًا عمليًا وجماليًا في آن واحد.	img5.jpg	\N	f
\.


--
-- TOC entry 4878 (class 0 OID 0)
-- Dependencies: 221
-- Name: products_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_product_id_seq', 219, true);


--
-- TOC entry 4726 (class 2606 OID 16872)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);


-- Completed on 2026-02-26 11:36:13

--
-- PostgreSQL database dump complete
--

