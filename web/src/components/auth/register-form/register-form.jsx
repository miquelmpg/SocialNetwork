import { useState } from "react";
import { useForm } from 'react-hook-form';
import * as ApiService from '../../../services/api-service';
import { Link, useNavigate } from 'react-router-dom';

function RegisterForm() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isValid } } = useForm();
    const [serverError, setServerError] = useState(null);

    async function onSubmit(data) {
        try {
            await ApiService.register(data);
            navigate("/login");
        } catch (err) {
            setServerError(err.response?.data?.message || "Ops! Unknown Error");
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            {/* USERNAME */}
            <div className="input-group mb-1">
                <span className="input-group-text"><i className="fa fa-user fa-fw"></i></span>
                <input type="text" className={`form-control ${errors.userName ? 'is-invalid' : ''}`} placeholder="Enter your username" {...register('userName', { required: 'User userName is required' }) }/>
                {errors.userName && (<div className="invalid-feedback">{errors.userName.message}</div> )}
            </div>

            {/* EMAIL */}
            <div className="input-group mb-1">
                <span className="input-group-text"><i className="fa fa-envelope fa-fw"></i></span>
                <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="user@example.org" {...register('email', { required: 'User email is required' })} />
                {errors.email && (<div className="invalid-feedback">{errors.email.message}</div>)}
            </div>

            {/* PASSWORD */}
            <div className="input-group mb-1">
                <span className="input-group-text"><i className="fa fa-lock fa-fw"></i></span>
                <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder="*****" {...register('password', { required: 'User password is required' })} />
                {errors.password && (<div className="invalid-feedback">{errors.password.message}</div>)}
            </div>

            <div className="d-grid gap-2 mt-2">
                <button className='btn btn-primary' type='submit' disabled={!isValid}>Register</button>
                <hr className='m-0' />
                <Link className='btn btn-secondary' type='button' to="/login">Login</Link>
            </div>
        </form>
    )
}

export default RegisterForm;