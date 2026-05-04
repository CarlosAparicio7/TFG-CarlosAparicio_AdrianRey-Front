import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Container, Grid, Paper, Rating, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getOnePelicula } from "../service/peliculasService";

type getOnePelicula = {
    id: string,
    nombre: string,
    portada: string,
    descripcion: string,
    director: string,
    genero: string,
    valoracion: number,
    urlVideo: string 
}

export default function PeliculaEspecifica() {

    const navigate = useNavigate();
    const [usePeliculaEspecifica, setPeliculaEspecifica] = useState<getOnePelicula>();
    const { id } = useParams() as { id: string };
    const [useErrorMsg, setErrorMsg] = useState<string>('');

    useEffect(() => {
        const user = localStorage.getItem('usuario');
        if (!user) {
            navigate('/login');
            return;
        }

        if (id) {
            getOnePelicula(id).then(response => {
                if (response.ok && response.data) {
                    setPeliculaEspecifica({
                        id: response.data.id,
                        nombre: response.data.nombre,
                        portada: response.data.portada,
                        descripcion: response.data.descripcion,
                        director: response.data.director,
                        genero: response.data.genero,
                        valoracion: response.data.valoracion,
                        urlVideo: response.data.urlVideo 
                    });
                } else if (!response.ok) {
                    console.log(response.error);
                }
            }).catch((error: Error) => {
                setErrorMsg(error.message);
            })
        }
    }, [id]);

    return (
        <>
            <Box sx={{ minHeight: '100vh', background: 'linear-gradient(90deg, #005f8a 30%, #f06b06 100%)', display: 'flex', flexDirection: 'column', backgroundAttachment: 'fixed' }}>
                <Header />
                <Container maxWidth={false} sx={{ mt: 2, mb: 4, flexGrow: 1, display: 'flex', px: { xs: 1, sm: 2, md: 4 } }}>
                    <Paper elevation={0} sx={{ p: { xs: 2, md: 5 }, backgroundColor: 'rgba(255, 255, 255, 0.12)', borderRadius: { xs: 0, md: 6 }, width: '100%', minHeight: '85vh', boxSizing: 'border-box', border: '1px solid rgba(255, 255, 255, 0.2)', display: 'flex', flexDirection: 'column', backdropFilter: 'blur(20px)', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)' }}>
                        
                        {useErrorMsg ? (
                            <Box
                                id="error-message"
                                sx={{ mb: 4, mx: 'auto', borderRadius: 3, border: '1px solid rgba(255, 255, 255, 0.4)', backgroundColor: 'rgba(255, 255, 255, 0.15)', padding: '10px 20px', fontSize: '1rem', color: '#f70505', textAlign: 'center', width: '90%', maxWidth: '1100px', boxSizing: 'border-box', backdropFilter: 'blur(10px)', fontWeight: 800, boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)', textTransform: 'uppercase', letterSpacing: 1 }}
                            >
                                Vaya, ha ocurrido un error. En este momento estamos trabajando en ello: {useErrorMsg}
                            </Box>
                        ) : (
                            <>
                                <Box sx={{ mb: { xs: 4, md: 6 }, textAlign: 'center' }}>
                                    <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: -3, fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }, color: '#fff', textShadow: '0px 10px 20px rgba(0,0,0,0.3)' }}>
                                        {usePeliculaEspecifica?.nombre}
                                    </Typography>
                                </Box>

                                <Grid container spacing={4}>
                                    <Grid size={{ xs: 12, lg: 4 }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
                                            <Card sx={{ borderRadius: 5, background: 'linear-gradient(135deg, #007bb3 0%, #f18a3a 100%)', border: '1px solid rgba(255, 255, 255, 0.4)', boxShadow: '0 15px 35px rgba(0,0,0,0.3)', p: 3, minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
                                                <CardContent sx={{ flexGrow: 1, p: 0 }}>
                                                    <Typography variant="h4" sx={{ color: '#e0f2fe', fontWeight: 900, mb: 4, borderBottom: '2px solid rgba(255,255,255,0.3)', pb: 2 }}>
                                                        SINOPSIS
                                                    </Typography>
                                                    <Typography variant="body1" sx={{ color: '#fff', lineHeight: 2.1, fontSize: '1.2rem', fontWeight: 500, textAlign: 'justify' }}>
                                                        {usePeliculaEspecifica?.descripcion}
                                                    </Typography>
                                                </CardContent>
                                                
                                                <Box sx={{ bgcolor: 'rgba(0,0,0,0.2)', p: 3, borderRadius: 4, mt: 4 }}>
                                                    <Typography variant="h6" sx={{ color: '#ffd1b3', fontWeight: 900, mb: 2, fontSize: '0.9rem', letterSpacing: 1.5 }}>DETALLES TÉCNICOS</Typography>
                                                    <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 700, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                                                        GÉNERO <span style={{ fontWeight: 900, color: '#ffd1b3' }}>{usePeliculaEspecifica?.genero}</span>
                                                    </Typography>
                                                    <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}>
                                                        DIRECTOR <span style={{ fontWeight: 900, color: '#ffd1b3' }}>{usePeliculaEspecifica?.director}</span>
                                                    </Typography>
                                                </Box>
                                            </Card>

                                            <Box sx={{ p: 4, borderRadius: 5, bgcolor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
                                                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 900, mb: 3, textAlign: 'center' }}>VALORACIONES</Typography>
                                                
                                                <Box sx={{ mb: 4 }}>
                                                    <Typography variant="overline" sx={{ color: '#ffd1b3', fontWeight: 900, fontSize: '0.9rem' }}>CRÍTICA OFICIAL</Typography>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                        <Rating value={(usePeliculaEspecifica?.valoracion ?? 0) / 2} precision={0.1} readOnly sx={{ '& .MuiRating-iconFilled': { color: '#f06b06' } }} />
                                                        <Typography variant="h4" sx={{ color: '#fff', fontWeight: 900 }}>{usePeliculaEspecifica?.valoracion}</Typography>
                                                    </Box>
                                                </Box>

                                                <Box>
                                                    <Typography variant="overline" sx={{ color: '#e0f2fe', fontWeight: 900, fontSize: '0.9rem' }}>COMUNIDAD</Typography>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                        <Rating value={4.2 /2} precision={0.1} readOnly sx={{ '& .MuiRating-iconFilled': { color: '#00a8e8' } }} />
                                                        <Typography variant="h4" sx={{ color: '#fff', fontWeight: 900 }}>4.2</Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid size={{ xs: 12, lg: 8 }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                            <Paper elevation={24} sx={{ width: '100%', borderRadius: 5, overflow: 'hidden', bgcolor: '#000', border: '2px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 60px rgba(0,0,0,0.6)', minHeight: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {usePeliculaEspecifica?.urlVideo ? (
                                                    <CardMedia 
                                                        component="video" 
                                                        controls 
                                                        src={`http://localhost:8080/videos/${usePeliculaEspecifica.urlVideo}`} 
                                                        sx={{ width: '100%', aspectRatio: '16/9', display: 'block', objectFit: 'contain' }} 
                                                    />
                                                ) : (
                                                    <Box sx={{ textAlign: 'center', color: '#fff' }}>
                                                        <CircularProgress color="inherit" sx={{ mb: 2 }} />
                                                        <Typography variant="h6" sx={{ fontWeight: 900 }}>Cargando Pelicula...</Typography>
                                                    </Box>
                                                )}
                                            </Paper>

                                            <Grid container spacing={4}>
                                                <Grid size={{ xs: 12, md: 6 }}>
                                                    <Box sx={{ p: 4, borderRadius: 5, bgcolor: 'rgba(255,255,255,0.95)', boxShadow: '0 15px 40px rgba(0,0,0,0.3)', height: '100%', boxSizing: 'border-box' }}>
                                                        <Box sx={{ mb: 3, borderBottom: '2px solid #e2e8f0', pb: 2 }}>
                                                            <Typography variant="h5" sx={{ color: '#005f8a', fontWeight: 900, letterSpacing: -1 }}>TU RESEÑA</Typography>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                                                                <Rating size="medium" sx={{ '& .MuiRating-iconFilled': { color: '#f06b06' } }} />
                                                            </Box>
                                                        </Box>
                                                        
                                                        <TextField 
                                                            label="Comparte tu opinión..." 
                                                            multiline 
                                                            rows={4} 
                                                            fullWidth 
                                                            variant="filled" 
                                                            slotProps={{ 
                                                                input: { sx: { fontWeight: 600, color: '#003a54', fontSize: '1rem', p: 2 } }, 
                                                                inputLabel: { sx: { fontWeight: 800, color: '#005f8a' } } 
                                                            }} 
                                                        />
                                                        
                                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                                            <Button variant="contained" sx={{ bgcolor: '#005f8a', fontWeight: 900, px: 4, py: 1.5, borderRadius: 3, fontSize: '0.9rem', boxShadow: '0 10px 20px rgba(0,95,138,0.3)', '&:hover': { bgcolor: '#003a54' } }}>
                                                                PUBLICAR
                                                            </Button>
                                                        </Box>
                                                    </Box>
                                                </Grid>

                                                <Grid size={{ xs: 12, md: 6 }}>
                                                    <Box sx={{ p: 4, borderRadius: 5, bgcolor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', boxShadow: '0 15px 40px rgba(0,0,0,0.3)', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
                                                        <Typography variant="h5" sx={{ color: '#fff', fontWeight: 900, mb: 3, borderBottom: '2px solid rgba(255,255,255,0.2)', pb: 2 }}>COMUNIDAD</Typography>
                                                        
                                                        <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1, maxHeight: '300px', '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '10px' } }}>
                                                            <Box sx={{ mb: 3, p: 2, bgcolor: 'rgba(0,0,0,0.2)', borderRadius: 3 }}>
                                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                                                                    <Typography sx={{ color: '#ffd1b3', fontWeight: 900, fontSize: '0.85rem', letterSpacing: 0.5 }}>USUARIO_88</Typography>
                                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                        <Rating size="small" value={4} readOnly sx={{ '& .MuiRating-iconFilled': { color: '#00a8e8' } }} />
                                                                        <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: '0.9rem' }}>4.0</Typography>
                                                                    </Box>
                                                                </Box>
                                                                <Typography sx={{ color: '#fff', fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.5 }}>¡Increíble producción! Me ha encantado el ritmo de la historia.</Typography>
                                                            </Box>

                                                            <Box sx={{ mb: 3, p: 2, bgcolor: 'rgba(0,0,0,0.2)', borderRadius: 3 }}>
                                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                                                                    <Typography sx={{ color: '#ffd1b3', fontWeight: 900, fontSize: '0.85rem', letterSpacing: 0.5 }}>CINEFILO_PRO</Typography>
                                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                        <Rating size="small" value={5} readOnly sx={{ '& .MuiRating-iconFilled': { color: '#00a8e8' } }} />
                                                                        <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: '0.9rem' }}>5.0</Typography>
                                                                    </Box>
                                                                </Box>
                                                                <Typography sx={{ color: '#fff', fontSize: '0.95rem', fontWeight: 500, lineHeight: 1.5 }}>Una obra maestra técnica. Los efectos visuales son de otro nivel.</Typography>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                                <Button component={Link} to={"/editarPelicula/" + usePeliculaEspecifica?.id} variant="contained" fullWidth sx={{ bgcolor: '#005f8a', borderRadius: 3, textTransform: 'none', fontWeight: 900, py: 1.8, fontSize: '1.1rem', marginTop: 2, '&:hover': { bgcolor: '#004a6d' } }}>
                                                    Editar Pelicula
                                                </Button>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </>
                        )}
                    </Paper>
                </Container>
                <Footer />
            </Box>
        </>
    );
}