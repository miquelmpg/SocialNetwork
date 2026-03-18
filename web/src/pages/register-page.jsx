import { RegisterForm } from "../components/auth";

function RegisterPage() {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{width: '100%', height: `calc(100vh - 70px)`}}>
            <div className="d-flex flex-column justify-content-center rounded-4 pt-3 pb-3" style={{width: '500px', height: 'auto', backgroundColor: '#202020'}}>
                <RegisterForm />
            </div>
        </div>
    );
}

export default RegisterPage;