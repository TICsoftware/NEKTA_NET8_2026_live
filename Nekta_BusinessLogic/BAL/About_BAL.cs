using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Nekta_BusinessLogic.DAL;
using Nekta_BusinessLogic.Entity;
using Nekta_BusinessLogic;

namespace Nekta_BusinessLogic.BAL
{
    public class About_BAL : BasePageBAL
    {
        public About_BAL(IConfiguration configuration) : base(configuration)
        {
        }

        public AboutModel GetAboutUs_BAL(string pagename, int languageId, int geographyId)
        {
            var model = new AboutModel();
            var ds = GetContentComponentData_DAL(pagename, languageId, geographyId);

            // Content
            if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                model.Content = MapContent(ds.Tables[0].Rows[0]);
            }

            // Components
            if (ds.Tables.Count > 1 && ds.Tables[1].Rows.Count > 0)
            {
                var groupedData = GetGroupedComponents(ds.Tables[1]);
                model.Components = groupedData;

                model.Component_With_Cards_List = MapComponents(groupedData, 1);
                model.infographics_List = MapComponents(groupedData, 2);
                model.Access_to_Safe_List = MapComponents(groupedData, 3);
                model.Who_Are_We_List = MapComponents(groupedData, 4);
                model.Our_Footprint_List = MapComponents(groupedData, 5);
                model.Singular_Spirit_Aboutus_List = MapComponents(groupedData, 6);
            }

            return model;
        }

        public AboutModel GetLeadership_BAL(string pagename, int languageId, int geographyId)
        {
            var model = new AboutModel();
            var ds = GetContentComponentData_DAL(pagename, languageId, geographyId);

            // Content
            if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                model.Content = MapContent(ds.Tables[0].Rows[0]);
            }

            // Components
            if (ds.Tables.Count > 1 && ds.Tables[1].Rows.Count > 0)
            {
                var groupedData = GetGroupedComponents(ds.Tables[1]);
                model.Components = groupedData;

                model.leadership_intro_1_List = MapComponents(groupedData, 1);
                model.Core_team_List = MapComponents(groupedData, 2);
                model.Support_Functions_List = MapComponents(groupedData, 3);
                model.leadership_intro_2_List = MapComponents(groupedData, 4);
                model.Board_of_directors_List = MapComponents(groupedData, 5);
            }

            return model;
        }


        public AboutModel CompanyInformation_BAL(string pagename, int languageId, int geographyId)
        {
            var model = new AboutModel();
            var ds = GetContentComponentData_DAL(pagename, languageId, geographyId);

            // Content
            if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                model.Content = MapContent(ds.Tables[0].Rows[0]);
            }

            // Components
            if (ds.Tables.Count > 1 && ds.Tables[1].Rows.Count > 0)
            {
                var groupedData = GetGroupedComponents(ds.Tables[1]);
                model.Components = groupedData;

                model.Company_Details_List = MapComponents(groupedData, 1);
                model.Policies_List = MapComponents(groupedData, 2);
            }

            if (ds?.Tables.Count > 2 && ds.Tables[2].Rows.Count > 0)
            {
                model.AnnualReturn_List = Config_Application_Website.MapArticleList(ds.Tables[2]); ;
            }

            return model;
        }





    }
}