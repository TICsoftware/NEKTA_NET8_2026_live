using System.Collections.Generic;

namespace Nekta_BusinessLogic.Entity
{
    public class SolutionsModel
    {
        public ContentViewModel? Content { get; set; }
        public List<ComponentGroup> Components { get; set; } = new();

        // Culinary Excellence
        public List<ComponentModel> From_The_Core_List { get; set; } = new();
        public List<ComponentModel> Why_Central_Kitchens_List { get; set; } = new();
        public List<ComponentModel> At_A_Glance_List { get; set; } = new();
        public List<ComponentModel> Infographics_Counter_List { get; set; } = new();
        public List<ComponentModel> Dynamism_On_A_Plate_List { get; set; } = new();
        public List<ComponentModel> Culinary_Capability_Thumb_List { get; set; } = new();
        public List<ComponentModel> Culinary_Capability_Arch_List { get; set; } = new();
        public List<ComponentModel> Built_To_Aviation_Standards_List { get; set; } = new();
        public List<ComponentModel> Why_Clients_Choose_List { get; set; } = new();
        public List<ComponentModel> Central_Kitchens_CTA_List { get; set; } = new();
        public List<ComponentModel> Works_Best_With_List { get; set; } = new();
        public List<ComponentModel> Explore_With_Nekta_List { get; set; } = new();


        //Food Safety & Hygiene
        public List<ComponentModel> Driving_Quality_Excellence_Food_List { get; set; } = new();
        public List<ComponentModel> Building_Trust_Food_List { get; set; } = new();
        public List<ComponentModel> Our_Commitment_Compliance_Excellence_Food_List { get; set; } = new();
        public List<ComponentModel> A_Trusted_Safety_Framework_Food_List { get; set; } = new();
        public List<ComponentModel> Our_Food_Safety_Quality_Food_List { get; set; } = new();



        // Food Program
        public List<ComponentModel> Component_1_List { get; set; } = new();
        public List<ComponentModel> Leadership_Message_List { get; set; } = new();
        public List<ComponentModel> The_Multi_Purpose_Cart_List { get; set; } = new();
        public List<ArticleModel> Articles_List { get; set; } = new();
        public List<ComponentModel> Articles_Sliders_List { get; set; } = new();

        public List<ComponentModel> Case_Studies_Component_List { get; set; } = new();
        public List<ArticleModel> Case_Studies_List { get; set; } = new();

        public int TotalCount { get; set; }
    }
}
