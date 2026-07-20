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
                          pattern: "about-us",
                          defaults: new { controller = "About", action = "AboutUs", title = "about-us" }
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
                defaults: new { controller = "pagearticle", action = "Index", id = "contact" }
            );

            app.MapControllerRoute(
                name: "legal-disclaimer",
                pattern: "legal-disclaimer",
                defaults: new { controller = "pagearticle", action = "article", id = "legal-disclaimer" }
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