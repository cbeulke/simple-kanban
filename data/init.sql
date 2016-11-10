CREATE USER 'kanban'@'%' IDENTIFIED BY 'kanban';
GRANT ALL PRIVILEGES ON *.* TO 'kanban'@'%' WITH GRANT OPTION;

CREATE TABLE tasks(
	id int not null primary key auto_increment,
	title varchar(255) not null,
	status int not null)
;