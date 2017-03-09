/**
 * Created by i854911 on 2/6/17.
 */
const Botkit = require('botkit');
const actions = require("./acions");
const bot = require("./bot")();
const path = require("path");
const beepboop_botkit = require('beepboop-botkit');

function BotKit(app)  {
    var botkit = {};

    const WIT_TOKEN="PEVL7DWLOGHF6T6ZQPO6KUC6VC2SRNW7";
    var wit = require('./wit')({
        accessToken: WIT_TOKEN,
        apiVersion: '20160516',
        minConfidence: 0.6,
        logLevel: 'debug'
    });

// Creates the Slack bot
    const controller = Botkit.slackbot();

    controller.startTicking()

    beepboop_botkit.start(controller, { debug: true })
    require('./slack-handlers')(app, controller)


    controller.middleware.receive.use(wit.receive);

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
        console.log(message.callback_id);
        actions[message.callback_id](bot, message);
    });
    // require('./register-botkit-studio')(app, controller)
    return botkit;
}

module.exports = BotKit;
