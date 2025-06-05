import { Deck } from "@/types/deck";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useExampleProvider } from "../context/deckContext";


export default function ExampleTable() {
  const { deck } = useExampleProvider();
  const headers = [
    "ID",
    "Name",
    "ImageURL",
    "arbitrary",
    "Array",
    "Object"
  ]
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header, i) =>
              <TableCell key={i}>{header}</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {deck.map((d: Deck, i) =>
            <TableRow key={i}>
              <TableCell>{d.id}</TableCell>
              <TableCell sx={{ textTransform: "capitalize" }}>{d.name}</TableCell>
              {/* <TableCell><img src={d.imgUrl} style={{ width: 50 }} /></TableCell> */}
              <TableCell>{d.imgUrl}</TableCell>
              <TableCell>{d.arbitrary}</TableCell>
              <TableCell>{d.arbitraryArray.join(", ")}</TableCell>
              <TableCell>
                {/* got help from copilot to remind me how to map an object */}
                {Object.entries(d.arbitraryObject).map(([key, value]) => (
                  <div key={key}>{key}: {String(value)}</div>
                ))}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}