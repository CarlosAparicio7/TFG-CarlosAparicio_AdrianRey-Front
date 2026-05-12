import { Search, ArrowBack } from "@mui/icons-material";
import { Box, Button, Card, CardContent, CardMedia, Container, Grid, InputAdornment, Paper, Rating, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { getBorradores, aceptarPelicula, borrarPelicula } from "../service/peliculasService";

type getAllPeliculas = {
    id: string,
    nombre: string,
    portada: string,
    descripcion: string,
    director: string,
    genero: string,
    valoracion: number
}

export default function ControlPeliculas() {
    const [usePeliculas, setPeliculas] = useState<getAllPeliculas[]>([]);
    const [useErrorMsg, setErrorMsg] = useState<string>('');
    const [filtroTexto, setFiltroTexto] = useState('');

    const { theme } = useTheme();
    const { t } = useLanguage();

    useEffect(() => {
        getBorradores().then(response => {
            if (response.ok && response.data) {
                const allPeliculas = response.data.map((a: any) => ({
                    id: a.id,
                    nombre: a.nombre,
                    portada: a.portada,
                    descripcion: a.descripcion,
                    director: a.director,
                    genero: a.genero,
                    valoracion: a.valoracion
                }));
                setPeliculas(allPeliculas);
            }
        }).catch((err: Error) => {
            setErrorMsg(err.message);
        });
    }, []);

    const handleAceptar = async (id: string) => {
        const result = await aceptarPelicula(id);
        if (result.ok) {
            setPeliculas(prev => prev.filter(p => p.id !== id));
        }
    };

    const handleRechazar = async (id: string) => {
        const result = await borrarPelicula(id);
        if (result.ok) {
            setPeliculas(prev => prev.filter(p => p.id !== id));
        }
    };

    const normalizarTexto = (texto: string) => 
        texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    const peliculasFiltradas = usePeliculas.filter(pelicula => 
        normalizarTexto(pelicula.nombre).includes(normalizarTexto(filtroTexto))
    );

    return (
        <Box sx={{ minHeight: '100vh', background: theme === 'dark' ? '#0f172a' : 'linear-gradient(90deg, #005f8a 30%, #f06b06 100%)', display: 'flex', flexDirection: 'column', backgroundAttachment: 'fixed' }}>
            <Header />
            <Container maxWidth={false} sx={{ mt: 2, mb: 4, flexGrow: 1, display: 'flex', px: { xs: 1, sm: 2, md: 4 } }}>
                <Paper elevation={0} sx={{ p: { xs: 2, md: 5 }, backgroundColor: 'rgba(255, 255, 255, 0.12)', borderRadius: { xs: 0, md: 6 }, width: '100%', minHeight: '85vh', boxSizing: 'border-box', border: '1px solid rgba(255, 255, 255, 0.2)', display: 'flex', flexDirection: 'column', backdropFilter: 'blur(20px)', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)', position: 'relative' }}>               

                    <Box sx={{ mb: { xs: 4, md: 6 }, textAlign: 'center', position: 'relative' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, position: 'relative', minHeight: '100px' }}>
                            
                            <Box sx={{ position: 'absolute', left: 0, bgcolor: 'rgba(240, 107, 6, 0.3)', border: '2px solid #f06b06', borderRadius: 3, px: 3, py: 1, boxShadow: '0 0 20px rgba(240, 107, 6, 0.5)', textAlign: 'center', display: { xs: 'none', md: 'block' } }}>
                                <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: '1.5rem', lineHeight: 1 }}>
                                    {peliculasFiltradas.length}
                                </Typography>
                                <Typography sx={{ color: '#ffd1b3', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', mt: 0.5 }}>
                                    Borradores
                                </Typography>
                            </Box>

                            <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: -3, fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }, color: '#fff', textShadow: '0px 10px 20px rgba(0,0,0,0.3)' }}>
                                Panel de Control
                            </Typography>

                            <Button 
                                component={Link} 
                                to="/" 
                                variant="contained" 
                                startIcon={<ArrowBack />}
                                sx={{ position: 'absolute', right: 0, bgcolor: '#005f8a', borderRadius: 3, textTransform: 'none', fontWeight: 900, py: 2.5, px: 4, fontSize: '1.2rem', display: { xs: 'none', md: 'flex' }, '&:hover': { bgcolor: '#004a6d' } }}
                            >
                                Volver
                            </Button>
                        </Box>

                        <Typography variant="body1" sx={{ color: '#ffd1b3', mb: 5, fontWeight: 700, fontSize: '1.2rem', letterSpacing: 1 }}>
                            Revisa y gestiona las películas pendientes de publicación
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                            <TextField 
                                size="medium" 
                                placeholder={t("textSearchFilm")} 
                                value={filtroTexto}
                                onChange={(e) => setFiltroTexto(e.target.value)}
                                slotProps={{ 
                                    input: { 
                                        startAdornment: <InputAdornment position="start"><Search sx={{ color: '#ffd1b3', fontSize: '1.4rem' }} /></InputAdornment>, 
                                        sx: { color: '#fff', bgcolor: 'rgba(0, 0, 0, 0.2)', borderRadius: 3, height: 56, width: { xs: '100%', sm: 450 }, border: '1px solid rgba(255, 255, 255, 0.2)', '& fieldset': { border: 'none' } } 
                                    } 
                                }}
                            />
                        </Box>
                    </Box>

                    {useErrorMsg ? (
                        <Box sx={{ mb: 4, mx: 'auto', borderRadius: 3, border: '1px solid rgba(255, 255, 255, 0.4)', backgroundColor: 'rgba(255, 255, 255, 0.15)', padding: '10px 20px', fontSize: '1rem', color: '#f70505', textAlign: 'center', width: '90%', maxWidth: '1100px', boxSizing: 'border-box', backdropFilter: 'blur(10px)', fontWeight: 800 }}>
                            {t("textError")} {useErrorMsg}
                        </Box>
                    ) : peliculasFiltradas.length === 0 ? (
                        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', mb: 18 }}>
                            <Typography variant="h4" sx={{ color: '#ffd1b3', fontWeight: 900, mb: 1, textShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
                                No hay películas pendientes de revisión
                            </Typography>
                            <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600, fontSize: '1.1rem' }}>
                                Todo está al día. Esta página está vacía.
                            </Typography>
                        </Box>
                    ) : (
                        <Grid container spacing={3} sx={{ width: '100%', margin: 0 }}>
                            {peliculasFiltradas.map(pelicula => (
                                <Grid key={pelicula.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }} sx={{ display: 'flex' }}>
                                    <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column', borderRadius: 5, background: 'linear-gradient(135deg, #007bb3 0%, #f18a3a 100%)', border: '1px solid rgba(255, 255, 255, 0.4)', boxShadow: '0 15px 35px rgba(0,0,0,0.3)', transition: 'all 0.4s ease', '&:hover': { transform: 'translateY(-12px)', boxShadow: '0 25px 50px rgba(0,0,0,0.4)', border: '1px solid #fff' } }}>
                                        
                                        <Box sx={{ m: 2, borderRadius: 4, overflow: 'hidden', position: 'relative', boxShadow: '0 10px 20px rgba(0,0,0,0.2)', bgcolor: '#003a54', height: 420 }}>
                                            <CardMedia component="img" src={pelicula.portada} alt="Poster" sx={{ height: '100%', width: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', '&:hover': { transform: 'scale(1.08)' } }} />
                                        </Box>

                                        <CardContent sx={{ flexGrow: 1, p: 3, pt: 1, display: 'flex', flexDirection: 'column' }}>
                                            <Typography variant="h6" noWrap sx={{ fontWeight: 900, mb: 0.5, color: '#e0f2fe', fontSize: '1.4rem' }}>
                                                {pelicula.nombre}
                                            </Typography>
                                            
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <Rating value={pelicula.valoracion / 2} precision={0.5} size="small" readOnly />
                                                <Box sx={{ ml: 1.5, bgcolor: '#f06b06', px: 1.5, py: 0.3, borderRadius: 2 }}>
                                                    <Typography variant="caption" sx={{ fontWeight: 900, color: '#fff', fontSize: '0.9rem' }}>
                                                        {pelicula.valoracion}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                                    <Typography variant="body2" sx={{ color: '#fff', bgcolor: 'rgba(0, 58, 84, 0.7)', borderRadius: 2, px: 1.5, py: 0.3, lineHeight: 1.7, fontSize: '0.9rem', fontWeight: 500 }}>
                                                        {pelicula.director}
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            <Typography variant="body2" sx={{ color: '#f1f5f9', lineHeight: 1.7, display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, fontSize: '1.05rem', fontWeight: 500 }}>
                                                {pelicula.descripcion}
                                            </Typography>
                                        </CardContent>

                                        <Box sx={{ p: 3, pt: 0, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                            <Button component={Link} to={"/pelicula/" + pelicula.id} variant="contained" fullWidth sx={{ bgcolor: '#005f8a', borderRadius: 3, textTransform: 'none', fontWeight: 900, py: 1.8, fontSize: '1.1rem', '&:hover': { bgcolor: '#004a6d' } }}>
                                                {t("buttonWatchFilm")}
                                            </Button>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Button onClick={() => handleAceptar(pelicula.id)} variant="contained" sx={{ flexGrow: 1, bgcolor: '#2e7d32', borderRadius: 3, textTransform: 'none', fontWeight: 900, py: 1.5, '&:hover': { bgcolor: '#1b5e20' } }}>
                                                    Aceptar
                                                </Button>
                                                <Button onClick={() => handleRechazar(pelicula.id)} variant="contained" sx={{ flexGrow: 1, bgcolor: '#d32f2f', borderRadius: 3, textTransform: 'none', fontWeight: 900, py: 1.5, '&:hover': { bgcolor: '#b71c1c' } }}>
                                                    Rechazar
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Paper>
            </Container>
            <Footer/>
        </Box>
    );
}