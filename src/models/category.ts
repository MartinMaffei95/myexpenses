import { Schema, Types, Model, model } from 'mongoose';
import { Category } from '../interfaces/category.interface';

const CategorySchema = new Schema<Category>(
  {
    name: {
      type: 'string',
    },
    icon: {
      type: 'string',
    },
    sub_category: [
      {
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'category',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const CategoryModel = model('category', CategorySchema);

export default CategoryModel;
