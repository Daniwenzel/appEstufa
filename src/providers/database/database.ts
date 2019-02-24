import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable()
export class DatabaseProvider {

    constructor(public http: HttpClient, private sqlite: SQLite) {
        console.log('Hello DatabaseProvider Provider');
    }

    public getDB() {
        return this.sqlite.create({
            name: 'estufa.db',
            location: 'default'
        });
    }

    public createDatabase() {
        return this.getDB()
            .then((db: SQLiteObject) => {

                this.createTables(db);

                this.insertDefaultItems(db);

            })
            .catch(e => console.log(e));
    }

    private createTables(db: SQLiteObject) {

        db.sqlBatch([
            ['CREATE TABLE IF NOT EXISTS broker_estufa (id INTEGER primary key AUTOINCREMENT NOT NULL, topico TEXT, leitura REAL, datetime TEXT)']
        ])
            .then(() => console.log('tabelas criadas'))
            .catch(e => console.error('Erro ao criar as tabelas', e));
    }

    private insertDefaultItems(db: SQLiteObject) {
        db.executeSql('select COUNT(id) as qtd from broker_estufa', [])
            .then((data: any) => {

                if (data.rows.item(0).qtd == 0) {
                    db.sqlBatch([
                        ['insert into broker_estufa (topico, leitura, datetime) values (?,?,?)', ['sensor/temperatura', '30.00', '2019-02-01 12:00:00']],
                        ['insert into broker_estufa (topico, leitura, datetime) values (?,?,?)', ['sensor/umidade', '70', '2019-02-20 20:30:00']]
                    ])
                        .then(() => console.log('Dados default incluídos com sucesso!'))
                        .catch(e => console.error('Erro ao incluir os dados default', e));
                }
            })
            .catch(e => console.error('Erro ao consultar a qtd de leituras', e));
    }

}
