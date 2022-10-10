import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

export default function CreateProduct() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState(null)
  const [price, setPrice] = useState("")
  const [remarque, setRemarque] = useState("")
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState("")
  const [validationError,setValidationError] = useState({})

  useEffect(()=>{
    fetchCategories()
  },[])

  const fetchCategories = async () => {
    await axios.get(`http://localhost:7000/api/categories`).then(({data})=>{
      if(data && data.length){
        setCategories(data);
        setCategoryId(data[0].id);
      }
    })
  }

  const handleChangeNamefile = ({currentTarget}) => {
    var files = currentTarget.files
    var temp = null;

    if(files && files[0]){
      temp = files[0];
    }
    
    setFile(temp);
  }

  const handleChangeCategory = ({currentTarget}) => {
    var selected = currentTarget.selectedOptions

    if(selected && selected[0]){
      var category_id = selected[0].value;
      setCategoryId(category_id);
    }
  }

  const createProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append('title', title)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('file', file)
    formData.append('remarque', remarque)
    formData.append('category_id', categoryId)

    await axios.post(`http://localhost:7000/api/products`, formData).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate("/")
    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data.errors)
      }else{
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })
      }
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Create Product</h4>
              <hr />
              <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value])=>(
                                <li key={key}>{value}</li>   
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
                <Form onSubmit={createProduct}>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Title</Form.Label>
                            <Form.Control required={true} type="text" value={title} onChange={(event)=>{
                              setTitle(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="Description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control required={true} as="textarea" rows={3} value={description} onChange={(event)=>{
                              setDescription(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Form.Group controlId="Price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control required={true} type="number" value={price} onChange={(event)=>{
                              setPrice(event.target.value)
                        }}/>
                        </Form.Group>
                      {/* <Form.Group controlId="Image" className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" onChange={changeHandler} />
                      </Form.Group> */}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Form.Group controlId="NameFile">
                            <Form.Label>Namefile</Form.Label>
                            <Form.Control required={true} type="file" onChange={handleChangeNamefile}/>
                        </Form.Group>
                      
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="Category">
                        <Form.Label>Category</Form.Label>
                        <Form.Select required={true} onChange={handleChangeCategory}>
                        {
                            categories.length > 0 && (
                                categories.map((categorie, index) => (
                                    <option key={index} value={categorie.id}>{categorie.name}</option>
                                ))
                            )
                        }

                        </Form.Select>
                      </Form.Group>
                    
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <Form.Group controlId="Remarque">
                            <Form.Label>Remarque</Form.Label>
                            <Form.Control required={true} type="text" value={remarque} onChange={(event)=>{
                              setRemarque(event.target.value)
                        }}/>
                        </Form.Group>
                      
                    </Col>
                  </Row>
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Save
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}