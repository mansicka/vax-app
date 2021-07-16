
const vaccinationsSource = './source/vaccinations.source';
const SolarBuddhicaSource = './source/SolarBuddhica.source';
const AntiquasSource = './source/Antiqua.source';
const ZerpfySouce = './source/Zerpfy.source';
//since source files are not json and rather separated by line,
//we read the file line by line and construct a json object 
function jsonPerse(source) {  
    const fs = require('fs');
    var results = [];
        var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(source)
        });
        console.log(process.env.npm_package_name + ' : source file loaded OK');
        lineReader.on('line', function (line) {
            const parsedLine = (JSON.parse(line));
            results.push(parsedLine);
            
        })
        lineReader.on('close', function () {
            console.log(process.env.npm_package_name + ' : source file processed, ' + results.length + ' rows');
        })
    return results;
    console.log()
}
module.exports.vaccinations = jsonPerse(vaccinationsSource);
module.exports.buddhica = jsonPerse(SolarBuddhicaSource);
module.exports.antiqua = jsonPerse(AntiquasSource);
exports.zerpfy = jsonPerse(ZerpfySouce);


