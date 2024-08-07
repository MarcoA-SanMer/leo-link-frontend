import './PublicNavbar.css';
import { useNavigate } from 'react-router-dom';

function PublicNavbar() {

    const navigate = useNavigate();

    const handleLogInClick = () => {
        navigate('/signUp'); // Reemplaza '/dashboard' con la ruta a la que deseas redirigir
    };

    return (
        <>
            {/* Start Navbar */}
            <nav className="navbar navbar-expand-lg bg-dark sticky-top">
                <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img
                    src="../img/Logo-Universidad.png"
                    alt="logo universidad de guadalajara"
                    width={182}
                    height={84}
                    />
                </a>
                <button
                    className="navbar-toggler btn-outline-light text-white"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarScroll"
                    aria-controls="navbarScroll"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fa-solid fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarScroll">
                    <br />
                    <div className="d-flex ms-auto me-5">
                    <button className="btn btn-outline-light btn-md me-3" id="explore" type="button" onClick={handleLogInClick}>
                        Comienza a Explorar
                    </button>
                    <button className="btn btn-outline-light btn-md" id="log-in" type="button" onClick={handleLogInClick}>
                        Iniciar Sesión
                    </button>
                    </div>
                </div>
                </div>
            </nav>
            {/* End Navbar */}
        </>
    );
}

export default PublicNavbar;
