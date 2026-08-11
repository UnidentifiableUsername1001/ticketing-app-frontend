FROM node:24-slim AS build

ARG VITE_BACKEND_URL="https://api.wisetickets.co.uk"

ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

WORKDIR /ticketing-app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine AS production

COPY --from=build /ticketing-app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]