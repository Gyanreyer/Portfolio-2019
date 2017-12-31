//const mail = require('nodemailer');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});//N Virginia

const sendContact = (req, res) => {
    console.log(req.body);

    //Verify body
    const fromName = `${req.body.name}`;
    const fromEmail = `${req.body.email}`;
    const message = `${req.body.message}`;

    //Ensure all params were provided
    if(!fromName || !fromEmail || !message){
        return res.status(400).json({
            message: "Oops. The form hasn't been filled out correctly, please review and try again."
        });
    }
    //Do basic email validation w/ regex
    else if(!/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(fromEmail)){
        return res.status(400).json({
            message: "Oops. It looks like the email you provided is invalid, please review and try again."
        });
    }

    //Params for email to send w/ SES
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

    return sendPromise.then((data)=>{
            console.log(data.MessageId);
            res.status(200).json({message:'Your message has been sent. Thank you!'});
        }).catch((err)=>{
            console.error(err, err.stack);
            res.status(400).json({message:'An error occurred while sending your message, please try again later.'});
        });
};

module.exports = sendContact;