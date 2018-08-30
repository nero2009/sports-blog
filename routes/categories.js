const express = require("express");
const router = express.Router();
const { check,body, validationResult } = require('express-validator/check');
const Main = require('../main.js')


Category = require('../models/category.js')

router.get("/", (req, res, next) => {
  Category.getCategories((err,categories)=>{
    if(err){
      res.send(err);
    }

    res.render("categories", {
      title: "Categories",
      categories:categories
    });
  })
  
});

//Add category 
router.post('/add',
  check('title').isLength({ min: 1 }).withMessage('Title is required'),(req,res,next)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    res.render('add_category',{
      errors: errors.array(),
      title: 'Create category'
    })
    
    console.log(errors.array())
    return
  }else{
    let category = new Category();
    category.title = req.body.title
    category.description = req.body.description
  
    Category.addCategory(category,(err, category)=>{
      if(err){
        res.send(err)
      
      }
      req.flash('success', 'Category Saved')
      res.redirect('/manage/categories')
    })
  }


})

//Edit category -POST
router.post('/edit/:id',check('title').isLength({ min: 1 }).withMessage('Title is required'),(req,res,next)=>{
  const errors = validationResult(req); 
  let category = new Category();

  if(!errors.isEmpty()){
    res.render('edit_category',{
      errors: errors.array(),
      title: 'Edit Category',
      category: category
    })
    return
  }
    
    const query = {_id: req.params.id}
    const update ={
      title: req.body.title,
      description: req.body.description
    }
  
    Category.updateCategory(query, update, {}, (err, category)=>{
      if(err){
        res.send(err)
      }
      req.flash('success', 'Category Updated')
      res.redirect('/manage/categories')
    })
  
  
})

// Delete Category - DELETe
router.delete('/delete/:id',(req,res,next)=>{
 
  const query = {_id: req.params.id}
  
  Category.removeCategory(query,  (err, category)=>{
    if(err){
      res.send(err)
    }
    res.status(200)
  })
})

module.exports = router;
