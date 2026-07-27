using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Nekta_BusinessLogic.DAL;
using Nekta_BusinessLogic.Entity;

namespace Nekta_BusinessLogic.BAL
{
    // Page content BAL for the Contact Us page. Sits on the same shared
    // sp_GetContentComponentData pipeline used by About/Segments/Solutions
    // (via BasePageBAL -> Page_Manage_DAL), keyed by @pagename.
    public class Contactus_BAL : BasePageBAL
    {
        public Contactus_BAL(IConfiguration configuration) : base(configuration)
        {
        }


        

        public ContactUsModel GetContactUs_BAL(string pagename, int languageId, int geographyId)
        {
            var model = new ContactUsModel();
            var ds = GetContentComponentData_DAL(pagename, languageId, geographyId);

            // Content (hero banner + meta)
            if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                model.Content = MapContent(ds.Tables[0].Rows[0]);
            }

            // Components
            if (ds.Tables.Count > 1 && ds.Tables[1].Rows.Count > 0)
            {
                var groupedData = GetGroupedComponents(ds.Tables[1]);
                model.Components = groupedData;

                model.HowToReachUs_List = MapComponents(groupedData, 1);
                model.Careers_List = MapComponents(groupedData, 2);
                model.Offices_List = MapComponents(groupedData, 3);
                model.TailoredSolutions_List = MapComponents(groupedData, 4);
                model.FollowNekta_List = MapComponents(groupedData, 5);
                model.EveryEnquiry_List = MapComponents(groupedData, 6);
            }

            return model;
        }
    }
}
