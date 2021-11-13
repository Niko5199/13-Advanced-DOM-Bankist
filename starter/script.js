'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const allSections = document.querySelectorAll('.section');
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const header = document.querySelector('.header');
const h1 = document.querySelector('h1');
const containerLinks = document.querySelector('.nav__links');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const imgTargets = document.querySelectorAll('img[data-src]');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScroll.addEventListener('click', function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: 'smooth' });
});

// De acuerdo a la delegacion de eventos, necesitamos dos pasos
// 1- Agregamos el dectector de eventos a un elemento principal
// comun de todos los elementos que nos interesan
// 2- y luego el eventlistener determine de que elemento se
// origino el evento

containerLinks.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const sect = document.querySelector(e.target.getAttribute('href'));
    sect.scrollIntoView({ behavior: 'smooth' });
  }
});

tabsContainer.addEventListener('click', function (e) {
  // Con el evento sabemos donde ocurrio el click
  const clicked = e.target.closest('.operations__tab');

  // Si nos arroja un valor defectuoso clicked se
  // convertira true por el operador not y eso nos
  // devolvera la funcion asi evitando errores
  if (!clicked) return;

  // con esto podemos eliminar las clases que estan activas
  // en nuestros elementos
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));

  tabsContent.forEach(tab =>
    tab.classList.remove('operations__content--active')
  );

  clicked.classList.toggle('operations__tab--active');
  const dataTab = clicked.getAttribute('data-tab');

  document
    .querySelector(`.operations__content--${dataTab}`)
    .classList.add('operations__content--active');
});

// Animación menu desvanecer
const changedOpacity = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.nav__logo');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', changedOpacity.bind(0.5));
nav.addEventListener('mouseout', changedOpacity.bind(1));

//Sticky navigation

const callback = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const options = {
  threshold: 0,
  borderRadius: '-90px',
};

const navObserver = new IntersectionObserver(callback, options);
navObserver.observe(header);

// Reveal sections
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const optionsSection = {
  root: null,
  threshold: 0.15,
};

const sectionObserver = new IntersectionObserver(revealSection, optionsSection);
allSections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

// Reveal Img of Sections

const callbackImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  //Replace src attribute
  entry.target.src = entry.target.getAttribute('data-src');
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const optionsImg = {
  root: null,
  threshold: 0,
  rootMargin: '200px',
};

const imgObserver = new IntersectionObserver(callbackImg, optionsImg);
imgTargets.forEach(img => imgObserver.observe(img));

//Slider animation

// CLASE 183. Selecting, Creating, and Deleting Elements

// document.document  --> todo el htlm
// console.log(document.documentElement);

// console.log(document.head);
// console.log(document.body);
// console.log(allSections);

// getElementsByTagName este metodo devuelve una coleccion de
// HTML eso tambien nos crea el metodo getElementsByClassName o
// getElementByID

// const buttons = document.getElementsByTagName('button');
// console.log(buttons);

//Crear e insertar elementos
// .insertAdjacentHTML

// const message = document.createElement('div');
// message.classList.add('cookie-message');

// message.textContent = 'We use cookie for improved functionality and analytics';

// message.innerHTML =
//   'We use cookie for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// NOTA prepend basicamente agrega  el elemento "como el primer
// hijo" de este elemento que hace referencia

// NOTA y append editarlo como el ultimo hijo
// Ahora este elemento message como ya pertenece al elemento
// DOM no puede estar en dos lugares al mismo tiempo y al
// momento de usar el append despues de prepend cambiamos
// el lugar donde se encontraba el mensaje en si no inserto
// el mensaje ya que el que lo inserto fue prepend el que lo
// movio de lugar fue el append ahora estos dos metodos
// no solo insertan elementos, si no que tambien cambian de
// posicion el elemento esto se debe a que un elmento
// del DOM es unico, por lo que no puede existir en un lugar
// a la vez

// header.prepend(message);
// header.append(message);

// NOTA Ahora si queremos tener mas de un elemento en el DOM
// simplemente lo clonamos con el metodo cloneNode(), este
// metodo depende de un parametro boolean que siginifica que
// todos los elementos secundarios se copiaran

// header.append(message.cloneNode(true));

//NOTA  Luego hay dos metodos el before y el after que como
// sus nombres dicen:
// before --> Antes de
// after --> Despues

// header.before(message);
// header.after(message);

