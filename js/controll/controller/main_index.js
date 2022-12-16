var cart = [];

var productServices = new ProductSerrvices();
getLocalStorge()
function getEle(id) {
    return document.getElementById(id)
}

function getClass(cl) {
    return document.getElementsByClassName(cl)
}

function renderHTML(data) {

    var content = "";
    data.forEach(function (product) {
        // <p>Màn hình: ${product.screen}</p>
        // <p>Camera trước: ${product.frontCamera}</p>  
        // <p>Camera sau: ${product.backCamera}</p>  
        // <p>Thương hiệu: ${product.type}</p> 

        if (product.img.indexOf("https:") !== -1) {
            content += `                
            
            <div class=" item-deal col-3" >
                 <div>
                     <img class="img-fluid" src="${product.img}" alt="">
                 </div>
                 <div class="porduct-content">
                     <h4>${product.name} - <span>${product.desc} </span></h4>
    

                     <p>$ Giá chỉ: <span>${product.price}</span></p>

                     <button id="btn-cart" class="text-uppercase mx-4" onClick= "addCart(${product.id})">add to cart</button>
                 </div>
            </div>`
        }
        else {
            content += `                
            
            <div class=" item-deal col-3" >
                 <div>
                     <img class="img-fluid" src="./../../../img/deals/${product.img}" alt="">
                 </div>
                 <div class="porduct-content">
                     <h4>${product.name} - <span>${product.desc} </span></h4>
    

                     <p>$ Giá chỉ: <span>${product.price}</span></p>

                     <button id="btn-cart" class="text-uppercase mx-4" onClick= "addCart(${product.id})">add to cart</button>
                 </div>
            </div>`
        }

    });
    document.getElementById("product-warp").innerHTML = content;
}

function getListProduct() {
    productServices.
        getListProductAPI()
        .then(function (result) {
            renderHTML(result.data)
            // console.log(result);
        })
        .catch(function (error) {
            console.log(error);
        })
}

getListProduct();


getEle("chonnSanPham").addEventListener("change", function () {
    var option = getEle("chonnSanPham").value

    // console.log(option);
    productServices.
        getListProductAPI()
        .then(function (result) {
            const data = result.data
            var listFilter = data

            // console.log("data",data);
            if (option !== "all") {
                listFilter = data.filter((function (product) {
                    var option_key = option.toLowerCase()
                    var pro_type = product.type.toLowerCase()

                    return pro_type === option_key
                }))
            }

            // console.log(listFilter)
            renderHTML(listFilter)
        })

        .catch(function (error) {
            console.log(error);
        })
})

var cartItem = {
    product: { id: '', price: '', name: '', img: '' },
    quantity: 1
}

function kiemTraTonTai_Cart(cart) {

    var exist = false
    // var viTri_ketQua = []
    for (i = 0; i < cart.length; i++) {
        if (cart[i].product.id == cartItem.product.id) {
            exist = true;
            break
        }
    }
    if (exist == true) {
        return false
    }

    return true

}

function addCart(id) {
    productServices.
        getListProductAPI()
        .then(function (result) {
            const data = result.data
            var listFilter = data

            if (data.length > 0) {



                listFilter = data.forEach((function (product, i) {
                    if (id == data[i].id) {

                        if (product.img.indexOf("https:") !== -1) {
                            cartItem = {
                                product: { id: product.id, price: product.price, name: product.name, img: product.img },
                                quantity: 1
                            }
                        }

                        else {

                            cartItem = {
                                product: { id: product.id, price: product.price, name: product.name, img: `./../../../img/deals//${product.img}` },
                                quantity: 1
                               
                            }
                            
                        }

                        // console.log(cartItem.product.img);
                        if (cart.length == 0) {
                            cart.push(cartItem)
                            return
                        }
                        if (cart.length > 0) {
                            var isValid = kiemTraTonTai_Cart(cart)


                            if (isValid == true) {
                                cart.push(cartItem)
                                return
                            }

                            else {
                                // vẫn lấy dược vị trí trừ vòng lặp của hàm kiemTraTonTai_Cart
                                cart[i].quantity++
                                return
                            }

                        }





                    }

                }
                ))


            }

            renderCartItem(cart)
            setLocalStorge()
            tinhTongSoLuong_GiaTienSanPham(cart)
            console.log("cart", cart);

        })
        .catch(function (error) {
            console.log(error);
        })

}

