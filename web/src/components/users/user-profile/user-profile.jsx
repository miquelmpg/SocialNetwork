import { useForm } from 'react-hook-form';
import * as ApiService from '../../../services/api-service';
import * as DateUtils from '../../../utils/date-utils';

function UserProfile({ id, userName, email, password, bio, firstName, lastName, location, gender, birthday }) {
    const defaultValues = {
        firstName,
        lastName,
        gender,
        birthday: DateUtils.dateToString(birthday)[0],
        location,
        userName,
        email,
        password,
        bio,
    }

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({defaultValues});


    const onSubmit = async (data) => {
        if (!data.password) {
            delete data.password;
        }
        await ApiService.updateProfile(id, data);
    };
    
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
                <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder="*****" {...register('password')} />
                {errors.password && (<div className="invalid-feedback">{errors.password.message}</div>)}
            </div>

            {/* FIRST NAME */}
            <div className="input-group mb-1">
                <span className="input-group-text"><i className="fa fa-user fa-fw"></i></span>
                <input type="text" className={`form-control ${errors.userName ? 'is-invalid' : ''}`} placeholder="Enter your username" {...register('firstName', { required: 'User userName is required' }) }/>
                {errors.userName && (<div className="invalid-feedback">{errors.userName.message}</div> )}
            </div>

            {/* LAST NAME */}
            <div className="input-group mb-1">
                <span className="input-group-text"><i className="fa fa-user fa-fw"></i></span>
                <input type="text" className={`form-control ${errors.userName ? 'is-invalid' : ''}`} placeholder="Enter your username" {...register('lastName', { required: 'User userName is required' }) }/>
                {errors.userName && (<div className="invalid-feedback">{errors.userName.message}</div> )}
            </div>

            {/* BIO */}
            <div className="input-group mb-1">
                <span className="input-group-text"><i className="fa fa-user fa-fw"></i></span>
                <input type="text" className={`form-control ${errors.userName ? 'is-invalid' : ''}`} placeholder="Enter your username" {...register('bio', { required: 'User userName is required' }) }/>
                {errors.userName && (<div className="invalid-feedback">{errors.userName.message}</div> )}
            </div>

            {/* LOCATION */}
            <div className="input-group mb-1">
                <span className="input-group-text"><i className="fa fa-user fa-fw"></i></span>
                <input type="text" className={`form-control ${errors.userName ? 'is-invalid' : ''}`} placeholder="Enter your username" {...register('location', { required: 'User userName is required' }) }/>
                {errors.userName && (<div className="invalid-feedback">{errors.userName.message}</div> )}
            </div>

            {/* GENDER */}
            <div className="input-group mb-1">
                <span className="input-group-text"><i className="fa fa-user fa-fw"></i></span>
                <input type="text" className={`form-control ${errors.userName ? 'is-invalid' : ''}`} placeholder="Enter your username" {...register('gender', { required: 'User userName is required' }) }/>
                {errors.userName && (<div className="invalid-feedback">{errors.userName.message}</div> )}
            </div>

            {/* BIRTHDAY */}
            <div className="input-group mb-1">
                <span className="input-group-text"><i className="fa fa-user fa-fw"></i></span>
                <input type="text" className={`form-control ${errors.userName ? 'is-invalid' : ''}`} placeholder="Enter your username" {...register('birthday', { required: 'User userName is required' }) }/>
                {errors.userName && (<div className="invalid-feedback">{errors.userName.message}</div> )}
            </div>

            <div className="d-grid gap-2 mt-2">
                <button className='btn btn-primary' type='submit' disabled={!isValid}>Update</button>
                <hr className='m-0' />
            </div>
        </form>
    );
}

export default UserProfile;