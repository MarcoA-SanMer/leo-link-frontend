import React from 'react';
import './HomeUser.css';
import UserNavbar from '../UserNavbar/UserNavbar';
import { Helmet } from 'react-helmet';
import { useEffect } from 'react';

function HomeUser() {
    useEffect(() => {
        document.body.style.overflow = 'auto'; // Asegúrate de que el overflow esté habilitado
        return () => {
            document.body.style.overflow = ''; // Limpia el estilo cuando el componente se desmonta
        };
    }, []);

    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <UserNavbar />

            <style>
                {`
                    /* Estilo para hacer las flechas siempre visibles */
                    .carousel-control-prev,
                    .carousel-control-next {
                        width: 8%;
                        opacity: 0.7; /* Semi-transparente para no distraer demasiado */
                        transition: opacity 0.2s;
                    }

                    .carousel-control-prev:hover,
                    .carousel-control-next:hover {
                        opacity: 1; /* Opacidad completa al pasar el ratón sobre las flechas */
                    }

                    .carousel-control-prev-icon,
                    .carousel-control-next-icon {
                        background-color: rgba(0, 0, 0, 0.5); /* Fondo oscuro para mejorar la visibilidad */
                        border-radius: 50%;
                    }
                `}
            </style>
            
            {/* iNICIO */}
            <section className="container my-5">
                <div className="d-flex align-items-center mb-4">
                    <span>
                        <i className="fa-solid fa-house house-main" />
                    </span>
                    <div className="d-flex align-items-center w-100 mx-2">
                        <h2>Inicio</h2>
                    </div>
                </div>

                <div className="d-flex align-items-center mb-4">
                    <div className="d-flex align-items-center w-100 mx-2">
                        <h2>Recomendados</h2>
                        <div className="flex-grow-1 ms-2">
                            <hr />
                        </div>
                    </div>
                </div>

                {/* Carousel para Inicio */}
                <div id="inicioCarousel" className="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="row">
                                <div className="col-md-4 mb-4">
                                    <div className="card preview-event-home">
                                        <div className="ratio ratio-16x9">
                                            <img src="./img/event-1.jpg" alt="Event" className="w-100 h-100 object-fit-cover" />
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Evento Ejemplo</h5>
                                            <p className="card-text">Texto evento ejemplo.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <div className="card preview-event-home">
                                        <div className="ratio ratio-16x9">
                                            <img src="./img/event-1.jpg" alt="Event" className="w-100 h-100 object-fit-cover" />
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Evento Ejemplo</h5>
                                            <p className="card-text">Texto evento ejemplo.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <div className="card preview-event-home">
                                        <div className="ratio ratio-16x9">
                                            <img src="./img/event-1.jpg" alt="Event" className="w-100 h-100 object-fit-cover" />
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Evento Ejemplo</h5>
                                            <p className="card-text">Texto evento ejemplo.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Puedes añadir más slides aquí si es necesario */}
                        <div className="carousel-item">
                            <div className="row">
                                <div className="col-md-4 mb-4">
                                    <div className="card preview-event-home">
                                        <div className="ratio ratio-16x9">
                                            <img src="./img/event-2.jpg" alt="Event" className="w-100 h-100 object-fit-cover" />
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Evento 2</h5>
                                            <p className="card-text">Texto evento ejemplo.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <div className="card preview-event-home">
                                        <div className="ratio ratio-16x9">
                                            <img src="./img/event-2.jpg" alt="Event" className="w-100 h-100 object-fit-cover" />
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Evento 2</h5>
                                            <p className="card-text">Texto evento ejemplo.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <div className="card preview-event-home">
                                        <div className="ratio ratio-16x9">
                                            <img src="./img/event-2.jpg" alt="Event" className="w-100 h-100 object-fit-cover" />
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Evento 2</h5>
                                            <p className="card-text">Texto evento ejemplo.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#inicioCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#inicioCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </section>
            
            {/* EVENTOS */}
            <section className="container my-5">
                <div className="d-flex align-items-center w-100 mb-4">
                    <h2>Próximos eventos</h2>
                    <div className="flex-grow-1 ms-2">
                        <hr />
                    </div>
                </div>
                
                {/* Carousel para Eventos */}
                <div id="eventosCarousel" className="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="row">
                                <div className="col-md-4 mb-4">
                                    <div className="card preview-event-home">
                                        <div className="ratio ratio-16x9">
                                            <img src="./img/event-1.jpg" alt="Event" className="w-100 h-100 object-fit-cover" />
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Evento Ejemplo</h5>
                                            <p className="card-text">Texto evento ejemplo.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <div className="card preview-event-home">
                                        <div className="ratio ratio-16x9">
                                            <img src="./img/event-1.jpg" alt="Event" className="w-100 h-100 object-fit-cover" />
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Evento Ejemplo</h5>
                                            <p className="card-text">Texto evento ejemplo.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <div className="card preview-event-home">
                                        <div className="ratio ratio-16x9">
                                            <img src="./img/event-1.jpg" alt="Event" className="w-100 h-100 object-fit-cover" />
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Evento Ejemplo</h5>
                                            <p className="card-text">Texto evento ejemplo.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Puedes añadir más slides aquí si es necesario */}
                    </div>
                    <button className="carousel-control-prev custom-carousel-control" type="button" data-bs-target="#eventosCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next custom-carousel-control" type="button" data-bs-target="#eventosCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </section>
            
            {/* PROFESIONALES */}
            <section className="container my-5">
                <div className="d-flex align-items-center w-100 mb-4">
                    <h2>Prácticas profesionales</h2>
                    <div className="flex-grow-1 ms-2">
                        <hr />
                    </div>
                </div>
                
                {/* Carousel para Profesionales */}
                <div id="profesionalesCarousel" className="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="row">
                                <div className="col-md-4 mb-4">
                                    <div className="card preview-event-home">
                                        <div className="ratio ratio-16x9">
                                            <img src="./img/event-1.jpg" alt="Event" className="w-100 h-100 object-fit-cover" />
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Práctica Ejemplo</h5>
                                            <p className="card-text">Texto evento ejemplo.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <div className="card preview-event-home">
                                        <div className="ratio ratio-16x9">
                                            <img src="./img/event-1.jpg" alt="Event" className="w-100 h-100 object-fit-cover" />
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Práctica Ejemplo</h5>
                                            <p className="card-text">Texto evento ejemplo.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <div className="card preview-event-home">
                                        <div className="ratio ratio-16x9">
                                            <img src="./img/event-1.jpg" alt="Event" className="w-100 h-100 object-fit-cover" />
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Práctica Ejemplo</h5>
                                            <p className="card-text">Texto evento ejemplo.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Puedes añadir más slides aquí si es necesario */}
                    </div>
                    <button className="carousel-control-prev custom-carousel-control" type="button" data-bs-target="#profesionalesCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next custom-carousel-control" type="button" data-bs-target="#profesionalesCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </section>
        </div>
    );
}

export default HomeUser;