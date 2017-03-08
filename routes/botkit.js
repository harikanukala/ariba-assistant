/**
 * Created by i855845 on 2/13/17.
 */

const Botkit = require('botkit');
const actions = require("./actions");

var botkit = {};

// Cheking for the slack token
if (!process.env.SLACK_BOT_TOKEN) {
    console.error('Error: Specify a Slack token in an environment variable');
    process.exit(1);
}

// Cheking for the wit token
// if (!process.env.WIT_TOKEN) {
//     console.error('Error: Specify a Wit token in an environment variable');
//     process.exit(1);
// }

const WIT_TOKEN="PEVL7DWLOGHF6T6ZQPO6KUC6VC2SRNW7";

var wit = require('botkit-witai')({
    accessToken: WIT_TOKEN,
    minConfidence: 0.6,
    logLevel: 'debug'
});

// Creates the Slack bot
const controller = Botkit.slackbot();

// Starts the websocket connection
var slack_bot = controller.spawn({
    token: process.env.SLACK_BOT_TOKEN
});

slack_bot.startRTM(function (err, bot, payload) {
    if (err) {
        throw new Error(err)
    }

    console.log('Connected to Slack RTM')
})

controller.middleware.receive.use(wit.receive);

controller.on('bot_channel_join', function (bot, message) {
    bot.reply(message, "I'm here!")
})

controller.on('hello', function(bot, message){
    console.log("Got Helloooo")
    bot.reply(message,"Hi I am bot!!")
});

controller.hears(['(.*)'], 'direct_message,direct_mention,mention', function(bot, message){
    console.log("*****");
console.log(message);

if(slack_bot === bot)   {
    console.log("------- Both bots are same------")
}
if(message.entities.intent == undefined) {
    bot.reply(message, "Sorry, I don't understand.");
    return;
}
var intent = message.entities.intent[0].value;

console.log("Intent: " + intent);

actions[intent](bot, message);
});

module.exports = botkit;
