var commands = {
    edit: {
        command : /\/(start|editar_evento)/,
        text: 'qual informação deseja alterar ?'
    },
    see :{
        command : /ver_evento/,
        text: undefined,    
    },

    create :{
        command: /\/(criar_evento)/,
        text: undefined
    },
    add : {
        command: /\/(eu_vou)/,
        text: undefined
    },
    remove: {
        command: /\/(eu_nao_vou)/,
        text: undefined
    }

}

module.exports = commands;