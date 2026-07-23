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

        public int TotalCount { get; set; }
    }
}
