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
        
        var heroCardj = new builder.HeroCard(session)
            .title('Animales de la Selva ')
            .subtitle('El Jaguares')
            .text('Son los felinos más grandes de América, es el mayor depredador de la selva junto a los demás felinos y el cocodrilo')
            .images([
                builder.CardImage.create(session, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdqjFT8jBdOKgTm83hVO61WEoxlVya96qRbVa2oz5uJdQEx1v_EA')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'http://www.redyaguarete.org.ar/asociate/', 'Ver Mas ')
            ]);

        var heroCardt = new builder.HeroCard(session)
            .title('Animales de la selva')
            .subtitle('El tigre')
            .text('es una de las cuatro3​ especies de la subfamilia de los panterinos (familia Felidae) pertenecientes al género Panthera. Se encuentra solamente en el continente asiático;')
            .images([
                builder.CardImage.create(session, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Tigress_at_Jim_Corbett_National_Park.jpg/250px-Tigress_at_Jim_Corbett_National_Park.jpg')
            ])
            .buttons([
                builder.CardAction.openUrl(session, 'https://es.wikipedia.org/wiki/Panthera_tigris', 'Ver Mas')
            ]);

        var tarjetas = [heroCardj, heroCardt];
        // Adjuntamos la tarjeta al mensaje
        //var msj = new builder.Message(session).addAttachment(heroCard);
        var msj = new builder.Message(session).attachmentLayout(builder.AttachmentLayout.carousel).attachments(tarjetas);
        session.send(msj);
    }
]);