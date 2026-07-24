using Microsoft.Extensions.Configuration;
using Nekta_BusinessLogic;
using Nekta_BusinessLogic.Common;
using Nekta_BusinessLogic.Entity;

namespace Nekta_BusinessLogic.BAL
{
    public class Blogs_BAL : BasePageBAL
    {
        public Blogs_BAL(IConfiguration configuration) : base(configuration)
        {
        }

        public BlogsModel GetBlogs_BAL(string pagename, int languageId, int geographyId)
        {
            try
            {
                var model = new BlogsModel();
                var ds = GetContentComponentData_DAL(pagename, languageId, geographyId);

                if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    model.Content = MapContent(ds.Tables[0].Rows[0]);
                }

                if (ds.Tables.Count > 1 && ds.Tables[1].Rows.Count > 0)
                {
                    var groupedData = GetGroupedComponents(ds.Tables[1]);
                    model.Components = groupedData;
                    //model.Latest_Trends_List = MapComponents(groupedData, 1);
                }

                if (ds.Tables.Count > 2 && ds.Tables[2].Rows.Count > 0)
                {
                    model.BlogPosts_List = Config_Application_Website.MapArticleList(ds.Tables[2]);
                    model.TotalCount = Convert.ToInt32(ds.Tables[3].Rows[0]["TotalCount"]);
                }

                return model;
            }
            catch (Exception ex)
            {
                NektaFileLogger.LogInfo("Blogs", "GetBlogs_BAL", ex.ToString());
                return new BlogsModel();
            }
            finally
            {
                Dispose();
            }
        }

<<<<<<< HEAD
        public BlogsModel Get_Blogs_List_BAL(int contentId, int page, int pageSize)
=======
        public BlogsModel GetBlogInside_BAL(string pagename, int languageId, int geographyId)
>>>>>>> 29f7957e606105ddaf6065fac5b26781b65ae105
        {
            try
            {
                var model = new BlogsModel();
<<<<<<< HEAD
                var ds = Get_Blogs_List_DAL(contentId, page, pageSize);

                if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    model.BlogPosts_List = Config_Application_Website.MapArticleList(ds.Tables[0]);
                    model.TotalCount = Convert.ToInt32(ds.Tables[1].Rows[0]["TotalCount"]);
=======
                var ds = GetContentComponentData_DAL(pagename, languageId, geographyId);

                if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    model.Content = MapContent(ds.Tables[0].Rows[0]);
                }

                if (ds.Tables.Count > 1 && ds.Tables[1].Rows.Count > 0)
                {
                    var groupedData = GetGroupedComponents(ds.Tables[1]);
                    model.Components = groupedData;
                    model.Related_Section_List = MapComponents(groupedData, 1);
                }

                if (ds.Tables.Count > 2 && ds.Tables[2].Rows.Count > 0)
                {
                    model.RelatedArticles_List = Config_Application_Website.MapArticleList(ds.Tables[2]);
>>>>>>> 29f7957e606105ddaf6065fac5b26781b65ae105
                }

                return model;
            }
            catch (Exception ex)
            {
<<<<<<< HEAD
                NektaFileLogger.LogInfo("Blogs", "GetBlogs_BAL", ex.ToString());
=======
                NektaFileLogger.LogInfo("Blogs", "GetBlogInside_BAL", ex.ToString());
>>>>>>> 29f7957e606105ddaf6065fac5b26781b65ae105
                return new BlogsModel();
            }
            finally
            {
                Dispose();
            }
        }
<<<<<<< HEAD


=======
>>>>>>> 29f7957e606105ddaf6065fac5b26781b65ae105
    }
}
