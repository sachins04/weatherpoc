const Alexa = require('aws-sdk');
const sns = new Alexa.SNS();
//Alexa.config.update({region: 'us-east-1'});

exports.handler =  (event) => {
    // TODO implement
    // Create publish parameters
    var params = {
        Message: 'Hello, Nationwide Elite Agent,there is a Servere Weather Alert for your area. Please send a text to (210)970-7585 with a response okay or not okay',
        /* required */
        //SMSType: 'Promotional',
        //PhoneNumber: '+16148248707',// Sachin
        PhoneNumber: '+16143822048',//gvoice
        MessageAttributes:{
        "AWS.SNS.SMS.SenderID" : {
            DataType: "String",
            StringValue: "12109707585"
            }
        },
    };
    // Create promise and SNS service object
var publishTextPromise = new Alexa.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
console.log("MessageID is " + publishTextPromise.Message);

// Handle promise's fulfilled/rejected states
    publishTextPromise.then(
        function(data) {
        console.log("MessageID1 is " + data.MessageId);
    }).catch(
        function(err) {
        console.error(err, err.stack);
  });

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
