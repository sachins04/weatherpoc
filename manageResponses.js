//'use strict';
//const http = require('http');
const querystring = require('querystring');

console.log('Loading function');


exports.handler = (event, context, callback) => {
    const eventBody = JSON.stringify(event.body);
    console.log("Body is " + eventBody);
    //const eventBody = event.body;
    //const encBody = encodeURIComponent(eventBody);
    //console.log("Enc Body is " + encBody);
   //const userResponse = querystring.parse(eventBody, null, null);
   const userResponse = {};
   var userResponseBody = '';
  eventBody.split("&").forEach(function(part) {
    var item = part.split("=");
    userResponse[item[0]] = decodeURIComponent(item[1]);
    console.log("Value of token " + item[0] + " is " + userResponse[item[0]]);
  });
    userResponseBody = userResponse.Body;
    //console.log("Value of 1st token is " + JSON.parse(body).key1);
    console.log("Value of 1st token is " + userResponse.Body);


    if(userResponseBody.trim() == 'okay') {
        var outputGood = `
        <?xml version="1.0" encoding="UTF-8"?>
        <Response>
        <Message>We got your message, Glad to know you are ` +
        userResponse.Body
        +
        `</Message>
        </Response>
        `;
    } else {
        var outputGood = `
        <?xml version="1.0" encoding="UTF-8"?>
        <Response>
        <Message>We got your message, We are worried you are not okay.`
            +
        ` We would like to reach you by phone if possible </Message>
        </Response>
        `;
    }

callback(null, {
    statusCode: '200',
    body: outputGood.trim(),
    headers: {
        'Content-Type': 'application/xml',
    },
});
};
