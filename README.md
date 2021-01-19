# Using DynamoDB from Cloudflare Workers

This is a template for using DynamoDB from a Cloudflare Worker.

This project is not related to, affiliated with, sponsored or endorsed by Amazon Web Services.

#### Wrangler

To generate using [wrangler](https://github.com/cloudflare/wrangler)

```
wrangler generate <projectname> https://github.com/conzorkingkong/workers-dynamodb
cd <projectname>
```

[`index.js`](https://github.com/conzorkingkong/worker-dynamodb/blob/master/index.js) is the content of the Workers script. See the commented areas of the code for where to fill in your region, table name, etc.

You'll need to use wrangler secrets to add appropriate values for AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY e.g.

```
wrangler secret put AWS_ACCESS_KEY_ID
wrangler secret put AWS_SECRET_ACCESS_KEY
```

You'll also need to set a default REGION and TABLE at the top of the index.js

After that you can use `wrangler publish` as normal. See the [wrangler documentation](https://developers.cloudflare.com/workers/cli-wrangler) for more information.


#### AWS SDK for JavaScript

This template uses the [JavaScript AWS SDK V3 for DynamoDB](https://github.com/aws/aws-sdk-js-v3/tree/master/clients/client-dynamodb), see that repository for more information.