function renderCartItem(cart) {
    kiemtra_renderCartItem(cart)
    if (cart.length > 0) {


        getEle("itemList").style = "display: block;"
        var content = "";
        var thanhToan = "";
        cart.forEach(function (Items) {
            // if (Items.product.img.indexOf("https:") !== -1) {
                content += `
            <div class="flex">
                <div class="overplay">
                    <h6>Shop không còn bán sản phẩm này</h6>
                    </div>
                <div>
                    <img src="${Items.product.img}" width="50px" ">
                </div>

                <div>
                    <p>${Items.product.name}</p>
                    <span>$ ${Items.product.price}</span>
                    <a href="#url" id="btn-tang" onclick="btn_tang(${Items.product.id})"><i class="fa-solid fa-square-caret-up"></i></a>
                    <span>${Items.quantity}</span>
                    <a href="#url" id="btn-giam" onclick="btn_giam(${Items.product.id})"><i class="fa-solid fa-square-caret-down"></i></a>
                </div>

                <div>
                    <a href="#url" class="btn_huy" onClick="huy_SP(${Items.product.id})"><i class="fa-regular fa-circle-xmark"></i></a>
                </div>
            </div>
            `
            // }
            // else {
        //         content += `
        //     <div class="flex">
        //         <div class="overplay">
        //             <h6>Shop không còn bán sản phẩm này</h6>
        //             </div>
        //         <div>
        //             <img src="./../../../img/deals/${product.img}" width="50px" ">
                    
        //         </div>

        //         <div>
        //             <p>${Items.product.name}</p>
        //             <span>$ ${Items.product.price}</span>
        //             <a href="#url" id="btn-tang" onclick="btn_tang(${Items.product.id})"><i class="fa-solid fa-square-caret-up"></i></a>
        //             <span>${Items.quantity}</span>
        //             <a href="#url" id="btn-giam" onclick="btn_giam(${Items.product.id})"><i class="fa-solid fa-square-caret-down"></i></a>
        //         </div>

        //         <div>
        //             <a href="#url" class="btn_huy" onClick="huy_SP(${Items.product.id})"><i class="fa-regular fa-circle-xmark"></i></a>
        //         </div>
        //     </div>
        // `
        //     }

        })
        thanhToan = `
        <div id="thanhToan">
        <p id="price"></p>
            <button onClick="pAy()">Pay</button>
        </div>`

        getEle("itemList").innerHTML = `${content} ${thanhToan}`



        for (i = 0; i < cart.length; i++) {

            getClass("flex")[i].style = `
                                                                position: relative;
                                                                border-bottom: 1px solid #80808052;
            `;
        }

    }
}


function kiemTraUpdateData(data, cart) {
    var exist = false


    for (j = 0; j < data.length; j++) {
        var productData_ID = data[j].id
        var productCart_ID = cart.product.id

        var productData_name = data[j].name.toLowerCase()
        var productCart_name = cart.product.name.toLowerCase()

        var productData_price = data[j].price
        var productCart_price = cart.product.price

        if (productCart_ID == productData_ID &&
            (productData_name == productCart_name || productData_name.indexOf(productCart_name) !== -1) &&
            (productData_price == productCart_price || productData_price !== productCart_price)) {

            cart.product.name = data[j].name
            cart.product.price = data[j].price

            if (data[j].img.indexOf("https:") !== -1) {
                cart.product.img = data[j].img
            }
            if(data[j].img.indexOf("https:") == -1){
                cart.product.img = `./../../../img/deals/${data[j].img}`
            }

            exist = true;
            break
        }




        else if (productCart_ID !== productData_ID &&
            (productData_name == productCart_name || productData_name.indexOf(productCart_name) !== -1) &&
            (productData_price == productCart_price || productData_price !== productCart_price)) {
            cart.product.id = data[j].id
            cart.product.name = data[j].name
            cart.product.price = data[j].price
            
            if (data[j].img.indexOf("https:") !== -1) {
                cart.product.img = data[j].img
            }
            else{
                cart.product.img = `./../../../img/deals/${data[j].img}`
            }

            exist = true;
            break

        }


    }


    if (exist == true) {
        return false


    }

    return true


}


