/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { Currency, convertorStore } from "@src/app/store/convertorStore";
import { motion } from "framer-motion";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./table.module.css";

const AdditionalPage = observer(() => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    convertorStore.fetchCurrency({ currency: baseCurrency });
  }, [baseCurrency]);

  const handleBaseCurrencyChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setBaseCurrency(event.target.value as string);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredCurrencies = convertorStore.currencyList.filter((currency) =>
    currency.currency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.table}>
      <h1>Свежие курсы валют</h1>
      <div className={styles.top}>
        <div>
          <Typography>Выберите базовую валюту</Typography>
          <Select
            value={baseCurrency}
            // @ts-ignore
            onChange={handleBaseCurrencyChange}
            variant="outlined"
          >
            {convertorStore.currencyList.map((currency) => (
              <MenuItem key={currency.currency} value={currency.currency}>
                {currency.currency}
              </MenuItem>
            ))}
          </Select>
        </div>
        <TextField
          label="Найти валюту"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Валюта</TableCell>
                <TableCell>Курс</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCurrencies.map((currency: Currency) => (
                <TableRow key={currency.currency}>
                  <TableCell>{currency.currency}</TableCell>
                  <TableCell>{currency.value.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </motion.div>
    </div>
  );
});

export default AdditionalPage;
