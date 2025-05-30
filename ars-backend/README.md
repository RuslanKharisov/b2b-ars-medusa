## Quickstart

#### Setup Medusa project

# Clone .env.template

cp .env.template .env

# Install dependencies

yarn install

# Install dependencies, setup database & seed data

yarn install
yarn medusa db:create
yarn medusa db:migrate
yarn run seed
yarn medusa user -e admin@test.com -p supersecret -i admin

# Start Medusa project - backend & admin

yarn dev
