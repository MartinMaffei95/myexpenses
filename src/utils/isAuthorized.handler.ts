import { Model } from 'mongoose';

const isAuthorized = async (
  model: Model<any>,
  model_id: object | string,
  user_id: object | string
) => {
  // FIND A RESULT?
  const mongoResult = await model.findById(model_id);
  console.log(mongoResult, model_id);
  if (!mongoResult) {
    throw new Error('RESULT_NOT_FOUND');
  }

  // USER IS OWNER OF RESULT  ?
  if (mongoResult.created_by.toString() !== user_id) {
    throw new Error('YOU_DONT_HAVE_PERMISSIONS');
  }

  return mongoResult;
};

const isAuthorizedUser = async (
  model: Model<any>,
  model_id: object | string,
  user_id: object | string
) => {
  // FIND A RESULT?
  const mongoResult = await model.findById(model_id);
  if (!mongoResult) {
    throw new Error('ACCOUNT_NOT_FOUND');
  }

  // USER IS OWNER OF RESULT  ?
  if (mongoResult._id.toString() !== user_id) {
    throw new Error('YOU_DONT_HAVE_PERMISSIONS');
  }

  return mongoResult;
};

export { isAuthorized, isAuthorizedUser };
