import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Reciter } from "../../../core/models/Reciter";
import { useState } from "react";

type ReciterDropdownProps = {
  reciters: Reciter[];
  updateReciterId: (reciterId: string) => void;
};

export default function ReciterDropdown({
  reciters,
  updateReciterId,
}: ReciterDropdownProps) {
  const [reciterId, setReciterId] = useState<string>(reciters[0].id.toString());

  const handleChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setReciterId(value);
    updateReciterId(value);
  };

  return (
    <Box className="flex justify-center my-8">
      <FormControl className="w-96">
        <InputLabel shrink>Reciters</InputLabel>
        <Select
          sx={{ fontSize: 14 }}
          notched
          value={reciterId}
          label="Reciters"
          onChange={handleChange}
        >
          {reciters.map((reciter) => (
            <MenuItem key={reciter.id} value={reciter.id} sx={{ fontSize: 14 }}>
              {reciter.translated_name.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
