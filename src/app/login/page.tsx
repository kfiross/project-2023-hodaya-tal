'use client'

import React, {useState} from "react";
import {
    Avatar,
    Box,
    Button, Checkbox,
    CircularProgress,
    Container,
    CssBaseline, FormControlLabel, Grid,
    Link,
    TextField,
    Typography
} from "@mui/material";

import LockIcon from '@mui/icons-material/Lock';
import {useRouter} from "next/navigation";
import AuthUtils from '../../utils/authUtils';
import Stack from "@mui/material/Stack";
import PrefsUtils, {PrefsKeys} from "@/utils/prefsUtils";

const Login = () => {
    const router = useRouter();
    const [inputTaz, setInputTaz] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    // const [isValid, setIsValid] = useState(false);

    const handleLogIn = async () => {
        setIsLoading(true)
        setErrMsg('');
        console.log(32, inputTaz);
        const result = await AuthUtils.loginUser(inputTaz, inputPassword)

        if (result.error){
            setIsLoading(false);
            setErrMsg('המייל והסיסמא אינם תואמים, אנא נסו במועד מאוחר יותר');
        }
        else {
            setIsLoading(false);
            setErrMsg('');
            if (inputTaz == 'admin') {
                PrefsUtils.setString(PrefsKeys.USER_TYPE, 'admin');
                router.replace('admin/update-mismarot');
            }
            else {
                PrefsUtils.setString(PrefsKeys.USER_TYPE, 'user');
                router.replace('my-choices');
            }
        }
    }

    return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="80vh"
            >
                <Container component="main" maxWidth="xs" >
                    <div>
                        <Stack direction="row" alignItems="center" gap={1}>
                            <Avatar>
                                <LockIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                כניסה לחשבון
                            </Typography>
                        </Stack>

                        <div>
                            <TextField
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="מספר עובד"
                                name="email"
                                autoFocus
                                value={inputTaz}
                                onChange={(events) => {
                                    setInputTaz(events.target.value);
                                }}
                            />
                            <TextField
                                variant="filled"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="סיסמא"
                                type="password"
                                id="password"
                                value={inputPassword}
                                onChange={(events) => {
                                    setInputPassword(events.target.value);
                                    // checkFormValid();
                                }}
                            />

                            {/*<FormControlLabel*/}
                            {/*    control={<Checkbox value="remember" color="primary" />}*/}
                            {/*    label="זכור אותי"*/}
                            {/*/>*/}


                            <div>
                                <p style={{fontSize: 14, color: 'red', padding: '4px'}}>{errMsg}</p>
                            </div>

                            <Box sx={{m: 1}}>
                                <Button
                                    disabled={!(inputTaz.trim().length > 0 && inputPassword.trim().length > 1) || isLoading}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={handleLogIn}
                                >
                                    {isLoading && (
                                        <CircularProgress
                                            size={24}
                                            sx={{
                                                color: 'green',
                                                top: '50%',
                                                left: '50%',
                                                marginRight: '12px',
                                            }}
                                        />
                                    )}
                                    לכניסה
                                </Button>
                            </Box>
                            {/*{ isLoading ?*/}
                            {/*    <Box sx={{ '& > button': { m: 1 } }}>*/}
                            {/*    <LoadingButton*/}
                            {/*        loading={isLoading}*/}
                            {/*        variant="outlined"*/}
                            {/*        disabled*/}
                            {/*    > </LoadingButton>*/}
                            {/*    </Box> :*/}
                            {/*    <Button*/}
                            {/*        fullWidth*/}
                            {/*        variant="contained"*/}
                            {/*        color="primary"*/}
                            {/*        className={classes.submit}*/}
                            {/*        onClick={handleLogIn}*/}
                            {/*    >*/}
                            {/*        Sign In*/}
                            {/*    </Button>*/}
                            {/*}*/}

                            {/*<Grid container>*/}
                            {/*    <Grid item>*/}
                            {/*        <Link href="/register" variant="body2">*/}
                            {/*            {"אין לכם חשבון? הירשמו עכשיו"}*/}
                            {/*        </Link>*/}
                            {/*    </Grid>*/}
                            {/*</Grid>*/}
                        </div>
                    </div>
                </Container>
            </Box>
    );
}

export default Login;
