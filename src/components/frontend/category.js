import React, {useState, useEffect} from "react";
// import { alignPropType } from "react-bootstrap/esm/types";
import {Link} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';


// import '../../assets/frontend/css/style.css';
// import '../../assets/frontend/js/scripts.js';
// import '../../assets/frontend/plugins/bootstrap/bootstrap.min.css';
// import '../../assets/frontend/plugins/fontawesome/css/all.min.css';
// import '../../assets/frontend/plugins/animate-css/animate.css';
// import '../../assets/frontend/plugins/slick/slick.css';
// import '../../assets/frontend/plugins/slick/slick.css';
// import '../../assets/frontend/plugins/slick/slick-theme.css';
// import '../../assets/frontend/plugins/colorbox/colorbox.css';




function Category() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    

    useEffect(()=>{
        fetchCategories()
    },[])


    const fetchProductsByCategory = async (id) => {
        await axios.get(`http://localhost:7000/api/category/products/${id}`).then(({data})=>{
            setProducts(data.products)
            console.log("data", data.products)
        })
    }


    const fetchCategories = async () => {
        await axios.get(`http://localhost:7000/api/categories`).then(({data})=>{
            setCategories(data)
            console.log("id category",data[0].id)
            fetchProductsByCategory(data[0].id)
            
        })
    }

  

    const deleteProduct = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            return result.isConfirmed
          });

          if(!isConfirm){
            return;
        }
        await axios.delete(`http://localhost:7000/api/products/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            fetchProductsByCategory(id)
          }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
          })


    }

    const handleChangeCategory = ({currentTarget}) => {
        var selected = currentTarget.selectedOptions

        if(selected && selected[0]){
            var category_id = selected[0].value;
            fetchProductsByCategory(category_id);
        }
    }

    return(
        <div className="container">
          <div className="row">
            <div className='col-12'>
                
                <Link className='btn btn-primary mb-2 float-end' to={"/create"}>
                    Create Product
                </Link>

                <div className="select-container">
                    <select onChange={handleChangeCategory}>
                        {
                            categories.length > 0 && (
                                categories.map((categorie, index) => (
                                    <option key={index} value={categorie.id}>{categorie.name}</option>

                                ))
                            )
                        }

                    </select>

                </div>
                                                
                
            </div>

            <div className="col-12">
                <div className="card card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered mb-0 text-center">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Remarque</th>
                                    <th>Categorie</th>
                                    <th>Namefile</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.length > 0 && (
                                        products.map((product, index)=>(
                                            <tr key={index}>
                                                <td>{product.id}</td>
                                                <td>{product.title}</td>
                                                <td>{product.description}</td>
                                                <td>{product.price}</td>
                                                <td>{product.remarque}</td>
                                                <td>{product.name}</td>
                                                <td>
                                                    <img width="50px" alt={product.namefile_img} src={`http://localhost:7000/storage/img/${product.namefile_img}`} />
                                                </td>
                                                <td>
                                                    <Link to={`/edit/${product.id}`} className='btn btn-success me-2'>
                                                        Edit
                                                    </Link>
                                                    <Button variant="danger" onClick={()=>deleteProduct(product.id)}>
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          </div>
      </div>




        

    );

}

export default Category;