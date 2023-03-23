var connection = require("../connection/connection");

const news = async(req, res) => {
    
    let query = `select image,title,description from news`;
   
        let result = await connection.execute(query);
         res.render('news', {
            activatePage: "news",
            data: result[0]

        });
    
}
module.exports =news;