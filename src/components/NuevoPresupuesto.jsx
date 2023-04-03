import {useState} from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({presupuesto,setPresupuesto,setIsValidPresupuesto}) => {
  
  const [mensaje,setMensaje] = useState('')

  const handlePresupuesto = (e) => {
    e.preventDefault()

    if(!presupuesto || presupuesto < 0){
      setMensaje('No es un presupuesto valido')

      return
    }
    setMensaje('')
    setIsValidPresupuesto(true)
    console.log(presupuesto)
    // setPresupuesto(presupuesto)

  }
  
  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      
      <form onSubmit={handlePresupuesto} 
      className='formulario'>
        <div className='campo'>
          <label >Definir Presupuesto</label>

          <input type="number"
           className='nuevo-presupuesto'
           placeholder='Anade tu presupuesto'
           value={presupuesto}
           onChange={(e) => setPresupuesto(Number(e.target.value))}
           
           />
        </div>

        <input type="submit" value='anadir' />

        {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
      </form>
    </div>
  )
}

export default NuevoPresupuesto