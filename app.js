const wrapperEl = document.querySelector(".wrapper")
const loadingEl = document.querySelector(".loading")
const btnSeemore = document.querySelector(".btn__seemore")
const backtopEl = document.querySelector(".back-top")
const navbrEL = document.querySelector(".navbar")
const BASE_URL = "https://dummyjson.com"

const perPageCount = 8
let total = 0

async function fetchData(endpoint){
    const response = await fetch(`${BASE_URL}${endpoint}`)
    response
        .json()
        .then((res)=> {
            createCard(res)
            total = res.total
        })
        .catch((err) => console.log(err))
        .finally(()=> {
            loadingEl.style.display = "none"
            btnSeemore.removeAttribute("disabled")
            btnSeemore.textContent = "See more"
        })
}

window.addEventListener("load", ()=>{
    createLoading(perPageCount)
    fetchData(`/products?limit=${perPageCount}`)
    fetchCategory("/products/category-list")
})

function createLoading(n){
    loadingEl.style.display = "grid"
    loadingEl.innerHTML = null
    Array(n).fill().forEach(()=>{
        const div = document.createElement("div")
        div.className = "loading__item"
        div.innerHTML = `
            <div class="loading__image to-left"></div>
            <div class="loading__title to-left"></div>
            <div class="loading__title to-left"></div>
        `
        loadingEl.appendChild(div)
    })
}

function createCard(data){
    data.products.forEach(product=> {
        const divEl = document.createElement("div")
        divEl.className = "card"
        divEl.innerHTML = `
            <img src=${product.thumbnail} alt="rasm">
            <h2>${product.title}</h2>
            <p>${product.price} USD</p>
            <button>Buy now</button>
        `
        wrapperEl.appendChild(divEl)    
    })
}

let offset = 0
btnSeemore.addEventListener("click", ()=>{
    btnSeemore.setAttribute("disabled", true)
    btnSeemore.textContent = "Loading..."
    createLoading(perPageCount)
    offset++
    if(total <= perPageCount + (offset * perPageCount)){
        btnSeemore.style.display = "none"
    }
    fetchData(`/products?limit=${perPageCount}&skip=${offset * perPageCount}`)
})




window.addEventListener("scroll", ()=>{   
    console.log(document.documentElement.scrollTop);
    if(document.documentElement.scrollTop > 150){
        navbrEL.classList.add("dark")
        backtopEl.style.bottom = "20px"
        backtopEl.style.transform = "scale(1)"
    }else{
        navbrEL.classList.remove("dark")
        backtopEl.style.bottom = "-40px"
        backtopEl.style.transform = "scale(0)"
    }
})