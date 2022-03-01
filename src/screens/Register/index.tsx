import React, { useState, useEffect } from "react";
import { Alert, Keyboard, Modal } from "react-native";
import {
  GestureHandlerRootView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { InputForm } from "../../components/Form/InputForm";
import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton/index";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";
const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor númerico")
    .positive("O  valor não pode ser negativo")
    .required("O Valor é obrigatório"),
});

import { CategorySelect } from "../CategorySelect";
interface CategoryProps {
  key: string;
  name: string;
}

interface FormData {
  [name: string]: any;
}
export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const dataKey = "@gofinances:transactions";

  // const [name, setName] = useState("");
  // const [amount, setAmount] = useState("");
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  function handleTransactionsTypeSelect(type: "positive" | "negative") {
    setTransactionType(type);
  }
  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }
  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }
  useEffect(() => {
    // removeAll();
    loadData();
  }, []);

  async function removeAll() {
    await AsyncStorage.removeItem(dataKey);
  }
  async function loadData() {
    const data = JSON.parse(await AsyncStorage.getItem(dataKey));
    console.log(data!);
  }

  async function handleRegister(form: FormData) {
    if (!transactionType) return Alert.alert("Selecione o tipo de transação");

    if (category.key === "category")
      return Alert.alert("Selecione a categoria");

    // id: Math.random().toString().replace(".", "").substr(0, 6),
    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };
    console.log(newTransaction);
    try {
      const data = JSON.parse(await AsyncStorage.getItem(dataKey));
      const currentData = data ? data : [];
      const dataFormatted = [...currentData, newTransaction];
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType("");
      setCategory({ key: "category", name: "Categoria" });
      navigation.navigate("Listagem" as never);
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar");
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      containerStyle={{ flex: 1 }}
      style={{ flex: 1 }}
    >
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            {/* <Input placeholder="Nome" onChangeText={setName} />
          <Input placeholder="Preço" onChangeText={setAmount} /> */}
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <TransactionTypes>
              <TransactionTypeButton
                onPress={() => handleTransactionsTypeSelect("positive")}
                isActive={transactionType === "positive"}
                title="Income"
                type="up"
              />
              <TransactionTypeButton
                onPress={() => handleTransactionsTypeSelect("negative")}
                title="Outcome"
                type="down"
                isActive={transactionType === "negative"}
              />
            </TransactionTypes>
            <GestureHandlerRootView>
              <CategorySelectButton
                title={category.name}
                onPress={handleOpenSelectCategoryModal}
              />
            </GestureHandlerRootView>
          </Fields>
          <GestureHandlerRootView>
            <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
          </GestureHandlerRootView>
        </Form>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
