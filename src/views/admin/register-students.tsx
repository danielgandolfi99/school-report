import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Modal,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
import { darken, lighten, useTheme } from '@mui/system';
import MainCard from 'components/MainCard';
import { useEffect, useMemo, useState } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { UserProps } from 'types/user';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import ModalCreateStudent from 'components/Modals/RegisterStudents/ModalCreateStudent';
import ModalEditStudent from 'components/Modals/RegisterStudents/ModalEditStudent';
import useUser from 'hooks/useUser';
import axiosServices from 'utils/axios';
import ModalEditPasswordStudent from 'components/Modals/RegisterStudents/ModalEditPasswordStudent';
import { useSnackbar } from 'components/@extended/SnackbarContext';
import LockResetIcon from '@mui/icons-material/LockReset';

const RegisterStudents = () => {
  const theme = useTheme();
  const user = useUser();
  const token = user?.token;
  const { showSnackbar } = useSnackbar();

  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalEditPassword, setModalEditPassword] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [search, setSearch] = useState(true);

  const [data, setData] = useState<UserProps[]>([]);
  const [dataStudent, setDataStudent] = useState<UserProps>({} as UserProps);

  useEffect(() => {
    if (search && user) {
      handleSearch();
    }
  }, [search, user]);

  const handleSearch = async () => {
    try {
      await axiosServices
        .get('/usuario/alunos', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => {
          if (res && res.data) {
            setData(res.data);
          }
        })
        .finally(() => {
          setSearch(false);
        });
    } catch (error) {
      showSnackbar('Erro ao buscar alunos', false);
    }
  };

  const handleDeleteStudent = async () => {
    try {
      await axiosServices
        .delete(`/usuario/deletar/${dataStudent.id_usuario}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .finally(() => {
          showSnackbar('Aluno deletado com sucesso', true);
          setSearch(true);
        });
    } catch (error) {
      showSnackbar('Erro ao deletar aluno', false);
    }
  };

  const handleCloseModalAdd = () => {
    setModalAdd(false);
  };

  const handleCloseModalEdit = () => {
    setModalEdit(false);
  };

  const handleCloseModalEditPassword = () => {
    setModalEditPassword(false);
  };

  const handleCloseModalDelete = () => {
    setModalDelete(false);
  };

  const columns: ColumnDef<UserProps>[] = useMemo(
    () => [
      {
        header: '',
        id: 'actions',
        size: 50,
        cell: ({ row }) => (
          <Stack alignItems="center" justifyContent="center" alignSelf="center" textAlign="center" direction="row" spacing={0.5}>
            <Tooltip title="Excluir" arrow>
              <IconButton
                sx={{ height: '25px', width: '25px' }}
                aria-label="Excluir"
                color="error"
                onClick={() => {
                  setDataStudent(row.original);
                  setModalDelete(true);
                }}
              >
                {<DeleteIcon sx={{ height: '20px', width: '20px' }} />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar Dados" arrow>
              <IconButton
                sx={{ height: '25px', width: '25px' }}
                aria-label="Editar Dados"
                color="default"
                onClick={() => {
                  setDataStudent(row.original);
                  setModalEdit(true);
                }}
              >
                <EditIcon sx={{ height: '20px', width: '20px' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Alterar Senha" arrow>
              <IconButton
                sx={{ height: '25px', width: '25px' }}
                aria-label="Alterar Senha"
                color="default"
                onClick={() => {
                  setDataStudent(row.original);
                  setModalEditPassword(true);
                }}
              >
                <LockResetIcon sx={{ height: '20px', width: '20px' }} />
              </IconButton>
            </Tooltip>
          </Stack>
        )
      },
      {
        accessorKey: 'id_usuario',
        header: 'Matrícula',
        cell: ({ getValue }) => (
          <Typography fontSize={13} textAlign="center">
            {'A000' + getValue<number>()}
          </Typography>
        )
      },
      {
        accessorKey: 'nome',
        header: 'Nome',
        cell: ({ getValue }) => (
          <Typography fontSize={13} textAlign="start">
            {getValue<string>()}
          </Typography>
        )
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ getValue }) => (
          <Typography fontSize={13} textAlign="start">
            {getValue<string>()}
          </Typography>
        )
      }
      //   {
      //     accessorKey: 'tipo_usuario',
      //     header: 'Tipo de Usuário',
      //     cell: ({ getValue }) => (
      //       <Typography fontSize={13} textAlign="start">
      //         {getValue<string>()}
      //       </Typography>
      //     )
      //   }
    ],
    []
  );

  const table = useReactTable({
    data: data,
    columns,
    // state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  return (
    <Grid>
      <MainCard
        title={<Typography variant="h5">Registro de Alunos</Typography>}
        secondary={
          <Grid container spacing={1}>
            <Grid item>
              <Button variant="contained" endIcon={<AddBoxIcon sx={{ height: 20, width: 20 }} />} onClick={() => setModalAdd(true)}>
                Adicionar novo Aluno
              </Button>
            </Grid>
          </Grid>
        }
      >
        {search ? (
          <Skeleton height={300} />
        ) : data && data.length > 0 ? (
          <Grid xs={12} maxHeight={'calc(100vh - 480px)'} overflow="auto">
            <Table sx={{ padding: '0px important' }}>
              <TableHead
                sx={{
                  position: 'sticky',
                  top: -2,
                  zIndex: 10,
                  border: '1px solid black !important',
                  backgroundColor: theme.palette.primary.main
                }}
              >
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableCell
                        key={header.id}
                        align="center"
                        sx={{
                          padding: '2px',
                          fontSize: '10px',
                          border: '1px solid black !important',
                          color: '#fff !important',
                          width: header.column.getSize() + 'px !important'
                        }}
                      >
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody sx={{ padding: 0 }}>
                {table.getRowModel().rows.map((row, i) => {
                  return (
                    <TableRow
                      key={row.id}
                      sx={{
                        '&:hover': {
                          backgroundColor:
                            theme.palette.mode === 'dark'
                              ? `${darken(theme.palette.primary.main, 0.5)} !important`
                              : `${lighten(theme.palette.primary.main, 0.7)} !important`
                        },
                        backgroundColor: i % 2 === 0 && (theme.palette.mode === 'dark' ? '#121212' : theme.palette.grey[200]),
                        border: '1px solid black'
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          sx={{
                            border: '1px solid black',
                            padding: '2px !important'
                          }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Grid>
        ) : (
          <Typography margin={1}>Nenhum dado encontrado.</Typography>
        )}
      </MainCard>
      <Modal
        open={modalAdd}
        onClose={handleCloseModalAdd}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Grid container xs={12} lg={8} md={11} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <MainCard
              title={<Typography variant="h5">Adicionar novo aluno</Typography>}
              secondary={
                <IconButton color="error" onClick={handleCloseModalAdd} sx={{ border: '1px solid red' }}>
                  <CloseIcon />
                </IconButton>
              }
              content={false}
            >
              <ModalCreateStudent onClose={handleCloseModalAdd} onSearch={setSearch} />
            </MainCard>
          </Grid>
        </Grid>
      </Modal>
      <Modal
        open={modalEdit}
        onClose={handleCloseModalEdit}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Grid container xs={12} lg={8} md={11} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <MainCard
              title={<Typography variant="h5">Editar dados do aluno {dataStudent.nome}</Typography>}
              secondary={
                <IconButton color="error" onClick={handleCloseModalEdit} sx={{ border: '1px solid red' }}>
                  <CloseIcon />
                </IconButton>
              }
              content={false}
            >
              <ModalEditStudent onClose={handleCloseModalEdit} onSearch={setSearch} dataStudent={dataStudent} />
            </MainCard>
          </Grid>
        </Grid>
      </Modal>
      <Modal
        open={modalEditPassword}
        onClose={handleCloseModalEditPassword}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Grid container xs={12} lg={8} md={11} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <MainCard
              title={<Typography variant="h5">Alterar senha para {dataStudent.nome}</Typography>}
              secondary={
                <IconButton color="error" onClick={handleCloseModalEditPassword} sx={{ border: '1px solid red' }}>
                  <CloseIcon />
                </IconButton>
              }
              content={false}
            >
              <ModalEditPasswordStudent onClose={handleCloseModalEdit} onSearch={setSearch} dataStudent={dataStudent} />
            </MainCard>
          </Grid>
        </Grid>
      </Modal>
      <Dialog open={modalDelete} onClose={handleCloseModalDelete}>
        <DialogTitle>Excluir aluno {dataStudent.nome}</DialogTitle>
        <DialogContent>
          <DialogContentText>Você tem certeza que deseja excluir este aluno?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalDelete} color="error" variant="outlined">
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleDeleteStudent}>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default RegisterStudents;
