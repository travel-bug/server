DROP database IF EXISTS tbug;
CREATE database tbug;
USE tbug;

CREATE TABLE people
(
person_id INTEGER AUTO_INCREMENT,
username varchar(256),
person_email VARCHAR(20) NOT NULL UNIQUE,
person_password VARCHAR(256) NOT NULL,
PRIMARY KEY (person_id)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

CREATE TABLE pics 
(
person_id INT (11),
pics_id INTEGER AUTO_INCREMENT,
pics_url varchar(256),
pic_type enum ("prof","post"),
PRIMARY KEY (pics_id),
FOREIGN KEY (person_id) REFERENCES people (person_id)
ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;


CREATE TABLE place (
place_id INTEGER AUTO_INCREMENT,
place_name varchar (256),
gps_id varchar (256),
lat_long float (53),
PRIMARY KEY (place_id)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

CREATE TABLE post
(
post_id INTEGER AUTO_INCREMENT,
user_id int(11),
location_id integer,
pics_id INTEGER,
timestamp DATETIME, 
PRIMARY KEY (post_id),
KEY user_id (user_id),
FOREIGN KEY (user_id) REFERENCES people (person_id),
FOREIGN KEY (pics_id) REFERENCES pics (pics_id),
FOREIGN KEY (location_id) REFERENCES place (place_id)
ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;


