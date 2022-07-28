# Mysql 
---

#### 1. Import
```javascript
const {Mysql} = require('nsus/mysql'); 
```
#### 2. Initialize
```javascript
const db = new Mysql({
    host: 'database-host.com',
    user: 'admin',
    password: 'password',
    database: 'db_name',
    connectionLimit: 100,
    isDebug: false
})
```
no|prop|desc
----|-----------------|----
1| host            |
2| user            | 계정 아이디
3| password        | 비밀번호
4| database        | 데이터베이스명
5| connectionLimit | 기본값은 100
6| isDebug         | 기본값은 false

#### 3. Select many
```javascript
// Named parameter
const res = await db.find({
    query: 'select * from players where id>:id',
    param: {id: 10}
});
if (res.ok) {
    // 성공
    console.log(res.data);
} else {
    // 실패
    console.error(res.data);
}

// Positional parameter
const res = await db.find({
    query: 'select * from players where id>?',
    param: [10]
});

// success: {ok: true: data: []}
// faile: {ok: false, data: errorMessage}
```
#### 4. Find one 
`find` method와 다른 점은 조회한 데이터 중 첫번째 row만 반환한다.
```javascript
const res = await db.first({
    query: 'select * from players where id=:id',
    param: {id: 10}
});
// success: {ok: true, data: {}}
// faile: {ok: false}
```

#### 5. Insert/Update
```javascript 
const res = await db.command({
    query: `insert into players (name, age) values (:name, :age)`,
    param: {name: 'nsus', age: 10}
});
// insert/update의 경우 res.data에 다음과 같은 포맷의 데이터가 리턴된다.
{
  fieldCount: 0,
  affectedRows: 14,
  insertId: 0,
  serverStatus: 2,
  warningCount: 0,
  message: '\'Records:14  Duplicated: 0  Warnings: 0',
  protocol41: true,
  changedRows: 0
}
```
#### 6. etc
동일 lambda handler에서 여러(A, B) db connection을 사용할 경우
A db에서 query하고 B db에서 query 하기 전에 A.close()를 호출하여
connection pool을 초기화 해야 한다.
```javascript
let A = new Mysql({});
await A.find({});
A.close();
let B = new Mysql({});
await B.find({});
B.close();

// 만약 위 사용방법이 번거롭다면 Mysql class의 다음 코드를 제거하면 된다.
if (Mysql.#pool) {
    if (this.#isDebug === true) console.debug('is connected');
    return this;
}
```
