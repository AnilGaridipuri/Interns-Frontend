import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    backgroundImage:
      "linear-gradient(to bottom right, rgb(60, 43, 81), #502760)",
    fontSize: 17,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));


export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f4eafd",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#fff",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const StyledTableHeader = styled(TableRow)(({ theme }) => ({
  "& .MuiTableRow-root": {
    backgroundImage:
      "linear-gradient(to bottom right, #15154a, #2f2f89, #6c38b9, #9724c9)",
  },
}));
