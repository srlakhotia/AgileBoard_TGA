const request = require('request-promise');
const President = require('./model');

const seed = () => {
    request('https://mysafeinfo.com/api/data?list=presidents&format=json')
        .then(res => JSON.parse(res))
        .then(res => {
            const data = res.map((r) => {
                const obj = {};
                obj.name = r.nm;
                obj.party = r.pp;
                obj.term = r.tm;
                return obj;
            });

            data.forEach((d) => {
                const president = new President(d);

                president.save((err, item) => {
                    //Saved
                });
            });
        })
        .catch(err => {
            console.error('error: ', err);
        });
};

module.exports = {seed};