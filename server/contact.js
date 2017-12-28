//const mail = require('nodemailer');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});//N Virginia

const sendContact = (req, res) => {
    //Verify body
    const fromName = `${req.body.name}`;
    const fromEmail = `${req.body.email}`;
    const message = `${req.body.message}`;

    const params = {
        Destination: {
            ToAddresses: [
                'gyanreyer@gmail.com'
            ]
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `<p>${message}</p><p>-<a href="mailto:${fromEmail}">${fromName}</a></p>`
                },
                Text: {
                    Charset: 'UTF-8',
                    Data: `${message} -${fromName} (${fromEmail})`
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: `Contact message from ${fromName}`
            }
        },
        Source: 'contact@rgeyer.com',
        ReplyToAddresses: [
            fromEmail
        ]
    };

    const sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

    sendPromise.then((data)=>{
            console.log(data.MessageId);
        }).catch((err)=>{
            console.error(err, err.stack);
        });
};

module.exports = sendContact;