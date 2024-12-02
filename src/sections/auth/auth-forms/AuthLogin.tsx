'use client';

import React, { useState, FocusEvent, SyntheticEvent } from 'react';

// axios
import axiosServices from 'utils/axios';

// material-ui
import { Button, FormHelperText, Grid, InputAdornment, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// ============================|| API LOGIN ||============================ //

const AuthLogin = () => {
  const [capsWarning, setCapsWarning] = useState(false);
  const [showSenha, setShowSenha] = useState(false);

  const handleClickShowSenha = () => {
    setShowSenha(!showSenha);
  };

  const handleMouseDownSenha = (event: SyntheticEvent) => {
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
    <Formik
      initialValues={{
        email: '',
        senha: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Email inválido').required('Email é obrigatório'),
        senha: Yup.string().required('A senha é obrigatória!')
      })}
      onSubmit={async (values, { setErrors, setSubmitting }) => {
        try {
          const response = await axiosServices.post('/auth/login', {
            email: values.email,
            senha: values.senha
          });

          if (response.data?.access_token) {
            localStorage.setItem('accessToken', response.data.access_token);

            const userResponse = await axiosServices.get('/auth/profile', {
              headers: {
                Authorization: `Bearer ${response.data.access_token}`
              }
            });

            const session = {
              id: userResponse.data.user_id,
              expires: Date.now() + 3600 * 1000,
              token: response.data.access_token,
              provider: 'credentials',
              user: {
                user_id: userResponse.data.id_usuario,
                name: userResponse.data.nome,
                email: userResponse.data.email,
                role: userResponse.data.tipo_usuario
              }
            };

            localStorage.setItem('session', JSON.stringify(session));

            setTimeout(() => {
              window.location.href = '/';
            }, 500);
          } else {
            setErrors({ submit: 'Erro inesperado ao fazer login.' });
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'Email ou senha incorreto.';
          setErrors({ submit: errorMessage });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email-login">Email</InputLabel>
                <OutlinedInput
                  id="email-login"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Digite seu email"
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                />
              </Stack>
              {touched.email && errors.email && (
                <FormHelperText error id="helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="senha-login">Senha</InputLabel>
                <OutlinedInput
                  fullWidth
                  color={capsWarning ? 'warning' : 'primary'}
                  error={Boolean(touched.senha && errors.senha)}
                  id="senha-login"
                  type={showSenha ? 'text' : 'password'}
                  value={values.senha}
                  name="senha"
                  onBlur={(event: FocusEvent<any, Element>) => {
                    setCapsWarning(false);
                    handleBlur(event);
                  }}
                  onKeyDown={onKeyDown}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle senha visibility"
                        onClick={handleClickShowSenha}
                        onMouseDown={handleMouseDownSenha}
                        edge="end"
                        color="secondary"
                      >
                        {showSenha ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Digite sua senha"
                />
                {capsWarning && (
                  <Typography variant="caption" sx={{ color: 'warning.main' }}>
                    Caps lock ativo!
                  </Typography>
                )}
              </Stack>
              {touched.senha && errors.senha && (
                <FormHelperText error id="helper-text-senha-login">
                  {errors.senha}
                </FormHelperText>
              )}
            </Grid>
            {/* <Grid item xs={12} sx={{ mt: -1 }}>
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
            </Grid> */}
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
  );
};

export default AuthLogin;
