#!/bin/sh
heroku config:get DATABASE_URL -s  >> .env -a reala-staging
heroku config:get GOOGLE_API_KEY -s  >> .env -a reala-staging
heroku config:get ESTATED_API_KEY -s  >> .env -a reala-staging
heroku config:get PIPL_API_KEY -s  >> .env -a reala-staging
echo ENVIRONMENT=DEVELOPMENT >> .env
