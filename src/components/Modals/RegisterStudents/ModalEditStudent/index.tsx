import { Button, Grid, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'components/@extended/SnackbarContext';
import MainCard from 'components/MainCard';
import useUser from 'hooks/useUser';
import { useState } from 'react';
import { UserProps } from 'types/user';
import axiosServices from 'utils/axios';
import { useTheme } from '@mui/material/styles';

interface ModalProps {
  dataStudent: UserProps;
  onClose: () => void;
  onSearch: (search: boolean) => void;
}

export default function ModalEditStudent({ dataStudent, onClose, onSearch }: ModalProps) {
  const theme = useTheme();
  const user = useUser();
  const token = user?.token;
  const { showSnackbar } = useSnackbar();

  const [name, setName] = useState(dataStudent.nome || '');
  const [email, setEmail] = useState(dataStudent.email || '');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleSubmit = async () => {
    const newRegister = {
      nome: name,
      email: email
    };
    try {
      await axiosServices
        .put(`/usuario/${dataStudent.id_usuario}`, newRegister, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .finally(() => {
          showSnackbar('Dados alterados com sucesso', true);
          onClose();
          onSearch(true);
        });
    } catch (error) {
      showSnackbar('Erro ao alterar dados', false);
    }
  };

  const checkDisabled = () => {
    if (!name || !email || !isEmailValid) {
      return true;
    } else return false;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(validateEmail(value));
  };

  return (
    <Grid container sx={{ backgroundColor: theme.palette.grey[200] }}>
      <Grid item container spacing={2} padding={2}>
        <Grid item xs={6}>
          <Grid container alignItems="center" justifyContent="start" spacing={1} direction="row">
            <Grid item xs={4}>
              <Typography whiteSpace="nowrap" fontWeight="bold" textAlign="end">
                Nome Completo:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <MainCard content={false}>
                <TextField value={name} onChange={(e) => setName(e.target.value)} fullWidth />
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container alignItems="center" justifyContent="start" spacing={1} direction="row">
            <Grid item xs={4}>
              <Typography whiteSpace="nowrap" fontWeight="bold" textAlign="end">
                Email:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <MainCard content={false}>
                <TextField
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  fullWidth
                  placeholder="Digite seu e-mail"
                  error={!isEmailValid && email !== ''}
                />
              </MainCard>
            </Grid>
          </Grid>
          {!isEmailValid && email !== '' && (
            <Grid container justifyContent="center">
              <Typography variant="caption" color="error" textAlign="end">
                Insira um e-mail válido.
              </Typography>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="end" spacing={2} direction="row">
            <Grid item>
              <Button variant="contained" fullWidth onClick={handleSubmit} disabled={checkDisabled()}>
                Salvar dados
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
