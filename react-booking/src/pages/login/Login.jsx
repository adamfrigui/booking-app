import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import "./Login.scss"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import PropagateLoader from "react-spinners/PropagateLoader";
import { AuthContext } from '../../context/AuthContext'

const Login = () => {
    const [loadingSplash, setLoadingSplash] = useState(false)
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    })
    const navigate = useNavigate();

    useEffect(() => {
        setLoadingSplash(true)
        setTimeout(() => {
            setLoadingSplash(false)
        }, 2000);
    }, [])

    const { loading, error, dispatch } = useContext(AuthContext)
 
    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axios.post("auth/login", credentials)
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
            navigate("/")
        } catch (error) {
             
            dispatch({ type: "LOGIN_FAILURE", payload: JSON.stringify(error.response.data) })

        }
    }





    document.body.style.backgroundColor = "cadetblue";
    return (
        <div >
            {loadingSplash ? <div className='splash'>
                <h1 className='fade-in' ><PropagateLoader color={"cadetblue"} loading={loadingSplash} className="yeet" size={30} /> </h1>
            </div> :
                <div className='login'>
                    <h1>Login

                    </h1>

                    <form onSubmit={handleLogin}>
                        <div className="txt_field">
                            <input type="text" required onChange={handleChange} id="username" />
                            <span></span>
                            <label>Username</label>
                        </div>
                        <div className="txt_field">
                            <input type="password" required onChange={handleChange} id="password" />
                            <span></span>
                            <label>Password</label>
                        </div>
                        <div className="pass">Forgot Password?</div>
                        <input type="submit" value="Login" className='button-log' disabled={loading}/>
                        <div className="signup_link">
                            Not a member? <Link to="/Form2">Signup</Link>
                        </div>
                        {error && <span style={{ display: "flex", justifyContent: "center" ,color:"red"}}>
                            {JSON.parse(error).message}
                        </span>}
                        
                    </form>
                </div>}
        </div >

    )
}

export default Login