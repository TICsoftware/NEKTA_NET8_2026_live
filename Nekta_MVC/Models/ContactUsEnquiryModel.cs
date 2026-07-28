using System.ComponentModel.DataAnnotations;

namespace Nekta_MVC.Models
{
    // Bound/validated model for the Contact Us "Tell us a little about your
    // requirement" enquiry form. Kept separate from the generic ContactUs
    // model in Connect_forms.cs, which targets a different form shape.
    public class ContactUsEnquiryModel
    {
        [Required(ErrorMessage = "Please enter your full name")]
        [StringLength(100, ErrorMessage = "Name cannot exceed 100 characters")]
        [RegularExpression(@"^(?=.*[a-zA-Z])[a-zA-Z][a-zA-Z\s.]*$", ErrorMessage = "Only alphabets, spaces and '.' are allowed")]
        public string? FullName { get; set; }

        [Required(ErrorMessage = "Please enter your designation")]
        [StringLength(100, ErrorMessage = "Designation cannot exceed 100 characters")]
        public string? Designation { get; set; }

        [Required(ErrorMessage = "Please enter your organisation name")]
        [StringLength(200, ErrorMessage = "Organisation name cannot exceed 200 characters")]
        public string? Organisation { get; set; }

        [Required(ErrorMessage = "Please enter your work email")]
        [EmailAddress(ErrorMessage = "Enter a valid email address")]
        [StringLength(150)]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Please enter your contact number")]
        [RegularExpression(@"^\+?[1-9][\d\s-]{7,14}$", ErrorMessage = "Enter a valid contact number")]
        public string? Phone { get; set; }

        [Required(ErrorMessage = "Please select your city")]
        public string? City { get; set; }

        [Required(ErrorMessage = "Please select an area of interest")]
        public string? Interest { get; set; }

        [StringLength(1000, ErrorMessage = "Message cannot exceed 1000 characters")]
        public string? Message { get; set; }


        public string? IPAddress { get; set; }

        [Range(typeof(bool), "true", "true", ErrorMessage = "Please accept the consent.")]
        public bool Consent { get; set; }
    }
}
