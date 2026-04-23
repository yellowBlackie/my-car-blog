/* «Діалог з користувачем»
   Використовує: змінні, prompt, confirm, умовне розгалуження, цикл. */
function userDialogue() {
    let userName = prompt("Як до вас звертатися?", "Гість");
    
    if (userName === null || userName === "") {
        userName = "Шановний автолюбитель";
    }

    let startSurvey = confirm(`${userName}, бажаєте обрати ідеальний тип кузова через опитування?`);

    if (startSurvey) {
        let budget = 0;
        // Цикл: вимагаємо введення коректного числа
        while (budget <= 0 || isNaN(budget)) {
            budget = prompt("Вкажіть ваш орієнтовний бюджет на авто ($):", "15000");
            if (budget === null) return; // Вихід, якщо натиснуто "Скасувати"
        }

        if (budget < 10000) {
            alert("Радимо звернути увагу на Volkswagen Polo Sedan (вторинний ринок).");
        } else {
            alert("З вашим бюджетом Mazda CX-5 буде чудовим вибором!");
        }
    }
}

/* вивід інформації про розробника
   Параметри: прізвище, ім'я, посада (за замовчуванням). */
function showDeveloper(surname, name, position="Автор та розробник сайту") {
    console.log("=== Дані розробника сторінки ===");
    console.log(`Виконавець: ${name} ${surname}`);
    console.log(`Посада: ${position}`);
    alert(`Розробник: ${name} ${surname}\nПосада: ${position}`);
}

/*Порівняння двох рядків */
function compareCarNames(car1, car2) {
    if (car1.length > car2.length) {
        alert(`Назва "${car1}" довша за "${car2}"`);
    } else if (car2.length > car1.length) {
        alert(`Назва "${car2}" довша за "${car1}"`);
    } else {
        alert("Назви однакової довжини.");
    }
}

/*BOM: Перенаправлення (location) */
function externalRedirect() {
    const check = confirm("Зараз вас буде перенаправлено на AUTO.RIA для перегляду цін. Згодні?");
    if (check) {
        window.location.href = "https://auto.ria.com/";
    }
}

/*DOM: Маніпуляції з вузлами */
function modifyPageDOM() {
    // 1. Пошук елементів
    const mainTitle = document.getElementById("main-header");
    const posts = document.querySelectorAll(".blog-post h3");
    
    // Демонстрація властивостей з ТЗ
    console.log("outerHTML заголовка:", mainTitle.outerHTML);
    if (mainTitle.firstChild) {
        console.log("nodeValue (data):", mainTitle.firstChild.nodeValue);
    }

    //  innerHTML та textContent
    if (posts.length > 0 && !posts[0].innerHTML.includes("Перевірено JS")) {
        console.log("Заголовок першого поста:", posts[0].textContent);
        posts[0].innerHTML += " <small>(Перевірено JS)</small>";
    }

    // replaceWith (заміна існуючого заголовка на новий)
    const oldH2 = document.querySelector(".maintenance-tips h2");
    if (oldH2 && !oldH2.textContent.includes("Оновлені")) {
        const newH2 = document.createElement("h2");
        newH2.textContent = "Короткі поради автомобілістам";
        oldH2.replaceWith(newH2);
    }

    //  Логіка створення та видалення коментаря 
    let userReview = prompt("Введіть текст для нового коментаря:", "Дуже круте авто!");

    if (userReview === null || userReview.trim() === "") {
        return; 
    }

    // createElement
    const footerDiv = document.createElement("div");
    footerDiv.className = "dynamic-review"; 
    footerDiv.style.backgroundColor = "#1a112a";
    footerDiv.style.color = "white";
    footerDiv.style.padding = "15px 20px";
    footerDiv.style.marginTop = "10px";
    footerDiv.style.display = "flex";             
    footerDiv.style.justifyContent = "space-between"; 
    footerDiv.style.alignItems = "center";
    
    // createTextNode
    const nodeText = document.createTextNode(userReview);
    
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Видалити";
    deleteBtn.style.backgroundColor = "#e74c3c"; 
    deleteBtn.style.color = "white";
    deleteBtn.style.border = "none";
    deleteBtn.style.padding = "5px 10px";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.borderRadius = "5px";

    // node.remove()
    deleteBtn.onclick = function() {
        footerDiv.remove();
    };

    // node.append
    footerDiv.append(nodeText);
    footerDiv.append(deleteBtn);
    
    // node.after
    const mainNode = document.querySelector("main");
    mainNode.after(footerDiv);

    // node.prepend
    const tipsBlock = document.querySelector(".maintenance-tips");
    if (!document.querySelector(".auto-update-notice")) {
        const notice = document.createElement("p");
        notice.className = "auto-update-notice";
        notice.textContent = "Важливо: список оновлено автоматично.";
        tipsBlock.prepend(notice);
    }
}

/* Події та обробники*/

// Обробник через атрибут 
// Ці функції викликаються з HTML: onmouseover="imgHighlight(this)" та onmouseout="imgNormal(this)"
function imgHighlight(img) {
    img.style.transform = "scale(1.03)";
    img.style.transition = "0.3s";
}
function imgNormal(img) {
    img.style.transform = "scale(1)";
}

// Обробник через властивість DOM 
const vwTitle = document.getElementById("vw-title");
if (vwTitle) {
    vwTitle.onclick = function() {
        this.style.color = "#e74c3c"; // Робить з'аголовок червоним при кліку
        console.log("Обробник спрацював через властивість onclick");
    };
}

// addEventListener (Кілька обробників на одну подію)
const likeBtn = document.getElementById("like-btn");

