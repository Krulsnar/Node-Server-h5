use master
go

create database node_server
go

use node_server
go

create table person(
id int primary key identity(1,1), 
firstName nvarchar(100), 
lastName nvarchar(100), 
email nvarchar(100))

insert into person(firstname, lastname, email) values
('Andreas', 'Møinichen', 'andreas@moinichen.com'),
('Bo', 'Madsen', 'bo.madsen@gmail.com')