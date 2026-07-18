using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Nekta_BusinessLogic.Entity;

namespace Nekta_BusinessLogic
{
    public static class Config_Application_Website
    {
        public static List<T> MapComponent<T>(
           List<ComponentGroup> data,
           int sequence,
           Func<ComponentGroup, Dictionary<string, ComponentField>, T> mapFunc)
        {
            return data
                .Where(g => g.Fields.Any() && g.Fields.First().sequence == sequence)
                .Select(group =>
                {
                    var dict = GetFieldDictionary(group);
                    return mapFunc(group, dict);
                })
                .ToList();
        }

        public static Dictionary<string, ComponentField> GetFieldDictionary(ComponentGroup group)
        {
            return group.Fields
                .GroupBy(x => x.FieldName)
                .ToDictionary(g => g.Key, g => g.First());
        }


        public static string GetPath(ComponentGroup group, string fieldName)
        {
            var path = group.Fields
                .FirstOrDefault(x =>
                    string.Equals(x.FieldName?.Trim(), fieldName.Trim(), StringComparison.OrdinalIgnoreCase)
                )?.ImagePath;

            return path ?? "";
        }




        public static string GetValue(Dictionary<string, ComponentField> dict, params string[] keys)
        {
            foreach (var key in keys)
            {
                var match = dict.FirstOrDefault(x =>
                    x.Key.Equals(key, StringComparison.OrdinalIgnoreCase));

                if (!string.IsNullOrEmpty(match.Value?.FieldValue))
                    return match.Value.FieldValue;
            }
            return "";
        }

        public static int GetIntValue(Dictionary<string, ComponentField> dict, params string[] keys)
        {
            foreach (var key in keys)
            {
                var match = dict.FirstOrDefault(x =>
                    x.Key.Equals(key, StringComparison.OrdinalIgnoreCase));

                if (int.TryParse(match.Value?.FieldValue, out int result))
                    return result;
            }

            return 0; // default if not found
        }

        public static string GetMetaUrl(string baseUrl, string path)
        {
            if (string.IsNullOrWhiteSpace(path))
                return "";

            if (path.StartsWith("http", StringComparison.OrdinalIgnoreCase))
                return path;

            return $"{baseUrl?.TrimEnd('/')}/{path.TrimStart('/')}";
        }


        public static string GetArticleUrl(DataRow row)
        {
            var externalUrl = row["cont_external_url"]?.ToString();
            var mediaFile = row["MediafilePath"]?.ToString();
            var pageUrl = row["pageurl"]?.ToString();

            if (!string.IsNullOrWhiteSpace(externalUrl))
                return externalUrl;

            if (!string.IsNullOrWhiteSpace(mediaFile))
                return mediaFile;

            return pageUrl?.Replace("/global", "");
        }

        public static string GetArticleTarget(DataRow row)
        {
            var externalUrl = row["cont_external_url"]?.ToString();
            var mediaFile = row["MediafilePath"]?.ToString();
            var pageTarget = row["pageurl"]?.ToString();

            if (!string.IsNullOrWhiteSpace(externalUrl) ||
                !string.IsNullOrWhiteSpace(mediaFile))
            {
                return "_blank";
            }

            return string.Equals(pageTarget, "self", StringComparison.OrdinalIgnoreCase)
                ? "_self"
                : "_blank";
        }


        public static List<ArticleModel> MapArticleList(DataTable table)
        {
            if (table == null || table.Rows.Count == 0)
                return new List<ArticleModel>();

            return table.AsEnumerable()
                .Select(row => new ArticleModel
                {
                    ContId = row.Field<int>("cont_id"),
                    ContParentId = row.Field<int>("cont_parent_id"),

                    Title = string.IsNullOrWhiteSpace(row["cont_hmpg_title"]?.ToString())
                        ? row["cont_title"]?.ToString()
                        : row["cont_hmpg_title"]?.ToString(),

                    Intro = row["cont_intro"]?.ToString(),
                    HmpgIntro = row["cont_hmpg_intro"]?.ToString(),
                    PageName = row["cont_pagename"]?.ToString(),

                    ThumbnailImage = row["Hmpg_thumbnail"]?.ToString(),
                    ThumbnailAltText = row["Hmpg_thumbnail_alt_text"]?.ToString(),

                    ExternalUrl = row["cont_external_url"]?.ToString(),
                    MediafilePath = row["MediafilePath"]?.ToString(),

                    Url = GetArticleUrl(row),
                    UrlTarget = GetArticleTarget(row),

                    DisplayDate = table.Columns.Contains("cont_displaydate")
                        ? row.Field<DateTime?>("cont_displaydate")
                        : null,

                    Sequence = row.Field<int?>("cont_sequence") ?? 0
                })
                .ToList();
        }



    }
}