document.addEventListener("DOMContentLoaded", () => {
    fetchData()
  })
  
  const fetchData = async () => {
    try {
        const res = await fetch('../api.json')
        const data = await res.json()
        pintarProductos(data)
        detectarBotones(data)
    } catch (error) {
        
    }
  }
  
  const contendorProductos = document.querySelector('#contenedor-productos')
  const pintarProductos = (data) => {
    const template = document.querySelector('#template-productos').content
    const fragment = document.createDocumentFragment()
   
    data.forEach(producto => {
      
        template.querySelector('img').setAttribute('src', producto.thumbnailUrl)
        template.querySelector('h5').textContent = producto.title
        template.querySelector('p span').textContent = producto.precio
        template.querySelector('button').dataset.id = producto.id
        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })
    contendorProductos.appendChild(fragment)
  }
   
  let carrito = {}
  
  const detectarBotones = (data) => {
    const botones = document.querySelectorAll('.card button')
  
    botones.forEach(btn => {
        btn.addEventListener('click', () => {
          
            const producto = data.find(item => item.id === parseInt(btn.dataset.id))
            producto.cantidad = 1
            if (carrito.hasOwnProperty(producto.id)) {
                producto.cantidad = carrito[producto.id].cantidad + 1
            } 
            carrito[producto.id] = {...producto}
            pintarCarrito()
        })
    })
  }
  
  const items = document.querySelector('#items')
  
  const pintarCarrito = () => {

    items.innerHTML = ''
  
    
    const template = document.querySelector('#template-carrito').content
    const fragment = document.createDocumentFragment()
  
    Object.values(carrito).forEach(producto => {
       
        template.querySelector('th').textContent = producto.id
        template.querySelectorAll('td')[0].textContent = producto.title
        template.querySelectorAll('td')[1].textContent = producto.cantidad
        template.querySelector('span').textContent = producto.precio * producto.cantidad
  
        //botones
        template.querySelector('.btn-info').dataset.id = producto.id
        template.querySelector('.btn-danger').dataset.id = producto.id
  
        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })
  
    items.appendChild(fragment)
  
    pintarFooter()
    accionBotones()
  
  }
  
  const footer = document.querySelector('#footer-carrito')
  const pintarFooter = () => {
  
    footer.innerHTML = ''
  
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío</th>
        `
        return
    }
  
    const template = document.querySelector('#template-footer').content
    const fragment = document.createDocumentFragment()
  
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nTotal = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
   
  
    template.querySelectorAll('td')[0].textContent = nCantidad
    template.querySelector('span').textContent = nTotal
  
    const clone = template.cloneNode(true)
    fragment.appendChild(clone)
  
    footer.appendChild(fragment)
  
  
    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })
  
  }
  
  const accionBotones = () => {
      
    const botonesAgregar = document.querySelectorAll('#items .btn-info')
    const botonesEliminar = document.querySelectorAll('#items .btn-danger')
  
   
  
    botonesAgregar.forEach(btn => {
        btn.addEventListener('click', () => {
           
            const producto = carrito[btn.dataset.id]
            producto.cantidad ++
            carrito[btn.dataset.id] = { ...producto }
            pintarCarrito()
        })
    })
  
    botonesEliminar.forEach(btn => {
        btn.addEventListener('click', () => {
           
            const producto = carrito[btn.dataset.id]
            producto.cantidad--
            if (producto.cantidad === 0) {
                delete carrito[btn.dataset.id]
            } else {
                carrito[btn.dataset.id] = { ...producto }
            }
            pintarCarrito()
        })
    })
  }

const addToCart = document.querySelectorAll('.btn');

for (let btn of addToCart) {
 btn.addEventListener("click", () => {
  Swal.fire({
   position: 'center',
   icon: 'success',
   title: 'Se ha agregado al carrito',
   showConfirmButton: false,
   timer: 1500
  })
 })
}

