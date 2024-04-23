FROM node:18-buster AS base

WORKDIR /src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-buster AS runtime

WORKDIR /src/app

COPY --from=base /src/app/.next /src/app/.next
COPY --from=base /src/app/node_modules /src/app/node_modules
COPY --from=base /src/app/public /src/app/public
COPY --from=base /src/app/package.json /src/app/package.json

CMD ["npm", "start"]
