DROP DATABASE IF EXISTS travel_bug;
CREATE database travel_bug;
USE travel_bug;

CREATE TABLE people
(
person_id INTEGER AUTO_INCREMENT,
username varchar(256),
person_email VARCHAR(20) NOT NULL UNIQUE,
person_password VARCHAR(256) NOT NULL,
PRIMARY KEY (person_id)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

CREATE TABLE post
(
person_id INTEGER AUTO_INCREMENT,
user_id int(11),
location_id varchar(256),
pic_id varchar(256),
profpic_img_url varchar (256),
timestamp DATETIME, 
PRIMARY KEY (person_id),
KEY user_id (user_id),
FOREIGN KEY (user_id) REFERENCES post (person_id)
ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

CREATE TABLE pics 
(
person_id INTEGER AUTO_INCREMENT,
load_img_url varchar(256),
pic_url varchar(256),
username varchar(256),
PRIMARY KEY (person_id),
user_id int(11),
KEY user_id (user_id),
FOREIGN KEY (user_id) REFERENCES pics (person_id)
ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

CREATE TABLE place (
person_id INTEGER AUTO_INCREMENT,
do_id int(11) NOT NULL,
see_id varchar(256),
eat_id varchar(256),
place_id varchar(256),
PRIMARY KEY (person_id),
KEY do_id (do_id),
FOREIGN KEY (do_id) REFERENCES place (person_id)
ON DELETE CASCADE ON UPDATE CASCADE,
user_id int(11),
KEY user_id (user_id),
FOREIGN KEY (user_id) REFERENCES place (person_id)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

