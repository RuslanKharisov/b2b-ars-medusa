## Setup Storefront !

# Clone .env.template

cp .env.template .env

# Install dependencies

yarn install

```

#### Setup publishable key

- ✅ Visit [Admin: Publishable Key](http://localhost:9000/app/settings/publishable-api-keys)
  - <b>Credentials</b>:
    - <b>email</b>: `admin@test.com`
    - <b>password</b>: `supersecret`
- ✅ Copy token key of "Webshop"
- ✅ Open file - `storefront/.env`
- ✅ Add token to this var - `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`

```

# Start Medusa storefront

yarn dev

```

```

Visit the following links to see the Medusa storefront & admin

- [Medusa Storefront](http://localhost:8000)
