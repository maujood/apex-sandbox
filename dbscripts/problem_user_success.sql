-- Table: public.problem_user_success

-- DROP TABLE IF EXISTS public.problem_user_success;

CREATE TABLE IF NOT EXISTS public.problem_user_success
(
    user_id integer NOT NULL,
    problem_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT problem_user_success_pk PRIMARY KEY (user_id, problem_id),
    CONSTRAINT fk_problem_user_success_problem_id FOREIGN KEY (problem_id)
        REFERENCES public.problems (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_problem_user_success_user_id FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.problem_user_success
    OWNER to tpdeakuxrrczut;
-- Index: fki_fk_problem_user_success_problem_id

-- DROP INDEX IF EXISTS public.fki_fk_problem_user_success_problem_id;

CREATE INDEX IF NOT EXISTS fki_fk_problem_user_success_problem_id
    ON public.problem_user_success USING btree
    (problem_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_fk_problem_user_success_user_id

-- DROP INDEX IF EXISTS public.fki_fk_problem_user_success_user_id;

CREATE INDEX IF NOT EXISTS fki_fk_problem_user_success_user_id
    ON public.problem_user_success USING btree
    (user_id ASC NULLS LAST)
    TABLESPACE pg_default;