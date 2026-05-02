import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Paper, Rating, Typography } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { getAllPeliculas } from "../service/peliculasService";
import { Link } from "react-router-dom";

type getAllPeliculas = {
    id: string,
    nombre: string,
    portada: string,
    descripcion: string,
    director: string,
    genero: string,
    valoracion: number
}

export default function Home() {

    const [usePeliculas, setPeliculas] = useState<getAllPeliculas[]>([]);
    const [useErrorMsg, setErrorMsg] = useState<string>('');

    useEffect(()=>{
        getAllPeliculas().then(response =>{
            if(response.ok && response.data){
                const allPeliculas = response.data.map(a =>{
                    return{
                        id: a.id,
                        nombre: a.nombre,
                        portada: a.portada,
                        descripcion: a.descripcion,
                        director: a.director,
                        genero: a.genero,
                        valoracion: a.valoracion
                    }
                });
                setPeliculas(allPeliculas);
            }else if(!response.ok){
                console.log(response.error);
            }
        }).catch((useErrorMsg: Error)=>{
            setErrorMsg(useErrorMsg.message);
        });
    }, []);

    return (
<Box sx={{ minHeight: '100vh', background: 'linear-gradient(90deg, #005f8a 30%, #f06b06 100%)', display: 'flex', flexDirection: 'column', backgroundAttachment: 'fixed' }}>
            <Header />
            <Container maxWidth={false} sx={{ mt: 2, mb: 4, flexGrow: 1, display: 'flex', px: { xs: 1, sm: 2, md: 4 } }}>
                <Paper elevation={0} sx={{ p: { xs: 2, md: 5 }, backgroundColor: 'rgba(255, 255, 255, 0.12)', borderRadius: { xs: 0, md: 6 }, width: '100%', minHeight: '85vh', boxSizing: 'border-box', border: '1px solid rgba(255, 255, 255, 0.2)', display: 'flex', flexDirection: 'column', backdropFilter: 'blur(20px)', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)' }}>
                    
                    <Box sx={{ mb: { xs: 4, md: 8 }, textAlign: 'center' }}>
                        <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: -3, fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }, color: '#fff', textShadow: '0px 10px 20px rgba(0,0,0,0.3)' }}>
                            Cartelera de Películas
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#ffd1b3', mt: 1, fontWeight: 700, fontSize: '1.2rem', letterSpacing: 1 }}>
                            DESCUBRE • CALIFICA • DISFRUTA
                        </Typography>
                    </Box>

                    {useErrorMsg ?
                        <Box
                            id="error-message"
                            sx={{ mb: 4, mx: 'auto', borderRadius: 3, border: '1px solid rgba(255, 255, 255, 0.4)', backgroundColor: 'rgba(255, 255, 255, 0.15)', padding: '10px 20px', fontSize: '1rem', color: '#fff', textAlign: 'center', width: '90%', maxWidth: '1100px', boxSizing: 'border-box', backdropFilter: 'blur(10px)', fontWeight: 800, boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)', textTransform: 'uppercase', letterSpacing: 1 }}
                        >
                            Vaya, ha ocurrido un error. En este momento estamos trabajando en ello: {useErrorMsg}
                        </Box>
                    :
                    <Grid container spacing={3} sx={{ width: '100%', margin: 0 }}>
                        {usePeliculas.map(peliculas => (
                            <Grid key={peliculas.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }} sx={{ display: 'flex' }}>
                                <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column', borderRadius: 5, background: 'linear-gradient(135deg, #007bb3 0%, #f18a3a 100%)', border: '1px solid rgba(255, 255, 255, 0.4)', boxShadow: '0 15px 35px rgba(0,0,0,0.3)', transition: 'all 0.4s ease', '&:hover': { transform: 'translateY(-12px)', boxShadow: '0 25px 50px rgba(0,0,0,0.4)', border: '1px solid #fff' } }}>
                                    
                                    <Box sx={{ m: 2, borderRadius: 4, overflow: 'hidden', position: 'relative', boxShadow: '0 10px 20px rgba(0,0,0,0.2)', bgcolor: '#003a54', height: 420 }}>
                                        <CardMedia component="img" src={peliculas.portada} alt="Poster" sx={{ height: '100%', width: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', '&:hover': { transform: 'scale(1.08)' } }} />
                                    </Box>

                                    <CardContent sx={{ flexGrow: 1, p: 3, pt: 1, display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="h6" noWrap sx={{ fontWeight: 900, mb: 0.5, color: '#e0f2fe', fontSize: '1.4rem' }}>
                                            {peliculas.nombre}
                                        </Typography>
                                        
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Rating value={peliculas.valoracion / 2} precision={0.5} size="small" readOnly />
                                            <Box sx={{ ml: 1.5, bgcolor: '#f06b06', px: 1.5, py: 0.3, borderRadius: 2 }}>
                                                <Typography variant="caption" sx={{ fontWeight: 900, color: '#fff', fontSize: '0.9rem' }}>{peliculas.valoracion}</Typography>
                                            </Box>
                                        </Box>

                                        <Typography variant="body2" sx={{ color: '#f1f5f9', lineHeight: 1.7, display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, fontSize: '1.05rem', fontWeight: 500 }}>
                                            {peliculas.descripcion}
                                        </Typography>
                                    </CardContent>

                                    <Box sx={{ p: 3, pt: 0 }}>
                                        <Button component={Link} to={"/pelicula/" + peliculas.id} variant="contained" fullWidth sx={{ bgcolor: '#005f8a', borderRadius: 3, textTransform: 'none', fontWeight: 900, py: 1.8, fontSize: '1.1rem', '&:hover': { bgcolor: '#004a6d' } }}>
                                            Ver Película
                                        </Button>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    }
                </Paper>
            </Container>
            <Footer/>
        </Box>
    );
}