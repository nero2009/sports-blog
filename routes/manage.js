const express = require("express");
const router = express.Router();

Category = require('../models/category.js')
Article = require('../models/article.js')

const Main = require('../main.js')

router.get("/articles",Main.ensureAuthenticated, (req, res, next) => {
  Article.getArticles((err,articles)=>{
    if(err){
      res.send(err)
    }
    res.render("manage_articles", {
      
          title: "Manage Articles",
          articles : articles
        });
  })
  
});

router.get("/categories",Main.ensureAuthenticated, (req, res, next) => {
  Category.getCategories((err,categories)=>{
    if(err){
      res.send(err);
    }

    res.render("manage_categories", {
      title: "Categories",
      categories:categories
    });
  })
});

router.get("/articles/add",Main.ensureAuthenticated, (req, res, next) => {
  Category.getCategories((err, categories)=>{
    if(err){
      res.send(err)
    }
    res.render("add_article", { title: "Create Article",
    categories:categories
   });
  })
  
});

router.get("/categories/add",Main.ensureAuthenticated, (req, res, next) => {
  res.render("add_category", { title: "Create Category" });
});



router.get("/categories/edit/:id", Main.ensureAuthenticated,(req, res, next) => {
  Category.getCategoryById(req.params.id,(err, category)=>{
    if(err){
      res.send(err)
    }
    res.render("edit_category", {
      title: "Edit category",
      category:category
    });
  })
 
});

router.get("/articles/edit/:id",Main.ensureAuthenticated, (req, res, next) => {
  Article.getArticleById(req.params.id,(err, article)=>{
    if(err){
      res.send(err)
    }
    Category.getCategories((err, categories)=>{
      res.render("edit_article", {
        title: "Edit Article",
        article:article,
        categories: categories
      });
    })
    
  })
 
});



module.exports = router;
