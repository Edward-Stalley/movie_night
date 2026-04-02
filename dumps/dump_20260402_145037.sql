--
-- PostgreSQL database dump
--

\restrict 0YW5sLgwdHAZed9pI1yqCiMJEhsSa3tTOhcJTjyvc8RWJFshf6SOhOhNAkiduQS

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
-- Data for Name: movie_night_groups; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: movie_night_members; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: movie_ratings; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (1, '[878,28]', 'On a distant space station far in the future, the best fighters from every planet vie for the championship in an intergalactic fighting competition. After over fifty years of no human contenders, Steve Armstrong emerges having trained all his life for a shot at the title, only to come up against a ruthless extra-terrestrial crime lord who wants him dead.', '1989-03-29', '/1T4k7EsxqLm1UgjUUiOZjqXWdIg.jpg', 'Arena', 44796, 1, 'https://www.youtube.com/watch?v=fHKnU-YkOE4', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (2, '[27,18]', 'In Justine''s family everyone is a vet and a vegetarian. At 16, she''s a gifted teen ready to take on her first year in vet school, where her older sister also studies. There, she gets no time to settle: hazing starts right away. Justine is forced to eat raw meat for the first time in her life. Unexpected consequences emerge as her true self begins to form.', '2017-03-10', '/kc8jT1MAiKM0iwdjAwC5lQrTNry.jpg', 'Raw', 393519, 1, 'https://www.youtube.com/watch?v=cdDZpQGsM5U', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (3, '[27,878]', 'In Arborville, California, three high school students try to protect their hometown from a gelatinous alien life form that engulfs everything it touches.', '1988-08-05', '/zXXDmz5cPuSo9LveCNjZ1j16szC.jpg', 'The Blob', 9599, 1, 'https://www.youtube.com/watch?v=vq0our4mceQ', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (4, '[27,878]', 'An evil alien brain, bent on world domination, takes over the body of an atomic scientist, while a "good" alien brain inhabits the body of the scientist''s dog and waits for an opportunity to defeat the evil brain.', '1957-12-26', '/vpxIaxnnld60lEI5Ix8gQVsNDtg.jpg', 'The Brain from Planet Arous', 43248, 1, 'https://www.youtube.com/watch?v=Z2Ml7XzYZCg', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (5, '[35,18]', 'An 18th birthday mushroom trip brings free-spirited Elliott face-to-face with her wisecracking 39-year-old self. But when Elliott’s "old ass" starts handing out warnings about what her younger self should and shouldn''t do, Elliott realizes she has to rethink everything about family, love, and what''s becoming a transformative summer.', '2024-09-13', '/yUs4Sw9AyTg2sA1qWBkNpD2mGSj.jpg', 'My Old Ass', 947891, 1, 'https://www.youtube.com/watch?v=Yvks3SeCDOs', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (6, '[27]', 'Teenagers in a small town are dropping like flies, apparently in the grip of mass hysteria causing their suicides. A cop''s daughter, Nancy Thompson, traces the cause to child molester Fred Krueger, who was burned alive by angry parents many years before. Krueger has now come back in the dreams of his killers'' children, claiming their lives as his revenge. Nancy and her boyfriend, Glen, must devise a plan to lure the monster out of the realm of nightmares and into the real world...', '1984-11-09', '/wGTpGGRMZmyFCcrY2YoxVTIBlli.jpg', 'A Nightmare on Elm Street', 377, 1, 'https://www.youtube.com/watch?v=CBcVZcornjI', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (7, '[80,36,18]', 'When oil is discovered in 1920s Oklahoma under Osage Nation land, the Osage people are murdered one by one—until the FBI steps in to unravel the mystery.', '2023-10-18', '/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg', 'Killers of the Flower Moon', 466420, 1, 'https://www.youtube.com/watch?v=1oZUCkJEuvo', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (8, '[18,36]', 'The true story of technical troubles that scuttle the Apollo 13 lunar mission in 1970, risking the lives of astronaut Jim Lovell and his crew, with the failed journey turning into a thrilling saga of heroism. Drifting more than 200,000 miles from Earth, the astronauts work furiously with the ground crew to avert tragedy.', '1995-06-30', '/tVeKscCm2fY1xDXZk8PgnZ87h9S.jpg', 'Apollo 13', 568, 1, 'https://www.youtube.com/watch?v=B1KJ9XeZuxA', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (9, '[18,10402,10749]', 'A victim of his own anger, the Kid is a Minneapolis musician on the rise with his band, the Revolution, escaping a tumultuous home life through music. While trying to avoid making the same mistakes as his truculent father, the Kid navigates the club scene and a rocky relationship with a captivating singer, Apollonia. But another musician, Morris, looks to steal the Kid''s spotlight -- and his girl.', '1984-07-27', '/vkQmzaSuDj8QyXmwNhCceCAmwUe.jpg', 'Purple Rain', 13763, 1, 'https://www.youtube.com/watch?v=fzp2HP4gaJ0', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (10, '[18]', 'In seaside Italy, a Holocaust survivor with a daycare business takes in a 12-year-old street kid who recently robbed her.', '2020-11-03', '/6oTn5kXRS84exXTC7XcqotKZu9B.jpg', 'The Life Ahead', 667869, 1, 'https://www.youtube.com/watch?v=a0ejncDxgCc', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (11, '[12,10751,14]', 'Dorothy, saved from a psychiatric experiment by a mysterious girl, finds herself back in the land of her dreams, and makes delightful new friends, and dangerous new enemies.', '1985-06-21', '/zKaH6CbrgxNLw9lsEinLxx173Tw.jpg', 'Return to Oz', 13155, 1, 'https://www.youtube.com/watch?v=14EEGw_sdDQ', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (12, '[12,14,28,35,10751]', 'After his father''s death, a young boy finds solace in action movies featuring an indestructible cop. Given a magic ticket by a theater manager, he is transported into the film and teams up with the cop to stop a villain who escapes into the real world.', '1993-06-18', '/vkhEaWAv5j3qgrOGp3BgMeiYPKj.jpg', 'Last Action Hero', 9593, 1, 'https://www.youtube.com/watch?v=OJw8o49CNZI', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (13, '[18,36]', 'The commandant of Auschwitz, Rudolf Höss, and his wife Hedwig, strive to build a dream life for their family in a house and garden next to the camp.', '2023-12-15', '/hUu9zyZmDd8VZegKi1iK1Vk0RYS.jpg', 'The Zone of Interest', 467244, 1, 'https://www.youtube.com/watch?v=GFNtVaAuVYY', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (14, '[18,35,10752]', 'Chickie wants to support his friends fighting in Vietnam, so he does something wild—personally bring them American beer. What starts as a well-meaning journey quickly changes Chickie''s life and perspective.', '2022-09-23', '/ggf37TpcKaxwguhvtNn6MQpyqBn.jpg', 'The Greatest Beer Run Ever', 597922, 1, 'https://www.youtube.com/watch?v=NqxziDlZOIo', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (15, '[18,27]', 'In rural Connecticut, baseball players Ben and Mickey are trying to survive a zombie plague. They are forced to form a battery: a catcher and a pitcher who work together to outwit the batter, the one who hits the ball. And the batter in this case just happens to be a zombie. Tough Ben and gentle Mickey frequently disagree on the best way to go about the situation. Then they suddenly hear a human voice through their walkie-talkies. Is salvation nearby, like Mickey thinks, or is Ben’s suspicion justified?', '2012-10-13', '/nI7lzx2t4UPfuqhunB5bEVymOOV.jpg', 'The Battery', 177221, 1, 'https://www.youtube.com/watch?v=TO3_WO2YfGo', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (16, '[878,12]', 'Starship C57D travels to planet Altair 4 in search of the crew of spaceship "Bellerophon," a scientific expedition that has been missing for twenty years. They find themselves unwelcome by the expedition''s lone survivor and warned of destruction by an invisible force if they don''t turn back immediately.', '1956-03-23', '/aq0OQfRS7hDDI8vyD0ICbH9eguC.jpg', 'Forbidden Planet', 830, 1, 'https://www.youtube.com/watch?v=dU8g84K2M3Q', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (17, '[878,53,16]', 'When a machine that allows therapists to enter their patient''s dreams is stolen, all hell breaks loose. Only a young female therapist can stop it and recover it before damage is done: Paprika.', '2006-10-01', '/bLUUr474Go1DfeN1HLjE3rnZXBq.jpg', 'Paprika', 4977, 1, 'https://www.youtube.com/watch?v=a6avI9oPgnw', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (18, '[27,35,53,18,10749]', 'When an unsuspecting town newcomer is drawn to local blood fiends, the Frog brothers and other unlikely heroes gear up to rescue him.', '1987-07-31', '/nH1lvyQvfbL5GKScTtT6zkIvDEn.jpg', 'The Lost Boys', 1547, 1, 'https://www.youtube.com/watch?v=Q786UsnOcsY', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (39, '[9648,878]', 'A man struggles with memories of his past, including a wife he cannot remember, in a nightmarish world with no sun and run by beings with telekinetic powers who seek the souls of humans.', '1998-02-27', '/tNPEGju4DpTdbhBphNmZoEi9Bd3.jpg', 'Dark City', 2666, 1, 'https://www.youtube.com/watch?v=30mmoegSQCs', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (19, '[27]', 'Nerdy high schooler Arnie Cunningham falls for Christine, a rusty 1958 Plymouth Fury, and becomes obsessed with restoring the classic automobile to her former glory. As the car changes, so does Arnie, whose newfound confidence turns to arrogance behind the wheel of his exotic beauty. Arnie''s girlfriend Leigh and best friend Dennis reach out to him, only to be met by a Fury like no other.', '1983-12-09', '/mMtUJke2TtIoT6JB9hkvERmsSu8.jpg', 'Christine', 8769, 1, 'https://www.youtube.com/watch?v=wMoHFqV3aX8', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (20, '[9648,27,53]', 'After tracing the origin of a disturbing supernatural affliction to a wealthy family''s ancestral gravesite, a team of paranormal experts relocates the remains—and soon discovers what happens to those who dare to mess with the wrong grave.', '2024-02-22', '/6dasJ58GGFcC62H9KuukAryltUp.jpg', 'Exhuma', 838209, 1, 'https://www.youtube.com/watch?v=j_6_wLF1pDg', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (21, '[35,12,10751]', 'The eccentric and childish Pee-wee Herman embarks on a big adventure when his beloved bicycle is stolen. Armed with information from a fortune-teller and a relentless obsession with his prized possession, Pee-wee encounters a host of odd characters and bizarre situations as he treks across the country to recover his bike.', '1985-07-26', '/414IUXc54mrhX88ZUQiRDLXn01i.jpg', 'Pee-wee''s Big Adventure', 5683, 1, 'https://www.youtube.com/watch?v=1UWsZ9k3Rds', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (22, '[14,27]', 'A group of students investigates a series of mysterious bear killings, but learns that there are much more dangerous things going on. They start to follow a mysterious hunter, learning that he is actually a troll hunter.', '2010-10-29', '/v2W5NEz0p9jPFzbbYt0dP86gsOX.jpg', 'Troll Hunter', 46146, 1, 'https://www.youtube.com/watch?v=uvwEyHeRSvE', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (23, '[35,27,53]', 'In a suburban community, moms and dads, one after the other, mysteriously feel the irresistible impulse to attack and kill their own offspring.', '2018-01-19', '/vjjFEFMhENFQUmUn15zGaCJBD0A.jpg', 'Mom and Dad', 401561, 1, 'https://www.youtube.com/watch?v=O4Kb40pnoOY', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (24, '[80,53,28]', 'When his longtime partner on the force is killed, reckless U.S. Secret Service agent Richard Chance vows revenge, setting out to nab dangerous counterfeit artist Eric Masters.', '1985-11-01', '/2iW3pSihBIhXjnBQmUJ0mAiZbB5.jpg', 'To Live and Die in L.A.', 9846, 1, 'https://www.youtube.com/watch?v=haDl-oPkWEc', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (25, '[35,878]', 'A down and out young punk gets a job working with a seasoned repo man, but what awaits him in his new career is a series of outlandish adventures revolving around aliens, the CIA, and a most wanted ''64 Chevy.', '1984-03-02', '/bjuu5UceuVUNUjnOC2fBzL3hZKC.jpg', 'Repo Man', 13820, 1, 'https://www.youtube.com/watch?v=NK8ETgSLRpA', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (26, '[27]', 'An eight minute abridgment of the 1941 feature, The Wolf Man, released in the 1960''s to the 16mm home movie market.', '1966-02-04', '/aEyyRpuYkiWc8iDTAXIfclZDf0C.jpg', 'The Wolfman', 1623949, 1, NULL, '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (27, '[27,53]', 'Tommy Jarvis, tormented by the fear that maybe Jason isn''t really dead, unwittingly resurrects the mass murderer for another bloody rampage.', '1986-08-01', '/6vdUpHvkspQonXBdWcLWW5ciEPJ.jpg', 'Jason Lives - Friday the 13th Part VI', 10225, 1, 'https://www.youtube.com/watch?v=4ETsQHtUqcs', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (28, '[18,27,53]', 'A disgraced children''s puppeteer returns to his childhood home and is forced to confront his wicked stepfather and the secrets that have tortured him his entire life.', '2018-10-26', '/5QOFKSpE7KacBriU95fxG6hmmvr.jpg', 'Possum', 472269, 1, 'https://www.youtube.com/watch?v=O5jaqmQyAJw', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (29, '[14,27,35]', 'After receiving an exotic small animal as a Christmas gift, a young man inadvertently breaks three important rules concerning his new pet, which unleashes a horde of malevolently mischievous creatures on a small town.', '1984-06-08', '/6m0F7fsXjQvUbCZrPWcJNrjvIui.jpg', 'Gremlins', 927, 1, 'https://www.youtube.com/watch?v=FlGZym-IpZQ', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (30, '[35,27,14]', 'Young sweethearts Billy and Kate move to the Big Apple, land jobs in a high-tech office park and soon reunite with the friendly and lovable Gizmo. But a series of accidents creates a whole new generation of Gremlins. The situation worsens when the devilish green creatures invade a top-secret laboratory and develop genetically altered powers, making them even harder to destroy!', '1990-06-15', '/35F5yD7MljvBE2AC0NHAVCoPGEi.jpg', 'Gremlins 2: The New Batch', 928, 1, 'https://www.youtube.com/watch?v=fFprlfaMdpQ', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (31, '[35]', 'Sportswriter Andy Farmer moves with his schoolteacher wife Elizabeth to the country in order to write a novel in relative seclusion. Of course, seclusion is the last thing the Farmers find in the small, eccentric town, where disaster awaits them at every turn.', '1988-06-03', '/i4ExIbPuAe0rAjpYcteiFx4QEfY.jpg', 'Funny Farm', 14170, 1, 'https://www.youtube.com/watch?v=UVzkcK0yhUc', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (32, '[18]', 'Sal is the Italian owner of a pizzeria in Brooklyn. A neighborhood local, Buggin'' Out, becomes upset when he sees that the pizzeria''s Wall of Fame exhibits only Italian actors. Buggin'' Out believes a pizzeria in a black neighborhood should showcase black actors, but Sal disagrees. The wall becomes a symbol of racism and hate to Buggin'' Out and to other people in the neighborhood, and tensions rise.', '1989-06-14', '/63rmSDPahrH7C1gEFYzRuIBAN9W.jpg', 'Do the Right Thing', 925, 1, 'https://www.youtube.com/watch?v=yVAD4fYRcvA', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (33, '[12,10751,14]', 'On another planet in the distant past, a Gelfling embarks on a quest to find the missing shard of a magical crystal and restore order to his world, before the grotesque race of Skeksis find and use the crystal for evil.', '1982-12-17', '/fZPxRaa6gvCyGCh9Xk5kyPqz7fp.jpg', 'The Dark Crystal', 11639, 1, 'https://www.youtube.com/watch?v=P5Dj3jhy7xM', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (34, '[27]', 'A young woman left her family for an unspecified reason. The husband determines to find out the truth and starts following his wife. At first, he suspects that a man is involved. But gradually, he finds out more and more strange behaviors and bizarre incidents that indicate something more than a possessed love affair.', '1981-05-27', '/dSxz8VWHVleJXdIce9D0ujkmJNI.jpg', 'Possession', 21484, 1, 'https://www.youtube.com/watch?v=aLXW-oVbTxE', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (35, '[18,36]', 'When an innovative modern architect flees post-war Europe, he is given the opportunity to rebuild his legacy. Set during the dawn of the modern United States (in Pennsylvania), his wife joins him, and their lives are forever changed by a demanding, wealthy patron.', '2024-12-20', '/vP7Yd6couiAaw9jgMd5cjMRj3hQ.jpg', 'The Brutalist', 549509, 1, 'https://www.youtube.com/watch?v=GdRXPAHIEW4', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (36, '[10749,35,10402]', 'An on-the-lam punk rocker and a young woman obsessed with a local band go on an unexpected and epic journey together through the decaying suburbs of the American Midwest.', '2020-05-27', '/t63UhnHaWQGcuE3pViuW3LSjBJj.jpg', 'Dinner in America', 653664, 1, 'https://www.youtube.com/watch?v=W5QEZbHdC6c', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (37, '[37,28,18,10749,53]', 'A mysterious woman comes to compete in a quick-draw elimination tournament, in a town taken over by a notorious gunman.', '1995-02-09', '/jhEmrXJpP6F3cqwyLjvgBgxxxFA.jpg', 'The Quick and the Dead', 12106, 1, 'https://www.youtube.com/watch?v=Lo9cGqmHXhg', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (38, '[37]', 'While the Civil War rages on between the Union and the Confederacy, three men – a quiet loner, a ruthless hitman, and a Mexican bandit – comb the American Southwest in search of a strongbox containing $200,000 in stolen gold.', '1966-12-23', '/bX2xnavhMYjWDoZp1VM6VnU1xwe.jpg', 'The Good, the Bad and the Ugly', 429, 1, 'https://www.youtube.com/watch?v=WCnRSl24FPA', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (40, '[80,18,878,53]', 'In the last days of 1999, ex-cop turned street hustler Lenny Nero receives a disc which contains the memories of the murder of a prostitute. With the help of bodyguard Mace, he starts to investigate and is pulled deeper and deeper in a whirl of murder, blackmail and intrigue.', '1995-10-13', '/rY5BrDRcYAKE0BYmmT66YG6Uy5Q.jpg', 'Strange Days', 281, 1, 'https://www.youtube.com/watch?v=t3vX5XRpV9c', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (41, '[35,80]', 'When a childless couple—an ex-con and an ex-cop—take one of a wealthy family’s quintuplets to raise as their own, their lives grow more complicated than anticipated.', '1987-03-13', '/niKyjOqiB4XVl0BqgKTHIlHOCeF.jpg', 'Raising Arizona', 378, 1, 'https://www.youtube.com/watch?v=OjWu8i6eMZo', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (42, '[27,14]', 'When young Joshua learns that he will be going on vacation with his family to a small town called Nilbog, he protests adamantly. He is warned by the spirit of his deceased grandfather that goblins populate the town. His parents, Michael and Diana, dismiss his apprehensions, but soon learn to appreciate their son''s warnings. Guided by his grandfather''s ghost, will Joshua and his family stand a chance in fighting off these evil beings?', '1990-10-12', '/eFth6zw4PEInzr2Y64mYVN1zbBi.jpg', 'Troll 2', 26914, 1, 'https://www.youtube.com/watch?v=2p1Fu5lvrc4', '2026-04-01');
INSERT INTO public.movies (id, genre_ids, overview, release_date, poster_path, title, tmdb_id, added_by, trailer_url, added_on) OVERRIDING SYSTEM VALUE VALUES (43, '[53,12,18]', 'Four men from different parts of the globe, all hiding from their pasts in the same remote South American town, agree to risk their lives transporting several cases of dynamite (which is so old that it is dripping unstable nitroglycerin) across dangerous jungle terrain.', '1977-06-24', '/2b7oexm173SF1FSEq0DdgxZZNRH.jpg', 'Sorcerer', 38985, 1, 'https://www.youtube.com/watch?v=RlfJcU3nnl8', '2026-04-01');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users (id, name, image, provider, provider_account_id) OVERRIDING SYSTEM VALUE VALUES (3, 'Ed Stalley', 'https://lh3.googleusercontent.com/a/ACg8ocI6KSLUNwrxjxAYF5YbRPZJEUSh-StNeNt6IyMBYrLU5ZIMKA=s96-c', 'google', '113400889697906826027');
INSERT INTO public.users (id, name, image, provider, provider_account_id) OVERRIDING SYSTEM VALUE VALUES (1, 'Ed Stalley (Thelazyboon)', 'https://lh3.googleusercontent.com/a/ACg8ocKoS-nGlpfFPi9ziUhfhLSBP6aUquVfi_BBAkku2tUAazK7PnheYw=s96-c', 'google', '105652655423829022534');


--
-- Data for Name: vote_session_movies; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.vote_session_movies (id, vote_session_id, movie_id) OVERRIDING SYSTEM VALUE VALUES (1, 2, 1);
INSERT INTO public.vote_session_movies (id, vote_session_id, movie_id) OVERRIDING SYSTEM VALUE VALUES (2, 2, 34);
INSERT INTO public.vote_session_movies (id, vote_session_id, movie_id) OVERRIDING SYSTEM VALUE VALUES (3, 2, 36);
INSERT INTO public.vote_session_movies (id, vote_session_id, movie_id) OVERRIDING SYSTEM VALUE VALUES (4, 2, 37);
INSERT INTO public.vote_session_movies (id, vote_session_id, movie_id) OVERRIDING SYSTEM VALUE VALUES (5, 2, 41);
INSERT INTO public.vote_session_movies (id, vote_session_id, movie_id) OVERRIDING SYSTEM VALUE VALUES (6, 2, 42);


--
-- Data for Name: vote_sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.vote_sessions (id, created_by, movie_night_date, created_at, status) OVERRIDING SYSTEM VALUE VALUES (2, 1, '2026-03-31', '2026-04-01 04:47:15.490029', 'completed');


--
-- Data for Name: votes; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.votes (id, vote_session_id, user_id, movie_id, created_at) OVERRIDING SYSTEM VALUE VALUES (1, 2, 1, 1, '2026-04-01 04:50:40.904335');


--
-- Data for Name: watched_movies; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (4, 4, '2024-10-24', NULL);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (34, 1, '2026-04-01', 1);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (33, 2, '2026-02-12', NULL);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (25, 25, '2025-08-19', NULL);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (24, 24, '2025-06-05', 1);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (8, 10, '2024-12-12', NULL);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (16, 16, '2025-03-19', 1);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (27, 27, '2025-10-21', NULL);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (5, 7, '2024-11-12', NULL);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (23, 23, '2025-05-29', NULL);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (15, 15, '2025-03-11', NULL);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (11, 12, '2025-01-23', NULL);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (2, 6, '2024-10-07', 1);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (22, 22, '2025-05-22', NULL);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (12, 13, '2025-01-27', 1);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (28, 28, '2025-10-30', 1);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (31, 31, '2025-12-04', NULL);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (14, 14, '2025-02-20', NULL);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (32, 32, '2026-01-27', NULL);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (21, 21, '2025-05-16', NULL);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (3, 3, '2024-10-24', 1);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (29, 29, '2025-11-07', NULL);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (9, 11, '2025-01-07', NULL);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (13, 5, '2025-02-07', NULL);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (20, 20, '2025-04-17', 1);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (30, 30, '2025-11-07', NULL);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (26, 26, '2025-08-29', NULL);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (10, 33, '2025-01-17', NULL);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (19, 19, '2025-04-08', NULL);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (7, 9, '2024-12-03', NULL);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (18, 18, '2025-04-03', NULL);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (17, 17, '2025-03-27', NULL);
INSERT INTO public.watched_movies (id, movie_id, watched_on, chosen_by) OVERRIDING SYSTEM VALUE VALUES (6, 8, '2024-11-24', NULL);


--
-- Name: movie_night_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.movie_night_groups_id_seq', 1, false);


--
-- Name: movie_ratings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.movie_ratings_id_seq', 1, false);


--
-- Name: movies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.movies_id_seq', 43, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 11, true);


--
-- Name: vote_session_movies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.vote_session_movies_id_seq', 6, true);


--
-- Name: vote_sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.vote_sessions_id_seq', 2, true);


--
-- Name: votes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.votes_id_seq', 1, true);


--
-- Name: watched_movies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.watched_movies_id_seq', 34, true);


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

\unrestrict 0YW5sLgwdHAZed9pI1yqCiMJEhsSa3tTOhcJTjyvc8RWJFshf6SOhOhNAkiduQS

