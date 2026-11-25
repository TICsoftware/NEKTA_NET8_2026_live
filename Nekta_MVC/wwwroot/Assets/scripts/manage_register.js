 $(document).ready(function () {

        $("#btnRegister").click(function () {

            let password = $("#Password").val();
            let error = "";

            // Clear previous error
            $("#Password-error").text("");
            $("#Password-error").removeClass("field-validation-error");
            $("#Password-error").addClass("field-validation-valid");


            // Validation rules
            if (password.length < 8) {
                error = "Password must be at least 8 characters";
            }
            else if (!/[A-Z]/.test(password)) {
                error = "Password must contain at least 1 uppercase letter";
            }
            else if (!/[0-9]/.test(password)) {
                error = "Password must contain at least 1 number";
            }
            else if (!/[^a-zA-Z0-9]/.test(password)) {
                error = "Password must contain at least 1 special character";
            }

            // Show error or submit
            if (error !== "") {
                $("#Password-error").text(error);
                $("#Password-error").addClass("field-validation-error");
                $("#Password-error").removeClass("field-validation-valid");

                return false;
            }




        });


        $("#togglePassword").click(function () {

            let input = $("#Password");
            let type = input.attr("type");

            if (type === "password") {
                input.attr("type", "text");
                //$(this).text("🙈"); // change icon
            } else {
                input.attr("type", "password");
                //$(this).text("👁️");
            }

        });

    });