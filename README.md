-clone this repo

-create ur own DB postgresql and blob storage

-setting up .env
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NO_SSL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
AUTH_SECRET=
BLOB_READ_WRITE_TOKEN=

-in your DB, create new record on the table systemSetting with value:
  id: default uuid()
  name: "validationStageFixed"
  status: false
  createdAd: default now()
  updatedAd: default updatedAt

- npm run dev with local port :6969
