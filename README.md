# crawler-hosted-on-azure

:construction: Under development currently

Web crawler integrated with Slack, hosted on Azure.

## Overview

| Function | resource / service |
|----|----|
| Runner | Azure Functions (Node.js) |
| Stroage | Azure Data Lake Storage |

## Deploy resources to Azure

## Set up Slack app

- Create a Slack App
  - https://api.slack.com/start/overview#creating
- Enable Events on Event Subscriptions
  - Set URL
  - In "Subscribe to bot events" pane, Click "Add Bot User Event" and select `message.channels`.
- Install the App to your team
- Add the App bot to your channel to watch

## Run the functions locally

```bash
cd src/functions
npm install
npm link ../core
npm run start
```

On Windows, when run the functions first, you may need to allow access.

## Refrences

- [Using the Slack Events API | Slack](https://api.slack.com/events-api)