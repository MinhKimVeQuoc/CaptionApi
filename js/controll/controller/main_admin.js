

var productServices = new ProductSerrvices();
function getEle(id) {
  return document.getElementById(id)
}


function renderHTML(data) {
  var content = "";

  data.forEach(function (product, index) {

    if (product.img.indexOf("https:") !== -1) {
      content += `
          <tr>
              <td>${index + 1}</td>
              <td>${product.name}</td>
              <td>${product.type}</td>         
              <td>${product.screen}</td>
              <td>${product.frontCamera}</td>
              <td>${product.backCamera}</td>
  
              <td>
                  <img id ="img"   width="50px" src="${product.img}" "/>
              </td>
              <td>${product.desc}</td>
              <td>${product.price}</td>
              <td>
                  <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editProduct('${product.id
        }')">Edit</button>
                  <button class="btn btn-danger" onclick="deleteProdcut('${product.id
        }')">Delete</button>
              </td>
          </tr>
      `;
    }
    else {
      content += `
          <tr>
             <td>${index + 1}</td>
              <td>${product.name}</td>
              <td>${product.type}</td>         
              <td>${product.screen}</td>
              <td>${product.frontCamera}</td>
              <td>${product.backCamera}</td>
  
              <td>
                  <img id ="img"   width="50px" src="./../../../img/deals/${product.img}" "/>
              </td>
              <td>${product.desc}</td>
              <td>${product.price}</td>
              <td>
                  <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editProduct('${product.id
        }')">Edit</button>
  
                  <button class="btn btn-danger" onclick="deleteProdcut('${product.id
        }')">Delete</button>
              </td>
          </tr>
      `;
    }
    // console.log(index+1, product.img);
  });

  getEle("tblRender_ListProduct").innerHTML = content;
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

/**
 * Edit Product
 */
function editProduct(id) {
  var title = "Sửa sản phẩm";
  document.getElementsByClassName("modal-title")[0].innerHTML = title;

  var button = `<button class="btn btn-warning" onclick="updateProduct(${id})">Update Product</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = button;

  productServices
    .getProductByIdApi(id)
    .then(function (result) {
      var product = result.data;

      getEle("nameProduct").value = product.name;

      if (product.type.toLowerCase() == "iphone") {
        getEle("choose_ManufacturerProduct").value = product.type.toLowerCase()
      }
      if (product.type.toLowerCase() == "samsung") {
        getEle("choose_ManufacturerProduct").value = product.type.toLowerCase()
      }

      // console.log(getEle("choose_ManufacturerProduct").selectedIndex="1");
      // getEle("choose_ManufacturerProduct").value = product.type;
      getEle("screenProduct").value = product.screen;
      getEle("CameraFront_Product").value = product.frontCamera;
      getEle("CameraBack_Product").value = product.backCamera;
      getEle("imgProduct_input").value = product.img;
      if (product.img.indexOf("https:") !== -1) {

        getEle("imgProduct_img").src = product.img
      }

      else {
        getEle("imgProduct_img").src = src = src = `./../../../../img/deals/${product.img}`;
      }
      getEle("princeProduct").value = product.price;
      getEle("descProduct").value = product.desc;
    })
    .catch(function (error) {
      console.log(error);
    });
}




/**
 * Update Product
 */
function updateProduct(id) {
  var tenSP = getEle("nameProduct").value
  var hang = getEle("choose_ManufacturerProduct").value
  var manHinh = getEle("screenProduct").value
  var cameraTruoc = getEle("CameraFront_Product").value
  var cameraSau = getEle("CameraBack_Product").value
  var hinhAnh = getEle("imgProduct_input").value
  var gia = getEle("princeProduct").value
  var moTa = getEle("descProduct").value

  var product = new Product(id, tenSP,
    gia,
    manHinh,
    cameraSau,
    cameraTruoc,
    hinhAnh,
    moTa,
    hang)

  productServices.
    updateProductApi(product)
    .then(function () {
      alert("Update Success!");
      getListProduct();
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Delete Product
 */
function deleteProdcut(id) {
  productServices.
    deleteProductApi(id)
    .then(function (result) {
      alert("Delete Success!");
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function reset_input() {
  getEle("nameProduct").value = "";


  getEle("choose_ManufacturerProduct").value = "Chọn hãng"
  getEle("screenProduct").value = "";
  getEle("CameraFront_Product").value = "";
  getEle("CameraBack_Product").value = "";
  getEle("imgProduct_input").value = "";


  getEle("imgProduct_img").src = "";

  getEle("princeProduct").value = "";
  getEle("descProduct").value = "";
}

getEle("btn-them").onclick = function () {
  var title = "Thêm Sản Phẩm";
  document.getElementsByClassName("modal-title")[0].innerHTML = title;
  reset_input()
  var button = `<button class="btn btn-success" onclick="addProduct()">Add Product</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = button;
};

/**
 * Add Product
 */
function addProduct() {

  var tenSP = getEle("nameProduct").value
  var hang = getEle("choose_ManufacturerProduct").value
  var manHinh = getEle("screenProduct").value
  var cameraTruoc = getEle("CameraFront_Product").value
  var cameraSau = getEle("CameraBack_Product").value
  var hinhAnh = getEle("imgProduct_input").value
  var gia = getEle("princeProduct").value
  var moTa = getEle("descProduct").value

  var product = new Product("", tenSP,
    gia,
    manHinh,
    cameraSau,
    cameraTruoc,
    hinhAnh,
    moTa,
    hang)



  productServices
    .addProductApi(product)
    .then(function (result) {
      alert("Add Success!");
      getListProduct();
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function kiemtra() {
  var getlocal = new getLocalStorge()
}