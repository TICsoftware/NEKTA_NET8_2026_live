using System;
using System.Data;
using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using Nekta_BusinessLogic.Common;
using Nekta_BusinessLogic.DAL;
using Nekta_BusinessLogic.Entity;

namespace Nekta_BusinessLogic.BAL
{
    // Dedicated BAL for the Contact Us enquiry form submission, kept
    // separate from Contactus_BAL (which only reads page content).
    public class ContactusEnquiry_BAL : IDisposable
    {
        private readonly ContactusEnquiry_DAL _dal;

        public ContactusEnquiry_BAL(IConfiguration configuration)
        {
            _dal = new ContactusEnquiry_DAL(configuration);
        }

        // public int SubmitEnquiry_BAL(ContactUsEnquiry model)
        // {
        //     return _dal.AddContactUsEnquiry_DAL(model);
        // }

        public DataTable SubmitEnquiry_BAL(ContactUsEnquiry model)
        {
            DataTable dt = new DataTable();
            try
            {
                dt = _dal.AddContactUsEnquiry_DAL(model);
                if (dt.Rows[0][0].ToString() == "updated")
                {
                    //sendmail(mailenquiryContent(obj, "You have received an Business enquiry through the website.").ToString(), "Business enquiry from " + obj.Full_name, "business");
                }
            }
            catch (Exception ex)
            {
                dt.Rows[0][0] = ex.Message.ToString();
            }
            finally
            {

            }

            return dt;
        }


        // public void SendMail(string emailContent, string subject, string mailTitle)
        // {
        //     try
        //     {
        //         var settings = _configuration.GetSection("EmailSettings");

        //         using var message = new MailMessage();

        //         string displayName = settings["DisplayName"];

        //         message.To.Add(new MailAddress(settings["To"]!, settings["DisplayName"]));



        //         message.From = new MailAddress(settings["From"]!, displayName);
        //         message.Subject = subject;
        //         message.Body = emailContent;
        //         message.IsBodyHtml = true;

        //         using var smtp = new SmtpClient(settings["Host"])
        //         {
        //             Port = Convert.ToInt32(settings["Port"]),
        //             EnableSsl = true,
        //             UseDefaultCredentials = false,
        //             Credentials = new NetworkCredential(
        //                 settings["Username"],
        //                 settings["Password"])
        //         };

        //         smtp.Send(message);
        //     }
        //     catch (Exception ex)
        //     {
        //         NektaFileLogger.LogError("EmailService/SendMail", ex);
        //     }
        // }


        public string MailEnquiryContent(ContactUsEnquiry obj, string cityName, string interestName)
        {
            string bodyhtmlcontent =
                "<h4>Dear Team,</h4>" +
                "<p>Please find below Contact Us Enquiry details.</p>" +

                "<table border='1' cellpadding='6' cellspacing='0' style='border-collapse:collapse;'>"
                + "<tbody>"

                + "<tr>"
                + "<td><strong>Full Name</strong></td>"
                + "<td>" + obj.FullName + "</td>"
                + "</tr>"

                + (!string.IsNullOrWhiteSpace(obj.Designation)
                    ? "<tr><td><strong>Designation</strong></td><td>" + obj.Designation + "</td></tr>"
                    : "")

                + "<tr>"
                + "<td><strong>Organisation</strong></td>"
                + "<td>" + obj.Organisation + "</td>"
                + "</tr>"

                + "<tr>"
                + "<td><strong>Email</strong></td>"
                + "<td>" + obj.Email + "</td>"
                + "</tr>"

                + "<tr>"
                + "<td><strong>Phone</strong></td>"
                + "<td>" + obj.Phone + "</td>"
                + "</tr>"

                + "<tr>"
                + "<td><strong>City</strong></td>"
                + "<td>" + cityName + "</td>"
                + "</tr>"

                + "<tr>"
                + "<td><strong>Area of Interest</strong></td>"
                + "<td>" + interestName + "</td>"
                + "</tr>"

                + (!string.IsNullOrWhiteSpace(obj.Query)
                    ? "<tr><td><strong>Message</strong></td><td>" + obj.Query + "</td></tr>"
                    : "")


                + "</tbody>"
                + "</table>"

                + "<br/>"
                + "<p><strong>Regards,</strong><br/>"
                + "<strong>Nekta Foods</strong></p>";

            return bodyhtmlcontent;
        }


        public List<CityMaster> GetCityList_BAL()
        {
            DataSet ds = _dal.GetCityList_DAL();

            List<CityMaster> list = new List<CityMaster>();

            if (ds != null && ds.Tables.Count > 0)
            {
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    list.Add(new CityMaster
                    {
                        CityId = Convert.ToInt32(row["CityId"]),
                        CityName = row["CityName"].ToString()
                    });
                }
            }

            return list;
        }

        public List<AreaOfInterestMaster> GetAreaOfInterestList_BAL()
        {
            DataSet ds = _dal.GetAreaOfInterestList_DAL();

            List<AreaOfInterestMaster> list = new List<AreaOfInterestMaster>();

            if (ds != null && ds.Tables.Count > 0)
            {
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    list.Add(new AreaOfInterestMaster
                    {
                        InterestId = Convert.ToInt32(row["InterestId"]),
                        InterestName = row["InterestName"].ToString()
                    });
                }
            }

            return list;
        }

        public void Dispose()
        {
            _dal.Dispose();
        }
    }
}
