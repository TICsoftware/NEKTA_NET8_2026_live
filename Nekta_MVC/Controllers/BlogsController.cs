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
}
