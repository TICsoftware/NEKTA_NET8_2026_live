using Microsoft.AspNetCore.Mvc;
using Nekta_BusinessLogic.BAL;
using Nekta_BusinessLogic.Entity;
using Nekta_MVC.Classes;

namespace Nekta_MVC.Controllers;

public class BlogsController : Controller
{
    private readonly ILogger<BlogsController> _logger;
    private readonly Blogs_BAL _bal;

    public BlogsController(ILogger<BlogsController> logger, IConfiguration configuration)
    {
        _logger = logger;
        _bal = new Blogs_BAL(configuration);
    }

    public IActionResult Index(string title)
    {
        try
        {
            var data = _bal.GetBlogs_BAL(title, 1, 1);
            return View(data);
        }
        catch (Exception ex)
        {
            FileLogger.LogError("/Blogs :", ex);
            return View(new BlogsModel());
        }
        finally
        {
            _bal.Dispose();
        }
    }

<<<<<<< HEAD

    [HttpGet]
    public ActionResult BlogLoadMore(int contentId, int page, int pageSize)
    {
        try
        {
            var model = _bal.Get_Blogs_List_BAL(contentId, page, pageSize);
  
            if (model.BlogPosts_List == null || !model.BlogPosts_List.Any())
            {
                return Content(string.Empty); // Indicates no more records
            }

            return PartialView("_blogs_list", model.BlogPosts_List);
        }
        catch (Exception ex)
        {
            FileLogger.LogError("BlogLoadMore", ex);
            return Content(string.Empty);
        }
    }


=======
    public IActionResult inside(string title)
    {
        try
        {
            var data = _bal.GetBlogInside_BAL(title, 1, 1);
            return View(data);
        }
        catch (Exception ex)
        {
            FileLogger.LogError("/Blogs/inside :" + title, ex);
            return View(new BlogsModel());
        }
        finally
        {
            _bal.Dispose();
        }
    }
>>>>>>> 29f7957e606105ddaf6065fac5b26781b65ae105
}
