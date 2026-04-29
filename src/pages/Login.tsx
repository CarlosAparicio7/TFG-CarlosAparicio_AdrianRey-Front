import MovieIcon from '@mui/icons-material/Movie';
import { Avatar, Box, Button, Container, OutlinedInput, Paper, Typography } from '@mui/material';
export default function Login() {
    return(
        <>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    <Paper 
                        elevation={6} 
                        sx={{ 
                            padding: 4, 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center',
                            borderRadius: 3,
                            width: '100%'
                        }}
                    >

                        <Avatar sx={{ m: 1, bgcolor: '#1976d2', width: 56, height: 56 }}>
                            <MovieIcon fontSize="large" />
                        </Avatar>
                        
                        <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', mt: 1 }}>
                            INFOCINE&MAS
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
                            Inicia sesión en tu cuenta para continuar
                        </Typography>

                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Iniciar Sesión
                        </Typography>

                        <Box component="div" sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <OutlinedInput 
                                type='email' 
                                placeholder='tu@gmail.com' 
                                required 
                                sx={{
                                width: 345, 
                                borderRadius: 3, 
                                mb: 2 
                                }}
                            />
                            
                            <OutlinedInput 
                                type='password' 
                                placeholder='Escribe tu contraseña' 
                                required 
                                sx={{
                                width: 345, 
                                borderRadius: 3, 
                                mb: 2
                                }}
                            />

                            <Button
                                variant="contained"
                                size="large"
                                sx={{ 
                                    mt: 1,
                                    mb: 2, 
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontSize: '1.1rem',
                                    width: 345 
                                }}
                            >
                                Entrar
                            </Button>
                        </Box>
                    </Paper>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 5 }}>
                    © {new Date().getFullYear()} INFOCINE&MAS
                    </Typography>
                </Box>
            </Container>
        </>
    );
}