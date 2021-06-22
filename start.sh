#!/bin/bash
# PLEASE CHANGE DEFAULT PASSWORD
echo "PLEASE CHANGE DEFAULT PASSWORD IN SCRIPT. THIS IS JUST AN EXAMPLE"
echo "Running on AWS Server..."
echo "Setting up MySQL"

sudo apt update

sudo apt install mysql-server -y

sudo cp -f ./script/mysqld.cnf /etc/mysql/mysql.conf.d/mysqld.cnf

sudo systemctl restart mysql

sudo mysql -e "CREATE USER 'local'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'local'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;"

echo "Setting Up Database url and Table url"

sudo mysql -u local -ppassword -e "
CREATE DATABASE if not exists url;
USE url;
CREATE TABLE if not exists url(ShortURL varchar(255) NOT NULL PRIMARY KEY,LongURL varchar(2048) NOT NULL,CreatedTime timestamp NOT NULL,TimeExpire timestamp NOT NULL);
"

echo "MySQL Database set up completed"
echo "Setting up NodeJS"

sudo apt install nodejs -y
sudo apt install npm -y

npm install
sudo npm install pm2 -g

sudo mysql -e "
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;
"

sudo tee /home/ubuntu/urlshortener_be/.env << EOF
HOST=localhost
USER=local
PASSWORD=password
DB=url
PORT=3306
EOF

sudo pm2 start server.js