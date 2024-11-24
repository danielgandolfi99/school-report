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
import { useMemo, useState } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { User } from 'types/user';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import ModalCreateStudent from 'components/Modals/RegisterStudents/ModalCreateStudent';
import ModalEditStudent from 'components/Modals/RegisterStudents/ModalEditStudent';

const data: User[] = [
  {
    id_usuario: 1,
    nome: 'João Silva',
    email: 'joao.silva@example.com',
    tipo_usuario: 'admin'
  },
  {
    id_usuario: 2,
    nome: 'Maria Oliveira',
    email: 'maria.oliveira@example.com',
    tipo_usuario: 'user'
  },
  {
    id_usuario: 3,
    nome: 'Carlos Souza',
    email: 'carlos.souza@example.com',
    tipo_usuario: 'moderator'
  },
  {
    id_usuario: 4,
    nome: 'Ana Santos',
    email: 'ana.santos@example.com',
    tipo_usuario: 'user'
  },
  {
    id_usuario: 5,
    nome: 'Roberto Lima',
    email: 'roberto.lima@example.com',
    tipo_usuario: 'admin'
  }
];

const RegisterStudents = () => {
  const theme = useTheme();

  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [search, setSearch] = useState(false);

  const [dataStudent, setDataStudent] = useState<User>({} as User);

  const handleDeleteStudent = () => {
    console.log('teste')
  };

  const handleCloseModalAdd = () => {
    setModalAdd(false);
  };

  const handleCloseModalEdit = () => {
    setModalEdit(false);
  };

  const handleCloseModalDelete = () => {
    setModalDelete(false);
  };

  const columns: ColumnDef<User>[] = useMemo(
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
            <Tooltip title="Editar" arrow>
              <IconButton
                sx={{ height: '25px', width: '25px' }}
                aria-label="Editar"
                color="default"
                onClick={() => {
                  setDataStudent(row.original);
                  setModalEdit(true);
                }}
              >
                <EditIcon sx={{ height: '20px', width: '20px' }} />
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
              title={<Typography variant="h5">Editar aluno</Typography>}
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