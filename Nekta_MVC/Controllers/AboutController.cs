using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Nekta_MVC.Models;
using Nekta_MVC.Classes;
using Core_project_BusinessLogic;
using Nekta_BusinessLogic.BAL;
using Nekta_BusinessLogic.Entity;
using System.Net;
using System.Net.Mail;
using Microsoft.AspNetCore.Mvc.Rendering;
using Nekta_MVC;


namespace Oncopathology_MVC.Controllers;

public class AboutController : Controller
{
    private readonly ILogger<AboutController> _logger;
    private readonly About_BAL _bal;

    public AboutController(ILogger<AboutController> logger, IConfiguration configuration)
    {
        _logger = logger;
        _bal = new About_BAL(configuration);
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Leadership(string title)
    {
        try
        {
            //string pageName = HttpContext?.Request?.Path.Value?.Trim('/') ?? string.Empty;
            var data = _bal.GetLeadership_BAL(title, 1, 1);
            return View(data);
        }
        catch (Exception ex)
        {
            FileLogger.LogError("/About_Cop :", ex);
            return View(new AboutModel());
        }
        finally
        {
            _bal.Dispose();
        }
    }

  

}
