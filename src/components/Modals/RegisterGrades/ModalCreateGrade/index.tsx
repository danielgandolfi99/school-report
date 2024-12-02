import { Autocomplete, Button, Grid, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'components/@extended/SnackbarContext';
import MainCard from 'components/MainCard';
import useUser from 'hooks/useUser';
import { useState } from 'react';
import useSWR from 'swr';
import { DisciplinesProps } from 'types/disciplines';
import { UserProps } from 'types/user';
import axiosServices from 'utils/axios';
import { useTheme } from '@mui/material/styles';

interface ModalProps {
  onClose: () => void;
  onSearch: (search: boolean) => void;
}

export default function ModalCreateGrade({ onClose, onSearch }: ModalProps) {
  const theme = useTheme();
  const user = useUser();
  const token = user?.token;
  const { showSnackbar } = useSnackbar();

  const [dataUser, setDataUser] = useState<UserProps>({} as UserProps);
  const [dataDiscipline, setDataDiscipline] = useState<DisciplinesProps>({} as DisciplinesProps);
  const [grade, setGrade] = useState('');

  async function getData<T>(key: string): Promise<T> {
    const response = await axiosServices.get(key, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }

  const { data: alunos } = useSWR(token ? '/usuario/alunos' : null, getData<UserProps[]>, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const { data: disciplinas } = useSWR(token ? '/disciplina/consultar' : null, getData<DisciplinesProps[]>, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const handleSubmit = async () => {
    const newRegister = {
      idUsuario: dataUser.id_usuario || 0,
      idDisciplina: dataDiscipline.id_disciplina || 0,
      nota: grade
    };
    try {
      await axiosServices
        .post('/nota/cadastrar', newRegister, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .finally(() => {
          showSnackbar('Nota cadastrada com sucesso', true);
          onClose();
          onSearch(true);
        });
    } catch (error) {
      showSnackbar('Erro ao cadastrar nota', false);
    }
  };

  const handleReset = () => {
    setDataUser({} as UserProps);
    setDataDiscipline({} as DisciplinesProps);
    setGrade('');
  };

  const handleUserChange = (value: UserProps) => {
    if (value) {
      setDataUser(value);
    }
  };

  const checkDisabled = () => {
    if (!dataUser || !dataDiscipline || !grade) {
      return true;
    } else return false;
  };

  return (
    <Grid container sx={{ backgroundColor: theme.palette.grey[200] }}>
      <Grid item container spacing={2} padding={2}>
        <Grid item xs={4.5}>
          <Grid container alignItems="center" justifyContent="start" spacing={1} direction="row">
            <Grid item xs={4}>
              <Typography whiteSpace="nowrap" fontWeight="bold" textAlign="end">
                Aluno:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <MainCard content={false}>
                <Autocomplete
                  id="user-autocomplete"
                  value={dataUser}
                  onChange={(event, value) => {
                    if (value) {
                      handleUserChange(value);
                    } else {
                      setDataUser({} as UserProps);
                    }
                  }}
                  options={alunos || []}
                  getOptionLabel={(option) => option.nome || ''}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4.5}>
          <Grid container alignItems="center" justifyContent="start" spacing={1} direction="row">
            <Grid item xs={4}>
              <Typography whiteSpace="nowrap" fontWeight="bold" textAlign="end">
                Disciplina:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <MainCard content={false}>
                <Autocomplete
                  id="discipline-autocomplete"
                  value={dataDiscipline}
                  onChange={(event, value) => {
                    if (value) {
                      setDataDiscipline(value);
                    } else {
                      setDataDiscipline({} as DisciplinesProps);
                    }
                  }}
                  disabled={dataUser && !dataUser.nome}
                  options={disciplinas || []}
                  getOptionLabel={(option) => option.nome_disciplina || ''}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
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
              <Button variant="outlined" color="error" fullWidth onClick={handleReset}>
                Limpar
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" fullWidth onClick={handleSubmit} disabled={checkDisabled()}>
                Salvar nova nota
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
