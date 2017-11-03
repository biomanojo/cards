var restify = require('restify');
var builder = require('botbuilder');

// Levantar restify
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// No te preocupes por estas credenciales por ahora, luego las usaremos para conectar los canales.
var connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

// Ahora utilizamos un UniversalBot
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Dialogos
bot.dialog('/', [
    function (session) {
        
        var AudioC = new builder.AudioCard(session)
            .title('MIB')
            .subtitle('motos legendarias')
            .text('sonido de una motocicleta yamaha 750 ')
            .image(builder.CardImage.create(session, 'https://vignette.wikia.nocookie.net/men-in-black/images/d/d8/Kay_Jay.jpg/revision/latest?cb=20110531224535'))
            .media([
                { url: 'http://www.elongsound.com/component/rsfiles/descargar-archivo/archivos.html?path=gratis%252Fmotopasando_1.wav&Itemid=59' }
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'https://prezi.com/exzcfo4tpyot/las-motos-legendarias-de-todos-los-tiempos', 'Ver Más')
            ]);

        var tarjetas = [AudioC];
        // Adjuntamos la tarjeta al mensaje
        var msj = new builder.Message(session).addAttachment(AudioC);
        session.send(msj);
    }
]);