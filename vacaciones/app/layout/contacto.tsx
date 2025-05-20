import React, { useState } from 'react';
import Header from '~/components/Header';

const Contacto: React.FC = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        mensaje: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log('Formulario enviado:', formData);
        alert('Mensaje enviado correctamente');
        setFormData({ nombre: '', email: '', mensaje: '' });
    };

    return (
        <div className='bg-gradient-to-r from-blue-300 to-amber-200 '>
            <Header>

            </Header>

            <div className="max-w-xl mx-auto p-6 bg-white mt-5  rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">

                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-indigo-600 mb-2 transform hover:scale-105 transition-transform duration-200">
                        Contáctanos
                    </h1>
                    <p className="text-gray-500">¿Tienes alguna pregunta? Estaremos encantados de ayudarte.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 transition-all duration-200 transform translate-y-0 hover:translate-y-0.5">
                            Nombre
                        </label>
                        <input
                            type="text"
                            name="nombre"
                            id="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-indigo-300"
                            placeholder="Tu nombre completo"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 transition-all duration-200 transform translate-y-0 hover:translate-y-0.5">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-indigo-300"
                            placeholder="tucorreo@ejemplo.com"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 transition-all duration-200 transform translate-y-0 hover:translate-y-0.5">
                            Mensaje
                        </label>
                        <textarea
                            name="mensaje"
                            id="mensaje"
                            rows={5}
                            value={formData.mensaje}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-indigo-300"
                            placeholder="Escribe tu mensaje aquí..."
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.01] active:scale-100 flex items-center justify-center space-x-2"
                    >
                        <span>Enviar Mensaje</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>Te responderemos en un plazo máximo de 24 horas</p>
                </div>
            </div>
        </div>
    );
};

export default Contacto;
