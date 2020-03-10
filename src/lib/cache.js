'use strict';

const fs = require('fs');
const path = './src/data/cache.json';

module.exports = {
    readCache: function() {
        let str = fs.readFileSync(path, 'utf8');
        let jsonData = JSON.parse(str);
        return jsonData;
    },
    writeCache: function(data = [], override = true) {
        if (!override) {
            let jsonData = this.readCache();
            jsonData.data = jsonData.data.concat(data);
            fs.writeFileSync(path, JSON.stringify(jsonData));
        } else {
            fs.writeFileSync(path, JSON.stringify({ data: data }));
        }
    }
};
