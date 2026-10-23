using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Nekta_MVC.Models;
using Nekta_MVC.Classes;
using Nekta_BusinessLogic.BAL;
using Nekta_BusinessLogic;
using Nekta_MVC.Helpers;

namespace Nekta_MVC.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly Homepage_BAL _bal;

    public HomeController(ILogger<HomeController> logger, IConfiguration configuration)
    {
        _logger = logger;
        _bal = new Homepage_BAL(configuration);

    }


    public IActionResult Index()
    {
        //FileLogger.LogError("/home :", new Exception("Home Controller Index Method Called"));

        try
        {
            //string connstr = "user id=sa;data source=TIC_DBNET;persist security info=True;initial catalog=Nekta_2026;password=DB#SqL2023TiC;Encrypt=True;TrustServerCertificate=True";
            string connstr1 = "user id=sa;data source=192.168.2.6;persist security info=True;initial catalog=Nekta_2026;password=26%TiC@SqL20;Encrypt=True;TrustServerCertificate=True";
            string connstruat = "user id=sa;data source=10.55.1.4;persist security info=True;initial catalog=Nekta_2026;password=gA5(6JkhvT*Xr%;Encrypt=True;TrustServerCertificate=True";
 string connstrlive = "user id=sa;data source=10.55.1.3;persist security info=True;initial catalog=Nekta_2026;password=zmU#U1x^x1@-ny;Encrypt=True;TrustServerCertificate=True";

            //ViewBag.encryptstr = Core_project_BusinessLogic.CryptoEngine.Encrypt(connstr);

            string encryptstr = Core_project_BusinessLogic.CryptoEngine.Encrypt(connstrlive);




            var data = _bal.GetHomepage_BAL(1, 1);
            ViewData["Content"] = data?.Home_Content;
            return View(data);
        }

        catch (Exception ex)
        {
            FileLogger.LogError("/Home :", ex);
            //_logger.LogError(ex, "An error occurred while processing the request.");
            return View("Error");
        }
    }

    public IActionResult encruptIndex()
    {
        //CryptoEngine CryptoObj = new CryptoEngine();    

        string connstr = "user id=sa;data source=192.168.2.6;persist security info=True;initial catalog=Nekta_2026;password=26%TiC@SqL20;Encrypt=True;TrustServerCertificate=True";


        ViewBag.encryptstr = Core_project_BusinessLogic.CryptoEngine.Encrypt(connstr);
        //ViewBag.decryptstr = CryptoEngine.Decrypt(encryptstr);
        return View();
    }







    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }


}
