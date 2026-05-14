import { CloudUpload, MovieFilter } from "@mui/icons-material"
import { Box, Button, Container, Grid, LinearProgress, Paper, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams, useLocation } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { useLanguage } from "../context/LanguageContext"
import { useTheme } from "../context/ThemeContext"
import { editarResena, getOneResena } from "../service/resenasService"
import type { ResenaEspecifica } from "../types/resenas"

type DetalleResena = {
    id: string,
    comentario: string,
    numeroEstrellas: number,
    peliculaId: string
}

const DefaultDetalleResena: DetalleResena = {
    id: "",
    comentario: "",
    numeroEstrellas: 0,
    peliculaId: ""
}

export default function EditarResena() {
    const [datosResena, setDatosResena] = useState<DetalleResena>(DefaultDetalleResena);
    const { id } = useParams() as { id: string };
    const location = useLocation();
    const [useErrorMsg, setErrorMsg] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    const { theme } = useTheme();
    const { t } = useLanguage();

    useEffect(() => {
        if (location.state?.idPelicula) {
            setDatosResena(prev => ({ ...prev, peliculaId: location.state.idPelicula }));
        }

        if(id){
            getOneResena(id).then(response => {
                if(response.ok && response.data) {
                    setDatosResena({
                        id: response.data.id,
                        comentario: response.data.comentario,
                        numeroEstrellas: response.data.numeroEstrellas,
                        peliculaId: response.data.peliculaId || location.state.idPelicula
                    });
                }
            }).catch((err: Error) => {
                setErrorMsg(err.message)
            })
        }
    }, [id, location.state]);

    const editarComentario = (a: React.ChangeEvent<HTMLInputElement>) => {
        setDatosResena({ ...datosResena, comentario: a.target.value })
    }

    const editarNumeroEstrellas = (a: React.ChangeEvent<HTMLInputElement>) => {
        const valorOriginal = a.target.value;

        if (valorOriginal === "") {
            setDatosResena({ ...datosResena, numeroEstrellas: 0 });
            return;
        }

        const valorNumerico = Number(valorOriginal);

        if (!isNaN(valorNumerico) && valorNumerico >= 0 && valorNumerico <= 10) {
            setDatosResena({ ...datosResena, numeroEstrellas: valorNumerico });
        }
    }

    const botonEditarResena = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        setLoading(true);
        setProgress(0);
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= 95) return 95;
                const diff = Math.random() * 15;
                return Math.min(oldProgress + diff, 95);
            });
        }, 150);

        try {
            const resenaParaEnviar: ResenaEspecifica = {
                id: datosResena.id,
                comentario: datosResena.comentario,
                numeroEstrellas: datosResena.numeroEstrellas,
                peliculaId: datosResena.peliculaId
            };

            const respuesta = await editarResena(id, resenaParaEnviar)

            if (respuesta.ok) {
                clearInterval(timer);
                setProgress(100);
                setTimeout(() => {
                    setLoading(false);
                    navigate(`/pelicula/${datosResena.peliculaId}`);
                }, 800);
            } else {
                clearInterval(timer);
                setLoading(false);
                setProgress(0);
                setErrorMsg("Error al actualizar la reseña");
            }
        } catch (error) {
            clearInterval(timer);
            setLoading(false);
            setProgress(0);
            console.log(error);
        }
    } 

    return (
        <Box sx={{ minHeight: '100vh', background: theme === 'dark' ? '#0f172a' : 'linear-gradient(90deg, #005f8a 30%, #f06b06 100%)', display: 'flex', flexDirection: 'column', backgroundAttachment: 'fixed' }}>
            <Header />
            <Container maxWidth={false} sx={{ mt: 2, mb: 4, flexGrow: 1, display: 'flex', px: { xs: 1, sm: 2, md: 4 }, justifyContent: 'center', alignItems: 'center' }}>
                <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, background: 'linear-gradient(135deg, #e0f2f9 0%, #fff0e6 100%)', borderRadius: { xs: 0, md: 6 }, width: '100%', maxWidth: '600px', boxSizing: 'border-box', border: '2px solid #fff', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 12, gap: 4 }}>
                            <Typography variant="h4" sx={{ fontWeight: 900, color: '#005f8a', textAlign: 'center' }}>{t("textLoadingContentEditFilm")}</Typography>
                            <Box sx={{ width: '100%', maxWidth: '500px' }}>
                                <LinearProgress variant="determinate" value={progress} sx={{ height: 16, borderRadius: 8, bgcolor: 'rgba(0,0,0,0.05)', '& .MuiLinearProgress-bar': { borderRadius: 8, background: 'linear-gradient(90deg, #005f8a, #f06b06)' } }} />
                                <Typography sx={{ color: '#005f8a', mt: 3, textAlign: 'center', fontWeight: 900, fontSize: '1.2rem' }}>{Math.round(progress)}% COMPLETADO</Typography>
                            </Box>
                        </Box>
                    ) : (
                        <Box component="form" onSubmit={botonEditarResena}>
                            {useErrorMsg && (
                                <Box sx={{ mb: 4, borderRadius: 3, border: '1px solid #f70505', backgroundColor: '#fff5f5', p: 2, color: '#f70505', textAlign: 'center', fontWeight: 900 }}>{useErrorMsg}</Box>
                            )}

                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, mb: 4 }}>
                                <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                    <Button 
                                        component={Link} 
                                        to={"/pelicula/" + datosResena.peliculaId} 
                                        variant="contained" 
                                        sx={{ position: 'absolute', left: 0, bgcolor: '#005f8a', borderRadius: 3, textTransform: 'none', fontWeight: 900, py: 1.2, '&:hover': { bgcolor: '#f06b06' } }}
                                    >
                                        {t("buttonBack")}
                                    </Button>
                                    <MovieFilter sx={{ color: '#005f8a', fontSize: 50 }} />
                                </Box>
                                <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: -2, color: '#005f8a', fontSize: { xs: '2rem', md: '3rem' }, textAlign: 'center', mt: 2 }}>Editar Reseña</Typography>
                                <Typography variant="body1" sx={{ color: '#f06b06', mt: 0.5, fontWeight: 800, fontSize: '1rem', letterSpacing: 2, textAlign: 'center' }}>{t("descriptionEditFilm")}</Typography>
                            </Box>

                            <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
                                <Grid size={{ xs: 12 }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, px: { md: 2 } }}>
                                        <TextField required fullWidth label="Puntuación" variant="outlined" value={datosResena.numeroEstrellas === 0 ? "" : datosResena.numeroEstrellas} type="number" onChange={editarNumeroEstrellas} slotProps={{ htmlInput: { min: 1, max: 10, step: 0.1 } }} sx={{ bgcolor: '#fff', borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: 3, fontWeight: 600 } }} />
                                        <TextField required fullWidth label="Comentario de Opinión" variant="outlined" value={datosResena.comentario} multiline rows={6} onChange={editarComentario} sx={{ bgcolor: '#fff', borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: 3, fontWeight: 600 } }} />
                                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                                            <Button type="submit" variant="contained" fullWidth startIcon={<CloudUpload />} sx={{ bgcolor: '#005f8a', color: '#fff', borderRadius: 4, textTransform: 'none', fontWeight: 900, py: 2, fontSize: '1.2rem', boxShadow: '0 10px 20px rgba(0,95,138,0.2)', transition: 'all 0.3s ease', '&:hover': { bgcolor: '#f06b06', transform: 'translateY(-4px)', boxShadow: '0 15px 25px rgba(240,107,6,0.3)' } }}>{t("buttonSaveChanges")}</Button>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </Paper>
            </Container>
            <Footer />
        </Box>
    )
}