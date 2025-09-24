const BASE_URL =  `https://latest.currency-api.pages.dev/v1/currencies`;

const dropdownSel = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


//listing all country currency codes and make usd and inr as selected

for(let select of dropdownSel){
    for( currCode in countryList){
       // console.log(currCode , countryList[currCode]) ; // currency code , country code

       let newOption = document.createElement("option") ; 
       newOption.innerText = currCode;
       newOption.value = currCode;

       if(select.name === "from" && currCode === "USD"){
        newOption.selected = "selected" ; // to make usd as default for from
       }
       else if(select.name === "to" && currCode === "INR"){
        newOption.selected = "selected" ; // to make INR as default for TO
       }
       select.append(newOption);
    }

    select.addEventListener("change" , (evt) => { // evt is object in eventlistenerr
        updateFlag(evt.target) ; // target is , change kaha pr kra
});
}


//update flag with country code

//element - > where changes occur
const updateFlag = (element) => {
   let currCode = element.value ;
   let countryCode = countryList[currCode]; 

   let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
   let img = element.parentElement.querySelector("img") ;
   img.src = newsrc ; 

}



//update exchange rate

const updateExchangeRate = async() => {
    let amount  = document.querySelector(".amount input") ;
    let amtVal = amount.value ;
    
    if(amtVal === ""  || amtVal <1){
        amtVal = 1 ; // value for us
        amount.value = "1" ; // reset the input field 
    }


    //console.log(fromCurr.value , toCurr.value) ; 

    const url = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    let response = await fetch(url);
    let data = await response.json() ; // converting json to js object

    let rate  = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

   // console.log(data) ;


    let finalAmt = amtVal *rate;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}` //1USD = 80INR
}





//get exchange rate

btn.addEventListener("click" , (evt) =>{
    evt.preventDefault() ; //khud se kuch nhi hoga, url me sbkuch nhi jayega
    updateExchangeRate();
});


//at very beginning
window.addEventListener("load" , ()=>{
    updateExchangeRate() ;
})