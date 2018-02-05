module.exports = (app, config) => {
    app.get("/", function(req, res){
        res.render('index', {title: "NEW TITLE"});
    });

    app.get("/board/:boardId", function(req, res){
        res.render('index');
    });
};