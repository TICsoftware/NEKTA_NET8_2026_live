using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nekta_BusinessLogic.Entity
{
    public class SegmentsModel
    {
        public ContentViewModel? Content { get; set; }
        public List<ComponentGroup> Components { get; set; } = new();
        public List<ComponentGroup> Components2 { get; set; } = new();


        //Business & Corporates
        public List<ComponentModel> Delivering_Experiences_List { get; set; } = new();
        public List<ComponentModel> Corporate_Dining_Excellence_List { get; set; } = new();
        public List<ComponentModel> Life_Beautiful_Plate_List { get; set; } = new();
        public List<ComponentModel> Nektas_Edge_List { get; set; } = new();
        public List<ComponentModel> Technology_That_Runs_List { get; set; } = new();
        public List<ComponentModel> Proof_Plate_List { get; set; } = new();
        public List<ComponentModel> Seeking_Elevated_DE_List { get; set; } = new();


        //Educations
        public List<ComponentModel> Delivering_Experiences_Matter_List { get; set; } = new();
        public List<ComponentModel> Campus_Dining_Excellence_List { get; set; } = new();
        public List<ComponentModel> Life_beautiful_Plate_Education_List { get; set; } = new();
        public List<ComponentModel> Nektas_Edge_Education_List { get; set; } = new();
        public List<ComponentModel> Singular_Spirit_Education_List { get; set; } = new();


        //Healthcare
        public List<ComponentModel> Nutrition_That_Heals_List { get; set; } = new();
        public List<ComponentModel> Healthcare_Dining_Excellence_List { get; set; } = new();
        public List<ComponentModel> Services_For_Healthcare_Clients_List { get; set; } = new();
        public List<ComponentModel> Nektas_Edge_For_Healthcare_List { get; set; } = new();
        public List<ComponentModel> Singular_Spirit_HC_List { get; set; } = new();
        public List<ComponentModel> Seeking_New_Experience_HC_List { get; set; } = new();


        //Sports
        public List<ComponentModel> Delivering_Experiences_Sports_List { get; set; } = new();
        public List<ComponentModel> Sports_Catering_Excellence_List { get; set; } = new();
        public List<ComponentModel> Services_For_Sports_Clients_List { get; set; } = new();
        public List<ComponentModel> Nektas_Edge_For_Sports_List { get; set; } = new();
        public List<ComponentModel> Proof_Is_On_The_Plate_List { get; set; } = new();


        public int TotalCount { get; set; }

    }


}