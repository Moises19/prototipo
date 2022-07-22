//Importando librerias
const {Translate} = require('@google-cloud/translate').v2;
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

//Las Credenciales
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

//Configuración para el Cliente
const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});

//-------------------------- API TRANSLATOR DE GOOGLE -------------------------------------------
const translateText = async (text, targetLanguage) => {

    try {
        let [response] = await translate.translate(text, targetLanguage);
        return response;
    } catch (error) {
        console.log(`Error at translateText --> ${error}`);
        return 0;
    }
};
//-------------------------------------------------------------------------------------------------


//---------------------------------- INICIO POST --------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/alerta', (req, res) => {
    var ProblemDetailsHTML = req.body.ProblemDetailsHTML;  
    console.log(req.body);
    console.log("El titulo de la alerta es: "+ProblemDetailsHTML);
    translateText(ProblemDetailsHTML, 'es')
     .then((resp) => {
         console.log(resp);
     })
     .catch((err) => {
         console.log(err);
     });

    //res.json("Se ha detectado una alerta: "+ImpactedEntity+" "+req.body.ProblemDetailsHTML);
});
//------------------------------------FIN POST----------------------------------------------------


//------------------------ INICIO LISTEN-------------------------------------------------------
app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
   });
//------------------------ FIN LISTEN-------------------------------------------------------

