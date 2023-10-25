# Next Component Layout

Next Component comprise of server and client components.

## Server Components

For the server components authentication component are placed. Since, these components will be independent and does not need communication with browser libraries. They can be directly rendered from server.

The two components are

- Register Page
- Login Page

## Client Components

The main dashboard page and the profile page are considered client components. Since these components are dependant on the redux for state management and these components are closely linked together. They are considered client components.

- Dashboard
  - Heat Map
  - Bar Chart
  - Map
  - Anomaly
  - Consumption Overview

## Diagram

## State Management

For state management redux toolkit is used.

## Data Flow

- Project Data: For the project data. Api call is made to backend and data are stored in redux.

  - State: Projects in Redux

- Real Time Data: These are fetched directly from the firebase listeners to component. From the component they are sent to redux store

  - State: RealTimeProjectData

- History Data: API call is made to backend and the data are restored from time scale database stored in redux

  - State: projectHistoryByYear, projectHistoryByAnomaly

- Selected Sites: Since, after the selection of sites we need to display chart of only those sites. The selected sites are dispatched to redux store.

  - State: Selected Site

- Map TopoJSON Data: It is directly requested from the component of map.

## Diagram
