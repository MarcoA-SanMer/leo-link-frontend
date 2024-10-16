import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UpdateEventF.css';
import UserNavbar from '../UserNavbar/UserNavbar';
import Swal from 'sweetalert2';

function UpdateEventF() {
    const { id } = useParams();
    const [eventData, setEventData] = useState({});
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState(null);
    const [eliminarImagen, setEliminarImagen] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [currentUserData, setCurrentUserData] = useState(null);
    const navigate = useNavigate();
    
    //categorias
    const [categorias, setCategorias] = useState([]);
    const [categoriaPrincipal, setCategoriaPrincipal] = useState('');
    const [categoriasAsociadas, setCategoriasAsociadas] = useState([]);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/events/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access')}`
                    }
                });
                setEventData(response.data);
                setNombre(response.data.nombre || '');
                setDescripcion(response.data.descripcion || '');
                setCategoriaPrincipal(response.data.categoria_p || '');
                setCategoriasAsociadas(response.data.categorias_ids || []);
            } catch (error) {
                setError('Error fetching event');
                console.error(error);
                navigate('/showAllEvents');
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/categories/');
                setCategorias(response.data);
            } catch (error) {
                setError('Error fetching categories');
            }
        };

        const fetchUserProfile = async () => {
            const token = localStorage.getItem('access');

            if (!token) {
                setError('No token found');
                return;
            }

            try {
                const response = await axios.get('http://localhost:8000/api/user/profile/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setCurrentUserData(response.data);
            } catch (error) {
                setError('Error fetching user profile');
                console.error(error);
            }
        };

        fetchEvent();
        fetchCategories();
        fetchUserProfile();
    }, [id, navigate]);

    //Validamos que el usuario sea el dueño del evento
    useEffect(() => {
        if (eventData.usuario && currentUserData) {
            if (currentUserData.id !== eventData.usuario.id) {
                navigate('/showAllEvents');
            } else {
                return;
            }
        }
    }, [eventData, currentUserData, navigate]);


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Validación de nombre y descripción
        if (!nombre.trim() || !descripcion.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Nombre y descripción son obligatorios',
            });
            return;
        }
    
        if (!categoriaPrincipal) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La categoría principal es obligatoria',
            });
            return;
        }
    
        const token = localStorage.getItem('access');
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se encontró token de autenticación',
            });
            return;
        }
    
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
    
        if (eliminarImagen && !imagen) {
            formData.append('eliminar_imagen', true); // Mandar una señal al backend de que se debe eliminar la imagen
        } else if (imagen) {
            formData.append('imagen', imagen); // Subir nueva imagen si está presente
        }
    
        formData.append('categoria_p', categoriaPrincipal);
        formData.append('categorias_ids', categoriasAsociadas.filter(id => id !== categoriaPrincipal).join(',')); // Excluye la categoría principal si está en categorías asociadas
    
        try {
            await axios.put(`http://localhost:8000/api/events/${id}/`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
    
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Evento actualizado correctamente',
            }).then(() => {
                navigate('/showAllEvents');
            });
    
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al actualizar el evento',
            });
        }
    };


    const handleCategoriaPrincipalChange = (e) => {
        const nuevaCategoria = e.target.value;
        
        // Encontrar la categoría anterior si existe
        const categoriaAnterior = categorias.find(categoria => categoria.nombre === categoriaPrincipal);
        
        // Encontrar la nueva categoría
        const categoriaSeleccionada = categorias.find(categoria => categoria.nombre === nuevaCategoria);
        
        // Si el valor es vacío, eliminar la categoría anterior de categoriasAsociadas
        if (nuevaCategoria === "") {
          if (categoriaAnterior) {
            setCategoriasAsociadas(prevCategoriasAsociadas =>
              prevCategoriasAsociadas.filter(id => id !== categoriaAnterior.id)
            );
          }
        } else {
          // Si hay una categoría anterior, eliminamos su ID de categoriasAsociadas
          if (categoriaAnterior) {
            setCategoriasAsociadas(prevCategoriasAsociadas =>
              prevCategoriasAsociadas.filter(id => id !== categoriaAnterior.id)
            );
          }
          
          // Actualizamos la categoría principal
          setCategoriaPrincipal(nuevaCategoria);
          
          // Si hay una categoría seleccionada, añadimos su ID a categoriasAsociadas
          if (categoriaSeleccionada) {
            setCategoriasAsociadas(prevCategoriasAsociadas =>
              [...prevCategoriasAsociadas, categoriaSeleccionada.id]
            );
          }
        }
      };

    return (
        <div>
            <UserNavbar/>
            <div className="bg-light">
                <div className="container-fluid single-section bg-light d-flex">
                    <div className="container align-self-center justify-content-center d-flex">
                    <div className="row">
                        <div className="justify-content-center text-center text-light">
                        <h1 className="main-register-title mt-5">Modificar Evento</h1>
                        </div>
                        <div className="col-12 bg-light p-5 form-register bg-light">
                            {/* Formulario */}
                            <form className="m-auto p-5" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombre"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                                    <textarea
                                        className="form-control"
                                        id="descripcion"
                                        value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="imagen" className="form-label">Imagen (Opcional)</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="imagen"
                                        accept="image/*"
                                        onChange={(e) => setImagen(e.target.files[0])}
                                    />
                                </div>

                                {eventData.imagen && (
                                    <div className="mb-3">
                                        <label className="form-check-label">
                                            <input
                                                type="checkbox"
                                                className="form-check-input me-1"
                                                checked={eliminarImagen}
                                                onChange={(e) => setEliminarImagen(e.target.checked)}
                                            />
                                            Eliminar imagen actual
                                        </label>
                                    </div>
                                )}

                                <div className="mb-3">
                                    <label htmlFor="categoriaPrincipal" className="form-label">Categoría Principal</label>
                                    <select
                                        className="form-select"
                                        id="categoriaPrincipal"
                                        value={categoriaPrincipal}
                                        onChange={handleCategoriaPrincipalChange}
                                        required
                                    >
                                        <option value="">Selecciona una categoría</option>
                                        {categorias.map(categoria => (
                                            <option key={categoria.id} value={categoria.nombre}>
                                                {categoria.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="categoriasAsociadas" className="form-label">Categorías Asociadas</label>
                                    <select
                                        className="form-select"
                                        id="categoriasAsociadas"
                                        multiple
                                        value={categoriasAsociadas}
                                        onChange={(e) => setCategoriasAsociadas([...e.target.selectedOptions].map(option => option.value))}
                                    >
                                        {categorias
                                            .filter(categoria => categoria.nombre !== categoriaPrincipal) // Filtra la categoría principal
                                            .map(categoria => (
                                                <option key={categoria.id} value={categoria.id}>
                                                    {categoria.nombre}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                <button type="submit" className="btn btn-primary mt-3">Actualizar Evento</button>

                                {error && <div className="mt-3 text-danger">{error}</div>}
                                {success && <div className="mt-3 text-success">{success}</div>}
                            </form>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateEventF;