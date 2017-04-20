namespace RetgridCode.Models.Request
{
    public class ToDosAddRequest
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string Message { get; set; }
        [Required]
        public DateTime DueDate { get; set; }
        [Required]
        public int PeopleId { get; set; }

        public int? ListingId { get; set; }

        public int? CaseId { get; set; }
        [Required]
        [Range(0, 10)]
        public int Priority { get; set; }
        [Range(0, 10)]
        public int StatusId { get; set; }


    }
}
