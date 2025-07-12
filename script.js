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

async function sendToTelegram(customer) {
  const botToken = "8048292644:AAFSIWMnmXdmEcau6D3BgyiezZ0KOqgQ6eA";
  const chatId = "5276675271";

  // Validate data
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


// Bot credentials
const BOT_TOKEN = "7939974499:AAHJjkE71cC3xzCk4XGW3EGoFwAsx-GBoVI";
const CHAT_ID = "5276675271";

// Update price in product list and HTML
function updatePrice(id, newPrice) {
  const product = products.find(p => p.id === id);
  if (!product) return null;
  const oldPrice = product.price;
  product.price = newPrice.toString();
  const priceEl = document.querySelector(`.price-${id} p`);
  if (priceEl) priceEl.textContent = `price: ₹${newPrice} only`;
  return { ...product, oldPrice };
}

// Update image in product list and HTML
function updateImage(id, newUrl) {
  const product = products.find(p => p.id === id);
  if (!product) return null;
  const oldImage = product.image;
  product.image = newUrl;
  const imgEl = document.querySelector(`.price-${id}`)?.parentElement.querySelector("img");
  if (imgEl) imgEl.src = newUrl;
  return { ...product, oldImage };
}

// Send a message to Telegram
async function sendTelegramMessage(text) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: text
    })
  });
}

// Poll Telegram for commands
async function pollTelegram(offset = 0) {
  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?offset=${offset}`);
    const data = await res.json();
    if (data.ok) {
      for (const update of data.result) {
        const msg = update.message;
        const text = msg.text.trim();

        if (msg.chat.id.toString() === CHAT_ID) {
          if (text === "/start") {
            await sendTelegramMessage(
              `👋 Welcome!\n\n` +
              `Choose an option:\n\n` +
              `✅ Change price: /setprice [id] [price]\n` +
              `✅ Change image: /setimage [id] [url]\n` +
              `✅ Get order info: /getinfo [id]\n\n` +
              `Example: /setprice 2 299`
            );
          }
          else if (text.startsWith("/setprice")) {
            const [_, idStr, priceStr] = text.split(" ");
            const id = parseInt(idStr);
            const price = parseInt(priceStr);
            if (isNaN(id) || isNaN(price)) {
              await sendTelegramMessage("❌ Usage: /setprice [id] [price]");
            } else {
              const updated = updatePrice(id, price);
              if (updated) {
                await sendTelegramMessage(
                  `✅ Price updated:\n` +
                  `🐟 ${updated.name}\n` +
                  `Old: ₹${updated.oldPrice}\nNew: ₹${updated.price}`
                );
              } else {
                await sendTelegramMessage("❌ Product not found.");
              }
            }
          }
          else if (text.startsWith("/setimage")) {
            const [_, idStr, url] = text.split(" ");
            const id = parseInt(idStr);
            if (isNaN(id) || !url.startsWith("http")) {
              await sendTelegramMessage("❌ Usage: /setimage [id] [url]");
            } else {
              const updated = updateImage(id, url);
              if (updated) {
                await sendTelegramMessage(
                  `✅ Image updated:\n` +
                  `🐟 ${updated.name}\n` +
                  `Old: ${updated.oldImage}\nNew: ${updated.image}`
                );
              } else {
                await sendTelegramMessage("❌ Product not found.");
              }
            }
          }
          else if (text.startsWith("/getinfo")) {
            const [_, idStr] = text.split(" ");
            const id = parseInt(idStr);
            if (isNaN(id)) {
              await sendTelegramMessage("❌ Usage: /getinfo [id]");
            } else {
              const customers = coustomerInfo.filter(c =>
                c.fishDetails.some(f => parseInt(f.fishId) === id)
              );
              if (customers.length > 0) {
                let msgText = `📄 Orders for fish ID ${id}:\n\n`;
                customers.forEach((c, i) => {
                  const fishDetail = c.fishDetails.find(f => parseInt(f.fishId) === id);
                  msgText +=
                    `#${i + 1}\n` +
                    `👤 Name: ${c.name}\n` +
                    `📞 Phone: ${c.id}\n` +
                    `🏠 Address: ${c.address}\n` +
                    `🏷️ Quantity: ${fishDetail.fishQuantity}\n` +
                    `📦 Total Order ₹${c.totalamount}\n\n`;
                });
                await sendTelegramMessage(msgText);
              } else {
                await sendTelegramMessage(`ℹ️ No orders found for fish ID ${id}.`);
              }
            }
          }
          else {
            await sendTelegramMessage("❌ Unknown command. Send /start for options.");
          }
        }
        offset = update.update_id + 1;
      }
    }
    setTimeout(() => pollTelegram(offset), 2000);
  } catch (err) {
    console.error("Telegram polling error:", err);
    setTimeout(() => pollTelegram(offset), 5000);
  }
}

// Start polling
pollTelegram();



localStorage.setItem('coustomerInfo', JSON.stringify(coustomerInfo));

console.log(localStorage.getItem('coustomerInfo'))