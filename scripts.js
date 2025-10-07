const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

//unordered list elements
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")

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

//add item to the list
function expenseAdd(newExpense) {
    try {
        const expenseItem = document.createElement('li') //create an li
        expenseItem.classList.add('expense-item') // add class to the li

        const expenseIcon = document.createElement('img') //create the tag img
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`) //attribute the source of the image
        expenseIcon.setAttribute("alt", newExpense.category_name) //attribute the alternative text of the image

        const expenseInfo = document.createElement('div') 
        expenseInfo.classList.add('expense-info') 

        const expenseName = document.createElement('strong') //create expense name
        expenseName.textContent = newExpense.expense

        const expenseCategory = document.createElement('span') //create expense category
        expenseCategory.textContent = newExpense.category_name

        expenseInfo.append(expenseName, expenseCategory) //add expenseName and expenseCategory as children of expenseInfo

        const expenseAmount = document.createElement("span") //create expense amount
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "Remover")

        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon) //add all elements as children of expenseItem
        expenseList.append(expenseItem) //add expenseItem as a child of expenseList

        formClear() //clear the form
        updateTotals()

        } catch (error) {
        alert("Não foi possível adicionar a despesa.")
        console.error(error)
    }
}

//update totals
function updateTotals() {
    try {
        const items = expenseList.children //get all list items
        
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}` 

        let total = 0

        for(let item = 0; item < items.length; item++) {
            const itemAmount = items[item].querySelector(".expense-amount")

            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",",".") //remove non-numeric characters and replace comma with dot

            value = parseFloat(value) //convert to float

            if(isNaN(value)) { //check if value is a number
                return alert("Valor inválido")
            }
            total += Number(value) 
        }

        const symbolBRL = document.createElement("small")
        symbolBRL.textContent = "R$"

        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "") //format total

        expensesTotal.innerHTML = "" //clear the total before updating
        expensesTotal.append(symbolBRL, total) //update total

    } catch (error) {
        console.log(error)
        alert("Não foi possível atualizar os totais.")
    }
}

expenseList.addEventListener("click", function(event) {
    if(event.target.classList.contains("remove-icon")) {
        const item = event.target.closest(".expense") //obtain the closest parent with class "expense"

        item.remove() //remove the item from the list
    }
    updateTotals() //update totals after removal
})

function formClear() {
    expense.value = ""
    category.value = ""
    amount.value = ""

    expense.focus() //focus on the expense input
}