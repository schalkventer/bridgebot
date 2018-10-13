const { IncomingWebhook } = require('@slack/client');

const { API_URL } = process.env;
const webhook = new IncomingWebhook(API_URL);


const responseHandler = (error, response) => {
  const { text } = response;

  if (error) {
    return console.log(error)
  }

  return console.log(`Successfully sent: ${text}`)
}


webhook.send('Good afternoon!', responseHandler);
