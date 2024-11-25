import sqlite3 from  'sqlite3'
sqlite3.verbose()

const database = () => {


    // Criar ou abrir o banco de dados (criar o arquivo se não existir)
    const db = new sqlite3.Database('database.db', (err) => {
        if (err) {
            console.error("Erro ao abrir banco de dados:", err.message);
        } else {
            console.log("Conectado ao banco de dados SQLite");
        }
    });
    
    // Criar uma tabela
    db.run("CREATE TABLE IF NOT EXISTS sessao_usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, matricula INT NOT NULL, hora_sessao DATETIME NOT NULL)", (err) => {
        if (err) {
            console.error("Erro ao criar tabela:", err.message);
        } else {
            console.log("Tabela criada ou já existe.");
        }
    });
    
    
    // Fechar a conexão
    db.close((err) => {
        if (err) {
            console.error("Erro ao fechar banco de dados:", err.message);
        } else {
            console.log("Conexão com o banco de dados fechada.");
        }
    });
}

export default database

