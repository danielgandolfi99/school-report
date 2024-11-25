import { Button, Grid, TextField, Typography, useTheme } from '@mui/material';
import MainCard from 'components/MainCard';
import { useState } from 'react';

interface ModalProps {
  onClose: () => void;
  onSearch: (search: boolean) => void;
}

export default function ModalCreateGrade({ onClose, onSearch }: ModalProps) {
  const theme = useTheme();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    onClose();
    onSearch(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
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
                <TextField value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container alignItems="center" justifyContent="start" spacing={1} direction="row">
            <Grid item xs={4}>
              <Typography whiteSpace="nowrap" fontWeight="bold" textAlign="end">
                Senha:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <MainCard content={false}>
                <TextField value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container alignItems="center" justifyContent="start" spacing={1} direction="row">
            <Grid item xs={4}>
              <Typography whiteSpace="nowrap" fontWeight="bold" textAlign="end">
                Confirmar Senha:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <MainCard content={false}>
                <TextField value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} fullWidth />
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="end" spacing={2} direction="row">
            <Grid item>
              <Button variant="outlined" color="error" fullWidth onClick={handleReset}>
                Limpar
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" fullWidth onClick={handleSubmit}>
                Salvar novo aluno
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
