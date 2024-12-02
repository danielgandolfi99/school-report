import { Button, Grid, Skeleton, Table, TableBody, TableCell, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import DownloadIcon from '@mui/icons-material/Download';
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import { HistoryProps } from 'types/history';
import { TableHead } from '@mui/material';
import { TableRow } from '@mui/material';
import useSWR from 'swr';
import axiosServices from 'utils/axios';
import useUser from 'hooks/useUser';
import { darken, lighten, useTheme } from '@mui/system';
import { useReactToPrint } from 'react-to-print';

const HomeStudents = () => {
  const theme = useTheme();
  const user = useUser();
  const token = user?.token;

  const [data, setData] = useState<HistoryProps[]>([]);

  async function getData<T>(key: string): Promise<T> {
    const response = await axiosServices.get(key, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }

  const { data: dataHistory, isValidating } = useSWR(
    user && user?.user.user_id ? `/nota/historico/${user?.user.user_id}` : null,
    getData<HistoryProps[]>,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  useEffect(() => {
    if (dataHistory && dataHistory.length > 0) {
      setData(dataHistory);
    }
  }, [dataHistory]);

  const columns: ColumnDef<HistoryProps>[] = useMemo(
    () => [
      {
        accessorKey: 'nome_disciplina',
        header: 'Nome Disciplina',
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
          <Typography fontSize={13} textAlign="center">
            {getValue<string>()}
          </Typography>
        )
      }
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

  const generatePrintableContent = () => {
    const tableRows =
      data
        .map((disciplina) => {
          return `
        <tr>
          <td style="border: 1px solid #000; padding: 8px; text-align: center;">${disciplina.nome_disciplina}</td>
          <td style="border: 1px solid #000; padding: 8px; text-align: center;">${disciplina.nota}</td>
        </tr>
      `;
        })
        .join('') || '';

    return `
      <div>
        <h1 style="text-align: center; margin-bottom: 20px;">Histórico Escolar</h1>
        <p>Aluno: ${user?.user.name}</p>
        <p>Matrícula: ${'A000' + user?.user.user_id.toString().padStart(4, '0')}</p>
        <p>Email: ${user?.user.email}</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr>
              <th style="border: 1px solid #000; padding: 8px; text-align: center; background-color: #f2f2f2;">Disciplina</th>
              <th style="border: 1px solid #000; padding: 8px; text-align: center; background-color: #f2f2f2;">Nota</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>
    `;
  };

  const handlePrint = useReactToPrint({
    content: () => {
      const printContainer = document.createElement('div');
      printContainer.innerHTML = generatePrintableContent(); // Gerar o conteúdo HTML dinamicamente
      return printContainer; // Retorna o conteúdo para impressão
    },
    pageStyle: `
        @page { size: A4; margin: 20mm; }
        body { font-family: Arial, sans-serif; }
        h1 { text-align: center; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #000; padding: 8px; text-align: center; }
        th { background-color: #f2f2f2; }
      `
  });

  return (
    <Grid>
      <Grid container alignItems="center" padding={2}>
        <Grid item xs={12}>
          <MainCard
            title={<Typography variant="h5">Seu Histórico Escolar</Typography>}
            secondary={
              <Button variant="contained" endIcon={<DownloadIcon sx={{ height: 20, width: 20 }} />} onClick={handlePrint}>
                Baixar Histórico Escolar
              </Button>
            }
          >
            {isValidating ? (
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
      </Grid>
    </Grid>
  );
};

export default HomeStudents;
