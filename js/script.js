var productName = document.getElementById("nameInput");
var priceInput = document.getElementById("priceInput");
var catInput = document.getElementById("catInput");
var descInput = document.getElementById("descInput");
var mainButton = document.getElementById("mainBtn");

var Products;
if(localStorage.getItem("ProductsList") ==null)
{
    Products = [];
}
else
{
    Products = JSON.parse(localStorage.getItem("ProductsList"));
    DisplayProducts();
}

function AddProduct() {
    
    if(CheckInputs())
    {
        if(ValidateProductPrice() ==true &&ValidateProductName()==true)
        {
            var Product = {
                name:productName.value,
                price:priceInput.value,
                cat:catInput.value,
                desc:descInput.value
            };
            Products.push(Product);
            localStorage.setItem("ProductsList",JSON.stringify(Products));
            DisplayProducts();
            clearForm();
        }
        else
        {
            alert("Sorry, Enter valid values.");
        }               
        
    }
    else
    {
        window.alert("Sorry, All inputs are required.")
    }
    
}

function clearForm() {
    productName.value ="";
    priceInput.value ="";
    catInput.value ="";
    descInput.value="";
}

function DisplayProducts() {

    var container = ``;
    for (var i = 0; i < Products.length; i++) {
       container += `<tr>
       <td>${i+1}</td>
       <td>${Products[i].name}</td>
       <td>${Products[i].price}</td>
       <td>${Products[i].desc}</td>
       <td>${Products[i].cat}</td>
       <td><button onclick="ChangeFormForUpdate(`+i+`)" class="btn btn-outline-warning">Update</button></td>
       <td><button  onclick="DeleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
       </tr>` 
        
    }
    document.getElementById("tableBody").innerHTML = container;
}

function CheckInputs(){
    if( productName.value !="" && priceInput.value !="" && catInput.value !="" &&descInput.value !="")
    {
        return true;
    }
    else
    {
        return false;
    }
}

function DeleteProduct(index){
    Products.splice(index,1);
    localStorage.setItem("ProductsList",JSON.stringify(Products));
    DisplayProducts();
}

function SearchProduct(searchTerm){

    var container = ``;
    for (var i = 0; i < Products.length; i++) {
      if(Products[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true)
      {
        container += `<tr>
        <td>${i+1}</td>
        <td>${Products[i].name}</td>
        <td>${Products[i].price}</td>
        <td>${Products[i].desc}</td>
        <td>${Products[i].cat}</td>
        <td><button onclick="ChangeFormForUpdate(${i})" class="btn btn-outline-warning">Update</button></td>
        <td><button  onclick="DeleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
        </tr>` 
      }
      else
      {
            //m4 mawgod
      }
    }
    document.getElementById("tableBody").innerHTML = container;
}
var index;
function ChangeFormForUpdate(idx){
    productName.value =Products[idx].name;
    priceInput.value =Products[idx].price;
    catInput.value =Products[idx].cat;
    descInput.value=Products[idx].desc;
    mainButton.innerHTML = "Update";  
    for(var i = 0; i < Products.length ; i++)
    {
        if( productName.value == Products[i].name && priceInput.value == Products[i].price&& catInput.value == Products[i].cat && descInput.value== Products[i].desc)
        {
            index = i;
        }
    }  
    console.log(index); 
}

function UpdateProduct(){
    var pros = JSON.parse(localStorage.getItem("ProductsList"));
    if(ValidateProductPrice() ==true &&ValidateProductName()==true)
    {
        Products[index].name = productName.value;
        Products[index].price = priceInput.value;
        Products[index].cat = catInput.value; 
        Products[index].desc = descInput.value;
        localStorage.setItem("ProductsList",JSON.stringify(Products));  
        DisplayProducts();
        clearForm();
        mainButton.innerHTML = "Add Product "
    }else
    {
        alert("Sorry, Enter valid values.");
    }
    
}

var index;
function SelectAddOrUpdate()
{
    if(mainButton.innerHTML == "Update")
    {
    UpdateProduct();
    DisplayProducts();
    }
    else
    {
        AddProduct();
    }
    DisplayProducts();
}


function ValidateProductName()
{
    var regex =/^[A-Z][a-z]{3,10}$/
    if(regex.test(productName.value))
    {
        return true;
    }
    else
    {
        return false;
    }
}


function ValidateProductPrice()
{
    var regex =/^[1-9][0-9]*$/
    if(regex.test(productName.value))
    {
        return true;
    }
    else
    {
        return false;
    }
}