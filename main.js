let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;


// get total
function getTotal()
{
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
    }else {
        total.innerHTML = '';
    }
}

// create product
let datapro;
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product) 
}else {
    datapro = [];
}

submit.onclick = function(){
    let newpro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }

    if(title.value != '' && price.value != '' && category.value != '' && newpro.count < 100){
        if(mood === 'create'){
            if(newpro.count > 1){
                for( i = 0; i < newpro.count; i++){
                    datapro.push(newpro);
                }
            } else { 
                datapro.push(newpro);
            }
        } else {
            datapro[tmp] = newpro;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
        clearData()
    }

    // save localstorage
    localStorage.setItem('product', JSON.stringify(datapro));
    showData()
}
// clear inputs 
    function clearData(){
        title.value = '';
        price.value = '';
        taxes.value = '';
        ads.value = '';
        discount.value = '';
        total.innerHTML = '';
        count.value = '';
        category.value = '';
    }

// read

function showData(){
    let table = '';
    for(i = 0; i < datapro.length; i++){
        table += `
             <tr>
                <td data-label="id">${i+1}</td>
                <td data-label="title">${datapro[i].title}</td>
                <td data-label="price">${datapro[i].price}</td>
                <td data-label="taxes">${datapro[i].taxes}</td>
                <td data-label="ads">${datapro[i].ads}</td>
                <td data-label="discount">${datapro[i].discount}</td>
                <td data-label="total">${datapro[i].total}</td>
                <td data-label="category">${datapro[i].category}</td>
                <td data-label="updete"><button onclick="updeteData(${i})" id="updete">updete</button></td>
                <td data-label="delete"><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
        `
    }

    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(datapro.length > 0){
        btnDelete.innerHTML =`
        <button onclick="deleteAll()">Delete All (${datapro.length})</button>
        `
    } else {
        btnDelete.innerHTML = '';
    }
}
showData()

// delete
function deleteData(i){
    datapro.splice(i,1);
    localStorage.product =JSON.stringify(datapro);
    showData()
}

function deleteAll(){
    localStorage.clear();
    datapro.splice(0);
    showData()
}

// count


// update
function updeteData(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    getTotal()
    count.style.display = 'none';
    category.value = datapro[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior: "smooth"
    })
}

// search
let searchMood = 'title';

function getSearchMood(id){
    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        searchMood = 'title';
    } else{
        searchMood = 'category';
    }
    search.placeholder = 'Search y '+ searchMood;
    search.focus()
    search.value = '';
    showData()
}

// ...existing code...
function searchData(value){
    let table = '';
    for(let i = 0; i < datapro.length; i++){
        if(
            (searchMood == 'title' && datapro[i].title.includes(value.toLowerCase())) ||
            (searchMood == 'category' && datapro[i].category.includes(value.toLowerCase()))
        ){
            table += `
                <tr>
                    <td data-label="id">${i+1}</td>
                    <td data-label="title">${datapro[i].title}</td>
                    <td data-label="price">${datapro[i].price}</td>
                    <td data-label="taxes">${datapro[i].taxes}</td>
                    <td data-label="ads">${datapro[i].ads}</td>
                    <td data-label="discount">${datapro[i].discount}</td>
                    <td data-label="total">${datapro[i].total}</td>
                    <td data-label="category">${datapro[i].category}</td>
                    <td data-label="updete"><button onclick="updeteData(${i})" id="updete">updete</button></td>
                    <td data-label="delete"><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
            `
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
// ...existing code...