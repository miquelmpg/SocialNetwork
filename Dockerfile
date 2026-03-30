FROM node:25 AS react-builder

COPY ./web /opt/social-network-web
WORKDIR /opt/social-network-web
RUN npm i
RUN npm run build

FROM node:25-alpine3.22

COPY ./api /opt/social-network
WORKDIR /opt/social-network

RUN npm i --omit=dev
COPY --from=react-builder /opt/social-network-web/dist /opt/social-network/web/build

EXPOSE 3000

CMD ["npm", "start"]