const mongoose = require("mongoose");

//Artice schema
const articleSchema = mongoose.Schema({
  title: {
    type: String
  },
  subtitle: {
    type: String
  },
  category: {
    type: String
  },
  body: {
    type: String
  },
  author: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  comment:[{
      comment_subject:{
          type:String
      },
      comment_body:{
        type:String
    },
    comment_author:{
        type:String
    },
    comment_email:{
        type:String
    },
    comment_date:{
        type:String
    }
  }]
});
const Article = (module.exports = mongoose.model("Article", articleSchema));

//Get Article
module.exports.getArticles = (callback, limit) => {
    Article.find(callback)
    .limit(limit)
    .sort([["title", "ascending"]]);
};
//Gett Article by category
module.exports.getCategoryArticles =(categoryId, callback)=>{
  let query = {category: categoryId}
  Article.find(query, callback)
  .sort([["title", "ascending"]]);
}

//Add Article
module.exports.addArticle = (article, callback) => {
  Article.create(article, callback);
};

//Get Soingle Article by id
module.exports.getArticleById = (id, callback) => {
  Article.findById(id, callback);
};

//update Article
module.exports.updateArticle = (query, update, options, callback) => {
  Article.findOneAndUpdate(query, update, options, callback);
};


//Remoeve Article
module.exports.removeArticle =(query,callback)=>{
  Article.remove(query, callback)
}

//Add comment
module.exports.addComment = function(query, comment, callback){
  Article.update(query,
    {
      $push: {
        comments: comment
      }
    },
    callback
  );
}