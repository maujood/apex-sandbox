-- Table: public.problems

-- DROP TABLE IF EXISTS public.problems;

CREATE TABLE IF NOT EXISTS public.problems
(
    title character varying(80) COLLATE pg_catalog."default" NOT NULL,
    problem_statement text COLLATE pg_catalog."default" NOT NULL,
    method text COLLATE pg_catalog."default" NOT NULL,
    hints text[] COLLATE pg_catalog."default",
    test_cases text[] COLLATE pg_catalog."default",
    id integer NOT NULL DEFAULT nextval('"problems_Id_seq"'::regclass),
    active boolean,
    category_id integer,
    ordinal integer,
    created_at timestamp with time zone DEFAULT now(),
    contributor_id integer,
    CONSTRAINT problems_pkey PRIMARY KEY (id),
    CONSTRAINT fki_fk_contributorid_problem FOREIGN KEY (contributor_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fki_fk_problemcategoryid_problem FOREIGN KEY (category_id)
        REFERENCES public.problem_categories (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.problems
    OWNER to tpdeakuxrrczut;
-- Index: fki_fk_problemcategoryid_problem

-- DROP INDEX IF EXISTS public.fki_fk_problemcategoryid_problem;

CREATE INDEX IF NOT EXISTS fki_fk_problemcategoryid_problem
    ON public.problems USING btree
    (category_id ASC NULLS LAST)
    TABLESPACE pg_default;