import sqlite3 from 'sqlite3'
import currentTimes from '../helpers/currentTimes.js'
import hasResultsInTable from './hasResultsInTable.js'
sqlite3.verbose()

const insertSessionUser = (matricula) => {

    try {

        const db = new sqlite3.Database('database.db');

        if (hasResultsInTable(matricula) == true) throw new Error('Já há um usuário autenticado.')

        const hora_sessao = currentTimes();

        db.run('INSERT INTO sessao_usuarios (matricula, hora_sessao) VALUES (?, ?)', [matricula, hora_sessao], function (err) {
            if (err) throw new Error(`Erro ao gravar sessão: ${err.message}`)
        });

        db.close();

        return true


    } catch (error) {
        console.error(error.message)
        return false
    }

}

export default insertSessionUser