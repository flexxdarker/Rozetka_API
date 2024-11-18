# rozetka-asp

Create docker hub repository - publish
```
docker build -t rozetka-asp-api . 
docker run -it --rm -p 5817:8080 --name rozetka-asp_container rozetka-asp-api
docker run -d --restart=always --name rozetka-asp_container -p 5817:8080 rozetka-asp-api
docker run -d --restart=always -v d:/volumes/rozetka-asp/images:/app/images --name rozetka-asp_container -p 5817:8080 rozetka-asp-api
docker run -d --restart=always -v /volumes/rozetka-asp/images:/app/images --name rozetka-asp_container -p 5817:8080 rozetka-asp-api
docker ps -a
docker stop rozetka-asp_container
docker rm rozetka-asp_container

docker images --all
docker rmi rozetka-asp-api

docker login
docker tag rozetka-asp-api:latest flexxdarker/rozetka-asp-api:latest
docker push flexxdarker/rozetka-asp-api:latest

docker pull flexxdarker/rozetka-asp-api:latest
docker ps -a
docker run -d --restart=always --name rozetka-asp_container -p 5817:8080 flexxdarker/rozetka-asp-api

docker run -d --restart=always -v /volumes/rozetka-asp/images:/app/images --name rozetka-asp_container -p 5817:8080 flexxdarker/rozetka-asp-api


docker pull flexxdarker/rozetka-asp-api:latest
docker images --all
docker ps -a
docker stop rozetka-asp_container
docker rm rozetka-asp_container
docker run -d --restart=always --name rozetka-asp_container -p 5817:8080 flexxdarker/rozetka-asp-api
```

```nginx options /etc/nginx/sites-available/default
server {
    server_name   rapi.itstep.click *.rapi.itstep.click;
    location / {
       proxy_pass         http://localhost:5817;
       proxy_http_version 1.1;
       proxy_set_header   Upgrade $http_upgrade;
       proxy_set_header   Connection keep-alive;
       proxy_set_header   Host $host;
       proxy_cache_bypass $http_upgrade;
       proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header   X-Forwarded-Proto $scheme;
    }
}


sudo systemctl restart nginx
certbot
```
