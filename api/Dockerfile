FROM denoland/deno:alpine-1.26.2

EXPOSE 3001

WORKDIR /app

COPY . .

RUN deno cache deps.js

RUN deno cache database.js

CMD [ "run", "--watch", "--allow-net","--unstable", "--allow-read", "--allow-run", "--allow-env", "--allow-write", "--no-check", "app.js" ]