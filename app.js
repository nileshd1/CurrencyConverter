const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let dropdown=document.querySelectorAll('.dropdown select');
let i=0;





const fromCurr=document.querySelector('.from select');
const toCurr=document.querySelector('.to select');

const msg=document.getElementById('msg');

window.addEventListener('load',()=>{
    getupdate();


});





const getupdate= async()=>{
  
    let amount=document.querySelector('.amount input');
    let amtval=amount.value;
    if(amtval==='' || amtval<1)
    {
        amtval=1;
        amount.value=1;
    }
    console.log(toCurr.value.toLowerCase());
    const url=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

    let response=await fetch(url);
   console.log(response);
   let data= await response.json();
   let rate=data[toCurr.value.toLowerCase()];
   console.log(rate);

   let finalamount=amtval * rate;

   console.log(finalamount);

   msg.innerHTML=`${amtval} ${fromCurr.value} = ${finalamount} ${toCurr.value}`;
  




};




for(let select of dropdown)
{
    for (code in countryList)
    {
    let newOption=document.createElement('option');
    newOption.innerText=code;
    newOption.value=code;
    if(select.name==='from' && code==='USD')
    {
        newOption.selected='selected';
    }

    if(select.name==='to' && code==='INR')
    {
        newOption.selected='selected';
    }

    select.append(newOption);
    }

    select.addEventListener('change',(evn)=>{
        updateflag(evn.target);
    });
}

const updateflag=(element)=>{
    let code=element.value;
    let countrycode=countryList[code];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector('img');
    img.src=newsrc;
};

const button=document.querySelector('form button');
button.addEventListener('click', (evt)=>{
    evt.preventDefault();
    getupdate();
    

});


