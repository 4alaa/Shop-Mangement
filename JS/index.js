let ProductName=document.getElementById("ProductName")
let Price=document.getElementById("Price")
let Taxes=document.getElementById("Taxes")
let Ads=document.getElementById("Ads")
let Discount=document.getElementById("Discount")
let Count=document.getElementById("Count")
let Category=document.getElementById("Category")


let Result=document.getElementById("Result")

let TotalValue;
let AllProducts=[];


clearInputs()
// display if data exist
if(localStorage.getItem("productStorage"))
{
   AllProducts=JSON.parse(  localStorage.getItem("productStorage")  );
  
  //  view if data is existing
  displyData()


  
    document.getElementById("deleteAllProducts").classList.remove("d-none")
    document.getElementById("numProducts").innerHTML=`{ ${AllProducts.length} }`


    document.getElementById("totalItems").innerHTML=` ${AllProducts.length }`


    

  

}
else
{

    document.getElementById("deleteAllProducts").classList.add("d-none")
    document.getElementById("totalItems").innerHTML=`No Data`

    
}




// for total color
function changeColor()
{
  if(Price.value==""&&Taxes.value==""&&Ads.value==""&&Discount.value=="")
  {
  
    Total.classList.remove("bg-gray")
    Total.classList.add("bg-tomato")
  }
  else
  {
    Total.classList.add("bg-gray")
    Total.classList.remove("bg-tomato")
  }

  TotalValue=(Number(Price.value)+Number(Taxes.value)+Number(Ads.value))-Number(Discount.value)
  Result.innerHTML=`${TotalValue} $`
}



// Add Product
let myProduct;

function addProduct() {

  formValidation()

  if (formValidation()==true)
  {

    myProduct={
      ProdName : ProductName.value.toLowerCase(),
      prodCategory : Category.value.toLowerCase(),
      prodPrice : Price.value,
      ProdTaxs : Taxes.value,
      prodAds : Ads.value,
      totalResult:Result.innerHTML,
      ProdDiscount : Discount.value,
      
    }
  
    if(Number(Count.value)>1)
    {
      for (let i = 0; i <Number(Count.value); i++) {
        
          // push the added product to the array of objects
          AllProducts.push(myProduct)   
        
      }
      location.reload();
  
    }
    else
    {
        // push the added product to the array of objects
        AllProducts.push(myProduct)
    }
  
  
    // for delete 
    if(AllProducts.length>0)
    {
      document.getElementById("deleteAllProducts").classList.remove("d-none")
      document.getElementById("numProducts").innerHTML=`{ ${AllProducts.length} }`
      document.getElementById("totalItems").innerHTML=` ${AllProducts.length }`
  
  
    }
  

  
  
  
  
    // save in local storage
    localStorage.setItem("productStorage",JSON.stringify(AllProducts))
    // clear all inputs
    clearInputs()
    // display the added product
    displyData()

    
  }





}


// Display Data
var cartoona;
function displyData()
{
  cartoona=''

  for (let i = 0; i < AllProducts.length; i++) {
   
   cartoona+=
   `
   <tr>
          
   <td data-label="Index">
   ${i+1}
  </td>

   <td data-label="NAME">
    ${AllProducts[i].ProdName}
   </td>

   <td data-label="PRICE"> 
   ${AllProducts[i].prodPrice}
   </td>

   <td data-label="TAXS">
   ${AllProducts[i].ProdTaxs}
   </td>

   <td data-label="ADS"> 
   ${AllProducts[i].prodAds}
   </td>

   <td data-label="DISCOUNT">
   ${AllProducts[i].ProdDiscount}
   </td>

   <td data-label="TOTAL">
   ${AllProducts[i].totalResult}
   </td>

   <td data-label="CATEGORY">
   ${AllProducts[i].prodCategory}
   </td>
   
   <td data-label="UPDATE">
     <button class="btn btn-outline-success" onclick="selectProductToUpdate(${i})"><i class="fa-solid fa-pen-to-square"></i></button>
 </td>
   <td data-label="DELETE">
     <button class="btn btn-outline-danger" onclick="deleteProduct(${i})"><i class="fa-solid fa-trash"></i></button>
   </td>
 </tr>

   `
    
  }
  document.getElementById('tableBody').innerHTML=cartoona
}


 // delete the selected product only from table
