using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nekta_BusinessLogic.Entity
{
    public class AboutModel
    {
        public ContentViewModel? Content { get; set; }
        public List<ComponentGroup> Components { get; set; } = new();
        public List<ComponentGroup> Components2 { get; set; } = new();


        //Leadership
        public List<ComponentModel> leadership_intro_1_List { get; set; } = new();
        public List<ComponentModel> Core_team_List { get; set; } = new();
        public List<ComponentModel> Support_Functions_List { get; set; } = new();
        public List<ComponentModel> leadership_intro_2_List { get; set; } = new();
        public List<ComponentModel> Board_of_directors_List { get; set; } = new();


        public int TotalCount { get; set; }

    }


}