const { usuarios, proximoId } = require('../../data/db');

function indiceUsuario(filtro){
    if(!filtro) return -1;
    const { id, email } = filtro
    if(id) {
        return usuarios.findIndex(
            u => u.id === id
        )
    } else if(email) {
        return usuarios.findIndex(
            u => u.email === email
        )
    }
}

module.exports = {
    novoUsuario(_,  { dados }) {
        const emailExistente =  usuarios.some(
            u => u.email === dados.email
        );

        if(emailExistente){
            throw new Error('E-mail já cadastrado');
        }

        const novo = {    
            id: proximoId(),
            ...dados,
            pefil_id: 1,
            status: 'ATIVO',
        };

        usuarios.push(novo);
        return novo;
    },

    excluirUsuario(_, { filtro }) {
        const i = indiceUsuario(filtro);
        if(i < 0) return null;
        const excluidos = usuarios.splice(i, 1);
        return excluidos ? excluidos[0] : null;
    },
    alterarUsuario(_, { filtro, dados }) {
        const i = indiceUsuario(filtro);
        if(i < 0) return null;

        usuarios[i].nome = dados.nome;
        usuarios[i].email = dados.email;
        if(dados.idade){
            usuarios[i].idade = dados.idade;
        }

        // const usuario = {
        //     ...usuarios[i],
        //     ...args
        // };

        // usuarios.splice(i, 1, usuario);
        return usuarios[i];
    }
};