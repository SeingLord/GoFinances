import React from "react";
import { FlatList } from "react-native";
import { Button } from "../../components/Form/Button";
import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from "./styles";
import { categories } from "./../../utils/categories";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface Category {
  key: string;
  name: string;
}
interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory,
}: Props) {
  function handleCategorySelect(category: Category) {
    setCategory(category);
  }

  return (
    <Container>
      <Header>
        <Title>Category</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: "100%" }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={Separator}
      />

      <Footer>
        <GestureHandlerRootView>
          <Button onPress={closeSelectCategory} title="Selecionar" />
        </GestureHandlerRootView>
      </Footer>
    </Container>
  );
}
