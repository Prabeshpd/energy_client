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

## Seed

For seeding of data in backend side one can follow the steps in backend server as in link above.
For the real time database of firebase the data can be

```json
{
  "projects82d59ecb-88ee-4ac4-a15d-719bbb339ce2": [
    {
      "coordinates": "13.754548843452698, 100.56417815810295",
      "districtName": "Din Daeng",
      "energyConsumption": 35,
      "id": "98d81aa6-f55e-40d1-b55a-9afb63a020fc",
      "projectName": "Rythym Asoke"
    },
    {
      "coordinates": "13.779738810244984, 100.57353159404951",
      "districtName": "Huai Khwang",
      "energyConsumption": 40,
      "id": "36534f7c-1578-4766-ad4e-c3dc52d3f39f",
      "projectName": "The Line"
    },
    {
      "coordinates": "13.72213568373354, 100.50165754973904",
      "districtName": "Thon buri",
      "energyConsumption": 35,
      "id": "a61368ea-f13d-419f-93ec-8f80213b7bc4",
      "projectName": "Q"
    },
    {
      "coordinates": "13.73911589102729, 100.56085386017622",
      "districtName": "Khlong Toei",
      "energyConsumption": 55,
      "id": "a7c6a254-84f6-4dbb-9c7f-1ebf2988f29a",
      "projectName": "Ashton"
    },
    {
      "coordinates": "13.755328002206435, 100.53264228994145",
      "districtName": "Ratchathewi",
      "energyConsumption": 35,
      "id": "10458c9d-86a3-44ab-87f3-6c6a7fa947f9",
      "projectName": "Ideo"
    }
  ]
}
```
