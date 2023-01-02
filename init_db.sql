-- drop table stations;
-- drop table trips;

CREATE TABLE IF NOT EXISTS stations (
  fid int not null,
  id int PRIMARY KEY not null,
  name_fi varchar(100) not null,
  name_en varchar(100) not null,
  name_sv varchar(100) not null,
  addr_fi varchar(200) not null,
  addr_en varchar(200) not null,
  city_fi varchar(100),
  city_sv varchar(100),
  operator varchar(100),
  x DECIMAL(10, 4),
  y DECIMAL(10, 4),
  capacity int not null
);

CREATE TABLE IF NOT EXISTS trips (
  id int primary key AUTO_INCREMENT,
  departure_time datetime not null,
  return_time datetime not null,
  departure_station_id int not null,
  return_station_id int not null,
  departure_station_name varchar(100) not null,
  return_station_name varchar(100) not null,
  distance int not null,
  duration int not null
);