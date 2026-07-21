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


namespace Nekta_MVC.Controllers;

public class SegmentsController : Controller
{
    private readonly ILogger<SegmentsController> _logger;
    private readonly Segments_BAL _bal;

    public SegmentsController(ILogger<SegmentsController> logger, IConfiguration configuration)
    {
        _logger = logger;
        _bal = new Segments_BAL(configuration);
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult BusinessCorporates(string title)
    {
        try
        {
            var data = _bal.GetBusinessCorporates_BAL(title, 1, 1);
            return View(data);
        }
        catch (Exception ex)
        {
            FileLogger.LogError("/BusinessCorporates :", ex);
            return View(new AboutModel());
        }
        finally
        {
            _bal.Dispose();
        }
    }


    public IActionResult Education(string title)
    {
        try
        {
            var data = _bal.GetEducations_BAL(title, 1, 1);
            return View(data);
        }
        catch (Exception ex)
        {
            FileLogger.LogError("/Education :", ex);
            return View(new AboutModel());
        }
        finally
        {
            _bal.Dispose();
        }
    }


    public IActionResult Healthcare(string title)
    {
        try
        {
            var data = _bal.GetHealthcare_BAL(title, 1, 1);
            return View(data);
        }
        catch (Exception ex)
        {
            FileLogger.LogError("/Healthcare :", ex);
            return View(new AboutModel());
        }
        finally
        {
            _bal.Dispose();
        }
    }



}
