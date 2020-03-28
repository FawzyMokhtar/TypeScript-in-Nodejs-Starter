--
-- PostgreSQL database dump
--

-- Dumped from database version 11.7 (Ubuntu 11.7-2.pgdg18.04+1)
-- Dumped by pg_dump version 11.7 (Ubuntu 11.7-2.pgdg18.04+1)

-- Started on 2020-03-28 17:19:29 EET

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
-- TOC entry 2978 (class 1262 OID 17060)
-- Name: typescript_in_nodejs_starter_db; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE typescript_in_nodejs_starter_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


ALTER DATABASE typescript_in_nodejs_starter_db OWNER TO postgres;

\connect typescript_in_nodejs_starter_db

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

SET default_with_oids = false;

--
-- TOC entry 197 (class 1259 OID 17063)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id bigint NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 17061)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO postgres;

--
-- TOC entry 2979 (class 0 OID 0)
-- Dependencies: 196
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 199 (class 1259 OID 17071)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id bigint NOT NULL,
    name character varying(50) NOT NULL,
    price numeric(19,2) NOT NULL,
    "categoryId" bigint NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 17069)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO postgres;

--
-- TOC entry 2980 (class 0 OID 0)
-- Dependencies: 198
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 2841 (class 2604 OID 17066)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 2842 (class 2604 OID 17074)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 2970 (class 0 OID 17063)
-- Dependencies: 197
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categories (id, name) VALUES (1, 'Mobiles');
INSERT INTO public.categories (id, name) VALUES (2, 'Laptops');
INSERT INTO public.categories (id, name) VALUES (3, 'TVs');


--
-- TOC entry 2972 (class 0 OID 17071)
-- Dependencies: 199
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.products (id, name, price, "categoryId") VALUES (1, 'Samsung Galaxy S5', 4500.00, 1);
INSERT INTO public.products (id, name, price, "categoryId") VALUES (2, 'Samsung Galaxy S6', 5000.00, 1);
INSERT INTO public.products (id, name, price, "categoryId") VALUES (3, 'Huawei P10 Lite', 5200.00, 1);
INSERT INTO public.products (id, name, price, "categoryId") VALUES (4, 'Huawei P30', 6500.00, 1);
INSERT INTO public.products (id, name, price, "categoryId") VALUES (5, 'Huawei P30 Lite', 5800.00, 1);
INSERT INTO public.products (id, name, price, "categoryId") VALUES (6, 'Dell Inspiron 5520', 12000.00, 2);
INSERT INTO public.products (id, name, price, "categoryId") VALUES (7, 'Dell Precision M6800', 15000.00, 2);
INSERT INTO public.products (id, name, price, "categoryId") VALUES (8, 'Toshiba Pro-Book 9099', 7000.00, 2);
INSERT INTO public.products (id, name, price, "categoryId") VALUES (9, 'Toshiba Pro-Book 5520', 3500.00, 2);
INSERT INTO public.products (id, name, price, "categoryId") VALUES (10, 'HP Z-Book', 11000.00, 2);
INSERT INTO public.products (id, name, price, "categoryId") VALUES (11, 'JAC 55 Inch Full HD LED Smart Android TV - 55ASS', 5200.00, 3);
INSERT INTO public.products (id, name, price, "categoryId") VALUES (12, 'UnionAir 32 Inch HD LED TV - M-LD-32UN-PB816-EXD', 1900.00, 3);
INSERT INTO public.products (id, name, price, "categoryId") VALUES (13, 'Toshiba 32 Inch HD LED TV - 32L2600EA', 3290.00, 3);
INSERT INTO public.products (id, name, price, "categoryId") VALUES (14, 'Tornado 32 Inch LED HD TV - Black, 32EL7200E', 3150.00, 3);
INSERT INTO public.products (id, name, price, "categoryId") VALUES (15, 'Samsung 32 Inch HD LED Standard TV - UA32K4000', 3550.00, 3);


--
-- TOC entry 2981 (class 0 OID 0)
-- Dependencies: 196
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 3, true);


--
-- TOC entry 2982 (class 0 OID 0)
-- Dependencies: 198
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 15, true);


--
-- TOC entry 2844 (class 2606 OID 17068)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 2846 (class 2606 OID 17076)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 2847 (class 2606 OID 17077)
-- Name: products products_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.categories(id);


-- Completed on 2020-03-28 17:19:29 EET

--
-- PostgreSQL database dump complete
--

