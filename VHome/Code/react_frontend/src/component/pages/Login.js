import Container from '@mui/material/Container';
import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    TextField
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({username: '', password: ''});
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:8080/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                if(data.message === "Password not match"){
                    alert("Incorrect Password")
                }
                else if(data.message === "Username not exists"){
                    alert("Incorrect Username");
                }
                else if(data.message === "Login Success"){
                    navigate("/home");
                }
                else{
                    alert("Incorrect Username and Password");
                }
            })
            .catch(error => console.log('Error login', error));
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUser(prevUser => ({...prevUser, [name]: value}));
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Container maxWidth='sm'>
            <h1>Login</h1>
            <TextField sx={{m: 1, width: '100%'}} id="outlined-basic" label="Username" variant="outlined"
                       name="username" value={user.username} onChange={handleChange}/>
            <FormControl sx={{m: 1, width: '100%'}} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password" name="password" value={user.password} onChange={handleChange}
                />
            </FormControl>
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2} sx={{m: 1}}>
                <Button sx={{m: 1, height: '6vh'}} variant="contained" color="success" onClick={handleSubmit}>
                    Login
                </Button>
                <p>New user?</p>
                <Link style={{textDecoration: 'none'}} to="/register">Register here</Link>
            </Stack>
        </Container>
    );
}