// Borrar elementos

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
// El elemento remove es nuevo
//     message.remove();
// antes se eliminaba asi
// La propiedad de sólo lectura de parentElement
// devuelve el nodo padre del DOM Element, o null, si
// el nodo no tiene padre o si el padre no es un
// Element DOM .

// elementoPadre = node.parentElement

//     message.parentElement.removeChild(message);
//   });

// CLASE  184. Styles, Attributes and Classes

// Styles

// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// Solo podemos obtener valores siempre y cuando se
// hayan creado dentro html ya que estos estilos se
// crean en la clase del elemento que estamos creando
// ejemplo no podemoos obtener el valor que tiene
// la hoja de estilo style.css ya que no pertenece
// al html

// console.log(message.style.backgroundColor);

// Color esta en style.css entonces no podemos
// acceder a su valor
// console.log(message.style.color);

// Ahora para obtener todas las propiedasdes de ese
// elemento podemos usar el getComputedStyle()

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// // el root en css en js es equivalente al documentElement
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// Atributos
// Los atributos en html, son:
// src
// alt
// class
// id

// En JS podemos acceder a estos atributos y cambiarlos

// const logo = document.querySelector('.nav__logo');
// Esto solo funciona para propiedades estandar del elemento
// que estamos seleccionando en este caso es img

// Con la propiedad alt obtenemos el texto de la imagen
// console.log(logo.alt);

//Tambien podemos establecer estos valores
// logo.alt = 'Beutiful minimalist logo';

// Con la propiedad src obtenemos el source la direccion
// de donde se encuentra la imagen
// console.log(logo.src);

// Con la propiedad className obtenemos el nombre de
// la clase
// console.log(logo.className);

// Ahora si queremos leer el atributos no estandarizados
// de designer del elemento img debemos de ocupar el metodo
// getAttribute()

// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'Bankist');

// console.log(logo.getAttribute('src'));
// console.log(logo.getAttribute('alt'));

// const link = document.querySelector('.twitter-link');

// console.log(link.getAttribute('href'));
// console.log(link.href);

// const btnShow = document.querySelector('.nav__link--btn');

// btnShow.setAttribute('href', 'https://twitter.com/jonasschmedtman');
// btnShow.href = 'https://twitter.com/jonasschmedtman';
// console.log(btnShow.href);
// console.log(btnShow.getAttribute('href'));

// Es un nodo en el árbol del documento
// const html = document.documentElement;
// const body = document.body;

// console.log(body);
// console.log(html.contains(body));
// console.log(html.nodeType);
// console.log(nav.nodeType);

// const firstChild = btnShow.childNodes[0];
// console.log(firstChild.nodeType);

// El operador instanceof verifica si un objeto en
// su cadena de prototipos contiene la propiedad
// prototype de un constructor.

// console.log(btnShow instanceof Node);
// console.log(btnShow instanceof HTMLElement);

// console.log(btnsOpenModal);

// for (const item of Object.entries(nav.children)) {
//   console.log(item);
// }

// const navArr = new Map(Object.entries(nav.children));
// console.log(navArr.get('0'));

// const nav2 = navArr.flatMap(elem => elem);
// console.log(nav2);
// console.log(nav2[1]);

// Data attributes
// console.log(logo.dataset.versionNumber);
// console.log(logo.getAttribute('data-version-number'));

//CLasses

//Tengamos en cuenta que podemos agregar mas clases
// para cada metodo
// logo.classList.add('c', 'k');
// logo.classList.remove();
// logo.classList.contains();
// logo.classList.toggle();

// Ahora podemos agregar las una clase con la propiedad
// pero no usemos esto ya que podemos eliminar las demas
// clases que existian en nuestro elemento

// E:P
// No usar esto
// logo.className = 'josue';

//CLASE 185. Implementing Smooth Scrolling

// btnScroll.addEventListener('click', function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   const headcoords = header.getBoundingClientRect();
//   //El método Element.getBoundingClientRect()
//   //devuelve el tamaño de un elemento y su posición
//   //relativa respecto a la ventana de visualización
//   //(viewport).

//   console.log(s1coords);
//   console.log(headcoords);
//   // console.log(e.target.getBoundingClientRect());
//   // console.log(e.target);

//   // console.log('Current scroll (x/Y)', scrollX, scrollY);

