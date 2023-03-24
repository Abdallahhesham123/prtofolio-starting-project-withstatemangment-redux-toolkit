import {Router} from 'express'
import * as postController from  './controller/post.js'
const router = Router();


router.get("/" , postController.getProductModule)

export default  router