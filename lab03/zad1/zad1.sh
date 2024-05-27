#!/bin/bash

# Uruchamianie kontenera Docker z serwerem Nginx
docker run -d -p 80:80 --name my_nginx_container nginx

echo "Kontener Docker z serwerem Nginx został uruchomiony."

curl -sSf http://localhost:80

# Zmiana zawartości strony internetowej
echo -n "Czy chcesz zmienić zawartość strony? (t/n): "
read response

if [ "$response" = "t" ]; then
    echo -n "Wprowadź nową zawartość strony: "
    read new_content
    echo "$new_content" > index.html
    docker cp index.html my_nginx_container:/usr/share/nginx/html/index.html
    docker exec my_nginx_container nginx -s reload
    echo -n "Nowa strona:"
    curl -sSf http://localhost:80
fi

