-- Adminer 4.8.1 PostgreSQL 12.12 (Debian 12.12-1.pgdg110+1) dump

DROP TABLE IF EXISTS "product";
DROP SEQUENCE IF EXISTS product_id_seq;
CREATE SEQUENCE product_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE TABLE "public"."product" (
    "id" bigint DEFAULT nextval('product_id_seq') NOT NULL,
    "name" text NOT NULL,
    "category" text NOT NULL,
    "price" numeric NOT NULL,
    "currency" character varying(3) NOT NULL,
    "bestseller" boolean NOT NULL,
    "featured" boolean NOT NULL,
    "details" json,
    "imageUrl" text NOT NULL,
    "imageAlt" text NOT NULL,
    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "product" ("id", "name", "category", "price", "currency", "bestseller", "featured", "details", "imageUrl", "imageAlt") VALUES
(1,	'Red Bench',	'people',	3.89,	'USD',	'1',	'0',	NULL,	'https://images.pexels.com/photos/326259/pexels-photo-326259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',	'View from car'),
(2,	'Waterfall',	'landmarks',	93.89,	'USD',	'0',	'0',	NULL,	'https://images.pexels.com/photos/1020016/pexels-photo-1020016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',	''),
(3,	'Reading',	'people',	100,	'USD',	'0',	'0',	NULL,	'https://images.pexels.com/photos/1524232/pexels-photo-1524232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',	''),
(4,	'Samurai King Restling',	'pets',	101,	'USD',	'0',	'1',	NULL,	'https://images.pexels.com/photos/2187304/pexels-photo-2187304.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',	''),
(5,	'Diver',	'people',	80,	'USD',	'0',	'0',	NULL,	'https://images.pexels.com/photos/2765871/pexels-photo-2765871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',	''),
(6,	'Holliday',	'landmarks',	60,	'USD',	'0',	'0',	NULL,	'https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',	''),
(7,	'Breakfast',	'food',	55,	'USD',	'0',	'0',	NULL,	'https://images.pexels.com/photos/5720809/pexels-photo-5720809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',	'');

DROP TABLE IF EXISTS "recommendation";
CREATE TABLE "public"."recommendation" (
    "product_id" bigint NOT NULL,
    "recommended_product_id" bigint NOT NULL
) WITH (oids = false);

INSERT INTO "recommendation" ("product_id", "recommended_product_id") VALUES
(4,	1),
(4,	2),
(4,	3);

ALTER TABLE ONLY "public"."recommendation" ADD CONSTRAINT "recommendation_product_id_fkey" FOREIGN KEY (product_id) REFERENCES product(id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."recommendation" ADD CONSTRAINT "recommendation_recommended_product_id_fkey" FOREIGN KEY (recommended_product_id) REFERENCES product(id) NOT DEFERRABLE;

-- 2022-10-05 06:43:32.218807+00
