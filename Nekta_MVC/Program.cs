using System.Globalization;
using System.Net;
using System.Security.Authentication;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.Extensions.FileProviders;
using Nekta_MVC.Policy;
using Nekta_MVC.Routes;

var builder = WebApplication.CreateBuilder(args);

var enableTls12 = builder.Configuration.GetValue<string>("EnableTls12");

// 👉 Optional (legacy support - only if really needed)
if (enableTls12 == "1")
{
    ServicePointManager.SecurityProtocol |= SecurityProtocolType.Tls12;
}

// 👉 Recommended modern approach (HttpClient)
builder.Services.AddHttpClient("MyClient")
    .ConfigurePrimaryHttpMessageHandler(() =>
        new HttpClientHandler
        {
            SslProtocols = SslProtocols.Tls12
        });

builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession();

// Add services to the container.
//builder.Services.AddControllersWithViews();
//.AddRazorRuntimeCompilation();
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddControllersWithViews()
   .AddRazorRuntimeCompilation();//uncomment while live
}
else
{
    builder.Services
        .AddControllersWithViews()
        .AddRazorRuntimeCompilation();//uncomment while live
}


builder.Services.AddAuthentication("MyCookieAuth")
    .AddCookie("MyCookieAuth", options =>
    {
        options.LoginPath = "/Manage/Login";
        options.AccessDeniedPath = "/Manage/AccessDenied";
        options.ExpireTimeSpan = TimeSpan.FromMinutes(20);
    });

builder.Services.AddAuthorization();

//uncomment while live start
//  builder.Services.AddSession(options =>
// {
//      options.IdleTimeout = TimeSpan.FromMinutes(20); // session timeout
//      options.Cookie.HttpOnly = true;
//     options.Cookie.IsEssential = true;
//  });

//  builder.Services.AddAntiforgery(options =>
//  {
//     options.Cookie.Name = "SecureToken";
//     options.Cookie.HttpOnly = true;
//    options.Cookie.SecurePolicy =
//         CookieSecurePolicy.Always;  
// });
//uncomment while live end

builder.Services.AddHttpClient();


// Kestrel limit
builder.WebHost.ConfigureKestrel(options =>
{
    options.Limits.MaxRequestBodySize = 52428800;
    options.AddServerHeader = false;
});

// Multipart/form-data limit (file uploads)
builder.Services.Configure<Microsoft.AspNetCore.Http.Features.FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 52428800; // 50 MB
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

//uncomment while live
//app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(app.Environment.ContentRootPath, "Assets")),
    RequestPath = "/Assets"
});


// var rewriteOptions = new RewriteOptions()

//     .AddRedirect("(?i)^/testslist$", "/tests-and-services", 301)
//     .AddRedirect("(?i)^/joinTeam$", "/clinical-expertise/our-team", 301)
//     .AddRedirect("(?i)^/antibodies$", "/", 301)
//     .AddRedirect("(?i)^/trainingAcademy$", "/", 301)
//     .AddRedirect("(?i)^/researchMaterial$", "/", 301)
//     .AddRedirect("(?i)^/aboutCOP$", "/about-cop", 301)
//     .AddRedirect("(?i)^/contactUs$", "/contactus", 301);

//app.UseRewriter(rewriteOptions);


var redirects = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
{
   
    // What We Do
    { @"^what-we-do/?$", "/about-us/who-we-are" },

    // What We Do - specific old pages/sections
    { @"^what-we-do/#what-we-do$", "/about-us/company-information" },
    { @"^what-we-do/#what-we-do-popup$", "/segments/business-and-corporates" },
    { @"^what-we-do/#corporate-catering$", "/segments/business-and-corporates" },
    { @"^what-we-do/#corporate-events$", "/segments/business-and-corporates" },
    { @"^what-we-do/#green-meetings$", "/contact-us" },
    { @"^what-we-do/#education$", "/segments/education" },
    { @"^what-we-do/#healthcare$", "/segments/healthcare" },
    { @"^what-we-do/#sports-catering$", "/segments/sports" },

    // Menu Curation
    { @"^menu-curation/?$", "/solutions/culinary-excellence" },

    // Cuisines & Trends
    { @"^cuisines-trends/?$", "/case-studies/Top-Catering-Trends" },

    // Sustainability
    { @"^sustainability/?$", "/" },

    // About Us
    { @"^about-us/?$", "/about-us/who-we-are" },

    // Meet The Team
    { @"^meet-the-team/?$", "/about-us/leadership" },
    { @"^meet-the-team/#companyDetails$", "/about-us/company-information" },

    // Partner With Us
    { @"^partner-with-us/?$", "/contact-us" },
    { @"^partner-with-us/#inquire-now-form$", "/contact-us" },

    // Gallery
    { @"^gallery/?$", "/" },

    // Privacy Policy (legacy URL without hyphen)
    { @"^privacypolicy/?$", "/privacy-policy" },

    // Terms of Use
    { @"^terms-of-use/?$", "/terms-and-conditions" },

    // Old 404 URLs
    { @"^our-brands/?$", "/solutions/culinary-excellence" },
    { @"^giftqlub/?$", "/" }
};

var options = new RewriteOptions();

foreach (var rule in redirects)
{
    options.AddRedirect(rule.Key, rule.Value, StatusCodes.Status301MovedPermanently);
}

// ✅ IMPORTANT: Must be before UseRouting()
app.UseRewriter(options);
var culture = new CultureInfo("en-US");
app.UseRequestLocalization(new RequestLocalizationOptions
{
    DefaultRequestCulture = new RequestCulture(culture),
    SupportedCultures = new[] { culture },
    SupportedUICultures = new[] { culture }
});
app.Use(async (context, next) =>
{
    context.Response.Headers["Vary"] = "Accept-Encoding";
    context.Response.Headers["Access-Control-Allow-Headers"] = "Origin, Content-Type, Accept";
    context.Response.Headers["X-XSS-Protection"] = "1; mode=block";
    context.Response.Headers["X-Frame-Options"] = "SAMEORIGIN";
    context.Response.Headers["X-Content-Type-Options"] = "nosniff";
    context.Response.Headers["Referrer-Policy"] = "strict-origin-when-cross-origin";
    context.Response.Headers["X-Permitted-Cross-Domain-Policies"] = "none";
    //uncommen for live after ssl
    //context.Response.Headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains";
    context.Response.Headers["Permissions-Policy"] = "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(self), payment=(), fullscreen=(self)";
    context.Response.Headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    context.Response.Headers["Pragma"] = "no-cache";
    context.Response.Headers["Expires"] = "0";

    // Remove unwanted headers
    context.Response.Headers.Remove("Server");
    context.Response.Headers.Remove("X-Powered-By");
    context.Response.Headers.Remove("X-AspNetMvc-Version");

    await next();
});

//app.UseCspPolicy();

app.UseRouting();

app.UseSession();

app.UseAuthentication();

app.UseAuthorization(); 

app.RegisterRoutes(); 

app.Run();
