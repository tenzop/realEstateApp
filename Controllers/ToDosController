namespace RetgridCodeCode.Web.Controllers
{
    [RoutePrefix("ToDos")]
    [Authorize(Roles = "Agent")]
    public class ToDosController : BaseController
    {
        IToDosService _toDosService = null;
        public ToDosController(IToDosService toDosService)
        {
            _toDosService = toDosService;
        }


        // GET: ToDos
        public ActionResult ng_Index()
        {
            return View();
        }
  

        [Route("ng_Create")]
        [Route("{id:int}/Edit")]
        public ActionResult ng_Create(int id = 0)
        {
            ItemViewModel<ToDosDoc> model = new ItemViewModel<ToDosDoc>();
            model.Item = _toDosService.GetById(id);
            return View(model);
        }

    

        [HttpGet]
        [Route]
        [Route("{id:int}/Edit")]
        public ActionResult Manage(int id = 0)
        {
            ItemViewModel<ToDosDoc> model = new ItemViewModel<ToDosDoc>();
            model.Item = _toDosService.GetById(id);
            return View(model);

        }
    }
}
