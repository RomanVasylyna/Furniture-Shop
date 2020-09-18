$(document).ready(() => {

let counter = 0;
let localArr = [];


generateColumns(3, '.appendRow');
generateColumns(13, '.appendItems');

newTab();
addContent();


// Using JQuery to add Event Listeners
//Open Cart
$('#logoCart').on('click', (e) => {
$('#darkModal').removeClass('d-none');
})


// Cart
//Adding Item to Cart
$('.brownCircle .fa-shopping-cart, .addToCart').on('click', (e) => {
  let image = e.target.closest('.displayNone').firstElementChild.getAttribute('src');
  let display = '';

  //Add One Item to Cart
  $.each(productsArr(), (i, e) => {
  if(e.img == image) {
  localArr.push(e); //Add Object to Local Storage
  //Add element to Cart
  display += `
  <div class="d-flex flex-row pt-5 pl-4" id="appendItem">
  <img src="${e.img}" alt="" class="img-fluid mr-3 ml-3" style="width:15%; height: 50px;object-fit: cover;"/>
  <div class="d-flex flex-column">
  <p style="color:hsl(210,22%,49%)">${e.name}</p>
  <p style="color:hsl(210,22%,49%); font-weight: bold;margin-top: -20px;">${e.price}</p>
  <a href="#" style="color:hsl(210,22%,49%);text-decoration:none;margin-top: -20px;">remove</a>
  </div>
  <div class="d-flex flex-column" style="position:absolute;left:80%;">
  <a href="#" style="text-decoration:none;color:rgb(195, 96, 24);" class="arrowUp">&#129129;</a>
  <span class="quantitySpan">1</span>
  <a href="#" style="text-decoration:none;color:rgb(195, 96, 24);" style="position:absolute;left:80%;" class="arrowDown">&#129131;</a>
  </div>
  </div>
  `;
  $('.totalPrice').text(e.price);
  }
  })

  //Add Object to Local Storage + Check For No Repeats
  localStorage.setItem('Cart', JSON.stringify(localArr));
  removeObjRepeat();

  //Forbid Adding New Elements if there is one in cart
  checkExistence();

  //Add Content
  $('.cartCircle').text(++counter);
  $('#cartItem').append(display);



  //Div with item is already created here
  console.log($('#appendItem').find('img').attr('src'));
  //console.log(checkExistence());

  //Adding Event To Arrow Elems
  //Arrow Up
  $('.arrowUp').on('click', (e) => {
  e.preventDefault();
  e.closest('.quantitySpan').text(2);
  })

  //Arrow Down
  $('.arrowDown').on('click', (e) => {
  e.preventDefault();
  alert('penis');
  })

  $('#darkModal').removeClass('d-none');
})

//console.log(checkExistence());


//Check for repeats
function checkExistence() {
let arr = JSON.parse(localStorage.getItem('Cart'));
let item = $('#appendItem').find('img').attr('src');
arr.forEach((e) => {
if(item == e.img) {
$('.quantitySpan').text(2);
}
})
}



//Removing Repeats From Local Storage
function removeObjRepeat() {
  let arr = JSON.parse(localStorage.getItem('Cart'));
  const uniqueObject = [...new Map(arr.map(item => [item.name, item])).values()];
  localStorage.setItem('Cart', JSON.stringify(uniqueObject));
}




//Close Cart
$('.closeSidebar').on('click', (e) => {
$('#darkModal').addClass('d-none');
})

//On Input Range Event
$('.rangeInput').on('change', (e) => {
//alert(e.target.value);
$('.appendItems').empty();
priceRange(e.target.value);
})


//Input With Price Range Sorting
function priceRange(inputValue) {

$('#productValue').text('$' + inputValue);

let output = '';
let price = parseInt($('.rangeInput').val());
$.each(productsArr(),(i, product) => {
let productPrice = product.price.substr(1,);
if(price > parseInt(productPrice)) {
  output += `
  <div class="col-lg-4">

  <div class="displayNone">
  <img src="${product.img}" alt="" class="img-fluid">
  <div class="d-none flex-row circleRow">

    <div class="brownCircle">
      <i class="fa fa-search ${product.price}" aria-hidden="true"></i>
    </div>

    <div class="brownCircle">
  <i class="fa fa-shopping-cart" aria-hidden="true"></i>
    </div>
  </div>
    </div>

  <p class="mt-2 description">${product.name}</p>
  <p class="price"><strong>${product.price}</strong></p>

  </div>
  `;

} else if(parseInt($('.rangeInput').val()) <= 6) {
  $('.appendItems').empty();
  $('.appendItems').append('<div class="col-12 mt-5 pt-5"><h1 class="text-center">Sorry, No Products Matched Your Search</h1></div>');
}
})
$('.appendItems').append(output);
showElems();
newTab();
addContent();
}


//Open Single Product Page
function newTab() {
$('.brownCircle .fa-search').on('click', (e) => {
let classes = e.target.classList[2];
$.each(productsArr(), (i, e) => {
if(e.price == classes) {
localStorage.setItem('Clicked', JSON.stringify(e));
}
})
location.href='single_product.html';
})
}


// Sorting Elements By Brand
$('.productBrand').on('click', (e) => {
if(e.target.innerHTML == 'All') {
$('.appendItems').empty();
generateColumns(13, '.appendItems');
} if(e.target.innerHTML == 'Liddy') {
$('.appendItems').empty();
sortByBrand('By Liddy');
} if(e.target.innerHTML == 'Caressa') {
$('.appendItems').empty();
sortByBrand('By Caressa');
} if(e.target.innerHTML == 'Marcos') {
$('.appendItems').empty();
sortByBrand('By Marcos');
} if(e.target.innerHTML == 'Ikea') {
$('.appendItems').empty();
sortByBrand('By Ikea');
}
})


// Sorting Elements By Brand
function sortByBrand(brand) {
  let output = '';
  $.each(productsArr(),(i, product) => {
  if(product.produced == brand) {
    output += `
    <div class="col-lg-4">

    <div class="displayNone">
    <img src="${product.img}" alt="" class="img-fluid">
    <div class="d-none flex-row circleRow">

      <div class="brownCircle">
        <i class="fa fa-search ${product.price}" aria-hidden="true"></i>
      </div>

      <div class="brownCircle">
    <i class="fa fa-shopping-cart" aria-hidden="true"></i>
      </div>
    </div>
      </div>

    <p class="mt-2 description">${product.name}</p>
    <p class="price"><strong>${product.price}</strong></p>

    </div>
    `;
  }
  })
  $('.appendItems').append(output);
  showElems();
  newTab();
  addContent();
}



//Generate Three First Columns
function generateColumns(counter, parent) {
let output = '';
$.each(productsArr(),(i, product) => {
if(i < counter) {
  output += `
  <div class="col-lg-4">

  <div class="displayNone">
  <img src="${product.img}" alt="" class="img-fluid">
  <div class="d-none flex-row circleRow">

    <div class="brownCircle">
      <i class="fa fa-search ${product.price}" aria-hidden="true"></i>
    </div>

    <div class="brownCircle">
  <i class="fa fa-shopping-cart" aria-hidden="true"></i>
    </div>
  </div>
    </div>

  <p class="mt-2 description">${product.name}</p>
  <p class="price"><strong>${product.price}</strong></p>

  </div>
  `;
}
})
$(parent).append(output);
showElems();
newTab();
addContent();
}


//Add Content to Single Product Page
function addContent() {
  let item = [];
  item.push(JSON.parse(localStorage.getItem('Clicked')));
    $.each(item, (i, e) => {
      $('.category').text(e.name);
      $('.productImg').attr('src', e.img);
      $('.productName').text(e.name);
      $('.productProduced').text(e.produced);
      $('.productPrice').text(e.price);
      $('.firstColor').css('background', e.firstColor);
      $('.secondColor').css('background', e.secondColor);
      $('.thirdColor').css('background', e.thirdColor);
    });
}


//Product Objects Arr
function productsArr() {
let arr = [

  {
    name : 'High-Back Bench',
    produced : 'By Ikea',
    img : 'img/one.jpeg',
    firstColor : 'rgb(195, 96, 24)',
    secondColor : 'black',
    price : '$9.99'
  },

  {
    name : 'Utopia Sofa',
    produced : 'By Marcos',
    img : 'img/two.jpeg',
    firstColor : 'rgb(43, 251, 20)',
    secondColor : 'rgb(0, 23, 255)',
    price : '$39.95'
  },

  {
    name : 'Entertainment Center',
    produced : 'By Liddy',
    img : 'img/three.jpeg',
    firstColor : 'red',
    secondColor : 'green',
    price : '$29.98'
  },

  {
    name : 'Albany Table',
    produced : 'By Marcos',
    img : 'img/four.jpeg',
    firstColor : 'brown',
    secondColor : 'black',
    price : '$79.99'
  },

  {
    name : 'Accent Chair',
    produced : 'By Caressa',
    img : 'img/five.jpeg',
    firstColor : 'brown',
    secondColor : 'blue',
    thirdColor : 'orange',
    price : '$25.99'
  },

  {
    name : 'Wooden Table',
    produced : 'By Caressa',
    img : 'img/six.jpeg',
    firstColor : 'red',
    secondColor : 'blue',
    price : '$45.99'
  },

  {
    name : 'Dining Table',
    produced : 'By Caressa',
    img : 'img/seven.jpeg',
    firstColor : 'red',
    secondColor : 'orange',
    price : '$6.99'
  },

  {
    name : 'Sofa Set',
    produced : 'By Liddy',
    img : 'img/eight.jpeg',
    firstColor : 'blue',
    price : '$69.99'
  },

  {
    name : 'Modern Bookshelf',
    produced : 'By Marcos',
    img : 'img/nine.jpeg',
    firstColor : 'green',
    secondColor : 'orange',
    thirdColor : 'red',
    price : '$8.99'
  },

  {
    name : 'Emperor Bed',
    produced : 'By Liddy',
    img : 'img/ten.jpeg',
    firstColor : 'orange',
    price : '$21.99'
  },

  {
    name : 'Albany Sectional',
    produced : 'By Ikea',
    img : 'img/eleven.jpeg',
    firstColor : 'green',
    secondColor : 'red',
    price : '$10.99'
  },

  {
    name : 'Leather Sofa',
    produced : 'By Liddy',
    img : 'img/twelve.jpeg',
    firstColor : 'black',
    price : '$9.99'
  },


];

return arr;
}



//Hide/Display Elements on Hover
function showElems() {
let elemTarget = $('.displayNone');
let hideTarget = $('.circleRow');

for(let i = 0; i < elemTarget.length; i++) {
elemTarget[i].addEventListener('mouseover', function() {
hideTarget[i].classList.remove('d-none');
hideTarget[i].classList.add('d-flex');
})
}

for(let i = 0; i < elemTarget.length; i++) {
elemTarget[i].addEventListener('mouseout', function() {
hideTarget[i].classList.add('d-none');
hideTarget[i].classList.remove('d-flex');
})
}











}



















})
