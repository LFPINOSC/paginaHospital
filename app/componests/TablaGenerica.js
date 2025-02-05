import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import ModalGenerico from "./ModalGenerico";

export default function TablaGenerica({
  data,
  setData,
  fields,
  apiEndpoint,
  primaryKey = "id",
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filters, setFilters] = useState({}); // Estado para filtros
  const [metodo, setMetodo] =useState(null);
  const [url, setURL] =useState(null);
  const router = useRouter();

  const handleOpenModal = (item = null) => {
    if(item){
      setMetodo("PUT")
      setURL(`${apiEndpoint}/${item[primaryKey]}`);
    }else{
      setMetodo("POST");
      setURL(apiEndpoint);
    }
    setSelectedItem(item);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedItem(null);
  };

  const handleSaveItem = async (item) => {
    try {
      const method=metodo;
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      if (!response.ok) {
        throw new Error("Error al guardar los datos");
      }
      const savedItem = await response.json();
      router.push("/dashboard")
      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar el registro:", error);
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
    setPage(0); // Reiniciar página al filtrar
  };

  // Aplicar filtros a los datos
  const filteredData = data.filter((row) =>
    Object.entries(filters).every(([field, value]) =>
      value ? row[field]?.toString().toLowerCase().includes(value.toLowerCase()) : true
    )
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: 2 }}>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: 2 }}
        onClick={() => handleOpenModal()}
      >
        Agregar
      </Button>

      {/* Filtros */}
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        {fields
          .filter((field) => field.filterable) // Solo los campos con `filterable: true`
          .map((field) => (
            <Grid item xs={12} sm={6} md={3} key={field.name}>
              <TextField
                label={`Filtrar por ${field.label}`}
                variant="outlined"
                size="small"
                fullWidth
                value={filters[field.name] || ""}
                onChange={(e) => handleFilterChange(field.name, e.target.value)}
              />
            </Grid>
          ))}
      </Grid>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {fields.map((field) => (
                <TableCell key={field.name}>{field.label}</TableCell>
              ))}
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={row[primaryKey] || `row-${index}`}>
                  {fields.map((field) => (
                    <TableCell key={`${row[primaryKey]}-${field.name}`}>
                      {row[field.name] || "N/A"}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleOpenModal(row)}
                      sx={{ marginRight: 1 }}
                    >
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ModalGenerico
        open={openModal}
        onClose={handleCloseModal}
        onSave={handleSaveItem}
        fields={fields}
        data={selectedItem}
      />
    </Paper>
  );
}
