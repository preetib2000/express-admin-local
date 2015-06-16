# Express-Admin-local
express-admin using Passport-local Authentication (passport local strategy)

## Assumption:
Node is installed

# Cofigure mySql
  ````
  Create mySql Database (TestDatabse)
  Run the following Queries to create tables
  ````

CREATE TABLE `expressProject` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Project Name` varchar(200) DEFAULT NULL,
  `URL` varchar(200) DEFAULT NULL,
  `CreatedAt` timestamp NULL DEFAULT NULL,
  `UpdatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

Add some dummy data to user table (username = 'test' password = 'test')

# Setup project and Install dependencies
  ````
  git clone the repo
  npm install
  node app.js
  run on browser http://localhost:4000 
  Login with test test
  ````





