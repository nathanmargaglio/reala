release: cd client && ng build && ../server/manage.py collectstatic && cd ..
web: gunicorn --pythonpath server bfds.wsgi --log-file -
