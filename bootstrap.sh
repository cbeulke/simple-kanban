#!/usr/bin/env bash

apt-get update

# Install Node.js and other JS tools
apt-get install -y curl

curl -sL https://deb.nodesource.com/setup_6.x | bash -
apt-get install -y nodejs

npm install -g grunt-cli

# Install mysql / Prepare for headless mysql installation
debconf-set-selections <<< 'mysql-server-5.5 mysql-server/root_password password rootpass'
debconf-set-selections <<< 'mysql-server-5.5 mysql-server/root_password_again password rootpass'

apt-get install -y mysql-server-5.5

if [ ! -f /var/log/databasesetup ]; then
	echo "CREATE USER 'nodeuser'@'localhost' IDENTIFIED BY 'nodepass'" | mysql -uroot -prootpass
	echo "CREATE DATABASE node" | mysql -uroot -prootpass
	echo "GRANT ALL ON node.* TO 'nodeuser'@'localhost'" | mysql -uroot -prootpass
	echo "flush privileges" | mysql -uroot -prootpass

	touch /var/log/databasesetup

	if [ -f /vagrant/data/init.sql ]; then
		mysql -uroot -prootpass node < /vagrant/data/init.sql
	fi
fi

