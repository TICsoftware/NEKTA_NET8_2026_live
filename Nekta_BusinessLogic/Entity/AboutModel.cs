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



        //About us
        public List<ComponentModel> Component_With_Cards_List { get; set; } = new();
        public List<ComponentModel> infographics_List { get; set; } = new();
        public List<ComponentModel> Access_to_Safe_List { get; set; } = new();
        public List<ComponentModel> Who_Are_We_List { get; set; } = new();
        public List<ComponentModel> Our_Footprint_List { get; set; } = new();
        public List<ComponentModel> Singular_Spirit_Aboutus_List { get; set; } = new();



        //Leadership
        public List<ComponentModel> leadership_intro_1_List { get; set; } = new();
        public List<ComponentModel> Core_team_List { get; set; } = new();
        public List<ComponentModel> Support_Functions_List { get; set; } = new();
        public List<ComponentModel> leadership_intro_2_List { get; set; } = new();
        public List<ComponentModel> Board_of_directors_List { get; set; } = new();


        //Company Information
        public List<ComponentModel> Company_Details_List { get; set; } = new();
        public List<ComponentModel> Policies_List { get; set; } = new();
        public List<ArticleModel> AnnualReturn_List { get; set; } = new();


        public int TotalCount { get; set; }

    }


}