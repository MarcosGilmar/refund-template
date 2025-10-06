const form = document.querySelector('form');
const amount = document.getElementById('amount');
const expense = document.getElementById('expense');
const category = document.getElementById('category');

//input event
amount.oninput = () => {
    let value = amount.value.replace(/\D/g, "") //only numbers

    value = Number(value) / 100 //transform to cents

    amount.value = formatCurrencyBRL(value) //update the input value
}
//function that formats the expense amount
function formatCurrencyBRL(value) {
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
    return value
}
//form submit event
form.onsubmit = (event) => {
    event.preventDefault()
    //object with the new expense data
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date()
    }

    expenseAdd(newExpense)
}

function expenseAdd(newExpense) {
    try {

    } catch (error) {
        alert("Não foi possível adicionar a despesa.")
        console.error(error)
    }
}
