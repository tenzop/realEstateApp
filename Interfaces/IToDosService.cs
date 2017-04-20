namespace RetgridCode.Services.Interfaces
{
    public interface IToDosService
    {
        void Delete(int id);
        List<ToDosDoc> GetAll();
        List<ToDosDoc> GetByCaseId(int id);
        ToDosDoc GetById(int id);
        int Insert(ToDosAddRequest model);
        void Update(ToDosUpdateRequest model);
        List<ToDosDoc> Search(ToDosSearchRequest model);
    }
}
