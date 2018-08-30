const express = require("express");
const router = express.Router();
const { check,body, validationResult } = require('express-validator/check');

const Main = require('../main.js')

const Article = require('../models/article.js')
const Category = require('../models/category.js')

router.get("/", (req, res, next) => {
  Article.getArticles((err, articles)=>{
    res.render("articles", {
      title: "Articles",
      articles : articles
    });
  })
  
});

router.get("/show/:id", (req, res, next) => {
  Article.getArticleById(req.params.id, (err, article)=>{
    res.render("article", {
      title: "Article",
      article: article
    });
  })
  
});

router.get("/category/:category_id", (req, res, next) => {
  Article.getCategoryArticles(req.params.category_id,(err,articles)=>{
    Category.getCategoryById(req.params.category_id,(err, category)=>{
      res.render("articles", {
        title: category.title+" Articles",
        articles:articles
      });
    })
    
  })
  
});

//Add article
router.post('/add',[
  check('title').isLength({ min: 1 }).withMessage('Title is required'),
  check('author').isLength({ min: 1 }).withMessage('Author is required'),
  check('category').isLength({ min: 1 }).withMessage('Category is required'),
  check('body').isLength({ min: 1 }).withMessage('Body is required')
], (req,res,next)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    Category.getCategories((err,categories)=>{
      res.render("add_article",{
        errors: errors.array(),
        title: 'Create Article',
        categories: categories
      })

    })
    return
  }else{
    let article = new Article();
    article.title = req.body.title
    article.subtitle = req.body.subtitle
    article.category = req.body.category
    article.body = req.body.body
    article.author = req.body.author
  
    Article.addArticle(article,(err, article)=>{
      if(err){
        res.send(err)
      }
      req.flash('success', 'Article Added')
      res.redirect('/manage/articles')
    })
  }

})

//Add Comments
router.post('/comments/add/:id',[
  check('comment_subject').isLength({ min: 1 }).withMessage('Title is required'),
  check('comment_author').isLength({ min: 1 }).withMessage('Author is required'),
  check('comment_body').isLength({ min: 1 }).withMessage('Body is required')

], (req, res, next) => {
  

  const errors = validationResult(req);

  if(!errors.isEmpty()){
    Article.getArticleById(req.params.id, (err, article) => {
      res.render('article', {
        title: 'Article',
        article: article,
        errors: errors.array(),
      });
    });
  } else {
    let article = new Article();
    let query = {_id: req.params.id}

    let comment = {
      comment_subject: req.body.comment_subject,
      comment_author: req.body.comment_author,
      comment_body: req.body.comment_body,
      comment_email: req.body.comment_email,
    }

    Article.addComment(query, comment, (err, article) => {
      res.redirect('/articles/show/'+req.params.id);
    });
  }
});

//Update Article
router.post('/edit/:id',[
  check('title').isLength({ min: 1 }).withMessage('Title is required'),
  check('author').isLength({ min: 1 }).withMessage('Author is required'),
  check('category').isLength({ min: 1 }).withMessage('Category is required'),
  check('body').isLength({ min: 1 }).withMessage('Body is required')
], (req,res,next)=>{
  const errors = validationResult(req);
  let article = new Article();
  if(!errors.isEmpty()){
    Category.getCategories((err,categories)=>{
      res.render("edit_article",{
        errors: errors.array(),
        title: 'Edit Article',
        categories: categories,
        article: article
      })

    })
    return 
  }else{
    
    const query ={_id: req.params.id}
  
    const update ={
      title: req.body.title,
      subtitle: req.body.subtitle,
      category: req.body.category,
      author:req.body.author,
      body:req.body.body
    }
 
    Article.updateArticle(query,update,{},(err, article)=>{
      if(err){
        res.send(err)
      }
      req.flash('success', 'Article Updated')
      res.redirect('/manage/articles')
    })
  }
 
})

//Delete article
router.delete('/delete/:id',(req,res,next)=>{
  
   const query = {_id: req.params.id}
   
   Article.removeArticle(query,  (err, article)=>{
     if(err){
       res.send(err)
     }
     res.status(200)
   })
 })


module.exports = router;