function kiemtra_renderCartItem(cart) {
    // console.log("cart", cart);
    productServices.
        getListProductAPI()
        .then(function (result) {
            const data = result.data

            var listFilter = data
            // console.log("listFilter", listFilter);

            if (cart.length > 0) {


                cart.filter(function (product, i) {
                    var isVaild = kiemTraUpdateData(data, cart[i])
                    if (isVaild == true) {

                        // console.log("price",cart[i].product.price);
                        cart[i].product.price = 0
                        getClass("overplay")[i].style = 'display: flex;';


                    }
                    else {

                        getClass("overplay")[i].style = 'display: none;';

                    }
                })

            }

            // renderCartItem(cart)
            // setLocalStorge(cart)
            tinhTongSoLuong_GiaTienSanPham(cart)
        })
}


function btn_tang(id) {
    cart.forEach(function (Items, i) {
        if (cart[i].product.id == id) {
            cart[i].quantity++
            renderCartItem(cart)
            setLocalStorge()
            tinhTongSoLuong_GiaTienSanPham(cart)
            // console.log("btn_tang",cart[i]);
            // console.log("cart,btn_tang", cart);
        }
    })
}
function huy_SP(id) {
    if (cart.length > 0) {

        cart.forEach(function (Items, i) {
            if (cart[i].product.id == id) {
                cart.splice(i, 1);

                renderCartItem(cart)
                setLocalStorge()
                tinhTongSoLuong_GiaTienSanPham(cart)

            }
        })
    }
    if (cart.length == 0) {
        getEle("itemList").style = "display: none;"
        getEle("Item").innerHTML = `0 Item - $0.00`
    }
}



function btn_giam(id) {

    cart.forEach(function (Items, i) {
        if (cart[i].product.id == id) {
            cart[i].quantity--
            if (cart[i].quantity == 0) {
                cart.splice(i, 1);
                // console.log("cart, btn_giam", cart);
            }

            renderCartItem(cart)
            setLocalStorge()
            tinhTongSoLuong_GiaTienSanPham(cart)


        }
    })

    if (cart.length == 0) {
        getEle("itemList").style = "display: none;"
        getEle("Item").innerHTML = `0 Item - $0.00`
    }
}

function tinhTongSoLuong_GiaTienSanPham(cart) {
    if (cart.length > 0) {
        var tongSoLuongSanPham = 0;
        var tongTienSanPham = 0
        cart.forEach(function (item, i) {
            tongSoLuongSanPham = tongSoLuongSanPham + cart[i].quantity
            tongTienSanPham = tongTienSanPham + (cart[i].product.price * cart[i].quantity)
        })
        getEle("Item").innerHTML = `${tongSoLuongSanPham} Item - $ ${tongTienSanPham}`
        getEle("price").innerHTML = ` $ ${tongTienSanPham}`

    }


}

function setLocalStorge() {
    var dataString = JSON.stringify(cart)
    localStorage.setItem("Giỏ hàng của tôi", dataString)
}

function getLocalStorge() {
    if (localStorage.getItem("Giỏ hàng của tôi")) {
        var dataString = localStorage.getItem("Giỏ hàng của tôi")
        cart = JSON.parse(dataString)

        renderCartItem(cart)

        // kiemtra_renderCartItem(cart)
        tinhTongSoLuong_GiaTienSanPham(cart)
    }
}

function pAy() {
    cart.length = 0
    renderCartItem(cart)
    setLocalStorge()
    getEle("itemList").style = "display: none;"
    getEle("Item").innerHTML = `0 Item - $0.00`
    console.log(cart);
}



