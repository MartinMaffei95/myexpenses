import { Types } from 'mongoose';
import { Category } from '../interfaces/category.interface';
import CategoryModel from '../models/category';
import TransactionModel from '../models/transaction';
import UserModel from '../models/user';
import { isAuthorized, isAuthorizedUser } from '../utils/isAuthorized.handler';

const createCategory = async (category: Category, { user }: any) => {
  if (category.sub_category === null || category.sub_category.length <= 0) {
    // create a category
    const newCategory = new CategoryModel({
      name: category.name,
      icon: category.icon,
      created_by: user._id,
      public: false,
      sub_category: null,
      isSubCategory: category.isSubCategory,
    });
    const responseCategory = await newCategory.save();
    return responseCategory;
  } else {
    const subCategories = category.sub_category;
    const fatherCategoryId = new Types.ObjectId();

    //Create all categories and save a array with: CategoryObjects
    // and other with Categorys Ids
    let arrayOfCategories = [];
    let arrayOfCategoriesId = [];
    for (let i = 0; i < subCategories.length; i++) {
      const subCategory = subCategories[i] as Category;

      const scId = new Types.ObjectId();
      const sc = {
        _id: scId,
        name: subCategory.name,
        icon: subCategory.icon,
        public: false,
        sub_category: null,
        isSubCategory: true,
        created_by: user._id,
      };
      arrayOfCategoriesId.push(scId);
      arrayOfCategories.push(sc);
    }
    // Now create the category father of all sub categories
    // and save array subCategoriesId(strings)
    const fatherCategory = new CategoryModel({
      _id: fatherCategoryId,
      name: category.name,
      icon: category.icon,
      public: false,
      sub_category: arrayOfCategoriesId,
      isSubCategory: false,
      created_by: user._id,
    });

    // Now use insterMany with array of subcategories(Objects)
    await CategoryModel.insertMany(arrayOfCategories);
    const categoryResponse = await fatherCategory.save();
    return categoryResponse;
  }
};

const editCategoryData = async (
  { name, icon }: Category,
  { user }: any,
  id: string
) => {
  //This check if the file exists in collectionDb and if the client - who send the request - have authorization to used
  const oldCategoryData = await isAuthorized(CategoryModel, id, user._id);

  const updatedCategory = {
    name: name || oldCategoryData.name,
    icon: icon || oldCategoryData.icon,
    created_by: oldCategoryData.created_by,
    public: oldCategoryData.public,
    sub_category: oldCategoryData.sub_category,
    isSubCategory: oldCategoryData.isSubCategory,
  };
  const updatedCategoryResponse = await oldCategoryData.update(updatedCategory);

  return updatedCategoryResponse;
};

const deleteOneCategory = async ({ user }: any, id: string) => {
  //This check if the file exists in collectionDb and if the client - who send the request - have authorization to used
  const categoryData: Category = await isAuthorized(
    CategoryModel,
    id,
    user._id
  );

  try {
    //ToDo:
    //get all transactions with that category and assign a generic category
    //--make the same with the subcategories
    if (
      categoryData.sub_category !== null &&
      categoryData.sub_category.length > 0
    ) {
      const subCat = categoryData.sub_category;
      console.log('subCat ==>> ', subCat);
      for (let i = 0; i < subCat.length; i++) {
        const sc = subCat[i] as string;
        console.log('subCat1 ==>> ', sc);
        await TransactionModel.updateMany(
          //Find all transactions with that category
          {
            created_by: user._id,
            category: sc,
          },
          //Set the category in id "999" ("Other" category)
          {
            category: '999',
          }
        );
        console.log('subCat2 ==>> ', sc);
        await CategoryModel.findByIdAndRemove(sc);
      }
    }

    await TransactionModel.updateMany(
      {
        created_by: user._id,
        category: id,
      },
      //Set the category in id "999" ("Other" category)
      {
        category: '999',
      }
    );

    let delCategoryResponse = await CategoryModel.findByIdAndRemove(id);
    console.log(delCategoryResponse);
    return delCategoryResponse;
    // return 'USER_DELETED';
  } catch (e) {
    console.log('errrrr1 ==>> ', e);
    throw new Error('ERROR_DELETING_CATEGORY');
  }
};

export { createCategory, editCategoryData, deleteOneCategory };
