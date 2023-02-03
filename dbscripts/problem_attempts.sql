-- Table: public.problem_attempts

-- DROP TABLE IF EXISTS public.problem_attempts;

CREATE TABLE IF NOT EXISTS public.problem_attempts
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    user_id integer,
    problem_id integer NOT NULL,
    submitted_code text COLLATE pg_catalog."default",
    success boolean NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    exec_ms integer,
    CONSTRAINT "problemAttempts_pkey" PRIMARY KEY (id),
    CONSTRAINT "problemAttempts_ProblemId_fkey" FOREIGN KEY (problem_id)
        REFERENCES public.problems (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "problemAttempts_UserId_fkey" FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.problem_attempts
    OWNER to tpdeakuxrrczut;

COMMENT ON COLUMN public.problem_attempts.user_id
    IS 'The user that attempted the problem';
-- Index: fki_fk_problemAttempt_problemid

-- DROP INDEX IF EXISTS public."fki_fk_problemAttempt_problemid";

CREATE INDEX IF NOT EXISTS "fki_fk_problemAttempt_problemid"
    ON public.problem_attempts USING btree
    (problem_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_fk_userid_problemid

-- DROP INDEX IF EXISTS public.fki_fk_userid_problemid;

CREATE INDEX IF NOT EXISTS fki_fk_userid_problemid
    ON public.problem_attempts USING btree
    (user_id ASC NULLS LAST)
    TABLESPACE pg_default;