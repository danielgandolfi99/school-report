import { Button, Grid, TextField, Typography, useTheme } from '@mui/material';
import { useState } from 'react';

interface ModalProps {
  onClose: () => void;
  onSearch: (search: boolean) => void;
}

export default function ModalCreateDiscipline({ onClose, onSearch }: ModalProps) {
  const theme = useTheme();

  const [name, setName] = useState('');

  const handleSubmit = () => {
    onClose();
    onSearch(true);
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
