using System.Data;
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

            using var enquiryBal = new ContactusEnquiry_BAL(_configuration);
            ViewBag.CityList = enquiryBal.GetCityList_BAL();
            ViewBag.AreaOfInterestList = enquiryBal.GetAreaOfInterestList_BAL();


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
    public IActionResult SubmitEnquiry(ContactUsEnquiryModel model)
    {
        if (!ModelState.IsValid)
        {
            return Json(new
            {
                status = false,
                message = "Please correct the highlighted fields and try again."
            });
        }

        try
        {
            var entity = new ContactUsEnquiry
            {
                FullName = model.FullName,
                Designation = model.Designation,
                Organisation = model.Organisation,
                Email = model.Email,
                Phone = model.Phone,
                CityId = Convert.ToInt32(model.City),
                InterestId = Convert.ToInt32(model.Interest),
                Query = model.Message,
                Consent = model.Consent,
                IPAddress = GetClientIpAddress()
            };

            using var enquiryBal = new ContactusEnquiry_BAL(_configuration);

            DataTable dt = enquiryBal.SubmitEnquiry_BAL(entity);

            string result = dt.Rows[0][0].ToString();

            switch (result)
            {
                case "updated":
                    return Json(new
                    {
                        status = true,
                        message = "Thank you for reaching out. Our team will get back to you within one business day."
                    });

                case "exceeds":
                    return Json(new
                    {
                        status = false,
                        message = "You have exceeded the maximum number of enquiries allowed today."
                    });

                default:
                    return Json(new
                    {
                        status = false,
                        message = result
                    });
            }
        }
        catch (Exception ex)
        {
            FileLogger.LogError($"{nameof(ContactusController)}/{nameof(SubmitEnquiry)}", ex);

            return Json(new
            {
                status = false,
                message = "Something went wrong while submitting your enquiry."
            });
        }
    }


    // Handles the site-wide "assistant" contact modal rendered from
    // _Layout_home_page.cshtml (Views/CommonComponent/_home_contact_modal_form.cshtml).
    // Kept as a separate action from SubmitEnquiry so the two entry points
    // (dedicated Contact Us page vs. floating modal available on every page)
    // can be tracked/monitored independently, even though they share the
    // same model, BAL and DAL.
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult SubmitHomeEnquiry(ContactUsEnquiryModel model)
    {
        if (!ModelState.IsValid)
        {
            return Json(new
            {
                status = false,
                message = "Please correct the highlighted fields and try again."
            });
        }

        try
        {
            var entity = new ContactUsEnquiry
            {
                FullName = model.FullName,
                Designation = model.Designation,
                Organisation = model.Organisation,
                Email = model.Email,
                Phone = model.Phone,
                CityId = Convert.ToInt32(model.City),
                InterestId = Convert.ToInt32(model.Interest),
                Query = model.Message,
                Consent = model.Consent,
                IPAddress = GetClientIpAddress()
            };

            using var enquiryBal = new ContactusEnquiry_BAL(_configuration);

            DataTable dt = enquiryBal.SubmitEnquiry_BAL(entity);

            string result = dt.Rows[0][0].ToString();

            switch (result)
            {
                case "updated":
                    return Json(new
                    {
                        status = true,
                        message = "Thank you for reaching out. Our team will get back to you within one business day."
                    });

                case "exceeds":
                    return Json(new
                    {
                        status = false,
                        message = "You have exceeded the maximum number of enquiries allowed today."
                    });

                default:
                    return Json(new
                    {
                        status = false,
                        message = result
                    });
            }
        }
        catch (Exception ex)
        {
            FileLogger.LogError($"{nameof(ContactusController)}/{nameof(SubmitHomeEnquiry)}", ex);

            return Json(new
            {
                status = false,
                message = "Something went wrong while submitting your enquiry."
            });
        }
    }


    private string GetClientIpAddress()
    {
        var forwardedFor = Request.Headers["X-Forwarded-For"].FirstOrDefault();

        if (!string.IsNullOrWhiteSpace(forwardedFor))
            return forwardedFor.Split(',')[0].Trim();

        return HttpContext.Connection.RemoteIpAddress?.ToString() ?? string.Empty;
    }

    // [HttpPost]
    // [ValidateAntiForgeryToken]
    // public IActionResult SubmitEnquiry(ContactUsEnquiryModel model, string title)
    // {
    //     if (!ModelState.IsValid)
    //     {
    //         TempData["ContactUsError"] = "Please correct the highlighted fields and try again.";
    //         return RedirectToAction("Index", new { title = string.IsNullOrWhiteSpace(title) ? "contact" : title });
    //     }

    //     var enquiryBal = new ContactusEnquiry_BAL(_configuration);
    //     try
    //     {
    //         enquiryBal.SubmitEnquiry_BAL(
    //             model.FullName,
    //             model.Designation,
    //             model.Organisation,
    //             model.Email,
    //             model.Phone,
    //             model.City,
    //             model.Interest,
    //             model.Message,
    //             model.Consent);

    //         TempData["ContactUsSuccess"] = "Thank you for reaching out. A member of our team will get back to you within one business day.";
    //     }
    //     catch (Exception ex)
    //     {
    //         FileLogger.LogError("/Contactus/SubmitEnquiry :", ex);
    //         TempData["ContactUsError"] = "Something went wrong while submitting your enquiry. Please try again.";
    //     }
    //     finally
    //     {
    //         enquiryBal.Dispose();
    //     }

    //     return RedirectToAction("Index", new { title = string.IsNullOrWhiteSpace(title) ? "contact" : title });
    // }
}
