import React, { useCallback, useEffect, useState } from "react";

// espera que os dados foram carregados
import { ActivityIndicator } from "react-native";
import { HighlightCard } from "./../../components/HighlightCard/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import {
  TransactionCard,
  TransactionCardProps,
} from "./../../components/TransactionCard/index";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Icon,
  Photo,
  User,
  UserGreeting,
  UserName,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
  LoadContainer,
} from "./styles";
interface HighlighProps {
  amount: string;
  lastTransactions: string;
}

interface HighlightData {
  entries: HighlighProps;
  expensives: HighlighProps;
  total: HighlighProps;
}

interface DataListProps extends TransactionCardProps {
  id: string;
}
export function Dashboard() {
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  // toda hora que entra na tela chama essa função
  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );
  function getLastTransationDate(
    collection: DataListProps[],
    tpye: "positive" | "negative"
  ) {
    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        transactions
          .filter((transactions) => transactions.type === "positive")
          .map((transactions) => new Date(transactions.date).getTime())
      )
    );
    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleDateString(
      "pt-BR",
      { month: "long" }
    )}`;
  }
  async function loadTransactions() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];
    console.log(transactions);
    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type == "positive") {
          entriesTotal += Number(item.amount);
        } else if (item.type == "negative") {
          expensiveTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));
        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        };
      }
    );
    const total = entriesTotal - expensiveTotal;

    console.log(transactionsFormatted);
    setTransactions(transactionsFormatted);

    const lastTransactionEntries = getLastTransationDate(
      transactions,
      "positive"
    );
    const lastTransactionExpensive = getLastTransationDate(
      transactions,
      "negative"
    );
    const totalInterval = `01 a ${lastTransactionExpensive} `;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pr-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransactions: `Última entrada dia ${lastTransactionEntries}`,
      },
      expensives: {
        amount: expensiveTotal.toLocaleString("pr-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransactions: `Última saída dia ${lastTransactionExpensive}`,
      },
      total: {
        amount: total.toLocaleString("pr-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransactions: totalInterval,
      },
    });
    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  // [
  // {
  //   id: "1",
  //   type: "positive",
  //   title: "Desenvolvimento de site",
  //   amount: "R$ 17.200,00",
  //   category: {
  //     name: "Vendas",
  //     icon: "dollar-sign",
  //   },
  //   date: "23/05/2022",
  // },
  // {
  //   id: "2",
  //   type: "negative",
  //   title: "Hamburgueria",
  //   amount: "R$ 400,00",
  //   category: {
  //     name: "Alimentação",
  //     icon: "coffee",
  //   },
  //   date: "23/05/2022",
  // },
  // {
  //   id: "3",
  //   type: "negative",
  //   title: "Aluguel de apartamento",
  //   amount: "R$ 2.400,00",
  //   category: {
  //     name: "Casa",
  //     icon: "shopping-bag",
  //   },
  //   date: "23/05/2022",
  // },
  // ];
  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: "https://images.unsplash.com/photo-1542080681-b52d382432af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
                  }}
                />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>Juliana</UserName>
                </User>
              </UserInfo>

              <LogoutButton onPress={() => {}}>
                <Icon name="poweroff" />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighlightCards
          // Controlando a propriedade pelo styled
          // contentContainerStyle={{ paddingHorizontal: 24 }}
          // horizontal
          // showHorinzontalScrollIndicator={false}
          >
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransactions}
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlightData.expensives.amount}
              lastTransaction={highlightData.expensives.lastTransactions}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransactions}
            />
          </HighlightCards>
          <Transactions>
            <Title>Listagem</Title>
            <TransactionList
              data={transactions}
              keyExtractor={(item: any) => item.id}
              renderItem={({ item }: any) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
