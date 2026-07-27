using Microsoft.AspNetCore.Mvc;
using Nekta_BusinessLogic.BAL;
using Nekta_BusinessLogic.Entity;
using Nekta_MVC.Classes;
using Nekta_MVC.Models;

namespace Nekta_MVC.Controllers;

public class ContactusController : Controller
{
    private readonly ILogger<ContactusController> _logger;
    private readonly IConfiguration _configuration;
    private readonly Contactus_BAL _bal;

    public ContactusController(ILogger<ContactusController> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;
        _bal = new Contactus_BAL(configuration);
    }

    public IActionResult Index(string title)
    {
        try
        {
            var data = _bal.GetContactUs_BAL(title, 1, 1);
            return View(data);
        }
        catch (Exception ex)
        {
            FileLogger.LogError("/Contactus/Index :", ex);
            return View(new ContactUsModel());
        }
        finally
        {
            _bal.Dispose();
        }
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult SubmitEnquiry(ContactUsEnquiryModel model, string title)
    {
        if (!ModelState.IsValid)
        {
            TempData["ContactUsError"] = "Please correct the highlighted fields and try again.";
            return RedirectToAction("Index", new { title = string.IsNullOrWhiteSpace(title) ? "contact" : title });
        }

        var enquiryBal = new ContactusEnquiry_BAL(_configuration);
        try
        {
            enquiryBal.SubmitEnquiry_BAL(
                model.FullName,
                model.Designation,
                model.Organisation,
                model.Email,
                model.Phone,
                model.City,
                model.Interest,
                model.Message,
                model.Consent);

            TempData["ContactUsSuccess"] = "Thank you for reaching out. A member of our team will get back to you within one business day.";
        }
        catch (Exception ex)
        {
            FileLogger.LogError("/Contactus/SubmitEnquiry :", ex);
            TempData["ContactUsError"] = "Something went wrong while submitting your enquiry. Please try again.";
        }
        finally
        {
            enquiryBal.Dispose();
        }

        return RedirectToAction("Index", new { title = string.IsNullOrWhiteSpace(title) ? "contact" : title });
    }
}
