using System;
using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Nekta_BusinessLogic.Entity;

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
        public DataTable AddContactUsEnquiry_DAL(ContactUsEnquiry model)
        {
            SqlParameter[] sqlParams =
            {
                new SqlParameter("@FullName", (object?)model.FullName ?? DBNull.Value),
                new SqlParameter("@Designation", string.IsNullOrWhiteSpace(model.Designation) ? (object)DBNull.Value : model.Designation),
                new SqlParameter("@Organisation", (object?)model.Organisation ?? DBNull.Value),
                new SqlParameter("@Email", (object?)model.Email ?? DBNull.Value),
                new SqlParameter("@Phone", (object?)model.Phone ?? DBNull.Value),
                new SqlParameter("@CityId", model.CityId),
                new SqlParameter("@InterestId", model.InterestId),
                new SqlParameter("@Query", string.IsNullOrWhiteSpace(model.Query) ? (object)DBNull.Value : model.Query),
                new SqlParameter("@Consent", model.Consent),
                new SqlParameter("@IPAddress", string.IsNullOrWhiteSpace(model.IPAddress) ? (object)DBNull.Value : model.IPAddress)
            };

            return GetDataSet("sp_AddContactUsEnquiry", sqlParams).Tables[0];
        }


        public DataTable AddSalesEnquiry_DAL(SalesEnquiry model)
        {
            SqlParameter[] sqlParams =
            {
                new SqlParameter("@FullName", (object?)model.FullName ?? DBNull.Value),
                new SqlParameter("@Organisation", string.IsNullOrWhiteSpace(model.Organisation) ? (object)DBNull.Value : model.Organisation),
                new SqlParameter("@Email", (object?)model.Email ?? DBNull.Value),
                new SqlParameter("@Phone", (object?)model.Phone ?? DBNull.Value),
                new SqlParameter("@InterestId", model.InterestId),
                new SqlParameter("@Query", string.IsNullOrWhiteSpace(model.Query) ? (object)DBNull.Value : model.Query),
                new SqlParameter("@IPAddress", string.IsNullOrWhiteSpace(model.IPAddress) ? (object)DBNull.Value : model.IPAddress)
            };

            return GetDataSet("sp_AddSalesEnquiry", sqlParams).Tables[0];
        }


        public DataSet GetCityList_DAL()
        {
            return GetDataSet("GetCityMaster");
        }

        public DataSet GetAreaOfInterestList_DAL()
        {
            return GetDataSet("GetAreaOfInterestMaster");
        }

    }
}
