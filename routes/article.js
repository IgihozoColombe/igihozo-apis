const router = require("express").Router();
const upload = require("../utils/multer");
const isAdmin=require("../middleware/isAdmin");
const requireLogin = require('../middleware/requireLogin') 
const  ArticleController =require("../controllers/article")

router.post("/",requireLogin,isAdmin,upload.single("image"),ArticleController.createArticle);
  router.get("/",ArticleController.getAllArticles);

    router.get("/:id",requireLogin,ArticleController.getArticlesById);

    router.delete("/:id",requireLogin,isAdmin,ArticleController.deleteArticle);

      router.put("/:id",requireLogin,isAdmin,upload.single("image"),ArticleController.updateArticle);

        router.put('/like/:id',requireLogin,ArticleController.likeArticle)
      router.put('/unlike/:id',requireLogin,ArticleController.unlikeArticle)
      router.put('/comment/:id',requireLogin,ArticleController.commentArticle)
      
      

   
        
 module.exports = router;