function deleteProduct(productIndex) 
{
  
//  delete product
  AllProducts.splice(productIndex,1)

    // save in local storage
    localStorage.setItem("productStorage",JSON.stringify(AllProducts))

  // display Data after delete
  displyData()


  if(AllProducts.length>0)
  {
    document.getElementById("deleteAllProducts").classList.remove("d-none")
    document.getElementById("numProducts").innerHTML=`{ ${AllProducts.length} }`
    document.getElementById("totalItems").innerHTML=` ${AllProducts.length }`

  }
  else
  {
    document.getElementById("deleteAllProducts").classList.add("d-none")
    document.getElementById("totalItems").innerHTML=`No Data`


  }
  
}

 // delete all product from table
 function deleteAllProducts() 
 {
   
 //  delete product
   AllProducts.splice(0)

    // save in local storage
    localStorage.removeItem("productStorage")

   // display Data after delete
   displyData()

 
  document.getElementById("deleteAllProducts").classList.add("d-none")
  document.getElementById("totalItems").innerHTML=`No Data`

  document.querySelector(".buttons").classList.toggle("d-none")


 
   
   
 }








// move the selected product date to the inputs 
var updateIndex;//global variable for update
function selectProductToUpdate(productIndex)
{
  updateIndex=productIndex
  ProductName.value=AllProducts[productIndex].ProdName
  Price.value=AllProducts[productIndex].prodPrice
  Taxes.value=AllProducts[productIndex].ProdTaxs
  Ads.value=AllProducts[productIndex].prodAds
  Discount.value=AllProducts[productIndex].ProdDiscount
  Category.value=AllProducts[productIndex].prodCategory
  Result.innerHTML=AllProducts[productIndex].totalResult
  // change color of result
  changeColor()


  window.scrollTo(0, 0);

  Count.classList.add("d-none")

  document.getElementById("Add").classList.add("d-none")
  document.getElementById("update").classList.remove("d-none")
  document.getElementById("deleteAllProducts").classList.add("d-none")


  document.getElementById("productUpdateNum").innerHTML=`number ${productIndex+1} `


}


// update the data of the selected inputs
function updateProduct()
{

  formValidationNotCount()
  if(formValidationNotCount()==true)
  {
    AllProducts[updateIndex].ProdName=ProductName.value.toLowerCase()
    AllProducts[updateIndex].prodPrice=Price.value
    AllProducts[updateIndex].ProdTaxs=Taxes.value
    AllProducts[updateIndex].prodAds=Ads.value
    AllProducts[updateIndex].ProdDiscount=Discount.value
    AllProducts[updateIndex].prodCategory=Category.value.toLowerCase()
    AllProducts[updateIndex].totalResult=Result.innerHTML
  
  
    Count.classList.remove("d-none")
  
    document.getElementById("Add").classList.remove("d-none")
    document.getElementById("update").classList.add("d-none")
    document.getElementById("deleteAllProducts").classList.remove("d-none")
  
  
  
  
      // save in local storage
      localStorage.setItem("productStorage",JSON.stringify(AllProducts))
  
      // change color of result
      changeColor()
      // clear inputs
      clearInputs()
      // view after update
      displyData()

  }
 
}




// search mode
var searchInput=document.getElementById("Search")
searchInput.value=''

var searchMooood='byName'

