import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Header() {

  const { cerrarSesion } = useAuth();

  return (
    <header className="py-10 bg-indigo-600" >
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center" >
            <h1 className="font-bold text-2xl text-indigo-200 text-center">Administrador de Pacientes de {''} <span className="text-white font-black" >Veterinaria</span></h1>

            <nav className="flex gap-4 flex-col items-center md:flex-row mt-5 lg:mt-0">
                <Link to="/admin" className="text-white text-lg uppercase font-bold hover:text-indigo-200">Pacientes</Link>
                <Link to="/perfil" className="text-white text-lg uppercase font-bold hover:text-indigo-200">Perfil</Link>

                <button 
                  type="button" 
                  className="text-white text-lg uppercase font-bold hover:text-indigo-200"
                  onClick={cerrarSesion}
                >Cerrar Sesion</button>
            </nav>
        </div>


    </header>
  )
}

export default Header