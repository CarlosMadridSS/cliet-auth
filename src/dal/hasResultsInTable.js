import sqlite3 from 'sqlite3'
sqlite3.verbose()

async function hasResultsInTable (matricula) {

    try {
        const db = new sqlite3.Database('database.db');

        const query = new Promise((resolve, reject) => {
            db.all('SELECT * FROM sessao_usuarios WHERE matricula = ?', [matricula], (err, rows) => {
                if (err) reject(err)
                else resolve(rows)
            });
        })

        db.close();

        return await confirmIfResults(query)

    } catch (error) {
        console.error(error.message)
        return false
    }

}



async function confirmIfResults (query) {
    const dataValues = await query
    return dataValues.length > 0
}

export default hasResultsInTable