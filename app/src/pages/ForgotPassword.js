import * as Yup from "yup";
import { useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import { Container, Stack, TextField, Box, Typography, MenuItem, Link, } from "@mui/material";
import { userForget } from "../store/user/UserSlice";
import { useDispatch } from "react-redux";
import './styles.css';



export default function ForgotPassword() {
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch()

    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("First name required"),
        lastName: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Last name required"),
        email: Yup.string()
            .email("Email must be a valid email address")
            .required("Email is required"),
        password: Yup.string().required("Password is required")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
            ),
        passwordConfirmation: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Passwords must match"
        ),
        securityQuestion: Yup.string().required("Security question is required"),
        securityAnswer: Yup.string().required("Security answer is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            securityQuestion: '',
            securityAnswer: '',
        },
        validationSchema: RegisterSchema,
        onSubmit: async (values) => {
            const { email, password, firstName, lastName } = values;
            console.log(email, password, firstName, lastName);
            dispatch(userForget(values));
        },
    });

    const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

    return (
        <Container maxWidth="sm" sx={{ height: "100%" }}>
            <Box sx={{ mt: 20 }}>
                <Stack spacing={5} className="border">
                    <Box>
                        <Typography
                            variant="h3"
                            sx={{
                                textAlign: "center",
                            }}
                        >
                            Forgot Password
                        </Typography>
                    </Box>
                    <FormikProvider value={formik}>
                        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                            <Stack spacing={3}>

                                <TextField
                                    fullWidth
                                    autoComplete="username"
                                    type="email"
                                    label="Email address"
                                    {...getFieldProps("email")}
                                    error={Boolean(touched.email && errors.email)}
                                    helperText={touched.email && errors.email}
                                />

                                <TextField
                                     fullWidth
                                    type="password"
                                    label="New password"
                                    {...getFieldProps("password")}
                                    error={Boolean(touched.password && errors.password)}
                                    helperText={touched.password && errors.password}
                                />
                                <TextField
                                    fullWidth
                                    select
                                    label="Security question"
                                    {...getFieldProps("securityQuestion")}
                                    error={Boolean(touched.securityQuestion && errors.securityQuestion)}
                                    helperText={touched.securityQuestion && errors.securityQuestion}
                                >
                                    <MenuItem value="petName">The name of your first pet</MenuItem>
                                    <MenuItem value="favoriteFood">The name of your favorite food</MenuItem>
                                </TextField>
                                <TextField
                                     fullWidth
                                    label="Security answer"
                                    {...getFieldProps("securityAnswer")}
                                    error={Boolean(touched.securityAnswer && errors.securityAnswer)}
                                    helperText={touched.securityAnswer && errors.securityAnswer}
                                />
                                <LoadingButton
                                     fullWidth="true"
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    loading={`${isSubmitting}`}
                                >
                                    Submit
                                </LoadingButton>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        textAlign: "center",
                                        marginTop: 2,
                                    }}
                                >
                                    <Link href="/login" underline="hover" sx={{ marginRight: 2 }}>
                                        Already have an account?Log In
                                    </Link>
                                    |
                                    <Link href="/register" underline="hover" sx={{ marginLeft: 2 }}>
                                        Register a new account
                                    </Link>
                                </Typography>
                            </Stack>
                        </Form>
                    </FormikProvider>
                </Stack>
            </Box>
        </Container>
    );
}