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




function Home() {

    const [products, setProducts] = useState([]);
    

    useEffect(()=>{
        fetchProducts(); 
    },[])

    const fetchProducts = async () => {
        await axios.get(`http://localhost:7000/api/products`).then(({data})=>{
            setProducts(data)
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
            fetchProducts()
          }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
          })


    }

    return(
        <div className="container">
          <div className="row">
            <div className='col-12'>
                
                <Link className='btn btn-primary mb-2 float-end' to={"/create"}>
                    Create Product
                </Link>
                <Link className='btn btn-success mb-2 float-end' to={"/category"}>
                    Categories
                </Link>                 
                
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
                                    <th>Namefile</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.length > 0 && (
                                        products.map((row, key)=>(
                                            <tr key={key}>
                                                <td>{row.id}</td>
                                                <td>{row.title}</td>
                                                <td>{row.description}</td>
                                                <td>{row.price}</td>
                                                <td>{row.remarque}</td>
                                                <td>
                                                    <img width="50px" alt={row.namefile_img} src={`http://localhost:7000/storage/img/${row.namefile_img}`} />
                                                </td>
                                                <td>
                                                    <Link to={`/edit/${row.id}`} className='btn btn-success me-2'>
                                                        Edit
                                                    </Link>
                                                    <Button variant="danger" onClick={()=>deleteProduct(row.id)}>
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

export default Home;