const router = require("express").Router();
const upload = require("../utils/multer");
const isAdmin=require("../middleware/isAdmin");
const requireLogin = require('../middleware/requireLogin') 
const  ArticleController =require("../controllers/article")

router.post("/",requireLogin,upload.single("image"),ArticleController.createArticle);
  router.get("/",requireLogin,ArticleController.getAllArticles);
    router.get("/:id",requireLogin,ArticleController.getArticlesById);
    router.delete("/:id",requireLogin,isAdmin,ArticleController.deleteArticle);

      router.put("/:id",requireLogin,isAdmin,upload.single("image"),ArticleController.updateArticle);
        router.put('/:id/like',requireLogin,ArticleController.likeArticle)
      router.put('/:id/unlike',requireLogin,ArticleController.unlikeArticle)
      router.put('/:id/comment',requireLogin,ArticleController.commentArticle)
      
      

   
        
 module.exports = router;