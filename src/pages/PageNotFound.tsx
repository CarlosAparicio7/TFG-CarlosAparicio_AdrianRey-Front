import { Link } from "react-router-dom";

export default function PageNotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center p-4">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <h2 className="text-2xl mt-4">Página no encontrada</h2>
        <p className="text-gray-600 mt-2">
            La dirección no existe o ha cambiado.
        </p>
    
        <Link
            to="/"
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
            Volver al inicio
        </Link>
        </div>
  );
 
}