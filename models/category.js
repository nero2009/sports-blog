const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  }
});
const Category = (module.exports = mongoose.model("Category", categorySchema));

//Get categories
module.exports.getCategories = (callback, limit) => {
  Category.find(callback)
    .limit(limit)
    .sort([["title", "ascending"]]);
};

//Add category
module.exports.addCategory = (category, callback) => {
  Category.create(category, callback);
};

//Get Soingle Category by id
module.exports.getCategoryById = (id, callback) => {
  Category.findById(id, callback);
};

//update category
module.exports.updateCategory = (query, update, options, callback) => {
  Category.findOneAndUpdate(query, update, options, callback);
};


//Remoeve Category
module.exports.removeCategory =(query,callback)=>{
  Category.remove(query, callback)
}