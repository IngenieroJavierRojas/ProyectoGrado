import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from '../config/axios';

function Registrar() {

  const [ nombre, setNombre] = useState("");
  const [ email, setEmail] = useState("");
  const [ password, setPassword] = useState("");
  const [ repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();
    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({msg: "Hay Campos Vacios..", error: true});
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({msg: "Los Password no Coinciden!!", error: true});
      return;
    }

    if (password.trim().length < 6) {
      setAlerta({msg: "Password demasiado corto, Minimo 6 Caracteres", error: true});
      return;
    }

    setAlerta({});

    //Crear el usuario em la API
    try {
        const url = '/veterinarios';
        await clienteAxios.post(url, {nombre, email, password});
        setAlerta({
          msg: "Cuenta creada correctamente, Revisa tu Email!!",
          error: false
        })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  };

  const {msg} = alerta;


  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl" >Crea tu Cuenta y Administra {""} <span className="text-black" >tus Pacientes</span> </h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            { msg && <Alerta 
              alerta={alerta}
            />}
            <form action="" onSubmit={handleSubmit}>
              <div className="my-5">
                  <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="text">Nombre:</label>
                  <input type="text" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" id="nombre" placeholder="Tu Nombre" value={nombre} onChange={ e => setNombre(e.target.value)}/>
              </div>
              <div className="my-5">
                    <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email:</label>
                    <input type="email" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" id="email" placeholder="Email de Registro" value={email} onChange={ e => setEmail(e.target.value)}/>
              </div>
              <div className="my-5">
                  <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Password:</label>
                  <input type="password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" id="password" placeholder="Tu Password" value={password} onChange={ e => setPassword(e.target.value)}/>
              </div>
              <div className="my-5">
                  <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="repetirPassword">Confirmar Password:</label>
                  <input type="password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" id="repetirPassword" placeholder="Confirma Tu Password" value={repetirPassword} onChange={ e => setRepetirPassword(e.target.value)}/>
              </div>
              <input type="submit" value="Crear Cuenta" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
                <Link className="block text-center my-5 text-gray-500" to="/">¿Ya tienes una cuenta? Inicia Sesion</Link>
                <Link className="block text-center my-5 text-gray-500" to="/olvide-password">Olvide mi Password</Link>
            </nav>
        </div>
    </>
  )
}

export default Registrar

