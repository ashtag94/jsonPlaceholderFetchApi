DROP TABLE IF EXISTS todos CASCADE;
DROP TABLE IF EXISTS photos CASCADE;
DROP TABLE IF EXISTS albums CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS users CASCADE;


CREATE TABLE users(
    id INT PRIMARY KEY
    ,name_str VARCHAR(100) 
    ,username VARCHAR(100) 
    ,email VARCHAR(100)
    ,address_str json
    ,phone VARCHAR(100)
    ,website VARCHAR(100)
    ,company json
);


CREATE TABLE posts  (
    id INT PRIMARY KEY
    ,userId INT
    ,title VARCHAR(100)
    ,body VARCHAR(1000)
    ,CONSTRAINT posts_users_fkey FOREIGN KEY (userId)
      REFERENCES users(id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE comments  (
    id INT PRIMARY KEY
    ,postId INT
    ,name_str VARCHAR(100)
    ,email VARCHAR(100)
    ,body VARCHAR(1000)
    ,CONSTRAINT comments_posts_fkey FOREIGN KEY (postId)
      REFERENCES posts(id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);


CREATE TABLE albums  (
    id INT PRIMARY KEY
    ,userId INT
    ,title VARCHAR(100)
    ,CONSTRAINT albums_users_fkey FOREIGN KEY (userId)
      REFERENCES users(id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE photos  (
    id INT PRIMARY KEY
    ,albumId INT
    ,title VARCHAR(100)
    ,url_str VARCHAR(100)
    ,thumbnailUrl VARCHAR(100)
    ,CONSTRAINT photos_albums_fkey FOREIGN KEY (albumId)
      REFERENCES albums(id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE todos  (
    id INT PRIMARY KEY
    ,userId INT
    ,title VARCHAR(100)
    ,completed BOOLEAN
    ,CONSTRAINT albums_users_fkey FOREIGN KEY (userId)
      REFERENCES users(id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
