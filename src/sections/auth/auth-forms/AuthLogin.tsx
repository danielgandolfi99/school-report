'use client';

import React, { useState, FocusEvent, SyntheticEvent } from 'react';

// next
import { signIn } from 'next-auth/react';

// material-ui
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

import { APP_DEFAULT_PATH } from 'config';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// ============================|| AWS CONNITO - LOGIN ||============================ //

const AuthLogin = ({ providers, csrfToken }: any) => {
  const [checked, setChecked] = useState(false);
  const [capsWarning, setCapsWarning] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const onKeyDown = (keyEvent: any) => {
    if (keyEvent.getModifierState('CapsLock')) {
      setCapsWarning(true);
    } else {
      setCapsWarning(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          user: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          user: Yup.string()
            .required('Nome de usuário obrigatório')
            .min(5, 'usuário inválido')
            .matches(/(?!^\.)(?!.*[.]$)^[a-z]*\.?[a-z]*?$(?!$\.)/, 'usuário inválido'),
          password: Yup.string().required('A senha é obrigatória!')
        })}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          try {
            const res = await signIn('credentials', {
              redirect: false,
              username: values.user,
              password: values.password,
              callbackUrl: APP_DEFAULT_PATH
            });

            if (res?.error) {
              setErrors({ submit: res.error });
            } else if (res?.ok) {
              window.location.href = APP_DEFAULT_PATH;
            } else {
              setErrors({ submit: 'Erro desconhecido durante o login.' });
            }
          } catch (error) {
            console.error('Erro ao fazer login:', error);
            setErrors({ submit: 'Erro ao fazer login.' });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="user-login">Usuário</InputLabel>
                  <OutlinedInput
                    id="user-login"
                    type="user"
                    value={values.user}
                    name="user"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Digite seu usuário"
                    fullWidth
                    error={Boolean(touched.user && errors.user)}
                  />
                </Stack>
                {touched.user && errors.user && (
                  <FormHelperText error id="standard-weight-helper-text-user-login">
                    {errors.user}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Senha</InputLabel>
                  <OutlinedInput
                    fullWidth
                    color={capsWarning ? 'warning' : 'primary'}
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={(event: FocusEvent<any, Element>) => {
                      setCapsWarning(false);
                      handleBlur(event);
                    }}
                    onKeyDown={onKeyDown}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Digite sua senha"
                  />
                  {capsWarning && (
                    <Typography variant="caption" sx={{ color: 'warning.main' }} id="warning-helper-text-password-login">
                      Caps lock ativo!
                    </Typography>
                  )}
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">Salvar login</Typography>}
                  />
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Entrar
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
