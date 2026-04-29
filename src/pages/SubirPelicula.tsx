import { Container, Box, Paper, Typography, TextField, Button, Grid } from "@mui/material";
import { MovieFilter, CloudUpload, AddPhotoAlternate, Movie } from "@mui/icons-material";
import Header from "../components/Header";

export default function SubirPelicula() {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f7fafc', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Container maxWidth={false} sx={{ mt: -2, mb: 4, flexGrow: 1, display: 'flex', px: { xs: 1, sm: 2, md: 4 }, justifyContent: 'center', alignItems: 'center' }}>
                <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, backgroundColor: '#edf2f7', borderRadius: 6, width: '100%', maxWidth: '950px', boxSizing: 'border-box', border: '1px solid #cbd5e0', display: 'flex', flexDirection: 'column' }}>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, mb: 4 }}>
                        <MovieFilter sx={{ color: '#005f8a', fontSize: 45 }} />
                        <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: -2, background: 'linear-gradient(90deg, #003a54 0%, #005f8a 50%, #00a8e8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: { xs: '2.2rem', md: '3rem' } }}>
                            Subir Película
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#2d3748', mt: 0.5, fontWeight: 700, fontSize: '1rem', letterSpacing: 1.5 }}>
                            NUEVO CONTENIDO
                        </Typography>
                    </Box>

                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                                <TextField fullWidth label="Nombre de la Película" variant="outlined" sx={{ bgcolor: '#fff', borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: 3, fontWeight: 600 } }} />
                                
                                <TextField fullWidth label="Director" variant="outlined" sx={{ bgcolor: '#fff', borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: 3, fontWeight: 600 } }} />
                                
                                <TextField fullWidth label="Géneros" variant="outlined" placeholder="Acción, Drama..." sx={{ bgcolor: '#fff', borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: 3, fontWeight: 600 } }} />

                                <TextField fullWidth label="Descripción" variant="outlined" multiline rows={5} sx={{ bgcolor: '#fff', borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: 3, fontWeight: 600 } }} />
                            </Box>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, height: '100%' }}>
                                <Box sx={{ flex: 1, border: '2px dashed #005f8a', borderRadius: 5, p: 3, textAlign: 'center', bgcolor: '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', '&:hover': { bgcolor: '#f0f7fa', borderColor: '#00a8e8', transform: 'scale(1.01)' } }}>
                                    <input accept="image/*" style={{ display: 'none' }} id="upload-image" type="file" />
                                    <label htmlFor="upload-image" style={{ cursor: 'pointer', width: '100%' }}>
                                        <AddPhotoAlternate sx={{ fontSize: 40, color: '#005f8a', mb: 1 }} />
                                        <Typography variant="h6" sx={{ fontWeight: 900, color: '#1a1a2e', fontSize: '1.1rem' }}>Imagen de Portada</Typography>
                                        <Typography variant="caption" sx={{ color: '#666', fontWeight: 500 }}>JPG, PNG o WEBP</Typography>
                                    </label>
                                </Box>

                                <Box sx={{ flex: 1, border: '2px dashed #005f8a', borderRadius: 5, p: 3, textAlign: 'center', bgcolor: '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', '&:hover': { bgcolor: '#f0f7fa', borderColor: '#00a8e8', transform: 'scale(1.01)' } }}>
                                    <input accept="video/*" style={{ display: 'none' }} id="upload-video" type="file" />
                                    <label htmlFor="upload-video" style={{ cursor: 'pointer', width: '100%' }}>
                                        <Movie sx={{ fontSize: 40, color: '#005f8a', mb: 1 }} />
                                        <Typography variant="h6" sx={{ fontWeight: 900, color: '#1a1a2e', fontSize: '1.1rem' }}>Archivo de Video</Typography>
                                        <Typography variant="caption" sx={{ color: '#666', fontWeight: 500 }}>Sube el metraje final</Typography>
                                    </label>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" startIcon={<CloudUpload />} sx={{ bgcolor: '#005f8a', borderRadius: 4, textTransform: 'none', fontWeight: 900, py: 1.8, px: 8, fontSize: '1.1rem', boxShadow: 'none', '&:hover': { bgcolor: '#004a6d', boxShadow: '0 10px 20px rgba(0,95,138,0.2)' } }}>
                            Publicar Película
                        </Button>
                    </Box>

                </Paper>
            </Container>
        </Box>
    );
}