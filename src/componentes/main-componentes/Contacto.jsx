/* eslint-disable react-hooks/exhaustive-deps */
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import './Contacto.css'
import { useEffect, useState } from 'react'

function Contacto ({ id }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [renderData, setRenderData] = useState(false)
  const [renderError, setRenderError] = useState(false)
  const [renderLoading, setLoading] = useState(false)

  const handleData = (_data) => {
    if (renderError) setRenderError(false)
    setData(_data)
    setRenderData(true)
  }

  const handleError = (_data) => {
    if (renderData) setRenderData(false)
    setError(_data)
    setRenderError(true)
  }

  const handleLoading = (bool) => {
    if (bool) {
      setRenderData(false)
      setRenderError(false)
    }
    setLoading(bool)
  }
  return (
    <section>
      <div id={id} className='container-lg'>
        <div className='contacto-encabezado'>
          <h1>Probando Server en Deploy</h1>
        </div>
        <div className='contacto-formulario'>
          <PruebaButton onData={(d) => { handleData(d) }} onError={handleError} onLoading={handleLoading} />
        </div>
        <div>
          {renderLoading && (<Spinner animation='grow' variant='info' />)}
          {renderData && (<Alert variant='success'> {data.mensaje} </Alert>)}
          {renderError && (<Alert variant='danger'> {error.mensaje} </Alert>)}
        </div>
      </div>
    </section>
  )
}

function PruebaButton ({ onData, onError, onLoading }) {
  const [flag, setFlag] = useState(false)

  useEffect(() => {
    if (flag) {
      // fetch('https://api-render-prueba.onrender.com')
      fetch('http://localhost:3000')
        .then(async (res) => {
          const data = await res.json()
          if (!res.ok) throw new Error(data.error)
          return data
        })
        .then((data) => {
          setTimeout(() => {
            setFlag(false)
            onLoading(false)
            onData(data)
          }, 100)
        })
        .catch((err) => {
          setTimeout(() => {
            const error = { mensaje: err.message }
            setFlag(false)
            onLoading(false)
            onError(error)
          }, 100)
        })
    }
  }, [flag])
  const handleSubmit = (event) => {
    event.preventDefault()
    setFlag(true)
    onLoading(true)
  }
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Button variant='danger' type='submit'>
          Click me
        </Button>
      </Form>
    </>
  )
}

function FormContacto () {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: '',
  })
  const [validated, setValidated] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      alert('Porfavor, complete los datos')
      setValidated(true)

      return
    }

    const METODO = { method: 'POST', body: JSON.stringify(formData) }

    console.log(METODO)

    // fetch('http://localhost:4000/api/jpaz/sendmail', METODO)
    //   .then(async (res) => {
    //     const data = await res.json()
    //     return data
    //   })
    //   .then((data) => {
    //     console.log(data)
    //     alert(data)
    //   })
    //   .catch()

    // fetch('http://localhost:3000/')
    fetch('https://api-render-prueba.onrender.com/')
      .then(async (res) => {
        const data = await res.json()
        return data
      })
      .then((data) => {
        console.log(data)
        alert(data)
      })
      .catch()
  }

  const handleChange = (change) => {
    setFormData(change)
  }
  return (
    <div className='container'>
      <div className='col-6'>
        <Form
          noValidate
          validated={validated}
          className='form-contacto'
          id='form-contacto'
          onSubmit={handleSubmit}
        >
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='nombre'>Nombre (Requerido)</Form.Label>
            <Form.Control
              id='nombre'
              required
              onChange={(e) => {
                handleChange({ ...formData, nombre: e.target.value })
              }}
              type='text'
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='correo'>
              Correo Electronico (Requerido)
            </Form.Label>
            <Form.Control
              id='correo'
              required
              onChange={(e) => {
                handleChange({ ...formData, correo: e.target.value })
              }}
              type='email'
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='asunto'>Asunto</Form.Label>
            <Form.Control
              id='asunto'
              onChange={(e) => {
                handleChange({ ...formData, asunto: e.target.value })
              }}
              type='text'
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='mensaje'>Mensaje (Requerido)</Form.Label>
            <Form.Control
              id='mensaje'
              required
              onChange={(e) => {
                handleChange({ ...formData, mensaje: e.target.value })
              }}
              as='textarea'
              rows={9}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Enviar
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default Contacto
