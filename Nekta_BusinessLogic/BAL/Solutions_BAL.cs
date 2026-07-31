using Microsoft.Extensions.Configuration;
using Nekta_BusinessLogic.Common;
using Nekta_BusinessLogic.Entity;


namespace Nekta_BusinessLogic.BAL
{
    public class Solutions_BAL : BasePageBAL
    {
        public Solutions_BAL(IConfiguration configuration) : base(configuration)
        {
        }

        public SolutionsModel GetCulinaryExcellence_BAL(string pagename, int languageId, int geographyId)
        {
            try
            {
                var model = new SolutionsModel();
                var ds = GetContentComponentData_DAL(pagename, languageId, geographyId);

                if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    model.Content = MapContent(ds.Tables[0].Rows[0]);
                }

                if (ds.Tables.Count > 1 && ds.Tables[1].Rows.Count > 0)
                {
                    var groupedData = GetGroupedComponents(ds.Tables[1]);
                    model.Components = groupedData;

                    model.From_The_Core_List = MapComponents(groupedData, 1);
                    model.Why_Central_Kitchens_List = MapComponents(groupedData, 2);
                    model.At_A_Glance_List = MapComponents(groupedData, 3);
                    model.Infographics_Counter_List = MapComponents(groupedData, 4);
                    model.Dynamism_On_A_Plate_List = MapComponents(groupedData, 5);
                    model.Culinary_Capability_Thumb_List = MapComponents(groupedData, 6);
                    model.Culinary_Capability_Arch_List = MapComponents(groupedData, 7);
                    model.Built_To_Aviation_Standards_List = MapComponents(groupedData, 8);
                    model.Why_Clients_Choose_List = MapComponents(groupedData, 9);
                    model.Case_Studies_Component_List = MapComponents(groupedData, 10);
                    model.Works_Best_With_List = MapComponents(groupedData, 11);
                    model.Explore_With_Nekta_List = MapComponents(groupedData, 12);
                }


                if (ds?.Tables.Count > 2 && ds.Tables[2].Rows.Count > 0)
                {
                    model.Case_Studies_List = Config_Application_Website.MapArticleList(ds.Tables[2]);
                }

                return model;
            }
            catch (Exception ex)
            {
                NektaFileLogger.LogInfo("Solutions", "GetCulinaryExcellence_BAL", ex.ToString());
                return new SolutionsModel();
            }
            finally
            {
                Dispose();
            }

        }



        public SolutionsModel GetFood_Safety_Hygiene_BAL(string pagename, int languageId, int geographyId)
        {
            try
            {
                var model = new SolutionsModel();
                var ds = GetContentComponentData_DAL(pagename, languageId, geographyId);

                if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    model.Content = MapContent(ds.Tables[0].Rows[0]);
                }

                if (ds.Tables.Count > 1 && ds.Tables[1].Rows.Count > 0)
                {
                    var groupedData = GetGroupedComponents(ds.Tables[1]);
                    model.Components = groupedData;

                    model.Driving_Quality_Excellence_Food_List = MapComponents(groupedData, 1);
                    model.Building_Trust_Food_List = MapComponents(groupedData, 2);
                    model.Our_Commitment_Compliance_Excellence_Food_List = MapComponents(groupedData, 3);
                    model.A_Trusted_Safety_Framework_Food_List = MapComponents(groupedData, 4);
                    model.Our_Food_Safety_Quality_Food_List = MapComponents(groupedData, 5);
                }

                if (ds?.Tables.Count > 2 && ds.Tables[2].Rows.Count > 0)
                {
                    model.Case_Studies_List = Config_Application_Website.MapArticleList(ds.Tables[2]); ;
                }

                return model;
            }
            catch (Exception ex)
            {
                NektaFileLogger.LogInfo("Solutions", "GetFood_Safety_Hygiene_BAL", ex.ToString());
                return new SolutionsModel();
            }
            finally
            {
                Dispose();
            }
        }



    }
}
