'use strict';

window.addEventListener('DOMContentLoaded', function(){
    let arrCards = JSON.parse(dataJSON);

    let heroСard = '';

    for (let card of arrCards ) {
        heroСard += `<div class="card-hero">
                        <div class="card-hero_descr">
                            <h1 class="card-hero_name">${card.name}</h1>
                            <p class="card-hero_universe"><span>Вселенная:</span> ${card.universe}</p>
                            <p class="card-hero_alterego"><span>Альтер эго:</span> ${card.alterego}</p>
                            <p class="card-hero_occupation"><span>Род деятельности:</span> ${card.occupation}</p>
                            <p class="card-hero_friends"><span>Друзья:</span> ${card.friends}</p>
                            <p class="card-hero_superpowers"><span>Суперсилы:</span> ${card.superpowers}</p>
                        </div>
                        <div class="card-hero_img">
                            <img src="${card.url}" alt="${card.name}" class="card_img">
                        </div>
                        <div class="card-hero_stars">
                                <svg class="c_icon" width="32" height="32" >
                                <use class="star  starOne" href="#star"></use>
                                </svg> 
 
                                <svg class=" c_icon" width="32" height="32" >
                                <use class="star starTwo" href="#star"></use>
                                </svg> 
  
                                <svg class=" c_icon" width="32" height="32" >
                                <use class="star starThree" href="#star"></use>
                                </svg> 
                                <svg class=" c_icon" width="32" height="32" >
                                <use class="star starFour" href="#star"></use>
                                </svg> 
                            
                                <svg class=" c_icon" width="32" height="32">
                                <use class="star starFive" href="#star"></use>
                                </svg> 
                        </div>
                            <img src="icon/click2.png" alt="click" id="click" class="img_click">
                            <p class="click">Click!</p>
                         
                            <div class="popup">
                                <div class="popup-close">&times;
                                </div>
                                <h2><span>Информация:</span></h2>
                                <p class="popup-info">	
                                    ${card.info}
                                </p>
                            </div>  
                    </div>`  

    }
    document.getElementById('cardsContainer').innerHTML = heroСard;

//Проверяем есть ли настройка светлая/темная тема сайта в localStorage и устанавливаем ее

    const subject = localStorage.getItem('subject');

    if (subject == null || subject == 'white'){
        changreBGToWhith();
    }else if (subject == 'dark'){
        changreBGToBlaack();
    }

//Звездный рейтинг. В массив заносятся данные о том, какие звезды выбраны у героев. В массиве 5 объектов. 1 Массив собирает данные по нажатым первым звездам со всех героев, 2 Массив по второым звездам всех героев и тд. В Массивах ключ "0" соовтетсвует первому герою в списке -Бетмен, "9"-последнему герою в списке - Дэдпул
    const  arrRating = [
        [],
        [],
        [],
        [],
        []
    ];

//Коллекции звезд в рейтинге. 
    const arrOneStars = document.querySelectorAll('.starOne'),   // Коллекция первых звезд всех героев
          arrTwoStars = document.querySelectorAll('.starTwo'),
          arrThreeStars = document.querySelectorAll('.starThree'),
          arrFourStars = document.querySelectorAll('.starFour'),
          arrFiveStars = document.querySelectorAll('.starFive');  // Коллекция пятых звезд всех героев

//Функция достает изменения в рейтинге из localStorage при загрузке страницы
    const newRatingFromJson = JSON.parse(localStorage.getItem("arrRating"));

        if (newRatingFromJson != null){
            newRatingFromJson.forEach(function(){

                for(let i = 0; i < newRatingFromJson[0].length; i++) {
                    if(newRatingFromJson[0][i] === true ) {
                        arrOneStars[i].parentNode.classList.add('c_active');
                        arrRating[0][i] = true;
                    }
                }
                for(let i = 0; i < newRatingFromJson[1].length; i++) {
                    if(newRatingFromJson[1][i] === true ) {
                        arrTwoStars[i].parentNode.classList.add('c_active');
                        arrRating[1][i] = true;
                    }
                }
                for(let i = 0; i < newRatingFromJson[2].length; i++) {
                    if(newRatingFromJson[2][i] === true ) {
                        arrThreeStars[i].parentNode.classList.add('c_active');
                        arrRating[2][i] = true;
                    }
                }
                for(let i = 0; i < newRatingFromJson[3].length; i++) {
                    if(newRatingFromJson[3][i] === true ) {
                        arrFourStars[i].parentNode.classList.add('c_active');
                        arrRating[3][i] = true;
                    }
                }
                for(let i = 0; i < newRatingFromJson[4].length; i++) {
                    if(newRatingFromJson[4][i] === true ) {
                        arrFiveStars[i].parentNode.classList.add('c_active');
                        arrRating[4][i] = true;
                    }
                }         
            })  
        }

        

//Функция записывает изменения в рейтинге в localStorage, будет вызвана позже..
    function setLocalStorage(){
        let serializedArrRating = JSON.stringify(arrRating);
        localStorage.setItem("arrRating", serializedArrRating );
    };


  
// Собираю информацию о нажатых звездах, при каждом нажатии на звезду, данные записываются в массив arrRating и передаются в localStorage  с помощью функции setLocalStorage()

    const divsStars = document.querySelectorAll('.card-hero_stars'); // родители звезд -div-ы, в которые обернуты звезды

        divsStars.forEach(function(item){
            item.addEventListener('click', function(event){
                let target = event.target;
                if (target &&  target.classList.contains('star') && target.parentNode.classList.contains('c_active')) { //Горящие звезды перестают гореть при клике
                    
                        for(let i = 0; i < arrOneStars.length; i++) {
                            if(target == arrOneStars[i]) {
            
                                arrOneStars[i].parentNode.classList.remove('c_active');
                                arrRating[0][i] = false;
                                setLocalStorage();
                            }
                        }
                        for(let i = 0; i < arrTwoStars.length; i++) {
                            if(target == arrOneStars[i]) {
            
                                arrTwoStars[i].parentNode.classList.remove('c_active');
                                arrRating[1][i] = false;
                                setLocalStorage();
                            }
                        }
                        for(let i = 0; i < arrThreeStars.length; i++) {
                            if(target == arrOneStars[i] || target == arrTwoStars[i]) {
            
                                arrThreeStars[i].parentNode.classList.remove('c_active');
                                arrRating[2][i] = false;
                                setLocalStorage();
                            }
                        }
                        for(let i = 0; i < arrFourStars.length; i++) {
                            if(target == arrOneStars[i] || target == arrTwoStars[i] || target == arrThreeStars[i] ) {
            
                                arrFourStars[i].parentNode.classList.remove('c_active');
                                arrRating[3][i] = false;
                                setLocalStorage();
                            }   
                        }
                        for(let i = 0; i < arrFiveStars.length; i++) {
                            if(target == arrOneStars[i] || target == arrTwoStars[i] || target == arrThreeStars[i] || target == arrFourStars[i]) {
            
                                arrFiveStars[i].parentNode.classList.remove('c_active');
                                arrRating[4][i] = false;
                                setLocalStorage();
                            }    
                        }
                } else if (target &&  target.classList.contains('star')) { //Звезды загораются при  клике
        
                    for(let i = 0; i < arrOneStars.length; i++) {
                        if(target == arrOneStars[i] || target == arrTwoStars[i] || target == arrThreeStars[i] || target == arrFourStars[i] || target == arrFiveStars[i] ) {

                            arrOneStars[i].parentNode.classList.add('c_active');
                            arrRating[0][i] = true;
                            setLocalStorage();
                        }
                    }
                    for(let i = 0; i < arrTwoStars.length; i++) {
                        if( target == arrTwoStars[i] || target == arrThreeStars[i] || target == arrFourStars[i] || target == arrFiveStars[i]) {

                            arrTwoStars[i].parentNode.classList.add('c_active');
                            arrRating[1][i] = true;
                            setLocalStorage();
                        }
                    }
                    for(let i = 0; i < arrThreeStars.length; i++) {
                        if( target == arrThreeStars[i] || target == arrFourStars[i] || target == arrFiveStars[i]) {

                            arrThreeStars[i].parentNode.classList.add('c_active');
                            arrRating[2][i] = true;
                            setLocalStorage();
                        }    
                    }
                    for(let i = 0; i < arrFourStars.length; i++) {
                        if( target == arrFourStars[i] || target == arrFiveStars[i]) {

                            arrFourStars[i].parentNode.classList.add('c_active');
                            arrRating[3][i] = true;
                            setLocalStorage();
                        }    
                    }
                    for(let i = 0; i < arrFiveStars.length; i++) {
                        if( target == arrFiveStars[i] ) {

                            arrFiveStars[i].parentNode.classList.add('c_active');
                            arrRating[4][i] = true;
                            setLocalStorage();
                        }  
                    }
                }
            });
           

    });

//Модальные окна и информация о героях

    const btnsClick = document.querySelectorAll('.click'),// Коллекция кнопок Click
        modals = document.querySelectorAll('.popup'),  //Коллекция модальных окон, при клике на любое место в модальном окне-оно закрывается 
        btnsClose = document.querySelectorAll('.popup-close'), // Коллекция крестиков внутри модальных окон
        imgHeros = document.querySelectorAll('.card_img'),// Коллекция картинок героев, при клике на картинку также открывается модальное окно
        imgClicks = document.querySelectorAll('.img_click'); //Коллекция картинок Взрыв
       

    btnsClick.forEach(function(item, i){

        item.addEventListener('click', function(){

            modals[i].style.visibility = 'visible'; // Появляется модальное окно при клике на Click!
            modals[i].style.opacity = '1';
            modals[i].style.scale = '1';

        });
    });
    imgHeros.forEach(function(item, i){

        item.addEventListener('click', function(){

            modals[i].style.visibility = 'visible'; // Появляется модальное окно при клике на картинку Героя
            modals[i].style.opacity = '1';
            modals[i].style.scale = '1';

        });
    });
    imgClicks.forEach(function(item, i){

        item.addEventListener('click', function(){

            modals[i].style.visibility = 'visible'; // Появляется модальное окно при клике на картинку Взрыв
            modals[i].style.opacity = '1';
            modals[i].style.scale = '1';

        });
    });
    btnsClose.forEach(function(item, i){

        item.addEventListener('click', function(){

            modals[i].style.opacity = '0';
            modals[i].style.scale = '0';
            modals[i].style.visibility = 'hidden'; // Уходит модальное окно при клике на крестик
        
        });
    });
    modals.forEach(function(item, i){

        item.addEventListener('click', function(){

            modals[i].style.opacity = '0';
            modals[i].style.scale = '0';
            modals[i].style.visibility = 'hidden'; // Уходит модальное окно при клике по экрану
        
        });
    });
    



//Переключение темы: темная светлая

let container = document.body;
let svg = document.getElementById("svg-animation");
let icon = document.querySelector(".icon");
let cardsHero = document.querySelectorAll(".card-hero");

icon.addEventListener('click', function () {
    if (container.classList.contains("white")) {
      svg.firstChild.remove();
      changreBGToBlaack();
      localStorage.setItem('subject', 'dark');

    } else {
      svg.firstChild.remove();
      changreBGToWhith();
      localStorage.setItem('subject', 'white');
    }
  } 
);

function changreBGToWhith() {
  bodymovin.loadAnimation({
    wrapper: document.getElementById("svg-animation"),
    animType: "svg",
    loop: false,
    path: "https://raw.githubusercontent.com/Abdallah-Mohamed-Sayed/some-files/main/toSun",
  });
  setTimeout(() => {
    container.classList.add("white");
    container.classList.remove("black");
    btnsClick.forEach((item) => item.classList.add('click_black'));
    cardsHero.forEach((item) => item.classList.remove('card-hero_black'));
    modals.forEach((item) => item.classList.remove('popup_black'));
    icon.classList.remove("icon_black");
  }, 276);
}

function changreBGToBlaack() {
  bodymovin.loadAnimation({
    wrapper: document.getElementById("svg-animation"),
    animType: "svg",
    loop: false,
    path: "https://raw.githubusercontent.com/Abdallah-Mohamed-Sayed/some-files/main/toMoon",
  });
  setTimeout(() => {
    container.classList.add("black");
    container.classList.remove("white");
    btnsClick.forEach((item) => item.classList.add('click_black'));
    cardsHero.forEach((item) => item.classList.add('card-hero_black'));
    modals.forEach((item) => item.classList.add('popup_black'));
    icon.classList.add("icon_black");
  }, 276);
}

 
});