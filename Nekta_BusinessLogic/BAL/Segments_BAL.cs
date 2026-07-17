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
    public class Segments_BAL : BasePageBAL
    {
        public Segments_BAL(IConfiguration configuration) : base(configuration)
        {
        }

        public SegmentsModel GetBusinessCorporates_BAL(string pagename, int languageId, int geographyId)
        {
            var model = new SegmentsModel();
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

                model.Delivering_Experiences_List = MapComponents(groupedData, 1);
                model.Corporate_Dining_Excellence_List = MapComponents(groupedData, 2);
                model.Life_Beautiful_Plate_List = MapComponents(groupedData, 3);
                model.Nektas_Edge_List = MapComponents(groupedData, 4);
                model.Technology_That_Runs_List = MapComponents(groupedData, 5);
                model.Proof_Plate_List = MapComponents(groupedData, 6);
                model.Seeking_Elevated_DE_List = MapComponents(groupedData, 7);
            }

            return model;
        }



    }
}