function open2FAPopup(url, title) {
    document.getElementById("twoFATitle").innerText = title;

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error("Network error");
            return res.text();
        })
        .then(data => {
            document.getElementById("qrContent").innerHTML = data;

            const modalElement = document.getElementById("twoFAModal");
            const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

            modal.show();
        })
        .catch(err => {
            console.error(err);
            alert("Failed to load 2FA content");
        });
}


document.addEventListener("click", function (e) {

    // Setup and Reset
    const btn = e.target.closest(".btn-2fa-action");

    if (btn) {
        open2FAPopup(btn.dataset.url, btn.dataset.title);
        return;
    }

    // Disable confirmation
    const disableBtn = e.target.closest(".btn-disable-2fa");

    if (disableBtn) {
        const confirmed = confirm("Disable 2FA for this user?");

        if (!confirmed) {
            e.preventDefault();
        }
    }
});

function open2FAPopup(url, title) {

    document.getElementById("twoFATitle").innerText = title;

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error("Network error");
            return res.text();
        })
        .then(data => {
            document.getElementById("qrContent").innerHTML = data;

            const modal = bootstrap.Modal.getOrCreateInstance(
                document.getElementById("twoFAModal")
            );

            modal.show();
        })
        .catch(err => {
            console.error(err);
            alert("Failed to load 2FA content");
        });
}