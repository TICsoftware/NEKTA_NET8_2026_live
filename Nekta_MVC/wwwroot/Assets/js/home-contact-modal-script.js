$(document).ready(function () {

    $(document).on("submit", "#homeContactForm", function (e) {
        e.preventDefault();

        if (!validateHomeContactForm())
            return;

        var $form = $(this);

        $.ajax({
            url: $form.attr("action"),
            type: "POST",
            data: $form.serialize(),
            beforeSend: function () {
                $form.find("button[type='submit']")
                    .prop("disabled", true)
                    .find("span").first().text("Sending...");
            },
            success: function (response) {

                $form.find("button[type='submit']")
                    .prop("disabled", false)
                    .html('<span>Send Enquiry</span><span aria-hidden="true">&rarr;</span>');

                if (response.status) {

                    $form[0].reset();
                    $form.find(".field-error").text("");
                    resetHomeCaptcha();

                    $("#homeContactMessage").html(
                        `<div class="modal-alert modal-alert--success">${response.message}</div>`
                    );

                } else {
                    resetHomeCaptcha();
                    $("#homeContactMessage").html(
                        `<div class="modal-alert modal-alert--error">${response.message}</div>`
                    );
                }
            },
            error: function () {

                $form.find("button[type='submit']")
                    .prop("disabled", false)
                    .html('<span>Send Enquiry</span><span aria-hidden="true">&rarr;</span>');

                $("#homeContactMessage").html(
                    `<div class="modal-alert modal-alert--error">Something went wrong. Please try again.</div>`
                );
            }
        });

    });


    function validateHomeContactForm() {

        var $form = $("#homeContactForm");
        $form.find(".field-error").text("");
        $("#homeCaptchaError").text("");

        let isValid = true;

        // Full Name
        let fullName = $form.find("#FullName").val().trim();
        if (fullName === "") {
            $form.find('[data-valmsg-for="FullName"]').text("Please enter your full name.");
            isValid = false;
        } else if (!/^[A-Za-z][A-Za-z\s.]*$/.test(fullName)) {
            $form.find('[data-valmsg-for="FullName"]').text("Only alphabets, spaces and '.' are allowed.");
            isValid = false;
        }

       
        // Organisation
        let organisation = $form.find("#Organisation").val().trim();
        if (organisation === "") {
            $form.find('[data-valmsg-for="Organisation"]').text("Please enter your organisation name.");
            isValid = false;
        }

      

        // Interest
        if ($form.find("#Interest").val() === "") {
            $form.find('[data-valmsg-for="Interest"]').text("Please select an area of interest.");
            isValid = false;
        }

        // Email
        let email = $form.find("#Email").val().trim();
        if (email === "") {
            $form.find('[data-valmsg-for="Email"]').text("Please enter your email address.");
            isValid = false;
        } else {
            const emailRegex = /^[a-zA-Z0-9._%+-]{2,}@(?:[a-zA-Z0-9-]{2,}\.)+[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                $form.find('[data-valmsg-for="Email"]').text("Please enter a valid email address (e.g. name@company.com).");
                isValid = false;
            }
        }

        // Phone
        let phone = $form.find("#Phone").val().trim();
        if (phone !== "") {
           
            let cleanPhone = phone.replace(/[\s()-]/g, "");
            const phoneRegex = /^\+?[1-9]\d{6,14}$/;

            if (!phoneRegex.test(cleanPhone)) {
                $form.find('[data-valmsg-for="Phone"]').text("Please enter a valid contact number.");
                isValid = false;
            }
        }

        var recaptchaResponse = getHomeCaptchaResponse();
        if (!recaptchaResponse) {
            $("#homeCaptchaError").text("Please complete the captcha.");
            isValid = false;
        }

        return isValid;
    }

    function getHomeCaptchaWidgetId() {
        var widgetId = $("#homeRecaptcha").attr("data-widget-id");
        return widgetId === undefined || widgetId === "" ? null : Number(widgetId);
    }

    function getHomeCaptchaResponse() {
        if (typeof grecaptcha === "undefined")
            return "";

        var widgetId = getHomeCaptchaWidgetId();
        return widgetId === null ? grecaptcha.getResponse() : grecaptcha.getResponse(widgetId);
    }

    function resetHomeCaptcha() {
        if (typeof grecaptcha === "undefined")
            return;

        var widgetId = getHomeCaptchaWidgetId();
        if (widgetId === null)
            grecaptcha.reset();
        else
            grecaptcha.reset(widgetId);
    }

});
