import { products,coustomerInfo } from './variable.js';

window.cart=function(value){
  const cartsidebar =document.querySelector('.cart-sidebar');
  const paymentsection =document.querySelector('.payment-section');
  const detailsection =document.querySelector('.log-section');
  const readdetail =document.querySelector('.order-before-details');
  if(value=="open"){
     cartsidebar.style.display = 'grid';
  }
  else if(value=="open-data"){
    readdetail.style.display = 'grid';
    cartsidebar.style.display = 'none';
  }
  else if(value=="open-fill"){
    readdetail.style.display = 'none';
    detailsection.style.display = 'grid';
  }
   else if(value=="payment-open"){
    paymentsection.style.display = 'grid';
    cartsidebar.style.display = 'none';
    detailsection.style.display = 'none';
  } 
  else if(value=="payment-close"){
    paymentsection.style.display = 'none';
  } 
  else if(value=="close"){
    readdetail.style.display = 'none';
    cartsidebar.style.display = 'none';
    paymentsection.style.display = 'none';
    detailsection.style.display = 'none';
    location.reload();
  }
  else {
  cartsidebar.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i <= products.length; i++) {
        const button = document.getElementById(`add-to-cart-${i}`);
        const priceElement = document.querySelector(`.price-${i}`);
      
        if (priceElement) {
            priceElement.textContent = `price: ${products[i-1].price}₹ only`;
          } 
        if (button) {
            button.addEventListener('click', () => finalCart(i));
        }
    }
});

let cartContainer = ''; 

function finalCart(index) {
    const cartContainer = document.querySelector('.cart-product');
    const product = products[index - 1];
    const existingItem = document.getElementById(product.id);
    product.totalprice=product.quantity*product.price;
    if (existingItem) {
        const quantityInput = existingItem.querySelector('.cart-input');
        const totalAmount = existingItem.querySelector('.total-amount');
        quantityInput.value = product.quantity;
        totalAmount.textContent = `₹${product.totalprice}`;
       
    } 

    else {
          const customName = "cart-custom-item-heading";
        const normalName = "cart-item-heading";
        const headinBro = (product.id === 14 || product.id === 11) ? customName : normalName;
        const cartItemHTML = `
            <div class="cart-items" id="${product.id}">
                <h3 class="${headinBro}">${product.name}🦑</h3>
                <img class="cart-image" src="${product.image}">
                <div class="removebutton" onclick="removeUnwanterdThing(${product.id})"><span class="material-symbols-outlined ">cancel</span></div>
                <h3 class="price-info">Each Pair ${product.price}</h3>
                <div class="cart-selector">
                    <button class="cart-btn" onclick="sub(${index})">-</button>
                    <input type="number" class="cart-input cart-input-${index}" value="${product.quantity}" readonly />
                    <button class="cart-btn" onclick="add(${index})">+</button>
                </div>
                <div class="total-heading"><h3>total :</h3></div>
                <div class="total-amount total-amount-${index}">₹${product.price * product.quantity}</div>
            </div>
        `;
        cartContainer.innerHTML += cartItemHTML;
        console.log(product)
      }
    
}
window.subquantity=(index)=>{
  if(products[index-1].quantity > 1){
   let  displayElement= document.querySelector(`.element-${index}`);
   products[index-1].quantity--;
   console.log( products[index-1]); 
   displayElement.value = products[index - 1].quantity;
  }
  else{
    console.log("increase the qouantity")
  }
};

window.addquantity=(index)=>{
  let  displayElement= document.querySelector(`.element-${index}`);
  products[index-1].quantity++;
  console.log(products[index-1]);
  displayElement.value = products[index - 1].quantity;  
}

window.sub = (index) => {
const product = products[index-1];
const existingItem = document.getElementById(product.id);
    if (existingItem) {
        const quantityInput = existingItem.querySelector(`.cart-input-${index}`);
        let  displayElement= document.querySelector(`.element-${index}`);
        if(product.quantity > 1){    
            let newQuantity = quantityInput.value - 1;
            product.quantity-=1;
            quantityInput.value=product.quantity;
            displayElement.value = product.quantity; 
            totalchange(index);
            console.log(product)
             setTimeout(() => {totalamountaclculation();}, 200);
        }
     }
}

