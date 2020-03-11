'use strict';

const fs = require('fs');
const config = require('./config');

const cachePath = './src/data/cache.json';
const repliesPath = './src/data/replies.json';

module.exports = {
    // cache functions

    // writes data to cache
    // overrides old data
    writeToCache: function(data = []) {
        let date = this.date();
        config.cacheDate = date;
        fs.writeFileSync(cachePath, JSON.stringify({ date: date, data: data }));
    },
    // returns saved cache data
    readFromCache: function() {
        let str = fs.readFileSync(cachePath, 'utf8');
        let jsonData = JSON.parse(str);
        return jsonData;
    },
    // removes all data from cache
    clearCache: function() {
        this.writeToCache([]);
    },
    // adds data to cache
    // does not override old data
    appendCache: function(data) {
        let cachedData = this.readFromCache();
        cachedData.data = cachedData.data.concat(data);
        fs.writeFileSync(cachePath, JSON.stringify(cachedData));
    },
    initCache: function() {
        // if cache doesnt exist create it
        // cache is not pushed to git
        // so we need to check it
        if (!fs.existsSync(cachePath)) {
            fs.writeFileSync(cachePath, '{}');
            config.cacheDate = '';
        } else {
            let data = this.readFromCache();
            let date = data.date;
            config.cacheDate = date;
        }

        console.log('cache initialized');
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
