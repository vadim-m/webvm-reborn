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

    // проверка! если значение search то прокрутка не нужна, только добавить класс форме
    if (blockId == "#search") {
      $(".form-inline").toggleClass("active");
      // иначе находим отступ и прокручиваем
    } else {
      // получаем значение отсутпа от верха страницы элемента с нужным айди
      const blockOffset = $(blockId).offset().top;

      // реализация самого перехода к нужной секции при помощи jquerry - animate().
      $("html, body").animate(
        {
          scrollTop: blockOffset - 35,
        },
        600
      );
    }

    // меняем класс active у выбранного nav-link элемента и удаляем у соседних
    $(event.currentTarget).addClass("active");
    $(event.currentTarget).siblings().removeClass("active");

    // удаление классов active после нажатия нужного пункта навигации - для мобилок
    $("#nav").toggleClass("active");
    $("#burger-menu").toggleClass("active");
  });

  /* BURGER MENU */
  // добавление/удаление классов active после нажатия на бургер меню
  $("#burger-menu").on("click", function (event) {
    event.preventDefault();

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
  $("#closeImgBtn").on("click", function () {
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

  // СМЕНА ЦВЕТОВОЙ СХЕМЫ
  const toggleThemeBtn = document.querySelector("#toggleThemeBtn");

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
