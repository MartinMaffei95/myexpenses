import AccountModel from '../models/account';

const account_authorized = async (account_id: string, user_id: string) => {
  //ACCOUNT EXISTS?
  const accountFinded = await AccountModel.findById(account_id);
  if (!accountFinded) {
    throw new Error('ACCOUNT_NOT_FOUND');
  }

  //USER IS dueño OF ACCOUNT  ?
  if (accountFinded.from.toString() !== user_id) {
    throw new Error('YOU_DONT_HAVE_PERMISSIONS');
  }
  return true;
};

export { account_authorized };
