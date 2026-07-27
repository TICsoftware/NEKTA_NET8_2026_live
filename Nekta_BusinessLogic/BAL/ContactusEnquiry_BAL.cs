using System;
using System.Data;
using Microsoft.Extensions.Configuration;
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

        public int SubmitEnquiry_BAL(ContactUsEnquiry model)
        {
            return _dal.AddContactUsEnquiry_DAL(model);
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
