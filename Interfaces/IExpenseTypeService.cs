namespace RetgridCode.Web.Services
{
    public interface IExpenseTypesService
    {
        void Delete(int id);
        List<ExpenseDoc> GetAll();
        ExpenseDoc GetById(int id);
        int Insert(ExpenseTypesAddRequest model);
        void Update(ExpenseTypesUpdateRequest model);
    }
}
