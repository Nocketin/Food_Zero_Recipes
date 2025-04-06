// let width = 50; // ширина картинки
if (window.innerWidth <= 768) {
  count = 1; // для мобильных устройств показываем 1 элемент
  width = 100;
} else {
  count = 2; // для десктопа показываем 2 элемента
  width = 50;
}

let intervalTime = 5000; // время задержки между сдвигами (в миллисекундах)
let autoScrollInterval; // Переменная для хранения ID интервала

let list = other_recipes_section.querySelector("ul");
let listElems = other_recipes_section.querySelectorAll("li");

let position = 0; // положение ленты прокрутки
list.style.transition = "margin-left 0.3s ease"; // плавный переход

function updateInterval() {
  clearInterval(autoScrollInterval); // Останавливаем текущий интервал
  autoScrollInterval = setInterval(moveToNext, intervalTime); // Устанавливаем новый интервал
}

autoScrollInterval = setInterval(moveToNext, intervalTime);


other_recipes_section.querySelectorAll(".prev_recipe, .prev_recipe_phone").forEach(function(button) {
    button.onclick = function () {
      clearInterval(autoScrollInterval); // Останавливаем текущий интервал
      updateInterval(); // Обновляем интервал
      
      // сдвиг влево
      position += 100 / count;
      if (position > 0) {
        position = -width * (listElems.length - 2); // если достигли конца, возвращаемся в начало
      }
      // последнее передвижение влево
      position = Math.min(position, 0);
      list.style.marginLeft = position + "%";
    };
  });

// other_recipes_section.querySelector(
//   ".next_recipe, .next_recipe_phone"
// ).onclick = function () {
//   clearInterval(autoScrollInterval); // Останавливаем текущий интервал
//   updateInterval(); // Обновляем интервал
  
//   position -= 100 / count;
//   if (Math.abs(position) >= width * (listElems.length - 1)) {
//     position = 0; // если достигли конца, возвращаемся в начало
//   }
//   // последнее передвижение вправо
//   position = Math.max(position, -width * (listElems.length - 2));
//   list.style.marginLeft = position + "%";
// };

other_recipes_section.querySelectorAll(".next_recipe, .next_recipe_phone").forEach(function(button) {
    button.onclick = function () {
      clearInterval(autoScrollInterval); // Останавливаем текущий интервал
      updateInterval(); // Обновляем интервал
  
      // Сдвиг вправо
      position -= 100 / count;
      if (Math.abs(position) >= width * (listElems.length - 1)) {
        position = 0; // если достигли конца, возвращаемся в начало
      }
      // последнее передвижение вправо
      position = Math.max(position, -width * (listElems.length - 2));
      list.style.marginLeft = position + "%";
    };
  });

// Функция для автоматической прокрутки вправо
function moveToNext() {
  position -= 100 / count; // сдвигаем на ширину одного элемента
  if (Math.abs(position) >= 50 * (listElems.length - 1)) {
    position = 0; // если достигли конца, возвращаемся в начало
  }
  list.style.marginLeft = position + "%"; // применяем сдвиг
}

// Устанавливаем интервал для автоматического сдвига