//   // La propiedad de sólo lectura Element.clientHeight
//   // devuelve la altura de un elemento en píxeles,
//   // incluyendo el padding pero no las barras horizontales,
//   // el borde o el margen.

//   // La propiedad Element.clientWidth es cero para elementos
//   // sin CSS o cajas de diseño (layout), en caso contrario
//   // es la anchura interior de un elemento en pixels,
//   // incluyendo la anchura de relleno (padding) pero no
//   // la anchura de la barra de desplazamiento vertical
//   // (si está presente, si está dibujada), el borde o el
//   // margen.

// console.log(
//   'height/width viewport',
//   document.documentElement.clientHeight,
//   document.documentElement.clientWidth
// );

//   // Viejo metodo

//   // const options = {
//   //   left: s1coords.left,
//   //   top: s1coords.top + scrollY,
//   //   behavior: 'smooth',
//   // };
//   // console.log(s1coords.top);
//   // console.log(scrollY);
//   // window.scroll(options);

//   // Nuevo metodo
//   section1.scrollIntoView({ behavior: 'smooth' });
// });

// CLASE 186. Types of Events and Event Handlers

// const alertH1 = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
//   // Este evento se dispara cuando estamos
//   // encima del elemento h1
//   h1.removeEventListener('mouseenter', alertH1);

//   // El método EventTarget.removeEventListener()
//   // remueve del EventTarget un detector de evento
//   // previamente registrado con EventTarget.addEventListener
// };

// h1.addEventListener('mouseenter', function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
//   // Este evento se dispara cuando estamos
//   // encima del elemento h1
// });

// h1.addEventListener('mouseenter', alertH1);

// Esta manera es un poco anticuada y si vez esto
// puedes actualizarlo a addEventListener

// Y hay dos cosas por las cuales addEventListener es
// mejor que la propiedad

// 1- Es que nos permite agregar multiples eventos, al
// mismo tiempo

// 2- Es que podemos eliminar un evento en dado caso, que no
// lo necesitemos

// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
//   // Este evento se dispara cuando estamos
//   // encima del elemento h1
// };

// CLASE  188. Event Propagation: Practice

// random color rgb
// rgb(255,255,255)

// const randomInt = (max, min) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// console.log(randomColor());

// console.log(navLink);

// navLink.forEach(link => {
//   link.addEventListener('click', function (e) {
//     link.style.backgroundColor = randomColor();
//     console.log(e.bubbles);

//     // Event.target
//     // La propiedad target de la interfaz del
//     // event.currentTarget es una referencia al
//     // objeto en el cual se lanzo el evento.

//     console.log('Link', e.target, e.currentTarget);
//     console.log(e.currentTarget === this);

//     // e.stopPropagation();

//     // propagacion
//     // Esta propagación se refiere a si el evento viaja
//     // desde el elemento donde se originó hasta los elementos
//     // padres en orden de anidamiento.
//   });
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('Container', e.target, e.currentTarget);
//   // Burbujear
//   //   Significa que el evento tambien hubiera sucedido
//   //   en todos los elementos principales, y esa es la
//   //   razon por la cual este evento exacto ahora tambien
//   //   esta siendo manejado por el oyente navLinks

//   // Ojo el evento burbuja solo sube desde la posicion donde
//   // lo ejecutamos en este caso fue en el NavLink
// });

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     e.preventDefault();
//     this.style.backgroundColor = randomColor();
//     console.log('Nav', e.target, e.currentTarget);
//   },
//   true
// );

// CLASE 190. DOM Traversing

// Ir hacia abajo seleccionando hijos

// Con esto seleccionamos a los hijos de h1 que tengan la
// clase highlight y si hubiera otro elemeto que compartiera
// la misma clase que ellos no lo seleccionaria ya que no
// pertenece a la lista de hijos de h1 que en este caso estamos
// seleccionando, esto nos devuelve una NodeList

// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);

// Los nodos pueden ser cualquier cosa
// Text
// Elements
// or Comment

// El mas usado para encontrar los elementos
// HTML son los children

// Esta propiedad nos devuelve un arreglo de todos
// los elementos html nos devuelve una
// HTMLCollection

// ahora esto solo funciona con hijos directos del
// elemento
// console.log(h1.children);

// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'white';

// console.log(h1.firstElementChild);

// Yendo hacia arriba seleccionando padres
// la propiedad parentNode nos es lo mismo que childrenNode
// pero con la diferencia que ahora selecciona a los padres de
// h1
// console.log(h1.parentNode);

