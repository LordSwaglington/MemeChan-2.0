'use strict';

const fs = require('fs');
const config = require('./config');

const cachePath = './src/data/cache/';

module.exports = {
    // cache functions

    // writes data to cache
    // overrides old data
    writeToCache: function(data = [], name) {
        let date = this.date();
        config.cacheDate = date;
        fs.writeFileSync(
            `${cachePath}${name}.json`,
            JSON.stringify({ date: date, data: data })
        );
    },
    // returns saved cache data
    readFromCache: function(name) {
        let str = fs.readFileSync(`${cachePath}${name}.json`, 'utf8');
        let jsonData = JSON.parse(str);
        return jsonData;
    },
    // removes all data from cache
    clearCache: function(name) {
        this.writeToCache([], name);
    },
    // adds data to cache
    // does not override old data
    appendCache: function(data, name) {
        let cachedData = this.readFromCache(name);
        cachedData.data = cachedData.data.concat(data);
        fs.writeFileSync(
            `${cachePath}${name}.json`,
            JSON.stringify(cachedData)
        );
    },
    initCache: function(name) {
        // if cache doesnt exist create it
        // cache is not pushed to git
        // so we need to check it
        if (!fs.existsSync(`${cachePath}${name}.json`)) {
            fs.writeFileSync(`${cachePath}${name}.json`, '{}');
            config.cacheDate = '';
        } else {
            let data = this.readFromCache(name);
            let date = data.date;
            config.cacheDate = date;
        }

        console.log(`${name} cache initialized`);
    },

    // utility functions
    randomRange: function(max) {
        return Math.floor(Math.random() * max);
    },
    // returns current date
    // used to refresh cache
    date: function() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');

        return `${mm}-${dd}`;
    }
};
