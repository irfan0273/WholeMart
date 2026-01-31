import  {Router} from "express"
import auth from "../middleware/auth.js"
import { AddCategoryController, deleteCategoryController, getCategoryController, updateCategoryController } from "../controller/category.controller.js"

const categoryRouter = Router()

categoryRouter.post("/add-category", AddCategoryController,auth)
categoryRouter.get("/get",getCategoryController)
categoryRouter.put('/update',auth,updateCategoryController)
categoryRouter.delete('/delete',auth,deleteCategoryController)


export default categoryRouter
