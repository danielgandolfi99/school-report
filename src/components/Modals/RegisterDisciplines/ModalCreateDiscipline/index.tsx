import { Button, Grid, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'components/@extended/SnackbarContext';
import useUser from 'hooks/useUser';
import { useState } from 'react';
import axiosServices from 'utils/axios';

interface ModalProps {
  onClose: () => void;
  onSearch: (search: boolean) => void;
}

export default function ModalCreateDiscipline({ onClose, onSearch }: ModalProps) {
  const theme = useTheme();
  const user = useUser();
  const token = user?.token;
  const { showSnackbar } = useSnackbar();

  const [name, setName] = useState('');

  const handleSubmit = async () => {
    const newRegister = {
      nome: name
    };
    try {
      await axiosServices
        .post('/disciplina/cadastrar', newRegister, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .finally(() => {
          showSnackbar('Disciplina cadastrada com sucesso', true);
          onClose();
          onSearch(true);
        });
    } catch (error) {
      showSnackbar('Erro ao cadastrar disciplina', false);
    }
  };

  const handleReset = () => {
    setName('');
  };

  return (
    <Grid container sx={{ backgroundColor: theme.palette.grey[200] }}>
      <Grid item container spacing={2} padding={2}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="start" spacing={1} direction="row">
            <Grid item>
              <Typography whiteSpace="nowrap" fontWeight="bold" textAlign="end">
                Nome da Disciplina:
              </Typography>
            </Grid>
            <Grid item xs>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                sx={{ backgroundColor: 'white', borderRadius: 1 }}
              />
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
              <Button variant="contained" fullWidth onClick={handleSubmit} disabled={!name}>
                Salvar nova disciplina
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
