--
-- PostgreSQL database dump
--

\restrict 2LXkkJ3RxXh4sWUD2Pz7iZgmRGra5qJDpENMhrPo5G7bnNoIzANgzmTStGQLjVh

-- Dumped from database version 16.13 (Debian 16.13-1.pgdg13+1)
-- Dumped by pg_dump version 16.13 (Debian 16.13-1.pgdg13+1)

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
-- Name: movie_night_groups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.movie_night_groups (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    invite_code character varying(50) NOT NULL
);


--
-- Name: movie_night_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.movie_night_groups ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.movie_night_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: movie_night_members; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.movie_night_members (
    user_id integer NOT NULL,
    movie_night_group_id integer NOT NULL
);


--
-- Name: movie_ratings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.movie_ratings (
    id integer NOT NULL,
    watched_movie_id integer NOT NULL,
    user_id integer NOT NULL,
    rating integer,
    comment text
);


--
-- Name: movie_ratings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.movie_ratings ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.movie_ratings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: movies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.movies (
    id integer NOT NULL,
    genre_ids json,
    overview text,
    release_date date,
    poster_path character varying(255),
    title character varying(255) NOT NULL,
    tmdb_id integer NOT NULL,
    added_by integer,
    trailer_url character varying(255),
    added_on date DEFAULT CURRENT_DATE
);


--
-- Name: movies_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.movies ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.movies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(30),
    image character varying(255),
    provider character varying(255) NOT NULL,
    provider_account_id character varying(255) NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: vote_session_movies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vote_session_movies (
    id integer NOT NULL,
    vote_session_id integer NOT NULL,
    movie_id integer NOT NULL
);


--
-- Name: vote_session_movies_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.vote_session_movies ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.vote_session_movies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: vote_sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vote_sessions (
    id integer NOT NULL,
    created_by integer NOT NULL,
    movie_night_date date NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying(20) DEFAULT 'in_progress'::character varying NOT NULL
);


--
-- Name: vote_sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.vote_sessions ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.vote_sessions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: votes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.votes (
    id integer NOT NULL,
    vote_session_id integer NOT NULL,
    user_id integer,
    movie_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: votes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.votes ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.votes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: watched_movies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.watched_movies (
    id integer NOT NULL,
    movie_id integer NOT NULL,
    watched_on date,
    chosen_by integer
);


--
-- Name: watched_movies_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.watched_movies ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.watched_movies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: movie_night_groups movie_night_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movie_night_groups
    ADD CONSTRAINT movie_night_groups_pkey PRIMARY KEY (id);


--
-- Name: movie_night_members movie_night_members_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movie_night_members
    ADD CONSTRAINT movie_night_members_pkey PRIMARY KEY (user_id, movie_night_group_id);


--
-- Name: movie_ratings movie_ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movie_ratings
    ADD CONSTRAINT movie_ratings_pkey PRIMARY KEY (id);


--
-- Name: movie_ratings movie_ratings_watched_movie_id_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movie_ratings
    ADD CONSTRAINT movie_ratings_watched_movie_id_user_id_key UNIQUE (watched_movie_id, user_id);


--
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (id);


--
-- Name: movies movies_tmdb_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_tmdb_id_key UNIQUE (tmdb_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_provider_provider_account_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_provider_provider_account_id_key UNIQUE (provider, provider_account_id);


--
-- Name: vote_session_movies vote_session_movies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vote_session_movies
    ADD CONSTRAINT vote_session_movies_pkey PRIMARY KEY (id);


--
-- Name: vote_session_movies vote_session_movies_vote_session_id_movie_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vote_session_movies
    ADD CONSTRAINT vote_session_movies_vote_session_id_movie_id_key UNIQUE (vote_session_id, movie_id);


--
-- Name: vote_sessions vote_sessions_movie_night_date_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vote_sessions
    ADD CONSTRAINT vote_sessions_movie_night_date_key UNIQUE (movie_night_date);


--
-- Name: vote_sessions vote_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vote_sessions
    ADD CONSTRAINT vote_sessions_pkey PRIMARY KEY (id);


--
-- Name: votes votes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_pkey PRIMARY KEY (id);


--
-- Name: votes votes_vote_session_id_user_id_movie_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_vote_session_id_user_id_movie_id_key UNIQUE (vote_session_id, user_id, movie_id);


--
-- Name: watched_movies watched_movies_movie_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.watched_movies
    ADD CONSTRAINT watched_movies_movie_id_key UNIQUE (movie_id);


--
-- Name: watched_movies watched_movies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.watched_movies
    ADD CONSTRAINT watched_movies_pkey PRIMARY KEY (id);


--
-- Name: movie_night_members movie_night_members_movie_night_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movie_night_members
    ADD CONSTRAINT movie_night_members_movie_night_group_id_fkey FOREIGN KEY (movie_night_group_id) REFERENCES public.movie_night_groups(id) ON DELETE CASCADE;


--
-- Name: movie_night_members movie_night_members_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movie_night_members
    ADD CONSTRAINT movie_night_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: movie_ratings movie_ratings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movie_ratings
    ADD CONSTRAINT movie_ratings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: movie_ratings movie_ratings_watched_movie_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movie_ratings
    ADD CONSTRAINT movie_ratings_watched_movie_id_fkey FOREIGN KEY (watched_movie_id) REFERENCES public.watched_movies(id) ON DELETE CASCADE;


--
-- Name: movies movies_added_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_added_by_fkey FOREIGN KEY (added_by) REFERENCES public.users(id);


--
-- Name: vote_session_movies vote_session_movies_movie_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vote_session_movies
    ADD CONSTRAINT vote_session_movies_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES public.movies(id);


--
-- Name: vote_session_movies vote_session_movies_vote_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vote_session_movies
    ADD CONSTRAINT vote_session_movies_vote_session_id_fkey FOREIGN KEY (vote_session_id) REFERENCES public.vote_sessions(id) ON DELETE CASCADE;


--
-- Name: vote_sessions vote_sessions_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vote_sessions
    ADD CONSTRAINT vote_sessions_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- Name: votes votes_movie_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES public.movies(id) ON DELETE CASCADE;


--
-- Name: votes votes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: votes votes_vote_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_vote_session_id_fkey FOREIGN KEY (vote_session_id) REFERENCES public.vote_sessions(id) ON DELETE CASCADE;


--
-- Name: watched_movies watched_movies_chosen_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.watched_movies
    ADD CONSTRAINT watched_movies_chosen_by_fkey FOREIGN KEY (chosen_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: watched_movies watched_movies_movie_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.watched_movies
    ADD CONSTRAINT watched_movies_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES public.movies(id);


--
-- PostgreSQL database dump complete
--

\unrestrict 2LXkkJ3RxXh4sWUD2Pz7iZgmRGra5qJDpENMhrPo5G7bnNoIzANgzmTStGQLjVh

