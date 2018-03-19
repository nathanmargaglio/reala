#!/bin/sh
heroku config:get DATABASE_URL -s  >> .env -a bfds-staging
heroku config:get GOOGLE_API_KEY -s  >> .env -a bfds-staging
heroku config:get ESTATED_API_KEY -s  >> .env -a bfds-staging
