# energy_client

## Setup

- Requires Node 18 or above.

## Installation

Clone the repository, install the dependencies and get started right away. Make sure you already have `nodejs`, `npm` and `yarn` installed in your system.

```sh
git clone git@github.com:Prabeshpd/energy_client.git
cd energy_client
```

### Development

1. Install all dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

2. Add environment variables

   ```bash
   cp .env.example .env
   ```

   Make sure to add the necessary environment variables

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Run the Backend server

   For running the development server go to [Backend Server Repo](https://github.com/Prabeshpd/energy-server)

5. Open http://localhost:3000 with your browser to see the result.

### Test

1. Unit test

   ```bash
   yarn test
   ```

2. UI Test

   ```bash
   yarn cypress:run
   ```

## Deploy

    For Deploy Heroku is used which is deployed by CD pipeline for each push to main branch.
