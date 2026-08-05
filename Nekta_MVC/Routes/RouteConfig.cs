using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Nekta_MVC.Routes
{
    public static class RouteConfig
    {
        public static void RegisterRoutes(this WebApplication app)
        {
            // ✅ Custom routes first




            app.MapControllerRoute(
                          name: "about",
                          pattern: "about-us/who-we-are",
                          defaults: new { controller = "About", action = "AboutUs", title = "who-we-are" }
                      );

            app.MapControllerRoute(
                          name: "leadership",
                          pattern: "about-us/leadership",
                          defaults: new { controller = "About", action = "Leadership", title = "leadership" }
                      );

            app.MapControllerRoute(
              name: "companyinformation",
              pattern: "about-us/company-information",
              defaults: new { controller = "About", action = "CompanyInformation", title = "company-information" }
          );


            app.MapControllerRoute(
               name: "BusinessandCorporates",
               pattern: "segments/business-and-corporates",
               defaults: new { controller = "Segments", action = "BusinessCorporates", title = "business-and-corporates" }
           );

            app.MapControllerRoute(
                name: "education",
                pattern: "segments/education",
                defaults: new { controller = "Segments", action = "Education", title = "education" }
            );

            app.MapControllerRoute(
               name: "healthcare",
               pattern: "segments/healthcare",
               defaults: new { controller = "Segments", action = "Healthcare", title = "healthcare" }
           );

            app.MapControllerRoute(
               name: "sports",
               pattern: "segments/sports",
               defaults: new { controller = "Segments", action = "Sports", title = "sports" }
           );

            app.MapControllerRoute(
                name: "outdoor-events",
                pattern: "segments/outdoor-events",
                defaults: new { controller = "Segments", action = "OutdoorEvents", title = "outdoor-events" }
            );




            app.MapControllerRoute(
              name: "horcea",
              pattern: "segments/horcea",
              defaults: new { controller = "Segments", action = "BusinessCorporates", title = "horcea" }
          );

            app.MapControllerRoute(
                          name: "culinary-excellence",
                          pattern: "solutions/culinary-excellence",
                          defaults: new { controller = "Solutions", action = "CulinaryExcellence", title = "culinary-excellence" }
                      );
            app.MapControllerRoute(
                                  name: "food-program",
                                  pattern: "solutions/food-program-html",
                                  defaults: new { controller = "Solutions", action = "foodprogram_html" }
                              );

                      app.MapControllerRoute(
                          name: "food-program-page",
                          pattern: "solutions/food-programs",
                          defaults: new { controller = "Solutions", action = "FoodProgram", title = "food-programs" }
                      );

            app.MapControllerRoute(
                name: "people",
                pattern: "solutions/people",
                defaults: new { controller = "Solutions", action = "CulinaryExcellence", title = "people" }
            );


            app.MapControllerRoute(
                 name: "Food-Safety-Hygiene",
                 pattern: "solutions/food-safety-and-hygiene",
                 defaults: new { controller = "Solutions", action = "Food_Safety_Hygiene", title = "food-safety-and-hygiene" }
             );
            app.MapControllerRoute(
                 name: "contactus",
                 pattern: "contact-us",
                 defaults: new { controller = "Contactus", action = "Index", title = "contact-us" }
             );

            app.MapControllerRoute(
              name: "Blogs",
              pattern: "blogs",
              defaults: new { controller = "Blogs", action = "Index", title = "blogs" }
          );

            app.MapControllerRoute(
  name: "blogs-inside",
  pattern: "blogs/{title?}",
  defaults: new { controller = "Blogs", action = "inside" }
  );
            app.MapControllerRoute(
             name: "case studies",
             pattern: "case-studies",
             defaults: new { controller = "Blogs", action = "Index", title = "case-studies" }
         );
            app.MapControllerRoute(
                      name: "casestudies-inside",
                      pattern: "case-studies/{title?}",
                      defaults: new { controller = "Blogs", action = "inside" }
                      );
            app.MapControllerRoute(
                  name: "blog-load-more",
                  pattern: "blogs/BlogLoadMore",
                  defaults: new
                  {
                      controller = "Blogs",
                      action = "BlogLoadMore"
                  }
              );



            app.MapControllerRoute(
                name: "LoadMoreSearch",
                pattern: "Search/LoadMoreSearch",
                defaults: new { controller = "Search", action = "LoadMoreSearch" }
            );

            app.MapControllerRoute(
                name: "search",
                pattern: "search/{id?}",
                defaults: new { controller = "Search", action = "Index" }
            );



            app.MapControllerRoute(
                          name: "LoadMoreAnnualArticles",
                          pattern: "Updates/LoadMoreAnnualArticles",
                          defaults: new { controller = "Updates", action = "LoadMoreAnnualArticles" }
                      );



            app.MapControllerRoute(
                name: "ourteam",
                pattern: "clinical-expertise/our-team",
                defaults: new { controller = "Ourteam", action = "Index", title = "our-team" }
            );
            app.MapControllerRoute(
             name: "meetfellow",
             pattern: "/academy-and-research/fellowships-and-training/meet-our-fellows",
             defaults: new { controller = "Ourteam", action = "Index", title = "meet-our-fellows" }
         );
            app.MapControllerRoute(
                name: "contactus",
                pattern: "contactus",
                defaults: new { controller = "Contactus", action = "Index", title = "contact" }
            );

            app.MapControllerRoute(
                name: "legal-disclaimer",
                pattern: "legal-disclaimer",
                defaults: new { controller = "pagearticle", action = "article", id = "legal-disclaimer" }
            );

            app.MapControllerRoute(
                name: "privacy-policy",
                pattern: "privacy-policy",
                defaults: new { controller = "pagearticle", action = "article", id = "privacy-policy" }
            );

            app.MapControllerRoute(
             name: "terms-of-use",
             pattern: "terms-and-conditions",
             defaults: new { controller = "pagearticle", action = "article", id = "terms-and-conditions" }
         );
            app.MapControllerRoute(
              name: "sitemap",
              pattern: "sitemap",
              defaults: new { controller = "pagearticle", action = "article", id = "sitemap" }
          );


            app.MapControllerRoute(
                name: "Error",
                pattern: "Error",
                defaults: new { controller = "pagearticle", action = "Error" }
            );

            // ✅ Area / Admin route (before default)
            app.MapControllerRoute(
                name: "manage",
                pattern: "Manage/{action=Login}/{id?}",
                defaults: new { controller = "Manage" }
            );

            // ✅ Default route LAST
            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}"
            );
        }
    }
}