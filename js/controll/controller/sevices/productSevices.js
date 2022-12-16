function ProductSerrvices(){
    this.getListProductAPI = function(){
      return  axios ({
            url:`https://637b69986f4024eac20ce0d3.mockapi.io/api/QuanLySanPhamDienThoai`,
            method: "GET",
        })
    }
    
    this.deleteProductApi = function (id) {
        return axios({
          url: `https://637b69986f4024eac20ce0d3.mockapi.io/api/QuanLySanPhamDienThoai/${id}`,
          method: "DELETE",
        });
      };
    
      this.addProductApi = function (product) {
        return axios({
          url: "https://637b69986f4024eac20ce0d3.mockapi.io/api/QuanLySanPhamDienThoai",
          method: "POST",
          data: product,
        });
      };
    
      this.getProductByIdApi = function (id) {
        return axios({
          url: `https://637b69986f4024eac20ce0d3.mockapi.io/api/QuanLySanPhamDienThoai/${id}`,
          method: "GET",
        });
      };
    
      this.updateProductApi = function (product) {
        return axios({
          url: `https://637b69986f4024eac20ce0d3.mockapi.io/api/QuanLySanPhamDienThoai/${product.id}`,
          method: "PUT",
          data: product,
        });
      };
}