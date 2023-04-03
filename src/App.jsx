import { useState, useEffect } from "react";
import Header from "./components/Header";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import Modal from "./components/Modal";
import ListadoGastos from "./components/ListadoGastos";
import { number } from "mathjs";
import Filtros from "./components/Filtros";
function App() {
  const [gastos, setGastos] = useState([
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  ]);
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );


    useEffect(()=>{
      const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
      if(presupuestoLS > 0)
      {
        setIsValidPresupuesto(true)
      }
    },[])

    

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);


  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      setModal(true);
  
      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  },[gastoEditar])

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  const generarId = () => {
    const random = Math.random().toString(36).substring(2, 8);
    const fecha = Date.now().toString(36);

    return random + fecha;
  };

  const guardarGasto = (gasto) => {
    if(gasto.id){
      const gastosActualizados = gastos.map ( gastoState => gastoState.id ===
        gasto.id?  gasto : gastoState)

        setGastos(gastosActualizados)
        setGastoEditar({})
    }else{
      gasto.id = generarId();
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto]);
    }


    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id);
    setGastos(gastosActualizados)
  }

  useEffect(()=>{
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  },[presupuesto])

  useEffect(()=> {
    localStorage.setItem('gastos', JSON.stringify(gastos)?? [])
  },[gastos])

  useEffect(()=> {
    if(filtro)
    {
      //filtrar gastos por categoria
      const gastosFiltrador = gastos.filter( gasto => gasto.categoria ===
        filtro)
        setGastosFiltrados(gastosFiltrador)
    }
  },[filtro])

  return (
    <div className={modal ? "fijar" : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="icono-nuevoGasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
