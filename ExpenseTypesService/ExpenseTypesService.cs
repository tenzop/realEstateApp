namespace RetgridCode.Services
{
    public class ExpenseTypesService : BaseService, IExpenseTypesService
    {
        public int Insert(ExpenseTypesAddRequest model)
        {
            string userId = UserService.GetCurrentUserId();
            int Id = 0;
            DataProvider.ExecuteNonQuery(GetConnection, "dbo.ExpenseTypes_Insert",
                inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Name", model.Name);
                    paramCollection.AddWithValue("@Code", model.Code);
                    paramCollection.AddWithValue("@DisplayOrder", model.DisplayOrder);
                    paramCollection.AddWithValue("@Inactive", model.Inactive);
                    paramCollection.AddWithValue("@UserId", userId);
                    SqlParameter p = new SqlParameter("@Id", System.Data.SqlDbType.Int);
                    p.Direction = System.Data.ParameterDirection.Output;
                    paramCollection.Add(p);
                }, returnParameters: delegate (SqlParameterCollection param)
                {
                    int.TryParse(param["@Id"].Value.ToString(), out Id);
                }
               );
            return Id;
        }

        public void Update(ExpenseTypesUpdateRequest model)
        {
            DataProvider.ExecuteNonQuery(GetConnection, "dbo.ExpenseTypes_Update"
               , inputParamMapper: delegate (SqlParameterCollection paramCollection)
               {
                   paramCollection.AddWithValue("@Id", model.Id);
                   paramCollection.AddWithValue("@Name", model.Name);
                   paramCollection.AddWithValue("@Code", model.Code);
                   paramCollection.AddWithValue("@DisplayOrder", model.DisplayOrder);
                   paramCollection.AddWithValue("@Inactive", model.Inactive);
                   paramCollection.AddWithValue("@UserId", UserService.GetCurrentUserId());
               }, returnParameters: null
               );
        }

        public List<ExpenseDoc> GetAll()
        {
            List<ExpenseDoc> list = null;

            DataProvider.ExecuteCmd(GetConnection, "dbo.ExpenseTypes_SelectAll"
                , inputParamMapper: null, map: delegate (IDataReader reader, short set)
                {
                    ExpenseDoc expense = MapExpenseType(reader);

                    if (list == null)
                    {
                        list = new List<ExpenseDoc>();
                    }
                    list.Add(expense);

                }

                );
            return list;
        }

        public ExpenseDoc GetById(int id)
        {
            ExpenseDoc expense = null;
            DataProvider.ExecuteCmd(GetConnection, "dbo.ExpenseTypes_SelectById"
                , inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", id);
                }, map: delegate (IDataReader reader, short set)
                {
                    expense = MapExpenseType(reader);
                }
                );
            return expense;
        }

        public void Delete(int id)
        {
            DataProvider.ExecuteNonQuery(GetConnection, "dbo.ExpenseTypes_Delete"
                , inputParamMapper: delegate (SqlParameterCollection param)
                {
                    param.AddWithValue("@Id", id);
                }, returnParameters: null);
        }

        private static ExpenseDoc MapExpenseType(IDataReader reader)
        {
            ExpenseDoc expense = new ExpenseDoc();
            int ordPosititon = 0;
            expense.Id = reader.GetSafeInt32(ordPosititon++);
            expense.Name = reader.GetSafeString(ordPosititon++);
            expense.Code = reader.GetSafeString(ordPosititon++);
            expense.DisplayOrder = reader.GetSafeInt32(ordPosititon++);
            expense.Inactive = reader.GetSafeBool(ordPosititon++);
            expense.DateCreated = reader.GetSafeDateTime(ordPosititon++);
            expense.DateModified = reader.GetSafeDateTime(ordPosititon++);
            expense.UserId = reader.GetSafeString(ordPosititon++);
            return expense;
        }
    }
}
