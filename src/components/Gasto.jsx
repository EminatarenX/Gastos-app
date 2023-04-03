import React from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeAction,
  TrailingActions,
  SwipeableListItem,
} from "react-swipeable-list";

import "react-swipeable-list/dist/styles.css";

import iconoAhorro from "../img/icono_ahorro.svg";
import iconocasa from "../img/icono_casa.svg";
import iconocomida from "../img/icono_comida.svg";
import iconogastos from "../img/icono_gastos.svg";
import iconosalud from "../img/icono_salud.svg";
import iconoocio from "../img/icono_ocio.svg";
import iconosuscripciones from "../img/icono_suscripciones.svg";

const diccionarioIconos = {
  ahorro: iconoAhorro,
  comida: iconocomida,
  casa: iconocasa,
  gastos: iconogastos,
  ocio: iconoocio,
  salud: iconosalud,
  suscripciones: iconosuscripciones,
};

const Gasto = ({ gasto,setGastoEditar, eliminarGasto }) => {
  const { categoria, nombre, cantidad, id, fecha } = gasto;

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setGastoEditar(gasto)}>Editar</SwipeAction>
    </LeadingActions>
  );
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction 
        onClick={() => eliminarGasto(id)}
        destructive={true}
        > 
        
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  const formatearFecha = (fecha) => {
    const fechaNueva = new Date(fecha);
    const opciones = {
      year: "numeric",
      month: "long",
      day: "2-digit",
    };

    return fechaNueva.toLocaleDateString("es-ES", opciones);
  };

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={diccionarioIconos[categoria]} alt="icono-gasto" />
            <div className="descripcion-gasto">
              <p className="categoria">{categoria}</p>
              <p className="nombre-gasto">{nombre}</p>
              <p className="fecha-gasto">
                Agregado el: <span>{formatearFecha(fecha)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">${cantidad}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Gasto;
