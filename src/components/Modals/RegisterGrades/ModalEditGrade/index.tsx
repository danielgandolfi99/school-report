import { Button, Grid, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'components/@extended/SnackbarContext';
import MainCard from 'components/MainCard';
import useUser from 'hooks/useUser';
import { useState } from 'react';
import { GradesProps } from 'types/grades';
import axiosServices from 'utils/axios';
import { useTheme } from '@mui/material/styles';

interface ModalProps {
  dataGrade: GradesProps;
  onClose: () => void;
  onSearch: (search: boolean) => void;
}

export default function ModalEditGrade({ dataGrade, onClose, onSearch }: ModalProps) {
  const theme = useTheme();
  const user = useUser();
  const token = user?.token;
  const { showSnackbar } = useSnackbar();

  const [grade, setGrade] = useState(dataGrade.nota || '');

  const handleSubmit = async () => {
    const newRegister = {
      nota: grade
    };
    try {
      await axiosServices
        .post(`/nota/editar/${dataGrade.id_nota}`, newRegister, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .finally(() => {
          showSnackbar('Nota editada com sucesso', true);
          onClose();
          onSearch(true);
        });
    } catch (error) {
      showSnackbar('Erro ao editar nota', false);
    }
  };

  return (
    <Grid container sx={{ backgroundColor: theme.palette.grey[200] }}>
      <Grid item container spacing={2} padding={2}>
        <Grid item xs={6}>
          <Grid container alignItems="center" justifyContent="start" spacing={1} direction="row">
            <Grid item xs={4}>
              <Typography whiteSpace="nowrap" fontWeight="bold" textAlign="end">
                Aluno:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <MainCard content={false}>
                <TextField
                  value={dataGrade.nome_aluno}
                  fullWidth
                  disabled
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000'
                    }
                  }}
                />
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container alignItems="center" justifyContent="start" spacing={1} direction="row">
            <Grid item xs={4}>
              <Typography whiteSpace="nowrap" fontWeight="bold" textAlign="end">
                Disciplina:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <MainCard content={false}>
                <TextField
                  value={dataGrade.nome_disciplina}
                  fullWidth
                  disabled
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000'
                    }
                  }}
                />
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container alignItems="center" justifyContent="start" spacing={1} direction="row">
            <Grid item xs={4}>
              <Typography whiteSpace="nowrap" fontWeight="bold" textAlign="end">
                Matrícula:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <MainCard content={false}>
                <TextField
                  value={'A000' + dataGrade.id_usuario}
                  fullWidth
                  disabled
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: '#000'
                    }
                  }}
                />
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container alignItems="center" justifyContent="start" spacing={1} direction="row">
            <Grid item xs={4}>
              <Typography whiteSpace="nowrap" fontWeight="bold" textAlign="end">
                Nota:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <MainCard content={false}>
                <TextField
                  value={grade}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^\d*\.?\d*$/.test(value)) {
                      const numValue = parseFloat(value);

                      if (value === '' || (numValue >= 0 && numValue <= 10)) {
                        setGrade(value);
                      }
                    }
                  }}
                  autoFocus
                  fullWidth
                />
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="end" spacing={2} direction="row">
            <Grid item>
              <Button variant="contained" fullWidth onClick={handleSubmit} disabled={!grade}>
                Salvar dados
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
