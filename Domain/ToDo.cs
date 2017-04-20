namespace RetgridCode.Domain
{
    public class ToDos
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public DateTime DueDate { get; set; }
        public PersonBase Person { get; set; }
        public int? ListingId { get; set; }
        public int? CaseId { get; set; }
        public int Priority { get; set; }
        public int StatusId { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public string ToDosStatusName { get; set; }
        public string ToDosStatusCode { get; set; }
        public string CaseName { get; set; }
        public string MlsListingId { get; set; }
    }
}
