import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

function NuevoPassword() {
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();
  const { token } = params;
  console.log(token);

  useEffect( ()=> {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`)
        setAlerta({
          msg: 'Coloca tu nuevo Password'
        })
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: 'Hubo un error con el enlace',
          error: true
        })
      }
    }
    comprobarToken();
  }, [token] )

  const handleSubmit = async e => {
    e.preventDefault();
    if([password, repetirPassword].includes('')) {
      setAlerta({ msg: 'Todos los campos son obligatorios', error: true });
      return;
    }

    if (password !== repetirPassword || password.trim().length < 6) {
      setAlerta({msg: 'Los Passwords no coinciden', error: true});
      return;
    }

    if (password.trim().length < 6) {
      setAlerta({msg: 'El password debe tener minimo 6 caracteres', error: true});
      return;
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const {data} = await clienteAxios.post(url, {password: password.trim()});
      setAlerta({msg: data.msg});
      setPasswordModificado(true);
      setPassword("");
      setRepetirPassword("");
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg
      })
    }

  }

  const { msg } = alerta
  return (
    <>
      <div>
            <h1 className="text-indigo-600 font-black text-6xl" >Reestablece tu password y Administra {""} <span className="text-black" >tus Pacientes</span> </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            { msg && <Alerta 
              alerta={alerta}
            />}

            { tokenValido && (
              <>
                <form action="" onSubmit={handleSubmit}>
                  <div className="my-5">
                      <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Nuevo Password:</label>
                      <p className="text-gray-400">El password debe contener minimo 6 caracteres!</p>
                      <input type="password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" id="password" placeholder="Tu Nuevo Password" value={password} onChange={ e => setPassword(e.target.value)}/>
                  </div>
                  <div className="my-5">
                      <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="repetirPassword">Confirmar Password:</label>
                      <input type="password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" id="repetirPassword" placeholder="Confirma Tu Password" value={repetirPassword} onChange={ e => setRepetirPassword(e.target.value)}/>
                  </div>
                  <input type="submit" value="Cambiar Password" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
                </form>
                {passwordModificado && (
                  <nav className="mt-10 lg:flex lg:justify-between">
                  <Link className="block text-center my-5 text-gray-500" to="/">Inicia Sesion</Link>
                  <Link className="block text-center my-5 text-gray-500" to="/registrar">¿No tienes una cuenta? Registrate</Link>
                  </nav>

                )}
              </>
              )}
        </div>
    </>
  )
}

export default NuevoPassword