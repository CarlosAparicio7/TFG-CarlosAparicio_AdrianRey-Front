import { Box, Typography, TextField, Button, InputAdornment, Paper, Alert, Collapse } from '@mui/material';
import { MovieFilter, Email, Lock } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { accesoLogin } from '../service/usuariosService';

type LoginUsuario = {
    email: string,
    password: string
}

const loginDefault: LoginUsuario = {
    email: '',
    password: ''
};

export default function LoginPage() {
    const navigate = useNavigate();

    const [useLoginAccess, setLoginAccess] = useState<LoginUsuario>(loginDefault);
    const [useErrorMsg, setErrorMsg] = useState<string>('');

    const handleLogin = () => {
        setErrorMsg('');
        accesoLogin({ email: useLoginAccess.email, password: useLoginAccess.password }).then(response => {
            if (response.ok && response.data) {
                setLoginAccess({
                    email: response.data.email,
                    password: response.data.password
                });  
                localStorage.setItem('usuario', JSON.stringify(response.data));
                navigate('/');
            } else {
                setErrorMsg('El correo o la contraseña no son correctos.');
            }
        }).catch(() => {
            setErrorMsg('El correo o la contraseña no son correctos.');
        });
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(90deg, #005f8a 30%, #f06b06 100%)', backgroundAttachment: 'fixed', p: 2 }}>
            <Paper elevation={0} sx={{ maxWidth: 450, width: '100%', borderRadius: 8, bgcolor: 'rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(25px)', p: { xs: 4, md: 6 }, border: '1px solid rgba(255, 255, 255, 0.4)', boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)' }}>
                
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 4 }}>
                    <MovieFilter sx={{ color: '#fff', fontSize: 32, filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.2))' }} />
                    <Typography variant="h6" sx={{ fontWeight: 900, color: '#fff', letterSpacing: 2, fontSize: '1.4rem', textShadow: '0px 2px 10px rgba(0,0,0,0.2)' }}>INFOCINE&MAS</Typography>
                </Box>

                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 900, color: '#fff', mb: 1, letterSpacing: -1.5, fontSize: { xs: '2.2rem', md: '2.8rem' }, textShadow: '0px 8px 20px rgba(0,0,0,0.3)' }}>Iniciar Sesión</Typography>
                    <Typography variant="body1" sx={{ color: '#ffd1b3', fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', fontSize: '0.85rem' }}>DESCUBRE • CALIFICA • DISFRUTA</Typography>
                </Box>

                <Collapse in={!!useErrorMsg} sx={{ mb: 3 }}>
                    <Alert 
                        severity="error" 
                        variant="filled"
                        onClose={() => setErrorMsg('')}
                        sx={{ 
                            borderRadius: 3, 
                            bgcolor: 'rgba(211, 47, 47, 0.8)', 
                            fontWeight: 700,
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)'
                        }}
                    >
                        {useErrorMsg}
                    </Alert>
                </Collapse>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField 
                        placeholder="Correo Electrónico" 
                        fullWidth 
                        value={useLoginAccess.email}
                        onChange={(e) => setLoginAccess({ ...useLoginAccess, email: e.target.value })}
                        slotProps={{ 
                            input: { 
                                startAdornment: <InputAdornment position="start"><Email sx={{ color: '#fff', mr: 1 }} /></InputAdornment>, 
                                sx: { borderRadius: 4, height: 60, bgcolor: 'rgba(0, 0, 0, 0.15)', color: '#fff', fontSize: '1.1rem', px: 2, '& input::placeholder': { color: '#fff', opacity: 0.8 } } 
                            } 
                        }} 
                        sx={{ '& .MuiOutlinedInput-notchedOutline': { border: '2px solid rgba(255, 255, 255, 0.3)' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.6)' }, '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' } }} 
                    />

                    <TextField 
                        placeholder="Contraseña" 
                        type="password" 
                        fullWidth 
                        value={useLoginAccess.password}
                        onChange={(e) => setLoginAccess({ ...useLoginAccess, password: e.target.value })}
                        slotProps={{ 
                            input: { 
                                startAdornment: <InputAdornment position="start"><Lock sx={{ color: '#fff', mr: 1 }} /></InputAdornment>, 
                                sx: { borderRadius: 4, height: 60, bgcolor: 'rgba(0, 0, 0, 0.15)', color: '#fff', fontSize: '1.1rem', px: 2, '& input::placeholder': { color: '#fff', opacity: 0.8 } } 
                            } 
                        }} 
                        sx={{ '& .MuiOutlinedInput-notchedOutline': { border: '2px solid rgba(255, 255, 255, 0.3)' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.6)' }, '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' } }} 
                    />
                </Box>

                <Button 
                    onClick={handleLogin}
                    variant="contained" 
                    fullWidth 
                    sx={{ mt: 5, bgcolor: '#005f8a', py: 2, borderRadius: 4, fontWeight: 900, textTransform: 'none', fontSize: '1.2rem', boxShadow: '0 12px 24px rgba(0,0,0,0.2)', transition: 'all 0.3s ease', '&:hover': { bgcolor: '#f06b06', transform: 'translateY(-2px)' } }}
                >
                    Entrar
                </Button>

                <Typography variant="body1" sx={{ color: '#fff', mt: 4, textAlign: 'center', fontSize: '1.05rem', fontWeight: 600 }}>
                    ¿Aún no tienes cuenta? 
                    <Button 
                        component={Link} 
                        to="/register" 
                        sx={{ color: '#ffd1b3', fontWeight: 900, textTransform: 'none', fontSize: '1.05rem', ml: 1, textDecoration: 'underline', '&:hover': { bgcolor: 'transparent', color: '#fff' } }}
                    >
                        Regístrate
                    </Button>
                </Typography>
            </Paper>
        </Box>
    );
}