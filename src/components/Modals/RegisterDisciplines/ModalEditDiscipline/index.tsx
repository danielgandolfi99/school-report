import { Button, Grid, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'components/@extended/SnackbarContext';
import useUser from 'hooks/useUser';
import { useState } from 'react';
import { DisciplinesProps } from 'types/disciplines';
import axiosServices from 'utils/axios';
import { useTheme } from '@mui/material/styles';

interface ModalProps {
  dataDiscipline: DisciplinesProps;
  onClose: () => void;
  onSearch: (search: boolean) => void;
}

export default function ModalEditDiscipline({ dataDiscipline, onClose, onSearch }: ModalProps) {
  const theme = useTheme();
  const user = useUser();
  const token = user?.token;
  const { showSnackbar } = useSnackbar();

  const [name, setName] = useState(dataDiscipline.nome_disciplina || '');

  const handleSubmit = async () => {
    const newRegister = {
      nome_disciplina: name
    };
    try {
      await axiosServices
        .post(`/disciplina/editar/${dataDiscipline.id_disciplina}`, newRegister, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .finally(() => {
          showSnackbar('Disciplina alterada com sucesso', true);
          onClose();
          onSearch(true);
        });
    } catch (error) {
      showSnackbar('Erro ao alterar disciplina', false);
    }
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
              <Button variant="contained" fullWidth onClick={handleSubmit} disabled={!name}>
                Salvar dados
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
