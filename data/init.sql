CREATE TABLE tasks(
	id int not null primary key auto_increment,
	title varchar(255) not null,
	status int not null,
	userId int not null
);

CREATE TABLE users(
	id int not null primary key auto_increment,
	username varchar(45) not null,
	password varchar(255) not null
);

INSERT INTO users(username, password) VALUES('ben', 'lol');