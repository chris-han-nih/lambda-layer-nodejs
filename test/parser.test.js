const {Parser} = require('../parser');

const json2csvCases = [
    [{name: 'dave', age: 40}, `"name","age"\n"dave",40`],
    [{name: null, age: 40}, `"name","age"\n,40`],
]

const csv2jsonCases = [
    [`"name","age"\n"dave",40`, [{name: 'dave', age: "40"}]],
    [`"name","age"\n,40`, [{name: "", age: "40"}]],
]
describe('json2csv test', () => {
    test.each(json2csvCases)('Parser.json2csv(%s)', (arg, want) => {
        expect(Parser.json2csv(arg)).toBe(want);
    });
});

describe('csv2json test', () => {
    test.each(csv2jsonCases)('Parser.csv2json(%s', async (arg, want) => {
        expect(await Parser.csv2json(arg)).toStrictEqual(want);
    });
});
