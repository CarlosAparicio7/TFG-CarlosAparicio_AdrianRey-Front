import { Box, Typography, TextField, Button, Avatar, IconButton, InputAdornment, Grid, Paper, Container} from '@mui/material';
import { PhotoCamera, MovieFilter, Person, Email, Lock, VideoCameraBack } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { crearUsuario } from '../service/usuariosService';

export type createUser = {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  avatarIcon: string;
  rol: string;
}

const registerDefault: createUser ={
  id: '',
  nombre: '',
  apellido: '',
  email: '',
  password: '',
  avatarIcon: '',
  rol: ''
}

export default function RegisterPage() {

  const navigate = useNavigate();
  const [useRegisterUser, setRegisterUser] = useState<createUser>(registerDefault);
  const [useErrorMsg, setErrorMsg] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRegisterUser({ ...useRegisterUser, avatarIcon: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = () => {
    setErrorMsg('');
    
    crearUsuario(useRegisterUser).then(response => {
      if (response.ok && response.data) {
        setRegisterUser({
            id: response.data.id,
            nombre: response.data.nombre,
            apellido: response.data.apellido,
            email: response.data.email,
            password: response.data.password,
            avatarIcon: response.data.avatarIcon,
            rol: response.data.rol
        });
        
        navigate('/login');
      } else if (!response.ok) {
        console.log(response.error);
      }
    }).catch((error: Error) => {
      setErrorMsg("Error de conexión: " + error.message);
    });
  };

return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(90deg, #005f8a 30%, #f06b06 100%)', display: 'flex', flexDirection: 'column', backgroundAttachment: 'fixed' }}>
      <Container maxWidth={false} sx={{ mt: 2, mb: 4, flexGrow: 1, display: 'flex', px: { xs: 1, sm: 2, md: 4 }, justifyContent: 'center', alignItems: 'center' }}>
        <Paper elevation={0} sx={{ p: { xs: 2, md: 0 }, backgroundColor: 'rgba(255, 255, 255, 0.12)', borderRadius: { xs: 0, md: 6 }, width: '100%', maxWidth: 1100, minHeight: '85vh', boxSizing: 'border-box', border: '1px solid rgba(255, 255, 255, 0.2)', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, backdropFilter: 'blur(20px)', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)', overflow: 'hidden' }}>
          
          <Box component={Link} to="/" sx={{ width: { xs: '100%', md: '35%' }, bgcolor: 'rgba(0, 95, 138, 0.6)', p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#fff', textAlign: 'center', borderRight: { md: '1px solid rgba(255, 255, 255, 0.1)' }, textDecoration: 'none'}}>
            <VideoCameraBack sx={{ fontSize: 60, mb: 2, opacity: 0.9 }} />
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, letterSpacing: -2, textShadow: '0px 10px 20px rgba(0,0,0,0.3)' }}>INFOCINE&MAS</Typography>
            <Typography variant="body1" sx={{ color: '#ffd1b3', mt: 1, fontWeight: 700, fontSize: '1.1rem', letterSpacing: 1, textTransform: 'uppercase' }}>DESCUBRE • CALIFICA • DISFRUTA</Typography>
          </Box>

          <Box sx={{ flex: 1, p: { xs: 3, md: 5, lg: 6 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, justifyContent: 'center' }}>
              <MovieFilter sx={{ color: '#fff', fontSize: 35 }} />
              <Typography variant="h4" sx={{ fontWeight: 900, color: '#fff', letterSpacing: -1 }}>Registro</Typography>
            </Box>

            {useErrorMsg ? <Box id="error-message" sx={{ mb: 4, mx: 'auto', borderRadius: 3, border: '1px solid rgba(255, 255, 255, 0.4)', backgroundColor: 'rgba(255, 255, 255, 0.15)', padding: '10px 20px', fontSize: '1rem', color: '#f70505', textAlign: 'center', width: '90%', maxWidth: '1100px', boxSizing: 'border-box', backdropFilter: 'blur(10px)', fontWeight: 800, boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)', textTransform: 'uppercase', letterSpacing: 1 }}>Vaya, ha ocurrido un error. En este momento estamos trabajando en ello: {useErrorMsg}</Box> : null}

            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Avatar src={useRegisterUser.avatarIcon || undefined} sx={{ width: 90, height: 90, bgcolor: 'rgba(255, 255, 255, 0.2)', border: '3px solid #f06b06', mx: 'auto' }}>
                  {!useRegisterUser.avatarIcon && <Person sx={{ fontSize: 50, color: '#fff' }} />}
                </Avatar>
                <IconButton component="label" sx={{ position: 'absolute', bottom: 0, right: 0, bgcolor: '#005f8a', color: '#fff', '&:hover': { bgcolor: '#004a6d' }, border: '3px solid rgba(255, 255, 255, 0.3)', p: 0.8 }}>
                  <input hidden accept="image/*" type="file" onChange={handleFileChange} /><PhotoCamera sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
            </Box>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField required placeholder="Nombre" fullWidth value={useRegisterUser.nombre} onChange={(e) => setRegisterUser({ ...useRegisterUser, nombre: e.target.value })} slotProps={{ input: { sx: { borderRadius: 2, height: 50, bgcolor: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 } } }} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField required placeholder="Apellido" fullWidth value={useRegisterUser.apellido} onChange={(e) => setRegisterUser({ ...useRegisterUser, apellido: e.target.value })} slotProps={{ input: { sx: { borderRadius: 2, height: 50, bgcolor: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 } } }} />
              </Grid>
              <Grid size={12}>
                <TextField required type='email' placeholder="Correo Electrónico" fullWidth value={useRegisterUser.email} onChange={(e) => setRegisterUser({ ...useRegisterUser, email: e.target.value })} slotProps={{ input: { startAdornment: <InputAdornment position="start"><Email sx={{ color: '#005f8a', fontSize: 20 }} /></InputAdornment>, sx: { borderRadius: 2, height: 50, bgcolor: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 } } } } />
              </Grid>
              <Grid size={12}>
                <TextField required placeholder="Contraseña" type="password" fullWidth value={useRegisterUser.password} onChange={(e) => setRegisterUser({ ...useRegisterUser, password: e.target.value })} onKeyDown={(e) => e.key === 'Enter' && handleRegister()} slotProps={{ input: { startAdornment: <InputAdornment position="start"><Lock sx={{ color: '#005f8a', fontSize: 20 }} /></InputAdornment>, sx: { borderRadius: 2, height: 50, bgcolor: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 } } } } />
              </Grid>
            </Grid>

            <Button onClick={() => {
              if (!useRegisterUser.nombre || !useRegisterUser.apellido || !useRegisterUser.email || !useRegisterUser.password) {
                setErrorMsg("Por favor, rellena todos los campos ");
                return;
              }
              if (!useRegisterUser.email.includes('@')) {
                setErrorMsg("El correo debe contener un @.");
                return;
              }
              handleRegister();
            }} variant="contained" fullWidth sx={{ mt: 4, bgcolor: '#005f8a', py: 1.5, borderRadius: 2, fontWeight: 900, textTransform: 'none', fontSize: '1.1rem', '&:hover': { bgcolor: '#004a6d' } }}>Crear cuenta</Button>

            <Typography variant="body1" sx={{ color: '#fff', mt: 4, textAlign: 'center', fontSize: '1.1rem', fontWeight: 600 }}>
              ¿Ya tienes una cuenta?
              <Button component={Link} to="/login" sx={{ color: '#ffd1b3', fontWeight: 900, textDecoration: 'underline', textTransform: 'none', fontSize: '1.1rem', minWidth: 'auto', p: 1, ml: 1, '&:hover': { textDecoration: 'underline', bgcolor: 'transparent' } }}>Inicia sesión</Button>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}