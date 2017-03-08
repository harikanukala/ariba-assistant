/**
 * Created by i855845 on 2/13/17.
 */

var context="";
module.exports = {
    // notifyIssue:  function(bot, message)   {
    //     console.log("Inside notifyIssue");
    //     bot.reply(message, "Invoice 4711 rejected")
    // },
    recommend:  function(bot, message)  {
        console.log("Inside recommend");
        context="help";
        setTimeout(function() {
            bot.reply(message, messageBuilderRecommend());
            setTimeout(function () {
                bot.reply(message, "Do you want to update the quantity to 50 units?");
            }, 500);
        },10);

    },
    yes:  function(bot, message)   {
        console.log("Inside yes");
        if(context=="help") {
            bot.reply(message,messageBuilderSubmit());
        }
        // else if(context=="update_quantity"){
        //     context="adjust_tax";
        //     bot.reply(message,messageBuilderTax());
        // }
        // else if(context=="adjust_tax"){
        //     bot.reply(message,messageBuilderSubmit());
        // }dlk
    },
    show_receipt:  function(bot, message)   {
        console.log("Inside show_receipt");
        context="update_quantity";
        bot.reply(message,messageBuilderReceipt());
    },
    submitInvoice: function(bot, message)  {
        console.log("Inside submitInvoice ");

        setTimeout(function()   {
            bot.reply(message, "• Prices :white_check_mark:");
            setTimeout(function()   {
                bot.reply(message, "• Quantities :white_check_mark:");
                    setTimeout(function()   {
                        bot.reply(message, "70% chance of invoice being approved");
                        setTimeout(function()   {
                            bot.reply(message, "Invoice 5711 is created.");
                        }, 2000);
                    }, 1000);
            }, 200);
        }, 100);
    },
    current_payment_info:  function(bot, message)   {
        console.log("Inside current_payment_info");
        bot.reply(message,"If you are approved today, you are scheduled to get paid $2,000 by April 30th, 2017");
    },
    get_payments:  function(bot, message)   {
        console.log("Inside current_payment_info");
        bot.reply(message,messageBuilderPaymentImage());
    }
};

function messageBuilderRecommend() {
    console.log("-----messageBuilder Called----")
    var jsonObj = {
        "text": "You invoiced 100 items but the buyer received only 50 units. On 10/03/2017, buyer’s `GRN 3242424` indicates 50 units were rejected for quality issues. ",
        "attachments": [
            {
                "text":"receipt",
                "image_url": "https://peaceful-springs-59601.herokuapp.com/Quantity",
                "color": "#3AA3E3"
            }
        ]
    };
    return jsonObj;
}

function messageBuilderTax() {
    var jsonObj = {
        "text": "Based on the past invoices with this buyer - IT Solutions at this location – Tampa, FL, tax rate is 6% and not currently used 7.5%.",
        "attachments": [
            {
                "text": "Do you want to adjust the taxes?",
                "fallback": "You are unable to choose",
                "callback_id": "wopr_game",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "Yes",
                        "text": "Yes",
                        "style": "primary",
                        "type": "button",
                        "value": "Yes"
                    },
                    {
                        "name": "No",
                        "text": "No",
                        "style": "danger",
                        "type": "button",
                        "value": "No"
                    }
                ]
            }
        ]
    };
    return jsonObj;
}

function messageBuilderSubmit() {
    console.log("-----messageBuilder Called----")
    var jsonObj = {
        "text": "Great! Do you want to update any other information before submitting the invoice?",
        "attachments": [
            {
                // "text": "Choose a PO to create invoice",
                "fallback": "You are unable to choose",
                "callback_id": "wopr_game",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "Update more",
                        "text": "Update more",
                        // "style": "primary",
                        "type": "button",
                        "value": "Update more"
                    },
                    {
                        "name": "Submit",
                        "text": "Submit",
                        "style": "primary",
                        "type": "button",
                        "value": "Submit"
                    }
                ]
            }
        ]
    };
    return jsonObj;
}

function messageBuilderReceipt() {
    console.log("-----messageBuilder Called----")
    var jsonObj = {
        "text": "only one goods receipt found.",
        "attachments": [
            {
                "text": "Do you want to update the quantity to 50 units?",
                "fallback": "You are unable to choose",
                "callback_id": "wopr_game",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "Yes",
                        "text": "Yes",
                        "style": "primary",
                        "type": "button",
                        "value": "Yes"
                    },
                    {
                        "name": "No",
                        "text": "No",
                        "style": "danger",
                        "type": "button",
                        "value": "No"
                    }
                ]
            }
        ]
    };
    return jsonObj;
}

function messageBuilderPaymentImage() {
    console.log("-----messageBuilderPaymentImage Called----")
    var jsonObj = {
        "attachments": [
            {
                "text": "Payment schedule",
                "image_url": "https://peaceful-springs-59601.herokuapp.com/PaymentSchedule",
                "color": "#3AA3E3"
            }
        ]
    };
    return jsonObj;
}