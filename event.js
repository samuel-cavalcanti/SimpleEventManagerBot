var event = require('./jsons/event.json')
var jsonfile = require('jsonfile')

event.print =  function(){
    let text = '*nome do evento*: ' + event.name + '\n'
    text += '*hora*: ' + event.time + '\n'
    text += '*local*: ' + event.local + '\n'
    text += '*preço*: ' + event.price + '\n'
    text += '*organizado por*: ' + event.host + '\n'
    text += '*participantes*: '
    
    for (var i in event.participants){
       
        text+= event.participants[i] + '\n'
    }


    return text
}
event.save = function (){
    jsonfile.writeFile('jsons/event.json', event)
}



module.exports = event 