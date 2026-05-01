import { Box, Card, CardMedia, Container, Paper, TextField, Typography } from "@mui/material";

export default function PeliculaEspecifica() {
    return (
        <>
            <Box sx={{ minHeight: '100vh', bgcolor: '#f7fafc', display: 'flex', flexDirection: 'column' }}>
                <Container maxWidth={false} sx={{ mt: 2, mb: 4, flexGrow: 1, display: 'flex', px: { xs: 1, sm: 2, md: 4 } }}>
                    <Paper elevation={2} sx={{ p: { xs: 2, md: 5 }, backgroundColor: '#edf2f7', borderRadius: { xs: 0, md: 6 }, width: '100%', minHeight: '85vh', boxSizing: 'border-box', border: '1px solid #cbd5e0', display: 'flex', flexDirection: 'column' }}>
                        
                        <Box sx={{ mb: { xs: 4, md: 6 }, textAlign: 'center' }}>
                            <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: -3, fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }, background: 'linear-gradient(90deg, #003a54 0%, #005f8a 50%, #00a8e8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: '0px 10px 20px rgba(0,0,0,0.05)' }}>
                                Titulo de la Película
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4, alignItems: 'flex-start', justifyContent: 'center' }}>
                            
                            <Card sx={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', borderRadius: 5, bgcolor: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 8px 20px rgba(0,0,0,0.06)', transition: 'all 0.4s ease', padding: 3, flexShrink: 0, '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 25px 50px rgba(0,95,138,0.15)' } }}>
                                <Typography variant="body2" sx={{ color: '#4a5568', lineHeight: 1.7, display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, fontSize: '0.95rem', mt: 1 }}>
                                    Esta es la descripción de la película que el usuario lee.
                                </Typography>
                                <Box sx={{ mt: 3 }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, mt: 2 }}>
                                        Género:
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                        Director:
                                    </Typography>
                                </Box>
                            </Card>

                            <Box sx={{ flexGrow: 1, width: '100%', maxWidth: 1000 }}>
                                
                                <Paper elevation={8} sx={{ width: '100%', borderRadius: 4, overflow: 'hidden', bgcolor: 'black' }}>
                                    <CardMedia
                                        component="video"
                                        controls
                                        src=""
                                        sx={{ width: '100%', aspectRatio: '16/9', display: 'block', objectFit: 'contain' }}
                                    />
                                </Paper>

                                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mt: 4, alignItems: 'flex-start' }}>
                                    
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                            Valoración: Número de valoración de la película
                                        </Typography>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                            Valoración: Número de valoración del público sobre la pelicula con número de estrellas
                                        </Typography>
                                    </Box>

                                    <Box sx={{ flex: 1.5, width: '100%' }}>
                                        <TextField 
                                            label="Comentario" 
                                            placeholder="Comentario del usuario" 
                                            multiline 
                                            rows={4} 
                                            fullWidth 
                                            variant="outlined" 
                                        />
                                    </Box>

                                </Box>
                            </Box>

                        </Box>
                    </Paper>
                </Container>
            </Box>
        </>
    );
}