// console.log(h1.parentElement);

// Con este metodo closest tambien podemos encontrar al
// padre de h1 y nos devuelve el mas cercano seleccionamos
// con el elemento padre mas cercano a nuestro elemento h1
// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// Si estamos buscando el elemento mas cernano al que
// estemos especificando nos devolvera exactamente ese elemento

//  basicamente closest encuentra padres y querySelector
//  encuentra a ninos
// console.log(h1.closest('h1'));

//siblings

// Elementsibling nos devuelve el elemento que esta
// antes y despues del elemento que seleccionamos en este
// caso es h1
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// console.log(h1.parentNode.children);

// [...h1.parentElement.children].forEach(child => {
//   if (child !== h1) child.style.transform = 'scale(0.5)';
// });

// CLASE 191. Building a Tabbed Component

// tabs.forEach(el => el.addEventListener('click', function(){
//   console.log('TAB');
// }))

// CLASE 192. Passing Arguments to Event Handlers

// const changedOpacity = function(e){
//   if(e.target.classList.contains('nav__link')){
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('.nav__logo');

//     siblings.forEach(el => {
//       if(el !== link) el.style.opacity = this
//     })
//     logo.style.opacity = this
//   }
// }

// // nav.addEventListener('mouseover', function(e){changedOpacity(e, 0.5)})

// // nav.addEventListener('mouseout', function(e){changedOpacity(e, 1)})

// // Mejor manera de hacerlo usando el metodo bind
// nav.addEventListener('mouseover',changedOpacity.bind(0.5))
// nav.addEventListener('mouseout',changedOpacity.bind(1))

// CLASE 193. Implementing a Sticky Navigation: The Scroll Event

// El evento scroll no es muy recomendado y debe de evitarse
// Esto es algo malo para el rendimiento de la pagina
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll',function(e){
//   console.log(window.scrollY);
//   if(window.scrollY > 72) nav.classList.add('sticky')
//   else  nav.classList.remove('sticky')
// })

// CLASE 194. A Better Way: The Intersection Observer API

// const callback = function(entries,observer){

//   if(entries.isIntersecting){
//     nav.classList.add('sticky')
//     console.log('se activo callback');
//   }else{
//     nav.classList.remove('sticky')
//     console.log('se activo callback');
//   }
// }

// const obsOptions = {
//   // root:document.querySelector('.header'),
//   threshold: [0,1,0.1]
// };

// const observer = new IntersectionObserver(callback,obsOptions)
// observer.observe(section1);

// CLASE 198. Building a Slider Component:

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  let currentSlide = 0;
  const maxSlide = slides.length - 1;
  const dotContainer = document.querySelector('.dots');

  const gotoSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
    );
  };

  const createDots = function () {
    slides.forEach((_, i) => {
      const string = `<button class="dots__dot" data-slide="${i}"></button>`;
      dotContainer.insertAdjacentHTML('beforeend', string);
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const init = function () {
    gotoSlide(0);
    createDots();
    activateDot(0);
  };

  init();

  const nextSlide = function () {
    if (currentSlide === maxSlide) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    gotoSlide(currentSlide);
    activateDot(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide;
    } else {
      currentSlide--;
    }
    gotoSlide(currentSlide);
    activateDot(currentSlide);
  };

  btnRight.addEventListener('click', nextSlide);

  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    const click = e.target.closest('.dots__dot');
    if (!click) return;
    const dataset = click.dataset.slide;
    gotoSlide(dataset);
    activateDot(dataset);
  });
};

slider();

// CLASE  199. Lifecycle DOM Events

// El DOMcontentLoaded y este evento lo activa el documento
// tan pronto como el HTML se analiza por completo, lo que
// significa que el HTML se ha cargado por completo

// document.addEventListener('DOMContentLoaded', function(e){
//   console.log('HTML parsed and DOM tree built!',e);
// })

// El evento load es disparado por window tan pronto como no
// solo se analiza el HTML, sino tambien se cargan todas las
// imagenes y los recursos externos como los archivos Css,
// basicamente cuando la pagina este completa se ejecuta
// este evento

// window.addEventListener('load',function(e){
//   console.log('Page full loaded ',e);
// })

// window.addEventListener('beforeunload',function(e){
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = ''

// })

//  CLASE 200. Efficient Script Loading: defer and async
