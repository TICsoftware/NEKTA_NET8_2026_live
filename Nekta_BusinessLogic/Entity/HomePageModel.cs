using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nekta_BusinessLogic.Entity
{
    public class HomePageModel
    {
        public ContentViewModel? Home_Content { get; set; }

        public List<ComponentGroup> Home_Components { get; set; } = new();

        public List<HomeCommonModel> Banners { get; set; } = new();
        public List<HomeCommonModel> DiningExperience_List { get; set; } = new();
        public List<HomeCommonModel> FoodInbetween_List { get; set; } = new();
        public List<HomeCommonModel> SingularSpirit_List { get; set; } = new();
        public List<HomeCommonModel> HospitalityExcellance_List { get; set; } = new();
        public List<HomeCommonModel> NektaEdge_List { get; set; } = new();
        public List<HomeCommonModel> ExperienceSpeaks_List { get; set; } = new();
        public List<HomeCommonModel> ClientsWeServe_List { get; set; } = new();
        public List<HomeCommonModel> LatestTrends_List { get; set; } = new();
    }



    public class HomeCommonModel
    {
        public string GroupId { get; set; }
        public string Title { get; set; }
        public string Intro { get; set; }
        public string HmpgIntro { get; set; }
        public string DisplayTitle { get; set; }
        public string Content { get; set; }
        public string ComponentThumbnail { get; set; }
        public string ComponentThumbnailAltText { get; set; }

        public string Component_Background_image { get; set; }
        public string Component_background_image_alt { get; set; }
        public string ThumbnailImage { get; set; }
        public string ThumbnailAltText { get; set; }
        public string Url { get; set; }
        public string Url_Text { get; set; }
        public int Sequence { get; set; }
        public int IsBlock { get; set; }
        public string Video_path { get; set; }
        public string Video_poster { get; set; }
        public string Icon_Image { get; set; }
        public string background_image { get; set; }
        public string Popup_Content { get; set; }
        public string Popup_Display_Title { get; set; }
        public string Section_title { get; set; }
        public string banner_image_webp { get; set; }
        public string banner_mobile_image { get; set; }

        public string Component_right_image { get; set; }
        public string Component_right_image_alt { get; set; }

        public string component_icon_image { get; set; }
        public string component_icon_image_alt { get; set; }
        
        public string Designation{ get; set; }

    }




}