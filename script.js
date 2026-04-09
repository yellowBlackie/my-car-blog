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
function showDeveloper(surname, name, position = "Автоексперт та розробник") {
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
        newH2.textContent = "Оновлені короткі поради автомобілістам";
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