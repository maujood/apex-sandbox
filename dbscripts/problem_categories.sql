-- Table: public.problem_categories

-- DROP TABLE IF EXISTS public.problem_categories;

CREATE TABLE IF NOT EXISTS public.problem_categories
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    title character varying(255) COLLATE pg_catalog."default",
    ordinal integer,
    created_at timestamp with time zone DEFAULT now(),
    info_identifier text COLLATE pg_catalog."default",
    CONSTRAINT "problemCategories_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.problem_categories
    OWNER to tpdeakuxrrczut;

COMMENT ON COLUMN public.problem_categories.info_identifier
    IS 'Used on the UI to display extra information about problems in this category';