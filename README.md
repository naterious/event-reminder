# event-reminder
Event reminder service with a websocket interface to handle clients

# Dependencies
- To run this application you must have docker desktop installed and running
- Assumes you have node and yarn (or npm) installed.

# Usage
1. Clone this repository
2. To install dependencies and run docker redis image run: `yarn setup`
3. To start the server run `yarn start`
4. Server will be available at: `ws://localhost:8999/`

# Tests
To run all tests run `yarn test`
To run unit tests only run `yarn test:unit`
to run integration tests only run `yarn test:integration`

# Technologies used
- node.js
- redis
- websockets

# Description

## Architecture
The architecture of this service is based on onion architecture design principles. I chose to use this architectural model as it develops a loosely coupled application, as the outer layers of the application always communicates with the inner layers via interfaces. It is logically structured, and enables easier testing.
In this project, I faced a flow which did not quite fit the design pattern, in which the application service would need to call back up to the api layer to emit the event reminder to all connected clients. In order to maintain the onion design principles, mainly the principle that states: "inner layers should not know anything about the outer layers", I decided to use an event emitter in the application service, and subscribe to that event in the api layer, so that the direction of coupling can be maintained without the direct call.

## Technology decisions
### Websockets
I decided to use a library called 'ws', which allowed me to implement a vanilla websockets interface to handle clients. I chose this over socket.io as the task description stated that the service should have a websocket interface, and although socket.io does use websockets as a transport, it is not a websocket implementation. It would require the clients to also use socket.io to connect to the service, and this was not an assumption I could make from the task spec.

## Assumptions
In order for me to be able to develop this service, I made some assumptions based on the task description,
- `notificationTimeSeconds` sent in the message will be a UTC timestamp in seconds
- The external contract the server is expecting, a stringyfied json object containing; `command`, `name`, `notificationTimeSeconds`