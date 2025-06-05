#!/bin/bash

# Start the client-side
cd clientside
if [ $? -ne 0 ]; then
  echo "Failed to change directory to clientside"
  exit 1
fi

npm run dev &
if [ $? -ne 0 ]; then
  echo "Failed to start the client"
  exit 1
fi

# Start the server-side
cd ../serverside_Express
if [ $? -ne 0 ]; then
  echo "Failed to change directory to serverside_Express"
  exit 1
fi

npm run dev &
if [ $? -ne 0 ]; then
  echo "Failed to start the server"
  exit 1
fi

echo "Both the client and server are running!"
