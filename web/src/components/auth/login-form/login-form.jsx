import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useAuth } from '../../../contexts/auth-context';

function LoginForm() {
    const navigate = useNavigate();
    const { userLogin } = useAuth();
    const { register, handleSubmit, formState: { errors, isValid } } = useForm();
    const [serverError, setServerError] = useState(null);

    const onSubmit = async (data) => {
        try {
            await userLogin(data.email, data.password);
            navigate("/");
        } catch (err) {
            setServerError("Wrong credentials");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

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
            <button className='btn btn-primary' type='submit' disabled={!isValid}>Login</button>
            <hr className='m-0' />
            <Link className='btn btn-secondary' type='button' to="/register">Register</Link>
        </div>
        </form>
    )
}

export default LoginForm;