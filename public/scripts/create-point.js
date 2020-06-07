
function populateUFs() {
    const ufSelect = document.querySelector("select[name=state]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {
            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()


function getCities(event) {
    const citySetect = document.querySelector("select[name=city]")
    const statesInput = document.querySelector("input[name=state]")

    console.log('event', event)

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.setectedIndex
    statesInput.value = event.target.options[indexOfSelectedState]

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySetect.innerHTML = ""
    citySetect.disabled = false

    fetch(url)
        .then(res => res.json())
        .then(cities => {
            for (const city of cities) {
                citySetect.innerHTML += ` <option value="${city.nome}">${city.nome}</option > `
            }
            citySetect.disabled = false
        })
}


document
    .querySelector("select[name=state]")
    .addEventListener("change", getCities)


//Itens de coleta
//Pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // adicionar ou remover uma classe com Javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId //True ou False
        return itemFound
    })

    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId)
    }

    collectedItems.value = selectedItems
}




