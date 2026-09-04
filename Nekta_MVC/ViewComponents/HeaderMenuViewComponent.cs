using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Nekta_BusinessLogic.BAL;
using Nekta_BusinessLogic.Common;
using Nekta_BusinessLogic.Entity;

namespace Priya_Cement_MVC.ViewComponents
{
    public class HeaderMenuViewComponent : ViewComponent
    {
        private readonly Menu_BAL _bal;

        public HeaderMenuViewComponent(IConfiguration configuration)
        {
            _bal = new Menu_BAL(configuration);
        }

        public IViewComponentResult Invoke()
        {
            try
            {
                var menus = _bal.GetFrontendHeaderMenus() ?? new List<MenuHeader>();

                // Return your existing Shared Header view
                return View("~/Views/Shared/Header.cshtml", menus);
            }
            catch (Exception ex)
            {
                NektaFileLogger.LogError("/HeaderMenuViewComponent :", ex);

                // Return an empty list if an error occurs
                return View(
                    "~/Views/Shared/Header.cshtml",
                    new List<MenuHeader>()
                );
            }
        }
    }
}