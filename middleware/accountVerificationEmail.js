const { createTransport } = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2
const { GOOGLE_ID,GOOGLE_REFRESH,GOOGLE_SECRET,GOOGLE_URL,GOOGLE_USER,BACK_URL } = process.env

function createClient() { //defino una funcion para construir la credencial
    return new OAuth2(
        GOOGLE_ID,
        GOOGLE_SECRET,
        GOOGLE_URL
    )
}

function getTransport(client) { //defino el transportador
    //la funcion requiere que le pase la credencial COMPLETA (la recien creada + refresh token)
    const accessToken = client.getAccessToken() //access token tiene vencimiento por eso lo calculo
    return createTransport({
        service: 'gmail',   //nombre de servicio de mensajeria
        auth: {             //los datos de las credenciales
            user: GOOGLE_USER,
            type: 'OAuth2',
            clientId: GOOGLE_ID,
            clientSecret: GOOGLE_SECRET,
            refreshToken: GOOGLE_REFRESH,
            accessToken: accessToken
        },
        tls: { rejectUnauthorized: false } //propiedad de seguridad
    })
}


function getEmailBody({mail,code,host}) { //defino una funcion para definir el cuerpo del mail (template)
    //debe tener un link hacia una ruta del controlador de usuario
    //que cambia la propiedad verificado de false a true
    return `
        <div>
            <h1>Hola, ${mail}</h1>            
            <a href="${host}auth/verify/${code}">
                Verify my account.
            </a>
        </div>
    `
}


const accountVerificationEmail = async (mailNewUser,codeToCrypto) => {
    const client = createClient() 
    client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH }) 
    const transport = getTransport(client) 
    const mailOptions = { 
        from: GOOGLE_USER, 
        to: mailNewUser, 
        subject: 'Verify your new account in Smoky', 
        html: getEmailBody({mail:mailNewUser, code:codeToCrypto, host:BACK_URL}) 
    }
    await transport.sendMail( //utilizo el metodo sendMail del transportador para enviar el correo
        mailOptions, //opciones del correo
        (error, response) => { //función callback para manejar el error
            if (error) {
                console.error(error)
                return
            }
            console.log('Email sent!')
        }
    )
}

module.exports = accountVerificationEmail