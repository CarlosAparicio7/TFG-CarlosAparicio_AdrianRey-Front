import { Box, Typography, TextField, Button, Avatar, InputAdornment, Paper } from '@mui/material';
import { MovieFilter, Email, Lock } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f0f2f5', p: 2, overflow: 'hidden' }}>
      <Paper elevation={4} sx={{ maxWidth: 500, width: '100%', borderRadius: 4, overflow: 'hidden', bgcolor: '#fff', p: { xs: 3, md: 6 } }}>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 4, opacity: 0.8 }}>
          <MovieFilter sx={{ color: '#005f8a', fontSize: 24 }} />
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#005f8a', letterSpacing: 0.5, fontSize: '1.1rem' }}>
            INFOCINE&MAS
          </Typography>
        </Box>

        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a1a', mb: 3 }}>Iniciar Sesión</Typography>
          <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <Avatar sx={{ width: 90, height: 90, bgcolor: '#f5f5f5', border: '3px solid #005f8a', mx: 'auto' }}>
              <MovieFilter sx={{ fontSize: 50, color: '#ccc' }} />
            </Avatar>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField 
            placeholder="Correo Electrónico" 
            fullWidth 
            slotProps={{ 
              input: { 
                startAdornment: <InputAdornment position="start"><Email sx={{ color: '#005f8a', fontSize: 20 }} /></InputAdornment>, 
                sx: { borderRadius: 2, height: 50, bgcolor: '#f5f5f5' } 
              } 
            }} 
            sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }} 
          />
          <TextField 
            placeholder="Contraseña" 
            type="password" 
            fullWidth 
            slotProps={{ 
              input: { 
                startAdornment: <InputAdornment position="start"><Lock sx={{ color: '#005f8a', fontSize: 20 }} /></InputAdornment>, 
                sx: { borderRadius: 2, height: 50, bgcolor: '#f5f5f5' } 
              } 
            }} 
            sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }} 
          />
        </Box>

        <Button component={Link} to="/" variant="contained" fullWidth sx={{ mt: 4, bgcolor: '#005f8a', py: 1.5, borderRadius: 2, fontWeight: 700, textTransform: 'none', fontSize: '1.1rem', '&:hover': { bgcolor: '#004a6d' } }}>
          Entrar
        </Button>

        <Typography variant="body1" sx={{ color: '#666', mt: 3, textAlign: 'center', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          ¿Aún no tienes una cuenta? 
          <Button 
            component={Link} 
            to="/register" 
            sx={{ 
              color: '#005f8a', 
              fontWeight: 800, 
              textDecoration: 'underline', 
              textTransform: 'none', 
              fontSize: '1.1rem', 
              minWidth: 'auto', 
              p: 1, 
              ml: 1, 
              '&:hover': { textDecoration: 'underline', bgcolor: 'transparent' } 
            }}
          >
            Regístrate
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
}