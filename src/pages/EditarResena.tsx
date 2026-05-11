type DetalleResena = {
    id: string,
    comentario: string,
    numeroEstrellas: number
}

const DefaultDetalleResena: DetalleResena = {
    id: "",
    comentario: "",
    numeroEstrellas: 0
}

type EditarResena = {
    id: string,
    comentario: string,
    numeroEstrellas: number
}

export default function EditarResena() {
    const [datosResena, setDatosResena] = useState<DetalleResena>(DefaultDetalleResena);
    return (
        <></>
    )
}