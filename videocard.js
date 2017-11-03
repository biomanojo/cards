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
        
        var video = new builder.VideoCard(session)
            .title('Creacion de Bot ')
            .subtitle('forma facil de crear un  bot con codigo facilito')
            .text('Un bot, es un programa que recibe y contesta mensajes de manera automática. Tener uno, podría significar automatizar el soporte de tu página, dudas y más. Desarrollaremos distintos tipos de bots, consumiremos APIs, es un curso muy completo.')
            .image(builder.CardImage.create(session, ''))
            .media([
                { url: 'https://www.youtube.com/watch?v=-c1UfJq2cpc' }
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'https://codigofacilito.com/cursos/bots', 'Ver Más')
            ]);

        var tarjetas = [video];
        // Adjuntamos la tarjeta al mensaje
        var msj = new builder.Message(session).addAttachment(video);
        session.send(msj);
    }
]);