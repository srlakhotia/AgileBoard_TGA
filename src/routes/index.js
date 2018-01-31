exports.index = function(req, res){
    res.render('./views/index', { name: 'John', title: 'RaceToDone' });
};