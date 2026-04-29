import { Box, Typography, TextField, Button, Avatar, IconButton, InputAdornment, Grid, Paper } from '@mui/material';
import { PhotoCamera, MovieFilter, Person, Email, Lock, VideoCameraBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f0f2f5', p: 2, overflow: 'hidden' }}>
      <Paper elevation={4} sx={{ maxWidth: 1100, width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, borderRadius: 4, overflow: 'hidden', bgcolor: '#fff', maxHeight: '90vh' }}>
        
        <Box sx={{ width: { xs: '100%', md: '35%' }, bgcolor: '#005f8a', p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#fff', textAlign: 'center' }}>
          <VideoCameraBack sx={{ fontSize: 60, mb: 2, opacity: 0.9 }} />
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, letterSpacing: -1 }}>INFOCINE&MAS</Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, fontWeight: 400, maxWidth: '280px' }}>Explora nuestro gran catálogo: califica, comenta y disfruta de las mejores películas.</Typography>
        </Box>

        <Box sx={{ flex: 1, p: { xs: 3, md: 5, lg: 6 }, bgcolor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowY: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, justifyContent: 'center' }}>
            <MovieFilter sx={{ color: '#005f8a', fontSize: 35 }} />
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a1a' }}>Registro</Typography>
        </Box>

          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <Avatar sx={{ width: 90, height: 90, bgcolor: '#f5f5f5', border: '3px solid #005f8a', mx: 'auto' }}>
                <Person sx={{ fontSize: 50, color: '#ccc' }} />
              </Avatar>
              <IconButton component="label" sx={{ position: 'absolute', bottom: 0, right: 0, bgcolor: '#005f8a', color: '#fff', '&:hover': { bgcolor: '#004a6d' }, border: '3px solid #fff', p: 0.8 }}>
                <input hidden accept="image/*" type="file" /><PhotoCamera sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </Box>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField placeholder="Nombre" fullWidth slotProps={{ input: { sx: { borderRadius: 2, height: 50, bgcolor: '#f5f5f5' } } }} sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField placeholder="Apellido" fullWidth slotProps={{ input: { sx: { borderRadius: 2, height: 50, bgcolor: '#f5f5f5' } } }} sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }} />
            </Grid>
            <Grid size={12}>
              <TextField placeholder="Correo Electrónico" fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start"><Email sx={{ color: '#005f8a', fontSize: 20 }} /></InputAdornment>, sx: { borderRadius: 2, height: 50, bgcolor: '#f5f5f5' } } }} sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }} />
            </Grid>
            <Grid size={12}>
              <TextField placeholder="Contraseña" type="password" fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start"><Lock sx={{ color: '#005f8a', fontSize: 20 }} /></InputAdornment>, sx: { borderRadius: 2, height: 50, bgcolor: '#f5f5f5' } } }} sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }} />
            </Grid>
          </Grid>

          <Button variant="contained" fullWidth sx={{ mt: 4, bgcolor: '#005f8a', py: 1.5, borderRadius: 2, fontWeight: 700, textTransform: 'none', fontSize: '1.1rem', '&:hover': { bgcolor: '#004a6d' } }}>
            Crear cuenta
          </Button>

          <Typography variant="body1" sx={{ color: '#666', mt: 4, textAlign: 'center', fontSize: '1.1rem' }}>
            ¿Ya tienes una cuenta?
            <Button component={Link} to="/login" sx={{ color: '#005f8a', fontWeight: 800, textDecoration: 'underline', textTransform: 'none', fontSize: '1.1rem', minWidth: 'auto', p: 1, ml: 1, '&:hover': { textDecoration: 'underline', bgcolor: 'transparent' } }}>
                Inicia sesión
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}