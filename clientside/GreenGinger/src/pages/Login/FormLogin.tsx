import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { ThemeColor } from '../../themes/themeColor';
import { ThemeProvider } from '@mui/material/styles';
import { useLogin } from "../../hooks/useLogin";
const FormLogin = () => {
  const {
    register,
    handleSubmit,
    isSubmitting,
    errors,
    onLoginSubmit,
    handleClick
  } = useLogin();
  return (
    //handleSubmit se auto nhan data tu form va truyen vao onLoginSubmit, e.preventDefault
    <>
      <ThemeProvider theme={ThemeColor}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
          bgcolor={"#f0f2f5"}
        >
          <Card
            sx={{
              minWidth: 400,
              maxWidth: 500,
              boxShadow: 4,
              borderRadius: 4,
              padding: 4,
            }}
          >
            <CardContent>
              <Typography variant="h5" component="h1" gutterBottom>
                Welcome to GreenGinger
              </Typography>
              <Box
                component="form"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
                onSubmit={handleSubmit(onLoginSubmit)}
              >
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  {...register("email")}
                  //hien thi loi
                  error={!!errors.email}  //ep kieu ve boolean
                  helperText={errors.email?.message}
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{
                    mt: "15px",
                    mb: "25px",
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting  ? "Logging in..." : "Login"}
                </Button>
                <Divider></Divider>
              </Box>

              <Box display="flex" flexDirection="column" width="100%" gap="25px">
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleClick}
                  fullWidth
                  sx={{ gap: "10px" }}
                >
                  <GoogleIcon />
                  Continue with Google
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  size="large"
                >
                  Create an account
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </ThemeProvider>
    </>
  )
}

export default FormLogin
