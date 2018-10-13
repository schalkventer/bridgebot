const request = require('request')
const { IncomingWebhook } = require('@slack/client');

const MEETUP_URL = 'https://api.meetup.com/Codebridge/events';
const { API_URL } = process.env;
const { send } = new IncomingWebhook(API_URL);


const calcIfOneDayAway = ({ local_date }) => {
  const todayDate = moment();
  const eventDate = moment(local_date);
  const daysUntilEvent = eventDate.diff(todayDate, 'days') 
  
  return daysUntilEvent === 4;
}


const sendMessage = ({ local_time, link, name }) => {
  const text = `Morning humans! This is a friendly robo-reminder of the following Codebridge Newlands event happening *in 4 days at ${local_time}*: <${link}|${name}>. Hope to see you there! 👪`;

  return send({ text });
}


const handleApiResponse = (response) => {

  const oneDayAwayEvents = response.filter(calcIfOneDayAway);
  return oneDayAwayEvents.forEach(sendMessage);
}


const responseHandler = (error, response) => {
  const { text } = response;

  if (error) {
    return console.log(error)
  }

  return console.log(`Successfully sent: ${text}`)
}


request(MEETUP_URL, responseHandler);