window.add = (index) => {
const product = products[index-1];
const existingItem = document.getElementById(product.id);
    if (existingItem) {
        const quantityInput = existingItem.querySelector(`.cart-input-${index}`);
        let  displayElement= document.querySelector(`.element-${index}`);
        if(product.quantity >=1){    
            product.quantity++;
            quantityInput.value=product.quantity;
            displayElement.value = product.quantity; 
            totalchange(index);
            console.log(product)
             setTimeout(() => {totalamountaclculation();}, 200);
         }
    }
}

function totalchange(index){
const product = products[index - 1];
product.totalprice=product.quantity*product.price;
console.log(product.name,product.totalprice);
document.querySelector(`.total-amount-${index}`).innerHTML=`₹${product.totalprice}`;
}


const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const reddot = document.querySelector('.reddot');
    reddot.style.display = 'block';
    setTimeout(() => {
     totalamountaclculation();
    }, 200);
  });
});


function totalamountaclculation(){
  const totalmoney=document.querySelector(`.cart-total-value`)
  const paymentamount=document.querySelector(`.display-ammount`)
  let totalamount = 0;
for (let i = 0; i <= 15; i++){
  if (products[i] && typeof products[i].totalprice === "number") {
    totalamount += products[i].totalprice;
    totalmoney.textContent=`₹${totalamount}`;
    paymentamount.textContent=`total you need to pay:₹${totalamount}`;
  }
}
console.log('current-total-amount:',totalamount);

}

window.saveInput = function() {
  let name = document.querySelector('.name-input').value;
  let address = document.querySelector('.address-input').value;
  let id = document.querySelector('.ph-input').value;
  let pincode = document.querySelector('.pin-code-input').value;
  let totalamount = 0;
  let fishName = [];
  
  for (let i = 0; i < products.length; i++) {
    if (products[i] && typeof products[i].totalprice === "number") {
      totalamount += products[i].totalprice;
      fishName.push({
        fishName: products[i].name,
        fishQuantity: products[i].quantity
      });
    }
  }
  const customer = {
    id: id,
    name: name,
    address: address,
    pincode: pincode,
    totalamount: totalamount,
    fishDetails: fishName
  };

  coustomerInfo.push(customer);
  console.log('Customer Info:', coustomerInfo)
  sendToTelegram(customer);
};



window.removeUnwanterdThing=(index) => {
  let indexValue =[index-1];
  let product = products[indexValue];
  const element = document.getElementById(index);

  if (element) {
    element.remove();
    product.totalprice="";
    console.log(product)
    setTimeout(() => {
     totalamountaclculation();
    }, 200);
  }
};

 console.log(products[1].totalprice)

/*gpt side */
const botToken = "8048292644:AAFSIWMnmXdmEcau6D3BgyiezZ0KOqgQ6eA";
const chatId = "5276675271";
async function sendToTelegram(customer) {
  
  if (!customer || !customer.id) {
    console.error("Invalid customer data - not sent to Telegram");
    return;
  }

  // Format message
  const message = `
 *New Order Received* 🛒
*Name*: ${customer.name || "N/A"}
*Phone-Number*: ${customer.id || "N/A"}
*Address*: ${customer.address || "N/A"}
*Pincode*: ${customer.pincode || "N/A"}
*Total Amount*: ₹${customer.totalamount || "0"}

*Fish List*:
${customer.fishDetails.map(fish => `➡️ ${fish.fishName} (Qty: ${fish.fishQuantity})`).join('\n')}
`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown"
      })
    });
    
    const result = await response.json();
    console.log('Telegram response:', result);
    if (!result.ok) {
      console.error('Telegram API error:', result.description);
    }
  } catch (error) {
    console.error('Failed to send to Telegram:', error);
  }
}



