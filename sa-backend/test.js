
'use strict';
const source = ['./seeders/source/vaccinations.source'];
const fs = require('fs');
const readline = require('readline');

const data = [];

const readSourceFile = async (file) => {
    const fileStream = fs.createReadStream(file);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    for await (const line of rl) {
        //parse & push the object to data array
        let strArray = line.split('"');
        let date = new Date();
        let vaccinationObject = {
            id: strArray[3],
            gender: strArray[11],
            date: strArray[15],
            origin_id: strArray[7],
            createdAt: date,
            updatedAt: date,
        }
        data.push(vaccinationObject);
    };
    return data;
};

const parseSourceFile = (source) => {
    return new Promise((resolve, reject) => {
        let result = [];
        source.forEach(file => {
            let r = readSourceFile(file);
            result = result.concat(r);
        })
        resolve(result);
        return result;
    })

}

const init = async () => {
    let rrr = await parseSourceFile(source)

}
init();