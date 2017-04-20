namespace RetgridCode.Domain
{
    public class ExpenseType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public int DisplayOrder { get; set; }
        public bool Inactive { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public string UserId { get; set; }
    }
}
