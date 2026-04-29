import { Link } from "react-router-dom";
import { Box, Typography, Button, Container } from "@mui/material";
import { Movie, Replay } from "@mui/icons-material";

export default function PageNotFound() {
  return (
    <Container maxWidth={false} sx={{ bgcolor: '#f0f2f5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 2, p: 6, bgcolor: '#fff', borderRadius: 6, boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #eef2f6', maxWidth: 500, width: '100%' }}>
        
        <Movie sx={{ fontSize: 100, color: '#005f8a', mb: 1 }} />
        
        <Typography variant="h1" sx={{ fontWeight: 900, fontSize: '6rem', m: 0, background: 'linear-gradient(90deg, #003a54 0%, #005f8a 50%, #00a8e8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: -4 }}>
          404
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a1a1a', mt: -1 }}>
          Página o película no encontrada
        </Typography>

        <Typography variant="body1" sx={{ color: '#666', mb: 2, fontWeight: 500, fontSize: '1.1rem' }}>
          Lo sentimos, el contenido que buscas no está disponible en nuestra cartelera actual.
        </Typography>

        <Button component={Link} to="/" variant="contained" startIcon={<Replay />} sx={{ bgcolor: '#005f8a', textTransform: 'none', px: 5, py: 1.6, borderRadius: 3, fontWeight: 900, fontSize: '1rem', boxShadow: '0 8px 20px rgba(0,95,138,0.2)', '&:hover': { bgcolor: '#004a6d', boxShadow: '0 12px 25px rgba(0,95,138,0.3)' } }}>
          Volver al Inicio
        </Button>

      </Box>
    </Container>
  );
}