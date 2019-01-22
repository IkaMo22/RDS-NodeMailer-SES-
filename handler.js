//'use strict';

/*module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};*/

const connection = require('connection');
const nodemailer = require('nodemailer');

module.exports.findAll = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const sql = 'SELECT * FROM test';
    connection.query(sql, (error, rows) => {
      if (error) {
        callback({
          statusCode: 500,
          body: JSON.stringify(error)
        })
      } else {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            todos: rows
          })
        })
      }
    })
};




module.exports.eviarCorreoPrueba = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log('inicia envio de correos');

    var transporter = nodemailer.createTransport({

        host: 'email-smtp.us-east-1.amazonaws.com',
        port: 465,
        secure: true,
        auth: {
            user: 'usr',
            pass: 'pass',
        }


    });
    console.log('se crea transporte ');

    var mailOptions = {

        from: 'test@email.mx',
        to: 'test@email.mx',
        subject: 'Prueba Lambda',

        html: 'hello World'
    };
    console.log('se asignan las opciones de correo');
    console.log('inicia envio de correo');
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            callback(null, {
              statusCode: 200,
              body: JSON.stringify({
                input: 'not send'
              })
            })
        }else {
            console.log('Email sent');
            console.log('correo finalizado');

        }
    });
    console.log('funcion finalizada');


};
