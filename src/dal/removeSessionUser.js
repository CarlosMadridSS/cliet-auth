import sqlite3 from 'sqlite3'
import hasResultsInTable from './hasResultsInTable.js';
sqlite3.verbose()

const removeSessionUser = async (matricula) => {

    try {

        const db = new sqlite3.Database('database.db');

        const getHasResultsInTable = await hasResultsInTable(matricula)

        if (getHasResultsInTable) {
            db.run("DELETE FROM sessao_usuarios WHERE matricula = ?", [matricula], function (err) {
                if (err) throw new Error(`Erro ao efetuar logout: ${err.message}`)
            });
            
            return true
        }
        else return false

        

    } catch (error) {
        console.error(error.message)
        return false
    }

}

export default removeSessionUser