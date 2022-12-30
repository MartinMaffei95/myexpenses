import { Schema, Types, Model, model } from 'mongoose';
import { Category } from '../interfaces/category.interface';

const CategorySchema = new Schema<Category>(
  {
    _id: {
      type: String,
      required: true,
      default: new Types.ObjectId().toString(),
    },
    name: {
      type: 'string',
    },
    from: {
      type: Schema.Types.ObjectId,
    },
    icon: {
      type: 'string',
    },
    isSubCategory: {
      type: Boolean,
      default: false,
    },
    public: {
      type: 'boolean',
      default: false,
    },
    sub_category: [
      {
        type: String,
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
