import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
@Injectable({
  providedIn: 'root'
})
export class SqliteStorageService {

  constructor(private sqlite: SQLite) { }
  public text : string = "";
  public db = null;
  public arr = [];
  
 /**
  * 
  * Open The Datebase
  */
	openDb() 
	{
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS Buildings (id integer primary key,buildingId text)', [])
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
          db.executeSql('CREATE TABLE IF NOT EXISTS Buildinglist (id integer primary key,doorno text,subno text,demand text)', [])
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
      }).catch(e => console.log(e));
      
	}	
  /**
   * 
   * @param addItem for adding: function
   */
  addItem(i) {
    return new Promise(resolve => {
      var InsertQuery = "INSERT INTO Buildings (buildingId) VALUES (?)";
      this
        .db
        .executeSql(InsertQuery, [i], (r) => {
          console.log('Inserted... Sucess..', i);
          this
            .getRows()
            .then(s => {
              resolve(true)
            });
        }, e => {
          console.log('Inserted Error', e);
          resolve(false);
        })
    })
  }

  //Refresh everytime

  getRows() {
    return new Promise(res => {
      this.arr = [];
      let query = "SELECT * FROM Buildings";
      this
        .db
        .executeSql(query, [], rs => {
          if (rs.rows.length > 0) {
            for (var i = 0; i < rs.rows.length; i++) {
              var item = rs
                .rows
                .item(i);
              this
                .arr
                .push(item);
            }
          }
          res(true);
        }, (e) => {
          console.log('Sql Query Error', e);
        });
    })

  }
  //to delete any Item
  del(id) {
    return new Promise(resolve => {
      var query = "DELETE FROM Buildings WHERE id=?";
      this
        .db
        .executeSql(query, [id], (s) => {
          console.log('Delete Success...', s);
          this
            .getRows()
            .then(s => {
              resolve(true);
            });
        }, (err) => {
          console.log('Deleting Error', err);
        });
    })

  }
  //to Update any Item
  update(id, txt) {
    return new Promise(res => {
      var query = "UPDATE Buildings SET buildingId=?  WHERE id=?";
      this
        .db
        .executeSql(query, [
          txt, id
        ], (s) => {
          console.log('Update Success...', s);
          this
            .getRows()
            .then(s => {
              res(true);
            });
        }, (err) => {
          console.log('Updating Error', err);
        });
    })

  }  

}

