#!/usr/bin/env sh
# Import the json list of names using mongoimport

# setup the variables
PASSWORD = 'password25'
DB = 'manage24'
URI = 'mongodb+srv://admin:'+"$PASSWORD"+'@cluster0-9l3qd.gcp.mongodb.net/'+"$DB"+'?retryWrites=true'
COLLECTION = 'names'

# run the command
mongoimport --verbose --uri "$URI"
