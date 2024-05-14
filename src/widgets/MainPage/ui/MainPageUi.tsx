import { ChangeEvent, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useLocalObservable } from "mobx-react-lite";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { motion } from "framer-motion";
import { TextField, Button, Typography, MenuItem } from "@mui/material";
import { convertorStore } from "@src/app/store/convertorStore";
import styles from "./mainPage.module.css";

const MainPageUi = observer(() => {
  const localStore = useLocalObservable(() => convertorStore);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStore.fetchCurrencyData();
  }, [localStore]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredCurrencyList = localStore.currencyList.filter((currency) =>
    currency.currency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Typography variant="h2" gutterBottom color="primary">
        Конвертер валют
      </Typography>

      <Formik
        initialValues={{ amount: "", fromCurrency: "USD", toCurrency: "EUR" }}
        onSubmit={(values) => localStore.convertCurrency(values)}
      >
        <Form>
          <Field
            name="amount"
            type="text"
            as={TextField}
            label="Количество"
            className={styles.formField1}
          />
          <br />
          <br />
          <ErrorMessage
            name="amount"
            component="div"
            className={styles.errorMessage}
          />
          <TextField
            label="Найти валюту"
            value={searchQuery}
            onChange={handleSearchChange}
            className={styles.searchField}
          />
          <br />
          <br />
          <div className={styles.bottomBlock}>
            <Field
              name="fromCurrency"
              type="text"
              as={TextField}
              label="С валюты"
              className={styles.formField}
            />
            <ErrorMessage
              name="fromCurrency"
              component="div"
              className={styles.errorMessage}
            />
            <Field
              name="toCurrency"
              type="text"
              as={TextField}
              label="На валюту"
              select
              className={styles.tocurrency}
              InputProps={{
                classes: {
                  root: styles.textFieldRoot,
                },
              }}
            >
              {filteredCurrencyList.map((currency) => (
                <MenuItem key={currency.currency} value={currency.currency}>
                  {currency.currency}
                </MenuItem>
              ))}
            </Field>
          </div>

          <ErrorMessage
            name="toCurrency"
            component="div"
            className={styles.errorMessage}
          />
          <Button variant="contained" type="submit">
            Конвертировать
          </Button>
        </Form>
      </Formik>
      <Typography variant="h5" gutterBottom style={{ color: "green" }}>
        {localStore.result}
      </Typography>
      <Typography
        variant="body1"
        className={styles.errorMessage}
        style={{ color: "red" }}
      >
        {localStore.error}
      </Typography>
    </motion.div>
  );
});

export default MainPageUi;
