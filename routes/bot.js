/**
 * Created by i854911 on 3/2/17.
 */
var slack_bot_token = null;
var incoming_webhook_url = null;
var request = require('request');

function Bot()  {

    var bot = {};

    bot.init = function(_incoming_webhook_url, _slack_bot_token)  {

        console.log("Defining slackbot");
        console.log(_slack_bot_token);
        console.log(_incoming_webhook_url);

        incoming_webhook_url = _incoming_webhook_url;
        slack_bot_token = _slack_bot_token;
    };

    bot.postNotification = function(notification, cb)    {

        request.post(incoming_webhook_url, function(err, res, body) {
            if (err) {
                console.log('Webhook Error', err);
                return cb && cb(err);
            }
            console.log('Webhook Success', body);
            cb && cb(null, body);
        }).form({ payload: JSON.stringify(notification) });
    };

    return bot;
}

module.exports = Bot;