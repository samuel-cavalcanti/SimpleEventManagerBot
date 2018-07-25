const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = 'YOUR TOKEN';

var keyborad = require('./jsons/keyborad.json')

var event = require('./event')

var handles = require('./jsons/commands.js')


// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {
    polling: true
});

//  console.log(msg.from)
bot.onText(handles.edit.command, (msg, match) => {


    bot.sendMessage(msg.from.id, handles.edit.text, {
        parse_mode: 'Markdown',
        reply_markup: {

            one_time_keyboard: true,
            inline_keyboard: keyborad.edit
        }
    })


})


bot.onText(handles.see.command, (msg, match) => {

    let text = event.print();

    console.log(msg.chat.id)

    bot.sendMessage(msg.chat.id, text, {
        parse_mode: 'Markdown'
    })

})

bot.onText(handles.add.command, (msg, match) => {
    let fullName = msg.from.first_name + ' ' + msg.from.last_name
    let participants = event.participants
    let index = participants.indexOf(fullName)


    if (index > -1) {
        handles.add.text = fullName + ' já foi adicionado'

    } else {
        handles.add.text = fullName + ' vai'
        participants.push(fullName)
        event.save()
    }


    bot.sendMessage(msg.chat.id, handles.add.text)

})

bot.onText(handles.remove.command, (msg, match) => {
    let fullName = msg.from.first_name + ' ' + msg.from.last_name
    let participants = event.participants
    let index = participants.indexOf(fullName)


    if (index > -1) {
        handles.remove.text = fullName + ' foi removido'
        participants.splice(index, 1)
        event.save()

    } else {
        handles.remove.text = fullName + ' não está na lista'

    }

    bot.sendMessage(msg.chat.id, handles.remove.text)
})

bot.onText(handles.create.command, (msg, match) => {
    let message = 'message'

    bot.sendMessage(msg.from.id, keyborad.phrases.name)
    bot.once(message, (msg) => {
        event.name = msg.text

        bot.sendMessage(msg.from.id, keyborad.phrases.local)
        bot.once(message, (msg) => {
            event.local = msg.text

            bot.sendMessage(msg.from.id, keyborad.phrases.time)
            bot.once(message, (msg) => {
                event.time = msg.text

                bot.sendMessage(msg.from.id, keyborad.phrases.price)
                bot.once(message, (msg) => {
                    event.price = msg.text

                    event.host = msg.from.first_name + ' ' + msg.from.last_name

                    event.participants = []

                    event.participants.push(event.host)


                    event.save()
                    let text = event.print()

                    bot.sendMessage(msg.from.id, text, {
                        parse_mode: 'Markdown'
                    })

                    bot.sendMessage(msg.chat.id, text, {
                        parse_mode: 'Markdown'
                    })

                })
            })

        })


    })


})


bot.on('callback_query', (msg) => {

    console.log(msg.message.chat.id)

    if (msg.data == 'atualizar') {
        let text = event.print()

        bot.sendMessage(msg.message.chat.id, text, {
            parse_mode: 'Markdown'
        })
        event.save()



        return;
    }

    for (let i in keyborad.edit) {


        if (keyborad.edit[i][0].callback_data == msg.data) {

            let index = Object.keys(keyborad.phrases)[i]
            bot.sendMessage(msg.message.chat.id, keyborad.phrases[index])


            bot.once('message', (msg) => {

                let index = Object.keys(event)[i]
                event[index] = msg.text
            })

            break;
        }

    }
})