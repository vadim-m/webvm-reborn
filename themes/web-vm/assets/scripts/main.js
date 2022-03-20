$(function () {
  /* CONST */
  // кнопка вверх
  const arrowUp = $("#arrow-up");
  // получение текущей высоты с учетом прокрутки
  let scrollOfFset = $(window).scrollTop();

  /* RUNNING FUNC запущенные сразу функции */
  checkScroll(scrollOfFset);

  /* SMOOTH SCROLL */
  // в html необходимо добавить в каждый элемент навигации data-атрибут: data-scroll,
  // значением которого будет айди нужной секции.
  //  $('[data-scroll]') --> выбрать элементы с атрибутом data-scroll! Просто селектор.
  $("[data-scroll]").on("click", function (event) {
    event.preventDefault();

    // получаем значение атрибута (т.е '#id'), по которому кликнули
    const blockId = $(this).data("scroll");
    // получаем значение отсутпа от верха страницы элемента с нужным айди
    const blockOffset = $(blockId).offset().top;

    // реализация самого перехода к нужной секции при помощи jquerry - animate().
    $("html, body").animate(
      {
        scrollTop: blockOffset - 35,
      },
      600
    );

    // удаление классов active после нажатия нужного пункта навигации - для мобилок
    $("#nav").toggleClass("active");
    $("#burger-menu").toggleClass("active");
  });

  // функция, которая проверяет величину скролла для выдачи класса (видимости) кнопке.
  // её запускаем сразу при загрузки скрипта (11 строка), чтобы если нажал F5
  // проверка прошла с текущей высоты, без события скролл.
  function checkScroll(scrollOfFset) {
    if (scrollOfFset >= 650) {
      arrowUp.addClass("arrow__up--active");
    } else {
      arrowUp.removeClass("arrow__up--active");
    }
  }

  // при скролле страницы обновляем величину скролла в функции checkScroll
  $(window).on("scroll", function () {
    scrollOfFset = $(this).scrollTop();

    checkScroll(scrollOfFset);
  });

  /* СТРЕЛКА НАВЕРХ поднимаем скролл в начало */
  $(arrowUp).on("click", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      600
    );
  });

  /* ОТКРЫТИЕ ИЗОБРАЖЕНИЙ НА ВЕСЬ ЭКРАН */
  /* ОТКРЫТИЕ ИЗОБРАЖЕНИЙ НА ВЕСЬ ЭКРАН */
  // при клике по картинке, которая обернута в тег Р сначала убираем display:none с подложки,
  // добавляя активный класс ей, чтобы она открылась на весь экран.
  // Затем из события event берем src картинки, по которой был клик, и передаем
  // его в src картинки из скрытого блока.

  let src;

  // слушатели на клик по всем картинкам в посте
  $(".post p img").on("click", function (event) {
    event.preventDefault();

    src = event.target.src;
    setImgSrc(src);
  });

  // слушатель на клик по кнопке Закрыть
  $("#closeImgBtn").on("click", function (event) {
    event.preventDefault();
    toggleClassImg();
    document.body.style.overflow = "visible";
  });

  // слушатель на клик по кнопке Открыть в новом окне
  $("#openImgBtn").on("click", function () {
    window.open(src, "_blank");
    // console.log(src);
  });

  // слушатель по клику по серой подложке, чтобы убрать картинку на весь экран
  $("#openImgBackdrop").on("click", function (event) {
    if (event.target.id === "openImgBackdrop") {
      toggleClassImg();
      document.body.style.overflow = "visible";
    }
  });

  // функция по замене пути для картинки, кот. нужно показать на весь экран
  function setImgSrc(src) {
    $("#openImgPic").attr("src", src);

    toggleClassImg();
  }

  // функция переключения класса active у подложки
  function toggleClassImg() {
    $("#openImgBackdrop").toggleClass("active");
    document.body.style.overflow = "hidden";
  }

  /* Кнопка поиска SEARCH */
  /* Кнопка поиска SEARCH */
  $("#search").on("click", function (event) {
    event.preventDefault();

    if ($("#nav").hasClass("active") && $(".form-inline").hasClass("active")) {
      $("#nav").removeClass("active");
      $(".form-inline").removeClass("active");
      $("#burger-menu").removeClass("active");
      $("#search").toggleClass("active");
      $("body").removeClass("no-scroll");
    } else if ($("#nav").hasClass("active")) {
      $(".form-inline").toggleClass("active");
      $("#search").toggleClass("active");
      $("body").toggleClass("no-scroll");
    } else {
      $(".form-inline").toggleClass("active");
      $("#search").toggleClass("active");
      $("#burger-menu").toggleClass("active");
      $("#nav").toggleClass("active");
      $("body").toggleClass("no-scroll");
    }
  });

  /* BURGER MENU */
  /* BURGER MENU */
  // добавление/удаление классов active после нажатия на бургер меню
  $("#burger-menu").on("click", function (event) {
    event.preventDefault();

    if ($("#burger-menu").hasClass("active")) {
      $("#nav").removeClass("active");
      $("#burger-menu").removeClass("active");
      $(".form-inline").removeClass("active");
      $("#search").removeClass("active");
      $("body").toggleClass("no-scroll");
    } else {
      $("#burger-menu").addClass("active");
      $("#nav").addClass("active");
    }
  });

  /* СМЕНА ЦВЕТОВОЙ СХЕМЫ */
  /* СМЕНА ЦВЕТОВОЙ СХЕМЫ */
  const toggleThemeBtn = document.querySelector("#toggle-theme-btn");

  function initialState() {
    if (!localStorage.theme) {
      localStorage.theme = "light-theme";
    }
    document.documentElement.className = localStorage.theme;
  }

  initialState();

  function changeTheme(themeName) {
    document.documentElement.className = themeName;
    localStorage.theme = themeName;
  }

  function toggleTheme() {
    if (localStorage.getItem("theme") == "dark-theme") {
      changeTheme("light-theme");
    } else {
      changeTheme("dark-theme");
    }
  }

  toggleThemeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleTheme();
  });
});
