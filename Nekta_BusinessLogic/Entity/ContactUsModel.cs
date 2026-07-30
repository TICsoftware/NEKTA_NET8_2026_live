using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nekta_BusinessLogic.Entity
{
    public class ContactUsModel
    {
        public ContentViewModel? Content { get; set; }
        public List<ComponentGroup> Components { get; set; } = new();

        // How to Reach Us (Partnership Enquiries / General Queries cards) - component_sequence = 1
        public List<ComponentModel> HowToReachUs_List { get; set; } = new();

        // Careers at Nekta - component_sequence = 2
        public List<ComponentModel> Careers_List { get; set; } = new();

        // Our Offices - component_sequence = 3
        public List<ComponentModel> Offices_List { get; set; } = new();

        // Tailored Solutions - component_sequence = 4
        public List<ComponentModel> TailoredSolutions_List { get; set; } = new();

        // Follow Nekta - component_sequence = 5
        public List<ComponentModel> FollowNekta_List { get; set; } = new();

        // Every Enquiry Reaches Someone - component_sequence = 6
        public List<ComponentModel> EveryEnquiry_List { get; set; } = new();

        public List<CityMaster> CityList { get; set; } = new();

        public List<AreaOfInterestMaster> AreaOfInterestList { get; set; } = new();
    }

    public class ContactUsEnquiry
    {
        public string FullName { get; set; }
        public string Designation { get; set; }
        public string Organisation { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int CityId { get; set; }
        public string City { get; set; }
        public int InterestId { get; set; }
        public string Interest { get; set; }
        public string Query { get; set; }
        public bool Consent { get; set; }
        public string IPAddress { get; set; }
    }

    public class SalesEnquiry
    {
        public string FullName { get; set; }
        public string Designation { get; set; }
        public string Organisation { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }

        public int InterestId { get; set; }
        public string Interest { get; set; }
        public string Query { get; set; }
        public string IPAddress { get; set; }
    }

    public class CityMaster
    {
        public int CityId { get; set; }
        public string? CityName { get; set; }
        public int Sequence { get; set; }
        public bool Status { get; set; }
        public DateTime CreatedDate { get; set; }
    }

    public class AreaOfInterestMaster
    {
        public int InterestId { get; set; }
        public string? InterestName { get; set; }
        public int Sequence { get; set; }
        public bool Status { get; set; }
        public DateTime CreatedDate { get; set; }
    }

}
