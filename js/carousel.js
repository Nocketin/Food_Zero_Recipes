// // let width = 50; // ширина картинки
// if (window.innerWidth <= 768) {
//   count = 1; // для мобильных устройств показываем 1 элемент
//   width = 100;
// } else {
//   count = 2; // для десктопа показываем 2 элемента
//   width = 50;
// }

// let intervalTime = 5000; // время задержки между сдвигами (в миллисекундах)
// let autoScrollInterval; // Переменная для хранения ID интервала

// let list = other_recipes_section.querySelector("ul");
// let listElems = other_recipes_section.querySelectorAll("li");

// let position = 0; // положение ленты прокрутки
// list.style.transition = "margin-left 0.3s ease"; // плавный переход

// function updateInterval() {
//   clearInterval(autoScrollInterval); // Останавливаем текущий интервал
//   autoScrollInterval = setInterval(moveToNext, intervalTime); // Устанавливаем новый интервал
// }

// autoScrollInterval = setInterval(moveToNext, intervalTime);


// other_recipes_section.querySelectorAll(".prev_recipe, .prev_recipe_phone").forEach(function(button) {
//     button.onclick = function () {
//       clearInterval(autoScrollInterval); // Останавливаем текущий интервал
//       updateInterval(); // Обновляем интервал
      
//       // сдвиг влево
//       position += 100 / count;
//       if (position > 0) {
//         position = -width * (listElems.length - 2); // если достигли конца, возвращаемся в начало
//       }
//       // последнее передвижение влево
//       position = Math.min(position, 0);
//       list.style.marginLeft = position + "%";
//     };
//   });

// // other_recipes_section.querySelector(
// //   ".next_recipe, .next_recipe_phone"
// // ).onclick = function () {
// //   clearInterval(autoScrollInterval); // Останавливаем текущий интервал
// //   updateInterval(); // Обновляем интервал
  
// //   position -= 100 / count;
// //   if (Math.abs(position) >= width * (listElems.length - 1)) {
// //     position = 0; // если достигли конца, возвращаемся в начало
// //   }
// //   // последнее передвижение вправо
// //   position = Math.max(position, -width * (listElems.length - 2));
// //   list.style.marginLeft = position + "%";
// // };

// other_recipes_section.querySelectorAll(".next_recipe, .next_recipe_phone").forEach(function(button) {
//     button.onclick = function () {
//       clearInterval(autoScrollInterval); // Останавливаем текущий интервал
//       updateInterval(); // Обновляем интервал
  
//       // Сдвиг вправо
//       position -= 100 / count;
//       if (Math.abs(position) >= width * (listElems.length - 1)) {
//         position = 0; // если достигли конца, возвращаемся в начало
//       }
//       // последнее передвижение вправо
//       position = Math.max(position, -width * (listElems.length - 2));
//       list.style.marginLeft = position + "%";
//     };
//   });

// // Функция для автоматической прокрутки вправо
// function moveToNext() {
//   position -= 100 / count; // сдвигаем на ширину одного элемента
//   if (Math.abs(position) >= 50 * (listElems.length - 1)) {
//     position = 0; // если достигли конца, возвращаемся в начало
//   }
//   list.style.marginLeft = position + "%"; // применяем сдвиг
// }

// // Устанавливаем интервал для автоматического сдвига


let width = window.innerWidth <= 768 ? 100 : 50;
let count = window.innerWidth <= 768 ? 1 : 2;

let list = other_recipes_section.querySelector("ul");
let listElems = other_recipes_section.querySelectorAll("li");
let position = 0;

list.style.transition = "margin-left 0.3s ease";

let intervalTime = 5000;
let autoScrollInterval;

function updateInterval() {
  clearInterval(autoScrollInterval);
  autoScrollInterval = setInterval(moveToNext, intervalTime);
}

function moveToNext() {
  position -= 100 / count;
  if (Math.abs(position) >= width * (listElems.length - count)) {
    position = 0;
  }
  updatePosition();
}

function moveToPrev() {
  position += 100 / count;
  if (position > 0) {
    position = -width * (listElems.length - count);
  }
  updatePosition();
}

function updatePosition() {
  list.style.marginLeft = position + "%";
  updateIndicators();
}

function updateIndicators() {
  let activeIndex = Math.abs(position) / (100 / count);
  document.querySelectorAll(".recipe_indicators button").forEach((btn, idx) => {
    btn.classList.toggle("active", idx === activeIndex);
  });
}

document.querySelector(".prev_recipe").onclick = function () {
  clearInterval(autoScrollInterval);
  moveToPrev();
  updateInterval();
};

document.querySelector(".next_recipe").onclick = function () {
  clearInterval(autoScrollInterval);
  moveToNext();
  updateInterval();
};

function createIndicators() {
  let indicators = document.querySelector(".recipe_indicators");
  for (let i = 0; i < listElems.length-1; i++) {
    let btn = document.createElement("button");
    btn.onclick = function () {
      clearInterval(autoScrollInterval);
      position = -i * (100 / count);
      updatePosition();
      updateInterval();
    };
    indicators.appendChild(btn);
  }
}

createIndicators();
updateIndicators();

autoScrollInterval = setInterval(moveToNext, intervalTime);

window.addEventListener("resize", () => {
  count = window.innerWidth <= 768 ? 1 : 2;
  width = window.innerWidth <= 768 ? 100 : 50;
  position = 0;
  updatePosition();
  clearInterval(autoScrollInterval);
  autoScrollInterval = setInterval(moveToNext, intervalTime);
});
