/* =========================================================
   ARABIAN ACADEMY — MAIN JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    const header = document.querySelector("header");

    function handleHeaderScroll() {
        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    handleHeaderScroll();

    window.addEventListener("scroll", handleHeaderScroll, {
        passive: true
    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const nav =
        document.querySelector(".header .nav");

    if (mobileMenuBtn && nav) {

        function closeMobileMenu() {

            mobileMenuBtn.classList.remove("active");

            nav.classList.remove("menu-open");

            mobileMenuBtn.setAttribute(
                "aria-label",
                "فتح القائمة"
            );
        }


        function toggleMobileMenu() {

            const isOpen =
                mobileMenuBtn.classList.toggle("active");

            nav.classList.toggle(
                "menu-open",
                isOpen
            );

            mobileMenuBtn.setAttribute(
                "aria-label",
                isOpen
                    ? "إغلاق القائمة"
                    : "فتح القائمة"
            );
        }


        mobileMenuBtn.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                toggleMobileMenu();
            }
        );


        /* Close after clicking a link */

        nav.querySelectorAll("a").forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        closeMobileMenu();

                    }
                );

            }
        );


        /* Close when clicking outside */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    !nav.contains(event.target) &&
                    !mobileMenuBtn.contains(event.target)
                ) {

                    closeMobileMenu();

                }

            }
        );


        /* Close when returning to desktop */

        window.addEventListener(
            "resize",
            function () {

                if (window.innerWidth > 768) {
                    closeMobileMenu();
                }

            }
        );

    }


    /* =====================================================
       CHECKOUT
    ===================================================== */

    const termsCheck =
        document.getElementById("termsCheck");

    const continueButton =
        document.getElementById("continueButton");


    function updateCheckoutButton() {

        if (!termsCheck || !continueButton) {
            return;
        }

        if (termsCheck.checked) {

            continueButton.disabled = false;

            continueButton.style.opacity = "1";

            continueButton.style.cursor =
                "pointer";

        } else {

            continueButton.disabled = true;

            continueButton.style.opacity = ".55";

            continueButton.style.cursor =
                "not-allowed";
        }
    }


    if (termsCheck) {

        termsCheck.addEventListener(
            "change",
            updateCheckoutButton
        );

        updateCheckoutButton();

    }


    /* =====================================================
       VALIDATION
    ===================================================== */

    window.continueCheckout =
        function () {

            const cards =
                document.querySelectorAll(
                    ".attendee-card"
                );

            let isValid = true;

            let firstInvalidField = null;


            cards.forEach(function (card) {

                const name =
                    card.querySelector(
                        'input[name*="_name"]'
                    );

                const phone =
                    card.querySelector(
                        'input[name*="_phone"]'
                    );

                const email =
                    card.querySelector(
                        'input[name*="_email"]'
                    );


                const fields =
                    [name, phone, email]
                    .filter(Boolean);


                fields.forEach(function (field) {

                    field.classList.remove(
                        "input-error"
                    );

                });


                /* NAME */

                if (
                    name &&
                    !name.value.trim()
                ) {

                    markInvalid(name);

                    isValid = false;

                    if (!firstInvalidField) {
                        firstInvalidField = name;
                    }
                }


                /* PHONE */

                const phoneValue =
                    phone
                        ? phone.value.trim()
                        : "";


                const phoneRegex =
                    /^01[0125][0-9]{8}$/;


                if (
                    phone &&
                    (
                        !phoneValue ||
                        !phoneRegex.test(phoneValue)
                    )
                ) {

                    markInvalid(phone);

                    isValid = false;

                    if (!firstInvalidField) {
                        firstInvalidField = phone;
                    }
                }


                /* EMAIL */

                const emailValue =
                    email
                        ? email.value.trim()
                        : "";


                const emailRegex =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    email &&
                    (
                        !emailValue ||
                        !emailRegex.test(emailValue)
                    )
                ) {

                    markInvalid(email);

                    isValid = false;

                    if (!firstInvalidField) {
                        firstInvalidField = email;
                    }
                }

            });


            /* TERMS */

            if (termsCheck) {

                const checkRow =
                    termsCheck.closest(
                        ".check-row"
                    );


                if (!termsCheck.checked) {

                    if (checkRow) {
                        checkRow.classList.add(
                            "check-error"
                        );
                    }

                    isValid = false;

                } else {

                    if (checkRow) {
                        checkRow.classList.remove(
                            "check-error"
                        );
                    }

                }

            }


            /* STOP */

            if (!isValid) {

                if (firstInvalidField) {

                    firstInvalidField.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });


                    setTimeout(
                        function () {

                            firstInvalidField.focus();

                        },
                        400
                    );

                }

                return;
            }


            /* EVERYTHING VALID */

            goToCheckout();

        };


    /* =====================================================
       MARK INVALID
    ===================================================== */

    function markInvalid(field) {

        if (!field) return;

        field.classList.add(
            "input-error"
        );


        function removeError() {

            if (field.value.trim()) {

                field.classList.remove(
                    "input-error"
                );

                field.removeEventListener(
                    "input",
                    removeError
                );

            }

        }


        field.addEventListener(
            "input",
            removeError
        );

    }


    /* =====================================================
       CHECKOUT LOADING
    ===================================================== */

    function goToCheckout() {

        const button =
            document.getElementById(
                "continueButton"
            );


        if (!button) return;


        button.disabled = true;


        button.innerHTML = `
            <span class="button-loader"></span>
            Processing...
        `;


        setTimeout(
            function () {

                button.innerHTML = `
                    <span>
                        Continue to Checkout
                    </span>

                    <i class="bi bi-arrow-left"></i>
                `;

                button.disabled = false;

                console.log(
                    "Registration data is valid."
                );

            },
            700
        );

    }

});