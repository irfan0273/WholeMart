import {Router} from "express";
import auth from "../middleware/auth.js";
import { AddSubCategoryController, deleteSubCategoryCOntroller, getSubCategoryController, updateSubCategoryController } from "../controller/subCategoryController.js";
import { deleteCategoryController } from "../controller/category.controller.js";

const subcategoryRouter = Router()

subcategoryRouter.post('/create', auth,AddSubCategoryController)
subcategoryRouter.post('/get',auth,getSubCategoryController)
subcategoryRouter.put('/update',auth,updateSubCategoryController)
subcategoryRouter.delete('/delete',auth,deleteSubCategoryCOntroller)
export default subcategoryRouter