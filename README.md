# crawler-hosted-on-azure

:construction: Under development currently

Web crawler integrated with Slack, hosted on Azure.

## Overview

| Function | resource / service |
|----|----|
| Runner | Azure Functions (Node.js) |
| Stroage | Azure Data Lake Storage |

## Deploy resources to Azure


If you don't have an Azure account yet, please create  [here](https://azure.microsoft.com/en-us/free/). In the first period, the account includes free services.

### How to deploy with Azure Portal UI

Click the button below, Azure portal is opened. Then fill the fields and deploy them.

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fdzeyelid%2Fcrawler-hosted-on-azure%2Fmaster%2Farm-templates%2Fresources.json)

### How to deploy by Azure CLI

Also, you can deploy the resources by [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/?view=azure-cli-latest) like below.

For bash
```bash
RESOURCE_GROUP=<Resource group name>
LOCATION=japaneast
PREFIX=<String that is put at each resource name as a prefix within 5 characters>
CONTAINER_NAME=<Container name of Azure Data Lake Storage, that store data>

az group create --name $RESOURCE_GROUP --location $LOCATION

az group deployment create \
    --resource-group $RESOURCE_GROUP \
    --handle-extended-json-format \
    --template-file ./arm-templates/resources.json \
    --parameters \
        prefix=$PREFIX \
        dataContainerName=$CONTAINER_NAME \
    --query "properties.outputs"
```

For PowerShell
```powershell
$RESOURCE_GROUP='<Resource group name>'
$LOCATION='japaneast'
$PREFIX='<String that is put at each resource name as a prefix within 5 characters>'
$CONTAINER_NAME='<Container name of Azure Data Lake Storage, that store data>'

az group create --name $RESOURCE_GROUP --location $LOCATION

az group deployment create `
    --resource-group $RESOURCE_GROUP `
    --handle-extended-json-format `
    --template-file ./arm-templates/resources.json `
    --parameters `
        prefix=$PREFIX `
        dataContainerName=$CONTAINER_NAME `
    --query "properties.outputs"
```

After deployment, the command returns `functionSlackUrl` like below. Use the url in the value when setting up Slack app below.

Return value sample
```json
{
  "functionSlackUrl": {
    "type": "String",
    "value": "https://<PREFIX>.azurewebsites.net/api/subscribeEventFromSlack?code=<function key>"
  }
}
```

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
npm run start
```

On Windows, when run the functions first, you may need to allow access.

## Refrences

- [Using the Slack Events API | Slack](https://api.slack.com/events-api)