FROM node:alpine

WORKDIR /build

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

COPY . ./
RUN yarn install
RUN yarn prisma migrate deploy --preview-feature
RUN yarn prisma generate
RUN yarn build
EXPOSE 4000

CMD [ "yarn", "start" ]