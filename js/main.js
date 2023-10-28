let rowData=document.querySelector('.rowData');
let navbarMenu=document.querySelectorAll('.navbar-menu');
let productTitle= document.querySelector('.productTitle');
let productPrice=document.querySelector('.productPrice');
let productDesc=document.querySelector('.productDesc');
let productImg=document.querySelector('.productImg img');
let prevActive=document.querySelector('.active');
console.log(prevActive);



async function fetchApi(category='electronics')
{
    let resquest=await fetch(`https://fakestoreapi.com/products/category/${category}`);
    let data =await resquest.json();
    console.log(data);
    display(data);
}
fetchApi();

function display(arr)
{
    let container=``;
    for(let i=0;i<arr.length ;i++)
    {
        container +=`<div class="col-md-3">
        <div
          class="home-item text-white border border-1 border-dark-subtle position-relative cursor-pointer"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal" onclick="getDetails(${arr[i].id})">
          <img
            src="${arr[i].image}"
            class="w-100"
            alt="productImg"
          />
          <div class="home-text p-3">
            <h2 class="h6">${arr[i].title.substring(0,20)}</h2>
            <p>LE ${arr[i].price} EGP</p>
          </div>
          <div
            class="rate bg-info d-flex justify-content-center align-items-center position-absolute top-0 end-0"
          >
            ${arr[i].rating.rate}
          </div>
        </div>
      </div>`
    }
    rowData.innerHTML =container;
}
async function getDetails(id)
{
    let resquest =await fetch(`https://fakestoreapi.com/products/${id}`);
    let data =await resquest.json();
    productTitle.innerHTML=data.title;
    productDesc.innerHTML=data.description;
    productPrice.innerHTML=`LE ${data.price} EGP`;
    productImg.setAttribute('src',data.image);

}

for(let i =0 ; i<navbarMenu.length ; i++)
{
    navbarMenu[i].addEventListener('click',function(e){
        prevActive.classList.remove('active');
        prevActive=e.target;
        (e.target).classList.add('active');
        fetchApi((e.target).getAttribute('data-category'))
    })
}