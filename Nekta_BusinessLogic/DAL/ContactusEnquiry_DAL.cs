using System;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Nekta_BusinessLogic.DAL
{
    // Dedicated DAL for the Contact Us enquiry form (kept separate from
    // Page_Manage_DAL, which only ever reads CMS page/component content).
    public class ContactusEnquiry_DAL : DBHelper
    {
        public ContactusEnquiry_DAL(IConfiguration configuration) : base(configuration)
        {
        }

        // Inserts one enquiry and returns the new row's identity.
        // SP name/columns to be finalized by the DB owner: sp_AddContactUsEnquiry
        public int AddContactUsEnquiry_DAL(string fullName, string designation, string organisation,
            string email, string phone, string city, string interest, string message, bool consent)
        {
            SqlParameter[] sqlParams =
            {
                new SqlParameter("@FullName", (object?)fullName ?? DBNull.Value),
                new SqlParameter("@Designation", string.IsNullOrWhiteSpace(designation) ? (object)DBNull.Value : designation),
                new SqlParameter("@Organisation", (object?)organisation ?? DBNull.Value),
                new SqlParameter("@Email", (object?)email ?? DBNull.Value),
                new SqlParameter("@Phone", (object?)phone ?? DBNull.Value),
                new SqlParameter("@City", (object?)city ?? DBNull.Value),
                new SqlParameter("@Interest", (object?)interest ?? DBNull.Value),
                new SqlParameter("@Message", string.IsNullOrWhiteSpace(message) ? (object)DBNull.Value : message),
                new SqlParameter("@Consent", consent),
            };

            return SqlInsertReturnIdentity_withSP("sp_AddContactUsEnquiry", "@Return_ID", sqlParams);
        }
    }
}
