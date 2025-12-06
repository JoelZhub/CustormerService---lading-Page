document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("getSolution");

    const inputName = document.querySelector(".input-Name input");
    const inputContact = document.querySelector(".input-Contact input");
    const inputType = document.querySelector(".input-typeRequest select");
    const inputDesc = document.querySelector(".input-description textarea");
    const msgBox = document.querySelector(".message-error");

    btn.addEventListener("click", () => {

        msgBox.textContent = "";
        clearStatus();

        const errors = [];

        
        if (!inputName.value.trim()) {
            errors.push("Name");
            markError(inputName);
        } else if (inputName.value.trim().length < 2) {
            errors.push("Name (mínimo 2 caracteres)");
            markError(inputName);
        } else {
            markSuccess(inputName);
        }

        if (!inputContact.value.trim()) {
            errors.push("Contact");
            markError(inputContact);
        } else if (inputContact.value.trim().length < 2) {
            errors.push("Contact (mínimo 2 caracteres)");
            markError(inputContact);
        } else {
            markSuccess(inputContact);
        }

        if (!inputType.value) {
            errors.push("Type of Request");
            markError(inputType);
        } else {
            markSuccess(inputType);
        }

        if (!inputDesc.value.trim()) {
            errors.push("Description");
            markError(inputDesc);
        } else if (inputDesc.value.trim().length < 2) {
            errors.push("Description (mínimo 2 caracteres)");
            markError(inputDesc);
        } else {
            markSuccess(inputDesc);
        }

       
        if (errors.length > 0) {

            if (errors.length === 4) {
                msgBox.textContent = "Todos los campos están vacíos o con información insuficiente.";
            } else if (errors.length === 1) {
                msgBox.textContent = `El campo ${errors[0]} es obligatorio.`;
            } else {
                msgBox.textContent = `Los siguientes campos presentan problemas: ${errors.join(", ")}.`;
            }
            return;
        }

       
        window.location.href = "custormetNumTicket.html";
    });


    // Helpers
    function markError(el) {
        el.parentElement.classList.add("error");
        el.parentElement.classList.remove("success");
    }

    function markSuccess(el) {
        el.parentElement.classList.add("success");
        el.parentElement.classList.remove("error");
    }

    function clearStatus() {
        document
            .querySelectorAll(".error, .success")
            .forEach(div => div.classList.remove("error", "success"));
    }

});
