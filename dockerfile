FROM node:22.16-alpine3.22 AS base

WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS dev
WORKDIR /app
COPY . .
COPY entrypoint.sh /usr/local/bin/entrypoint.sh

RUN chmod +x /usr/local/bin/entrypoint.sh
EXPOSE 3000 

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]