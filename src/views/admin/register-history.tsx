import { Button, Grid, Radio, Skeleton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { darken, lighten, useTheme } from '@mui/system';
import MainCard from 'components/MainCard';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import useUser from 'hooks/useUser';
import axiosServices from 'utils/axios';
import { HistoryProps } from 'types/history';
import useSWR from 'swr';
import DownloadIcon from '@mui/icons-material/Download';

const RegisterHistory = () => {
  const theme = useTheme();
  const user = useUser();
  const token = user?.token;

  const [dataStudent, setDataStudent] = useState<HistoryProps>({} as HistoryProps);
  const [data, setData] = useState<HistoryProps[]>([]);
  const [filter, setFilter] = useState('');
  const printRef = useRef<HTMLDivElement>(null);

  async function getData<T>(key: string): Promise<T> {
    const response = await axiosServices.get(key, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }

  const { data: dataHistory, isValidating: search } = useSWR(`/nota/consultar`, getData<HistoryProps[]>, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  useEffect(() => {
    if (dataHistory && dataHistory.length > 0) {
      setData(dataHistory);
    }
  }, [dataHistory]);

  const columns: ColumnDef<HistoryProps>[] = useMemo(
    () => [
      {
        id: 'select',
        header: '',
        cell: ({ row }) => (
          <Radio checked={dataStudent?.id_usuario === row.original.id_usuario} onChange={() => setDataStudent(row.original)} />
        ),
        enableSorting: false,
        size: 40
      },
      {
        accessorKey: 'nome_aluno',
        header: 'Aluno',
        cell: ({ getValue }) => (
          <Typography fontSize={13} textAlign="center">
            {getValue<string>()}
          </Typography>
        )
      },
      {
        accessorKey: 'nome_disciplina',
        header: 'Nome da Disciplina',
        cell: ({ getValue }) => (
          <Typography fontSize={13} textAlign="start">
            {getValue<string>()}
          </Typography>
        )
      },
      {
        accessorKey: 'nota',
        header: 'Nota',
        cell: ({ getValue }) => (
          <Typography fontSize={13} textAlign="start">
            {getValue<string>()}
          </Typography>
        )
      }
    ],
    [dataStudent?.id_usuario]
  );

  const table = useReactTable({
    data: data,
    columns,
    // state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const printStyle = `
        <style>
          @media print {
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
            }
            .print-header {
              text-align: center;
              margin-bottom: 20px;
            }
            table {
              width: 100%;
              max-width: 100%;
              border-collapse: collapse;
              margin: 0 auto;
            }
            th, td {
              border: 1px solid #000;
              padding: 8px;
              text-align: center;
            }
            th {
              background-color: #f2f2f2;
            }
          }
        </style>
      `;
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
          <head>
            <title>Histórico Escolar</title>
            ${printStyle}
          </head>
          <body>
            <div >
              <h1 class="print-header">Histórico Escolar</h1>
              <p>Aluno: ${dataStudent.nome_aluno}</p>
              <p>Matrícula: A000${dataStudent.id_usuario}</p>
            </div>
            ${printContents}
          </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
      }
    }
  };

  useEffect(() => {
    if (filter) {
      const filtered = data.filter((item) =>
        Object.values(item).some((val) => val?.toString().toLowerCase().includes(filter.toLowerCase()))
      );
      setData(filtered);
    } else {
      setData(dataHistory || []);
    }
  }, [filter, data, dataHistory]);

  return (
    <Grid>
      <MainCard
        title={<Typography variant="h5">Histórico Escolar</Typography>}
        secondary={
          <Grid container spacing={2}>
            <Grid item>
              <Button variant="contained" endIcon={<DownloadIcon sx={{ height: 20, width: 20 }} />} onClick={handlePrint}>
                Baixar Histórico Escolar
              </Button>
            </Grid>
            <Grid item>
              <TextField label="Buscar" value={filter} onChange={(e) => setFilter(e.target.value)} fullWidth />
            </Grid>
          </Grid>
        }
      >
        {search ? (
          <Skeleton height={300} />
        ) : data && data.length > 0 ? (
          <Grid xs={12}>
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
    </Grid>
  );
};

export default RegisterHistory;
