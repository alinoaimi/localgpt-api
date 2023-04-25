# localgpt-api

## Motive
I wanted to create a standalone app for non-technical users, to be able to interact with the opensource ChatGPT alternatives, I decided to use Flutter for the frontend, but didn't want to create the backend in Dart, so I created it as a separate project, which is this project.

The Flutter App: https://github.com/alinoaimi/localgpt

## Requirements
* NodeJS (v18+)
* GPT4ALL executable
* GPT4ALL model (.bin file)

executable: https://github.com/nomic-ai/gpt4all (jump to Try it yourself section)

model: https://the-eye.eu/public/AI/models/nomic-ai/gpt4all/gpt4all-lora-quantized.bin

## Getting Started
* Clone this repo `git clone https://github.com/alinoaimi/localgpt-api.git`
* `npm install`
* Update .env.example with the paths of the GPT4ALL executable and model then rename it to .env
* `npm run build` 
* `npm run start`

## Documentation
A postman collection is inside the folder: documentaiton.