function searchByName() {


  searchInput.placeholder="Search By Name"
  searchMooood='byName'
  searchInput.value=''
  displyData()

  

  
}
function searchByCategory() {

  searchInput.placeholder="Search By Category"
  searchMooood='byCategory'
  searchInput.value=''
  displyData()

  
}
function searchMode() {


  if(searchMooood=="byName")
  {
    cartoona=''

    for (let i = 0; i < AllProducts.length; i++) {
      
      if(AllProducts[i].ProdName.includes(searchInput.value.toLowerCase().trim()))
      {
  
         
         cartoona+=
         `
         <tr>
                
         <td data-label="INDEX">
         ${i+1}
        </td>
      
         <td data-label="NAME">
          ${(AllProducts[i].ProdName.replace(searchInput.value.toLowerCase().trim(),`<span class="text-danger fw-bold">${searchInput.value.toLowerCase().trim()}</span>`))}
         </td>
      
         <td>
         ${AllProducts[i].prodPrice}
         </td>
      
         <td data-label="TAXS">
         ${AllProducts[i].ProdTaxs}
         </td>
      
         <td data-label="UPDATE"ADS>
         ${AllProducts[i].prodAds}
         </td>
      
         <td data-label="DISCOUNT">
         ${AllProducts[i].ProdDiscount}
         </td>
      
         <td data-label="TOTAL">
         ${AllProducts[i].totalResult}
         </td>
      
         <td data-label="CATEGORY">
         ${AllProducts[i].prodCategory}
         </td>
         
         <td data-label="UPDATE">
           <button class="btn btn-outline-success" onclick="selectProductToUpdate(${i})"><i class="fa-solid fa-pen-to-square"></i></button>
       </td>
         <td data-label="DELETE">
           <button class="btn btn-outline-danger" onclick="deleteProduct(${i})"><i class="fa-solid fa-trash"></i></button>
         </td>
       </tr>
      
         `
          
        }
      }
      document.getElementById('tableBody').innerHTML=cartoona
  }
  else
  {
    cartoona=''

    for (let i = 0; i < AllProducts.length; i++) {
      
      if(AllProducts[i].prodCategory.includes(searchInput.value.toLowerCase().trim()))
      {
  
         
        cartoona+=
        `
        <tr>
               
        <td data-label="INDEX">
        ${i+1}
       </td>
     
        <td data-label="NAME">
         ${AllProducts[i].ProdName}
        </td>
     
        <td>
        ${AllProducts[i].prodPrice}
        </td>
     
        <td data-label="TAXS">
        ${AllProducts[i].ProdTaxs}
        </td>
     
        <td data-label="UPDATE"ADS>
        ${AllProducts[i].prodAds}
        </td>
     
        <td data-label="DISCOUNT">
        ${AllProducts[i].ProdDiscount}
        </td>
     
        <td data-label="TOTAL">
        ${AllProducts[i].totalResult}
        </td>
     
        <td data-label="CATEGORY">
        ${(AllProducts[i].prodCategory.replace(searchInput.value.toLowerCase().trim(),`<span class="text-danger fw-bold">${searchInput.value.toLowerCase().trim()}</span>`))}
        </td>
        
        <td data-label="UPDATE">
          <button class="btn btn-outline-success" onclick="selectProductToUpdate(${i})"><i class="fa-solid fa-pen-to-square"></i></button>
      </td>
        <td data-label="DELETE">
          <button class="btn btn-outline-danger" onclick="deleteProduct(${i})"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
     
        `
 
          
        }
      }
      document.getElementById('tableBody').innerHTML=cartoona
  }
  
}



function arrowUp() {
  window.scrollTo(0, 0);
}










// dark and sun mood
function changePagModeMoon()
{
  document.body.classList.add("bg-moon")

  document.getElementById("sun").classList.add("d-none")
  document.getElementById("moon").classList.remove("d-none")
  document.getElementById("totalText").classList.add("moon-text")
  document.getElementById("totalText").classList.add("text-warning")
  document.querySelector("h2").classList.add("text-info")
  localStorage.setItem("moodPage","moon")



}

function changePagModeSun()
{

  document.body.classList.remove("bg-moon")

  document.getElementById("sun").classList.remove("d-none")
  document.getElementById("moon").classList.add("d-none")
  document.getElementById("totalText").classList.remove("moon-text")
  document.getElementById("totalText").classList.remove("text-warning")
  document.querySelector("h2").classList.remove("text-info")

  localStorage.setItem("moodPage","sun")


}

if(localStorage.getItem("moodPage")=="sun")
{
  changePagModeSun()
}
else
{
  changePagModeMoon()
}






// validation of form
var regex

// clear all inputs
function clearInputs()
{
   ProductName.value=""
   Price.value=""
   Taxes.value=""
   Ads.value=""
   Discount.value=""
   Category.value=""
   Count.value=''
   Result.innerHTML=''
   Total.classList.remove("bg-gray")
   Total.classList.add("bg-tomato")
   document.getElementById("error-name").classList.add("d-none")
   ProductName.classList.remove('is-invalid')
   ProductName.classList.remove('is-valid')

   document.getElementById("error-price").classList.add("d-none")
   Price.classList.remove('is-invalid')
   Price.classList.remove('is-valid')

   document.getElementById("error-tax").classList.add("d-none")
   Taxes.classList.remove('is-invalid')
   Taxes.classList.remove('is-valid')

   document.getElementById("error-ads").classList.add("d-none")
   Ads.classList.remove('is-invalid')
   Ads.classList.remove('is-valid')

   document.getElementById("error-discount").classList.add("d-none")
   Discount.classList.remove('is-invalid')
   Discount.classList.remove('is-valid')

   document.getElementById("error-count").classList.add("d-none")
   Count.classList.remove('is-invalid')
   Count.classList.remove('is-valid')

   document.getElementById("error-category").classList.add("d-none")
   Category.classList.remove('is-invalid')
   Category.classList.remove('is-valid')



}



