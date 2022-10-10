import React, { useEffect, useState, useRef } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditProduct() {
    const navigate = useNavigate();
    const inputFile = useRef(null);

    const { id } = useParams()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState(null)
    const [namefile, setNamefile] = useState("")
    const [price, setPrice] = useState("")
    const [remarque, setRemarque] = useState("")
    const [validationError,setValidationError] = useState({})

    useEffect(()=>{
        fetchProduct() 
    },[])

  const fetchProduct = async () => {
    await axios.get(`http://localhost:7000/api/products/${id}`).then(({data})=>{
      const { title, description, namefile_img, price, remarque } = data.product
      setTitle(title)
      setDescription(description)
      setNamefile(namefile_img)
      setPrice(price)
      setRemarque(remarque)
      console.log("data product",data.product)

    }).catch(({response:{data}})=>{
      Swal.fire({
        text:data.message,
        icon:"error"
      })
    })
  }

  const handleChangeFile = (files) => {
    if(files && files[0]){
      setFile(files[0]);
      setNamefile(files[0].name);
    }
    else {
      setFile(null);
      setNamefile("");
    }
  }

  const handleChangeNamefile = () => {
    inputFile.current.click();
  }

  const updateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('_method', 'POST');
    formData.append('title', title)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('file', file)
    formData.append('remarque', remarque)


    await axios.post(`http://localhost:7000/api/products/${id}`, formData).then(({data})=>{
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
              <h4 className="card-title">Update Product</h4>
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
                <Form onSubmit={updateProduct}>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={title} onChange={(event)=>{
                              setTitle(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="Description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} value={description} onChange={(event)=>{
                              setDescription(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row> 
                    <Col>
                      <Form.Group controlId="Namefile">
                          <Form.Label>Namefile</Form.Label>
                          <Form.Control readOnly={true} type="text" value={namefile} 
                            placeholder="Select file"
                            style={{backgroundColor: "unset"}}
                            onChange={()=>{}} 
                            onClick={handleChangeNamefile}
                          />
                      </Form.Group>
                    </Col>  
                  </Row>
                  <Row style={{display: "none" }}> 
                    <Col>
                      <Form.Group controlId="File">
                          <Form.Label>Namefile</Form.Label>
                          <Form.Control ref={inputFile} type="file" onChange={(event)=>{
                            handleChangeFile(event.target.files)
                          }}/>
                      </Form.Group>
                    </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" value={price} onChange={(event)=>{
                              setPrice(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Remarque">
                            <Form.Label>Remarque</Form.Label>
                            <Form.Control type="text" value={remarque} onChange={(event)=>{
                              setRemarque(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                 
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Update
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