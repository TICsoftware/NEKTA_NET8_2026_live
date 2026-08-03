using Microsoft.AspNetCore.Mvc;
using Nekta_BusinessLogic.BAL;
using Nekta_BusinessLogic.Entity;
using Nekta_MVC.Classes;

namespace Nekta_MVC.Controllers;

public class SolutionsController : Controller
{
    private readonly ILogger<SolutionsController> _logger;
    private readonly Solutions_BAL _bal;

    public SolutionsController(ILogger<SolutionsController> logger, IConfiguration configuration)
    {
        _logger = logger;
        _bal = new Solutions_BAL(configuration);
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult CulinaryExcellence(string title)
    {
        try
        {
            var data = _bal.GetCulinaryExcellence_BAL(title, 1, 1);
            return View(data);
        }
        catch (Exception ex)
        {
            FileLogger.LogError("/CulinaryExcellence :", ex);
            return View(new SolutionsModel());
        }
        finally
        {
            _bal.Dispose();
        }
    }



    public IActionResult FoodProgram(string title)
    {
        try
        {
            var data = _bal.GetFoodProgram_BAL(title, 1, 1);
            return View(data);
        }
        catch (Exception ex)
        {
            FileLogger.LogError("/CulinaryExcellence :", ex);
            return View(new SolutionsModel());
        }
        finally
        {
            _bal.Dispose();
        }
    }
    public IActionResult foodprogram_html()
    {
        try
        {
            //var data = _bal.GetCulinaryExcellence_BAL(title, 1, 1);
            return View();
        }
        catch (Exception ex)
        {
            FileLogger.LogError("/CulinaryExcellence :", ex);
            return View(new SolutionsModel());
        }
        finally
        {
            _bal.Dispose();
        }
    }




    public IActionResult Food_Safety_Hygiene(string title)
    {
        try
        {
            var data = _bal.GetFood_Safety_Hygiene_BAL(title, 1, 1);
            return View(data);
        }
        catch (Exception ex)
        {
            FileLogger.LogError("/Food_Safety_Hygiene :", ex);
            return View(new SolutionsModel());
        }
        finally
        {
            _bal.Dispose();
        }
    }


    public IActionResult culexc(string title)
    {
        try
        {
            var data = _bal.GetCulinaryExcellence_BAL(title, 1, 1);
            return View(data);
        }
        catch (Exception ex)
        {
            FileLogger.LogError("/CulinaryExcellence :", ex);
            return View(new SolutionsModel());
        }
        finally
        {
            _bal.Dispose();
        }
    }
}