function productNameValidation() {
  
var regex=/^[a-z].{3,9}$/

if (regex.test(ProductName.value)) {
  

  document.getElementById("error-name").classList.add("d-none")

  ProductName.classList.add('is-valid')
  ProductName.classList.remove('is-invalid')


  return true

}
else
{
  document.getElementById("error-name").classList.remove("d-none")
  ProductName.classList.remove('is-valid')
  ProductName.classList.add('is-invalid')}

  return false

}



function productPriceValidation() {
  
  var regex=/^\d+$/
  
  if (regex.test(Price.value)) {
    
  
    document.getElementById("error-price").classList.add("d-none")
  
    Price.classList.add('is-valid')
    Price.classList.remove('is-invalid')
  
  return true
  
  
  }
  else
  {
    document.getElementById("error-price").classList.remove("d-none")
    Price.classList.remove('is-valid')
    Price.classList.add('is-invalid')}

    return false
  
  }



function productTaxsValidation() {
  
  var regex=/^\d+$/
  
  if (regex.test(Taxes.value)) {
    
  
    document.getElementById("error-tax").classList.add("d-none")
  
    Taxes.classList.add('is-valid')
    Taxes.classList.remove('is-invalid')
  
  return true
  
  
  }
  else
  {
    document.getElementById("error-tax").classList.remove("d-none")
    Taxes.classList.remove('is-valid')
    Taxes.classList.add('is-invalid')}

    return false
  
}



function productAdsValidation() {
  
  var regex=/^\d+$/
  
  if (regex.test(Ads.value)) {
    
  
    document.getElementById("error-ads").classList.add("d-none")
  
    Ads.classList.add('is-valid')
    Ads.classList.remove('is-invalid')
  
  return true
  
  
  }
  else
  {
    document.getElementById("error-ads").classList.remove("d-none")
    Ads.classList.remove('is-valid')
    Ads.classList.add('is-invalid')}

    return false
  
}




function productDiscountValidation() {
  
  var regex=/^\d+$/
  
  if (regex.test(Discount.value)) {
    
  
    document.getElementById("error-discount").classList.add("d-none")
  
    Discount.classList.add('is-valid')
    Discount.classList.remove('is-invalid')
  
  return true
  
  
  }
  else
  {
    document.getElementById("error-discount").classList.remove("d-none")
    Discount.classList.remove('is-valid')
    Discount.classList.add('is-invalid')}

    return false
  
}




function productCounttValidation() {
  
  var regex=/^\d+$/
  
  if (regex.test(Count.value)) {
    
  
    document.getElementById("error-count").classList.add("d-none")
  
    Count.classList.add('is-valid')
    Count.classList.remove('is-invalid')
  
  return true
  
  
  }
  else
  {
    document.getElementById("error-count").classList.remove("d-none")
    Count.classList.remove('is-valid')
    Count.classList.add('is-invalid')}

    return false
  
}



function productCategoryValidation() {
  
  var regex=/^[a-z].{3,9}$/
  
  if (regex.test(Category.value)) {
    
  
    document.getElementById("error-category").classList.add("d-none")
  
    Category.classList.add('is-valid')
    Category.classList.remove('is-invalid')
  
  
    return true
  
  }
  else
  {
    document.getElementById("error-category").classList.remove("d-none")
    Category.classList.remove('is-valid')
    Category.classList.add('is-invalid')}
  
    return false
  
  }





  function formValidation()
  {
    productNameValidation()
    productPriceValidation()
    productTaxsValidation()
    productCounttValidation()
    productAdsValidation()
    productDiscountValidation()
    productCategoryValidation()



    if(productNameValidation()==true&&productPriceValidation()==true
    &&productTaxsValidation()==true&&productCounttValidation()==true
    &&productAdsValidation()==true&&productDiscountValidation()==true
    &&productCategoryValidation()==true)
    {
      return true
    }
    else
    {
      return false
    }

  }





  
  function formValidationNotCount()
  {
    productNameValidation()
    productPriceValidation()
    productTaxsValidation()
    productAdsValidation()
    productDiscountValidation()
    productCategoryValidation()



    if(productNameValidation()==true&&productPriceValidation()==true
    &&productTaxsValidation()==true&&productAdsValidation()==true
    &&productDiscountValidation()==true&&productCategoryValidation()==true)
    {
      return true
    }
    else
    {
      return false
    }

  }




  // sure function
  function  sure() {
    document.querySelector(".buttons").classList.toggle("d-none")
  }