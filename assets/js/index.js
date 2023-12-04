function val() {
    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last_name").value;
    const age = document.getElementById("age").value;
    const budget = document.getElementById("budget").value.replace(',', '.');

    let errors = [];

    if (firstName.length < 6) {
        errors.push("First name should be more than 6 characters");
    }
    if (lastName.length < 6) {
        errors.push("Last name should be more than 6 characters");
    }

    const ageNumeric = !isNaN(parseInt(age)) && isFinite(age);
    const budgetNumeric = !isNaN(parseFloat(budget)) && isFinite(budget);

    if (!ageNumeric || !budgetNumeric) {
        errors.push('Age and Budget fields accept only numeric values')
    }

    if (ageNumeric && (age < 18)) {
        errors.push('Age must be 18 or older')
    }

    if (errors) {
        const error = document.getElementById("registration_form_error");
        error.style.padding = "10px";
        error.innerHTML = errors.join("<br />");
    }
    alert(errors.join('\n'))
    return false;
}