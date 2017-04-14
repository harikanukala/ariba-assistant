/**
 * Created by i854911 on 2/6/17.
 */
const Botkit = require('botkit');
const actions = require("./acions");
const bot = require("./bot")();
const path = require("path");
const beepboop_botkit = require('beepboop-botkit');
var BotkitStorageBeepBoop = require('botkit-storage-beepboop');

function BotKit(app)  {
    var botkit = {};

// Checking for the wit token
    const WIT_TOKEN="PEVL7DWLOGHF6T6ZQPO6KUC6VC2SRNW7";
    const serviceUri = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/3bc89b31-b40b-4cce-8620-305015829713?subscription-key=1a5b6b24501d4a01b39dd2a3aa40176c&verbose=true&timezoneOffset=0.0&q=";
    var wit = require('./wit')({
        accessToken: WIT_TOKEN,
        apiVersion: '20160516',
        minConfidence: 0.6,
        logLevel: 'debug'
    });
    var luis=require('./luis');
    var luisOptions = {serviceUri: serviceUri};
    const controller = Botkit.slackbot({storage: BotkitStorageBeepBoop()});

    controller.startTicking();

    var beepboop = beepboop_botkit.start(controller, { debug: true });

    beepboop.on("botkit.rtm.started", function(_bot, resource, meta)    {
        console.log("*** botkit.rtm.started ***");
        console.log("bot:" + bot);
        console.log("_bot:" + _bot);
        bot.init(resource.SlackIncomingWebhookURL, resource.SlackBotAccessToken);
    });

    require('./slack-handlers')(app, controller);

    // controller.middleware.receive.use(wit.receive);
    controller.middleware.receive.use(luis.middleware.receive(luisOptions));
    controller.hears(['(.*)'], 'direct_message,direct_mention,mention', (bot, message) => {

        console.log(message);

    if(message.entities.intent == undefined) {
        bot.reply(message, "Sorry, I don't understand.");
        return;
    }
    var intent = message.entities.intent[0].value;

    console.log("Intent: " + intent);

    if(actions[intent] == undefined || actions[intent] == null) return;
    actions[intent](bot, message);
});

    controller.on('interactive_message_callback', function(bot, message) {
        console.log('triggered----');
        actions[message.callback_id](bot, message);
    });

    return botkit;
}

module.exports = BotKit;
