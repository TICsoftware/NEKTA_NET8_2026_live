using System;
using Microsoft.Extensions.Configuration;
using Nekta_BusinessLogic.DAL;

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

        public int SubmitEnquiry_BAL(string fullName, string designation, string organisation,
            string email, string phone, string city, string interest, string message, bool consent)
        {
            return _dal.AddContactUsEnquiry_DAL(fullName, designation, organisation, email, phone, city, interest, message, consent);
        }

        public void Dispose()
        {
            _dal.Dispose();
        }
    }
}
