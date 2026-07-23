using Microsoft.Extensions.Configuration;
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
                model.Central_Kitchens_CTA_List = MapComponents(groupedData, 10);
                model.Works_Best_With_List = MapComponents(groupedData, 11);
                model.Explore_With_Nekta_List = MapComponents(groupedData, 12);
            }

            return model;
        }
    }
}