function animateLike() { 
    likeBtn.style.transform = "scale(1.1)";
    setTimeout(() => likeBtn.style.transform = "scale(1)", 200);
}
function logLikeMessage() { 
    console.log("Другий обробник: Запис у консоль (Дякуємо за реакцію!)"); 
}

// Призначаємо ОБИДВА обробники на один клік
if (likeBtn) {
    likeBtn.addEventListener("click", animateLike);
    likeBtn.addEventListener("click", logLikeMessage);
}

// Об'єкт-обробник, handleEvent та removeEventListener 
const favBtn = document.getElementById("favorite-btn");

const myEventObject = {
    handleEvent(event) {
        alert("Авто додано в обране.");
        
        // event.currentTarget вказує на елемент, до якого прив'язаний обробник
        console.log("Елемент (currentTarget):", event.currentTarget.tagName);
        
        // Візуально змінюємо кнопку
        event.currentTarget.textContent = "✔ Вже в обраному";
        event.currentTarget.style.backgroundColor = "#95a5a6";
        event.currentTarget.style.cursor = "default";
        
        // Видалення об'єкта після першого спрацювання 
        event.currentTarget.removeEventListener("click", this);
    }
};

// Передаємо цілий об'єкт замість функції
if (favBtn) {
    favBtn.addEventListener("click", myEventObject);
}


/* Делегування подій та Поведінка*/

// Підсвічування списку (Делегування)
const interactiveList = document.getElementById("interactive-list");
if (interactiveList) {
    // Вішаємо ОДИН обробник на весь список <ul>
    interactiveList.onclick = function(event) {
        // event.target - це той конкретний елемент, на який клікнули
        let target = event.target;

        // Перевіряємо, чи клікнули саме на <li> (а не на маркер чи між рядками)
        if (target.tagName === 'LI') {
            // Перемикаємо клас підсвічування
            target.classList.toggle("highlight-item");
        }
    };
}

// Меню з делегуванням та атрибутами data-*

const carMenu = document.getElementById("car-menu");

const menuActions = {
    startEngine() { alert("Врумм! Двигун заведено!"); },
    stopEngine() { alert("Двигун вимкнено."); },
    honk() { alert("БІ-БІП! 🚗"); }
};

if (carMenu) {
    // Прив'язуємо обробник до всього контейнера
    carMenu.onclick = function(event) {
        // Шукаємо атрибут data-method (відповідає data-* у завданні)
        let methodName = event.target.dataset.method;
        if (methodName && menuActions[methodName]) {
            menuActions[methodName](); // Викликаємо метод класу з відповідним іменем
        }
    };
}


// Патерн «Поведінка» (Behavior) 
// Додаємо поведінку всім елементам, які мають атрибут data-counter
document.addEventListener('click', function(event) {
    // Перевіряємо, чи є у елемента, на який клікнули, атрибут data-counter
    if (event.target.dataset.counter !== undefined) {
        // Збільшуємо значення (лічильник)
        event.target.textContent = parseInt(event.target.textContent) + 1; 
    }
});

/* ІНТЕРАКТИВНИЙ ШОУРУМ (mouseover / mouseout / target)*/
const showroom = document.getElementById("showroom-container");
const details = document.getElementById("showroom-details");

if (showroom) {
    showroom.addEventListener("mouseover", function(event) {
        let target = event.target; // На що навели
        let related = event.relatedTarget; // Звідки прийшли

        if (target.tagName === 'IMG') {
            target.style.transform = "scale(1.05)";
            target.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
            
            // Використовуємо дані з атрибута та показуємо шлях курсора для звіту
            details.innerHTML = `<strong>${target.alt}:</strong> ${target.dataset.info}`;
            console.log(`Курсор перейшов з ${related ? related.tagName : 'вікна'} на ${target.tagName}`);
        }
    });

    showroom.addEventListener("mouseout", function(event) {
        let target = event.target;
        if (target.tagName === 'IMG') {
            target.style.transform = "scale(1)";
            target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
            details.textContent = "Поставте курсор на автомобіль, щоб дізнатися деталі";
        }
    });
}

/* ПЕРЕТЯГУВАННЯ НОТАТКИ (Drag-and-Drop) З ОБМЕЖЕННЯМИ*/
const note = document.getElementById("maintenance-note");

if (note) {
    note.onmousedown = function(event) {
        // ЗАХИСТ: Якщо клікнули по зоні редагування тексту — не починаємо перетягування
        if (event.target.closest('[contenteditable="true"]')) {
            return; 
        }

        let shiftX = event.clientX - note.getBoundingClientRect().left;
        let shiftY = event.clientY - note.getBoundingClientRect().top;

        note.style.position = 'absolute';
        note.style.zIndex = 1000;
        document.body.append(note);

        // Функція переміщення з обмеженнями
        function moveAt(pageX, pageY) {
            let newX = pageX - shiftX;
            let newY = pageY - shiftY;

            // Обмеження по горизонталі 
            // Беремо ширину вікна мінус ширину самої нотатки
            let maxX = document.documentElement.clientWidth - note.offsetWidth;
            if (newX < 0) newX = 0;           // Не пускаємо за лівий край
            if (newX > maxX) newX = maxX;     // Не пускаємо за правий край

            // Обмеження по вертикалі 
            // Беремо повну висоту документа мінус висоту самої нотатки
            let maxY = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - note.offsetHeight;
            if (newY < 0) newY = 0;           // Не пускаємо за верхній край
            if (newY > maxY) newY = maxY;     // Не пускаємо за нижній край

            // Застосовуємо вирахувані координати
            note.style.left = newX + 'px';
            note.style.top = newY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        document.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            document.onmouseup = null;
        };
    };

    note.ondragstart = function() { return false; };
}