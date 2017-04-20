namespace RetgridCode.Models.Request
{
    public class ExpenseTypesAddRequest
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Code { get; set; }
        [Required]
        public int DisplayOrder { get; set; }

        public bool Inactive { get; set; }

        public string UserId { get; set; }
    }
}
