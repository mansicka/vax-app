const fs = require('fs');
const LineByLineReader = require('line-by-line');
const db = require('../models');
var Order = db.Order;
var Vaccination = db.Vaccination;
const source = ['./seeders/source/SolarBuddhica.source', './seeders/source/Antiqua.source', './seeders/source/Zerpfy.source'];

//TODO: find a better way to do this - this is just too dirty :P

db.sequelize.sync().then(() => {
    parseSourceFile(source);
});
db.sequelize.options.logging = false;

const updateInjectionsLeft = async (id) => {
    return new Promise((resolve) => {
        Vaccination.count({
            where: {
                OrderId: id
            }
        })
            .then(async (count) => {
                order = await Order.findOne({
                    where: { id: id }
                })
                console.log(order)
                let n = order.injections;
                nn = n - count;
                order.injections_left = nn;
                order.save();
                resolve()
            })
    })
}

const readSourceFile = async (file) => {
    return new Promise((resolve) => {
        const lr = new LineByLineReader(file);
        lr.on('line', async (line) => {
            lr.pause()
            let strArray = line.split('"');
            await updateInjectionsLeft(strArray[3]);
            lr.resume()
        });
        lr.on('end', () => {
            resolve();
        });
    });
};

const parseSourceFile = async (source) => {
    return new Promise((resolve) => {
        let n = 0;
        source.forEach(file => {
            readSourceFile(file)
                .then(() => {
                    n++;
                    if (n == source.length) {
                        resolve();
                    }
                });
        })
    })
}
