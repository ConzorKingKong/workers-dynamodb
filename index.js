const { DynamoDBClient, GetItemCommand, PutItemCommand } = require("@aws-sdk/client-dynamodb");

// Replace with your region and the table name you want to interact with
const REGION = "us-west-2"
const TABLE = "Friends"

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === "POST") {
    const jsonData = await request.json()

    await dynamoPut(jsonData)
    return new Response(`Data added: ${JSON.stringify(jsonData)}`, {
      headers: { 'content-type': 'application/json' },
    })
  } else if (request.method === "GET") {
    // We need to create a URL object so we can read the query parameters from the request
    const url = new URL(request.url)

    const callName = url.searchParams.get("Name")

    const item = await dynamoRead(callName)
    return new Response(JSON.stringify(item), {
        headers: { 'content-type': 'application/json' },
    })
  }

  return new Response("Please only use post or get requests")
}

async function myCredentialProvider() {
  return {
    // use wrangler secrets to provide these global variables
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
}

async function dynamoPut(data) {
  const client = new DynamoDBClient({
    region: REGION,
    credentialDefaultProvider: myCredentialProvider
  });

  const callData = { TableName: TABLE, Item: {} }

  for (const key in data) {
    callData.Item[key] = {S: data[key]}
  }

  const put = new PutItemCommand(callData);
  await client.send(put);
}

async function dynamoRead(callName) {
  const client = new DynamoDBClient({
    region: REGION,
    credentialDefaultProvider: myCredentialProvider
  });

  const get = new GetItemCommand({
    TableName: TABLE,
    Key: {Name: {S: callName}}
  });

  const results = await client.send(get);
  return results.Item;
}
