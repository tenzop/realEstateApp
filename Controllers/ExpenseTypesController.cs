namespace RetgridCode.Controllers
{
    [RoutePrefix("ExpenseTypes")]
    [Authorize(Roles = "Admin")]
    public class ExpenseTypesController : BaseController
    {
        [Route]
        public ActionResult Manage()
        {

            return View();
        }
    }
}
