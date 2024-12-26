import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Login = () => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ alerta, setAlerta] = useState('');

    const { setAuth } = useAuth();

    const navigate = useNavigate();

    
    const handleSubmit = async e => {
        e.preventDefault();

        if ([email, password].includes('')) {
            setAlerta({msg: 'Todos los campos son Obligatorios', error: true})
            return;
        }

        setAlerta({});

        try {
            const { data } = await clienteAxios.post('/veterinarios/login',{email, password });
            console.log(data);
            localStorage.setItem("apv_token", data.token);
            setAuth(data);

            navigate('/admin');

            
        } catch (error) {
            setAlerta( { msg: error.response.data.msg, error:true} );
        }
    }

    const {msg} = alerta;

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl" >Inicia Sesion y Administra tus {""} <span className="text-black" >Pacientes</span> </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                <form onSubmit={handleSubmit}>
                    { msg && <Alerta 
                        alerta={alerta}
                    /> }
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" id="email" 
                            placeholder="Email de Registro" 
                            value={email} 
                            onChange={ e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" id="password" 
                            placeholder="Tu Password" 
                            value={password} 
                            onChange={ e => setPassword(e.target.value)}
                        />
                    </div>
                    <input 
                        type="submit" 
                        value="Iniciar Sesion" 
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" 
                    />
                </form>

                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link className="block text-center my-5 text-gray-500" to="/registrar">¿No tienes una cuenta? Registrate</Link>
                    <Link className="block text-center my-5 text-gray-500" to="/olvide-password">Olvide mi Password</Link>
                </nav>
            </div>
        </>
    )
}

export default Login