$(document).ready(function() {
  
const q = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const http = new XMLHttpRequest();
const product = q(".product");
const productDetail = q(".productDetail");
const background = q(".background");
const options = $$(".sub-menu_item");
const options1 = $$(".type");
const input = q("input[name=query]");
const resultsBar = q(".results-bar");

let check = false;
let dataN;
let productType = "shirt";
let number;
http.open("GET", "./data/data.json", true);
http.send();
http.onreadystatechange = function () {
  if (this.readyState == 4) {
    // if (JSON.parse(this.responseText).product.hasOwnProperty(productType)) {
    //   console.log("ok");
    // }
    dataN = JSON.parse(this.responseText).product;

    handleData(JSON.parse(this.responseText).product);
  }
};
Array.from(options).map((elm, index) => {
  elm.onclick = (e) => {
    product.innerHTML = "";
    if (index == 0) {
      productType = "pant";
      handleData(dataN);
    } else if (index == 1) {
      productType = "shirt";
      handleData(dataN);
    } else if (index == 2) {
      productType = "skirt";
      handleData(dataN);
    } else if (index == 3) {
      productType = "shoes";
      handleData(dataN);
    } else if (index == 4) {
      productType = "hat";

      handleData(dataN);
    }
  };
});
console.log(options1);
Array.from(options1).map((elm, index) => {
  elm.onclick = (e) => {
    console.log("ok");
    product.innerHTML = "";
    if (index == 0) {
      productType = "pant";
      handleData(dataN);
    } else if (index == 1) {
      productType = "shirt";
      handleData(dataN);
    } else if (index == 2) {
      productType = "skirt";
      handleData(dataN);
    } else if (index == 3) {
      productType = "shoes";
      handleData(dataN);
    } else if (index == 4) {
      productType = "hat";

      handleData(dataN);
    }
  };
});
function handleData(data) {
  data.map((valueProduct, index) => {
    console.log(productType);
    if (valueProduct.hasOwnProperty(productType)) {
      number = index;
      let div = `<div class='results' data-index='${valueProduct.id}'>
      <span class='hoverTitle'>${valueProduct.name}</span>
                      <div class='productAvatar'>
                        <img data-index='${valueProduct.id}' src='${valueProduct.image}' alt='${valueProduct.name}'/>
                         
                        </div>
                      <div class="productOverview">
                        <div class="information">
                          <div class='productName'>
                             ${valueProduct.name}
                            
                          </div>
                          <div class="price">
                            <sup>$</sup>${valueProduct.price}
                          </div>
                        </div>


                          <div class='submitProduct'>

                            <div class="status">
                              <div class="sold">sold:  <span>50</span></div>
                            </div>
                            <div class="statuss">
                              <div class="addCart" cart-index='${valueProduct.id}' >Add cart</div>
                              <div class="buyProduct" cart-index='${valueProduct.id}'>Buy</div>
                            </div>

                          </div>

                      </div>
                    </div>`;
      product.insertAdjacentHTML("beforeend", div);
    }
    // handleType(valueProduct);
  });
  const hoverAvatar = $$(".productAvatar");
  const hoverName = $$(".productName");

  const AllHover = Array.from(hoverAvatar).concat(Array.from(hoverName));

  AllHover.map((elm) => {
    elm.onmouseover = (e) => {
      e.target
        .closest(".results")
        .querySelector(".hoverTitle")
        .classList.toggle("hoverShow");
    };
    elm.onmouseout = (e) => {
      e.target
        .closest(".results")
        .querySelector(".hoverTitle")
        .classList.remove("hoverShow");
    };
  });

  // function handleType(valueProduct) {

  // }
}
background.onclick = function () {
  background.classList.remove("show");
  productDetail.innerHTML = "";
  productDetail.classList.remove("showDetails");
};

product.onclick = function (e) {
  e.stopPropagation();
  if (e.target.dataset.index) {
    background.classList.toggle("show", !check);
    productDetail.classList.add("showDetails");
    console.log(dataN);

    dataN.map((prop) => {
      if (e.target.dataset.index == prop.id) {
        console.log(prop);
        let quality;
        // if(prop.quality == 1.0){
        //   quality = ''
        // }
        let div = `<div class='image'><img src=
                    ${prop.image}
                    alt='${prop.name}'
                    /></div>
                    <div class='order'>
                      <div class='star'>${prop.quality}.0<span></span></div>
                      <p class='productName' >
                        ${prop.name}
                      </p>
                    <div class='price'><p>
                     <sup>$</sup>${prop.price}</p>
                  </div> 
                  <div class='saleProduct'>${prop.sale}</div>
                </div>
                <div class='resultColor'></div>`;
        productDetail.insertAdjacentHTML("beforeend", div);

        const productColor = q(
          `div[class="resultColor"][data-index='q{prop.id}']`
        );
        if (prop.hasOwnProperty("shirt") && prop.id == prop.shirt.id) {
          const color = q(".resultColor");
          prop.shirt.color.map((valueColor) => {
            const div3 = `<div class="colorProduct"><img src="${valueColor.image}" alt="${valueColor.color}"/></div>`;
            color.insertAdjacentHTML("beforeend", div3);
          });
        }
      }
    });
  }
};
input.oninput = function (e) {
  dataN.map((elm) => {
    console.log(e.target.value, elm.name);

    if (e.target.value == elm.name) {
      t(elm);
    }

    if (e.target.value === "") {
      resultsBar.innerHTML = "";
    }
  });
  const resultSearch = q(".search-results");
  console.log(resultSearch);
  if (resultSearch) {
    resultSearch.onclick = (e) => {
      dataN.map((value) => {
        if (value.id == e.target.dataset.index) {
          t(value);
        }
      });
    };
  }
};

function t(valuejson) {
  const div = ` <div class="search-results" data-index=${valuejson.id}>
                      <img data-index=${valuejson.id} src="${valuejson.image}" alt="${valuejson.name}"/>
                      <div class="information-search" data-index=${valuejson.id}>
                        <span class="product-Name" data-index=${valuejson.id}>${valuejson.name}</span>
                        <span class="product-price" data-index=${valuejson.id}><sup>$</sup>${valuejson.price}</span>
                      </div>
                      <span class="product-status" data-index=${valuejson.id}>still</span>
                    </div>`;

  resultsBar.insertAdjacentHTML("beforeend", div);
}

})
