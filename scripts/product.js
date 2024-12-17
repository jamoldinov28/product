const detailEl = document.querySelector(".detail")
const BASE_URL = "https://dummyjson.com"

async function fetchData() {
    let params = new URLSearchParams(window.location.search)
    const response = await fetch(`${BASE_URL}/products/${params.get("id")}`)
    response
        .json()
        .then(res => {
            createDetailPage(res);
        })

}

window.onload = ()=> {
    fetchData()
}

function createDetailPage(data){
    detailEl.innerHTML = `
    <div class="product-card">
      <h2 class="product-title">${data?.title}</h2>
      <img  src=${data.images[0]} alt="">
      <p class="product-description">${data?.description}</p>
      <h3 class="price">${data?.price}</h3>
      <p class="discount">${data?.discountPercentage}</p>
      <h4 class="category">${data?.tags}</h4>
      <p class="rating">Rating: ${data?.rating}</p>
      <p class="stock">Stock: ${data?.stock}</p>
      <p class="warranty">Warranty: ${data?.warrantyInformation}</p>
      <p class="shipping-info">${data?.shippingInformation}</p>
      <p class="return-policy">Return Policy: ${data?.returnPolicy}</p>
      <p class="min-order">Minimum Order Quantity:${data?.minimumOrderQuantity}</p>
      <button class="details-button"">See Details</button>
  </div>

   `
}