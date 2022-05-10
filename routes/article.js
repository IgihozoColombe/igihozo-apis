const router = require("express").Router();
const upload = require("../utils/multer");
const isAdmin=require("../middleware/isAdmin");
const requireLogin = require('../middleware/requireLogin') 
const  ArticleController =require("../controllers/article")

router.post("/",requireLogin,upload.single("image"),ArticleController.createArticle);
  router.get("/",ArticleController.getAllArticles);

    router.get("/:articleId",requireLogin,ArticleController.getArticlesById);

    router.delete("/:articleId",requireLogin,isAdmin,ArticleController.deleteArticle);

      router.put("/:articleId",requireLogin,isAdmin,upload.single("image"),ArticleController.updateArticle);

        router.put('/like/:articleId',requireLogin,ArticleController.likeArticle)
      router.put('/unlike/:articleId',requireLogin,ArticleController.unlikeArticle)
      router.put('/comment/:articleId',requireLogin,ArticleController.commentArticle)
      
      

   
        
 module.exports = router;