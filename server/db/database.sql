CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_address VARCHAR(255) NOT NULL,
    user_number VARCHAR(255) DEFAULT NULL,
    user_image VARCHAR(255) DEFAULT NULL,
    user_birthDay DATE DEFAULT NULL,
    gender_id uuid REFERENCES genders(gender_id) ON DELETE CASCADE DEFAULT NULL
);

CREATE TABLE connection_requests(
    receiver_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
    sender_id uui REFERENCES users(user_id) ON DELETE CASCADE,
    PRIMARY KEY(receiver_id, sender_id) 
);

CREATE TABLE connections(
    receiver_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
    sender_id uui REFERENCES users(user_id) ON DELETE CASCADE,
    PRIMARY KEY(receiver_id, sender_id) 
);

CREATE TABLE genders (
    gender_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    gender VARCHAR(10) DEFAULT NULL
);

CREATE TABLE posts(
    post_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_title VARCHAR(255) NOT NULL,
    post_desc VARCHAR(1000) NOT NULL,
    post_image VARCHAR(255) DEFAULT NULL,
    post_date VARCHAR(255) NOT NULL,
    post_views INT DEFAULT 0,
    user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
    category_id uuid REFERENCES category(category_id) ON DELETE CASCADE
);

CREATE TABLE category(
    category_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_name VARCHAR(255) NOT NULL
);

INSERT INTO category (category_name) VALUES ('food');
INSERT INTO category (category_name) VALUES ('travel');
INSERT INTO category (category_name) VALUES ('fitness');
INSERT INTO category (category_name) VALUES ('lifestyle');
INSERT INTO category (category_name) VALUES ('fashion');
INSERT INTO category (category_name) VALUES ('photography');
INSERT INTO category (category_name) VALUES ('personal');
INSERT INTO category (category_name) VALUES ('business');
INSERT INTO category (category_name) VALUES ('news');
INSERT INTO category (category_name) VALUES ('tutorial');
INSERT INTO category (category_name) VALUES ('tech');
INSERT INTO category (category_name) VALUES ('health');
INSERT INTO category (category_name) VALUES ('education');
INSERT INTO category (category_name) VALUES ('love');
INSERT INTO category (category_name) VALUES ('music');
INSERT INTO category (category_name) VALUES ('sport');
INSERT INTO category (category_name) VALUES ('marketing');
INSERT INTO category (category_name) VALUES ('entertainment');
INSERT INTO category (category_name) VALUES ('pets');
INSERT INTO category (category_name) VALUES ('agriculture');
INSERT INTO category (category_name) VALUES ('history');
INSERT INTO category (category_name) VALUES ('gaming');
INSERT INTO category (category_name) VALUES ('science');
INSERT INTO category (category_name) VALUES ('art');

-- CREATE TABLE posts_category(
--     post_id uuid REFERENCES posts(post_id) ON DELETE CASCADE,
--     category_id uuid REFERENCES category(category_id) ON DELETE SET NULL,
--     PRIMARY KEY(post_id, category_id)
-- );

CREATE TABLE posts_likes(
    post_id uuid REFERENCES posts(post_id) ON DELETE CASCADE,
    user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
    PRIMARY KEY(post_id, user_id)
);

CREATE TABLE posts_comments(
    comment_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id uuid REFERENCES posts(post_id) ON DELETE CASCADE,
    user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
    comment_content VARCHAR(1000) NOT NULL
);

CREATE TABLE posts_views(
    post_id uuid REFERENCES posts(post_id) ON DELETE CASCADE,
    user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
    PRIMARY KEY(post_id, user_id)
);