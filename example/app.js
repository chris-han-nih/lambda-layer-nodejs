const {Mysql} = require('../mysql/mysql');

class Brand {
    constructor(data) {
        this.Id = data.Id ?? null;
        this.BrandId = data.BrandId;
    }

    async add(db) {
        return db.command({
            query: 'INSERT INTO nih_library_test (BrandId) VALUES(:BrandId);',
            param: this
        });
    }

    async findByIdSingle(db) {
        if (!this.Id) {
            console.warn(`invalid parameter. (id: ${this.Id})`);
            return null;
        }

        return db.first({
            query: 'select * from nih_library_test where Id = :Id;',
            param: this
        });
    }

    async findByIds(db, ids) {
        return db.find({
            query: 'select * from nih_library_test where Id in (?);',
            param: Array(ids)
        });
    }
}
(async () => {
    const db = new Mysql({
        host: 'db-business-stage.ggbiz.io',
        database: 'db_business',
        user: 'admin',
        password: 'T2nsuslab!',
        isDebug: 'DEBUG'
    });

    // const b = new Brand({BrandId: 'PokerOK'});
    // const r = await b.add(db);
    // console.log(r.data.insertId);

    const Id = 28;
    const rsp = await new Brand({ Id }).findByIdSingle(db)
    console.log(rsp.data);

    const b = new Brand({});
    const r = await b.findByIds(db, [27, 30, 31]);
    console.log('---------', r);
})();