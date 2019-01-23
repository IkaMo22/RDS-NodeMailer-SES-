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

const connection = require('./connection');
const nodemailer = require('nodemailer');
const ses = require('nodemailer-ses-transport');

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



/**
 * TEST con cuenta de gmail hay que activar el permiso para aplicaciones menos seguras
 */
module.exports.enviarCorreoPrueba = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log("inicia envio de correos");

  var mailOptions = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: "user",
      pass: "pass"
    }
  };

  var transporter = nodemailer.createTransport(mailOptions);

  console.log("se crea transporte ");

  var mail = {
    from: "user",  // <-- tiene que ser el mismo que se esta autenticando !
    to: "user to",
    subject: "Prueba Lambda",
    html: '<b>Hello world!</b>',
  };

  console.log("se asignan las opciones de correo");
  console.log("inicia envio de correo");

  transporter.sendMail(mail, function(error, info) {
    if (error) {
      console.log("ERROR::: ", error);
      let response = {
        statusCode: 500,
        body: JSON.stringify({ error: error })
      };
      return callback(null, response);
    }

    let response = {
      statusCode: 200,
      body: JSON.stringify({ result: info })
    };
    console.log("SENT::: ", info);

    console.log("correo finalizado");
    return callback(null, response);
  });
  console.log("funcion finalizada");
};


/**
 * TEST con ses de aws tienes que instalar nodemailer-ses-transport para crear el transporte
 * npm i nodemailer-ses-transport
 */
module.exports.enviarCorreoPruebaSES = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log("inicia envio de correos");

  var transporter = nodemailer.createTransport(ses({
    accessKeyId: 'AWSACCESSKEY',
    secretAccessKey: 'AWS/Secret/key'
  }));

  console.log("se crea transporte ");

  var mail = {
    from: "user from ",
    to: "user to",
    subject: "Prueba Lambda",
    html: '<b>Hello world!</b>',
  };

  console.log("se asignan las opciones de correo");
  console.log("inicia envio de correo");

  transporter.sendMail(mail, function(error, info) {
    if (error) {
      console.log("ERROR::: ", error);
      let response = {
        statusCode: 500,
        body: JSON.stringify({ error: error })
      };
      return callback(null, response);
    }

    let response = {
      statusCode: 200,
      body: JSON.stringify({ result: info })
    };
    console.log("SENT::: ", info);

    console.log("correo finalizado");
    return callback(null, response);
  });
  console.log("funcion finalizada");
};
