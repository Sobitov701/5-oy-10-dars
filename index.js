const form = document.getElementById("form");
const name = document.getElementById("name");
const price = document.getElementById("price");
const count = document.getElementById("count");
const btn = document.getElementById("btn");
const tbody = document.getElementById("tbody");
const overalPrice = document.getElementById("overalPrice");
const overalCount = document.getElementById("overalCount");

function validate() {
  if (!name.value.trim() || !price.value.trim() || !count.value.trim()) {
    alert("Iltimos, barcha maydonlarni to'ldiring!");
    return false;
  }
  return true;
}

function getDate() {
  try {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    return Array.isArray(products) ? products : [];
  } catch (error) {
    console.error("LocalStorage ma'lumotini o'qishda xatolik:", error);
    return [];
  }
}

function createRow(product, index) {
  return `
  <tr>
          <td>${index}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.count}</td>
          <td>
            <button data-id="${product.id}" class="delete">Delete</button>
            <button data-id="${product.id}" class="edit">Edit</button>
          </td>
        </tr>
  `;
}

btn &&
  btn.addEventListener("click", function (event) {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) {
      return;
    }

    const product = {
      id: Date.now(),
      name: name.value,
      price: price.value,
      count: count.value,
    };

    let products = getDate();
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    form.reset();

    let index = tbody.children.length + 1;
    let row = createRow(product, index);
    tbody.innerHTML += row;

    let oldSumPrice = +overalPrice.innerHTML;
    let oldSumCount = +overalCount.innerHTML;

    overalCount.innerHTML = oldSumCount + +product.count;
    overalPrice.innerHTML = oldSumPrice + +product.price;
  });

document.addEventListener("DOMContentLoaded", function () {
  let products = getDate();
  let sum = 0;
  let counter = 0;

  products.length > 0 &&
    products.forEach((product, index) => {
      let row = createRow(product, index + 1);
      tbody.innerHTML += row;
      sum += Number(product.price);
      counter += Number(product.count);
    });

  overalCount.innerHTML = counter;
  overalPrice.innerHTML = sum;

  const deleteButtons = document.querySelectorAll("button.delete");
  deleteButtons.length > 0 &&
    deleteButtons.forEach((deleteButton) => {
      deleteButton &&
        deleteButton.addEventListener("click", function () {
          let confirmDelete = confirm("rostanxa ochirmoqchimisiz");
          let elementId = this.getAttribute("data-id");

          if (confirmDelete && elementId) {
            let products = getDate();
            products = products.filter((product) => {
              return product.id != elementId;
            });

            localStorage.setItem("products", JSON.stringify(products));

            this.parentNode.parentNode.remove();
            window.location.reload();
          }
        });
    });

  const editButtons = document.querySelectorAll("button.edit");
  editButtons.length > 0 &&
    editButtons.forEach((editButton) => {
      editButton &&
        editButton.addEventListener("click", function () {
          let elementId = this.getAttribute("data-id");
          let products = getDate();

          let oldValue = products.find((product) => {
            return product.id == elementId;
          });

          let name = prompt("nomi", oldValue.name);
          let price = +prompt("narxi", oldValue.price);
          let count = +prompt("soni", oldValue.count);

          let product = {
            id: elementId,
            name: name,
            price: price,
            count: count,
          };

          products = products.map((value) => {
            if (value.id == elementId) {
              value = product;
            }

            return value;
          });

          localStorage.setItem("products", JSON.stringify(products));
          window.location.reload();
        });
    });
});

//1-misol
//Bir tugma (Generate Emoji) va bo‘sh bir <div> yarating.
//Tugma bosilganda, tasodifiy emojilar ro‘yxatidan bir emoji tanlab, <div> elementga ko‘rsating.
//</div>Har safar tugma bosilganda eski emoji o‘chib, yangi emoji ko‘rinadi.

const emojis = ["😀", "🎉", "🚀", "🐱", "🍎"];

const button = document.getElementById("emoji");
const emojiDisplay = document.getElementById("emoji-display");

button &&
  button.addEventListener("click", () => {
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    emojiDisplay.textContent = randomEmoji;
  });

//2-misol
//Bir <textarea> va bir nechta tugmalar yarating:
//Bold - Matnni qalin qilish.
//talic - Matnni kursiv qilish.
//Clear - Matnni toza

const textarea = document.getElementById("text-area");
const boldBtn = document.getElementById("bold-btn");
const italicBtn = document.getElementById("italic-btn");
const clearBtn = document.getElementById("clear-btn");

boldBtn &&
  boldBtn.addEventListener("click", () => {
    textarea.style.fontWeight = "bold";
  });

italicBtn &&
  italicBtn.addEventListener("click", () => {
    textarea.style.fontStyle = "italic";
  });

clearBtn &&
  clearBtn.addEventListener("click", () => {
    textarea.value = "";
  });

//3-misol
//Bir tugma (Start) va bir progress bar (<div> elementi ichida progressni ko‘rsatuvchi boshqa <div> elementi) yarating.
//Tugmani bosganda progress bar sekin-asta to‘ladi (masalan, har 100ms 5% ga o‘sib boradi).
//Progress bar 100% ga to‘lganda tugma ishlamay qoladi.
