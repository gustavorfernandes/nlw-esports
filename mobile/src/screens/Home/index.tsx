import { Image, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { styles } from "./styles"
import logoImg from "../../assets/logo-nlw-esports.png"
import { Heading } from "../../components/Heading"
import { GameCard, GameCardProps } from "../../components/GameCard"
import { useEffect, useState } from "react"
import { Background } from "../../components/Background"
import { useNavigation } from "@react-navigation/native"

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([])

  const navigation = useNavigation()

  function handleOpenGame({ id, title, bannerURl }: GameCardProps) {
    navigation.navigate("game", { id: id, title: title, bannerURl: bannerURl })
  }

  useEffect(() => {
    fetch("http://192.168.0.89:4000/games")
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(err => console.log(err))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={logoImg}
          style={styles.logo}
        />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          contentContainerStyle={styles.contentList}
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GameCard
              data={item}
              onPress={() => {
                handleOpenGame(item)
              }}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
    </Background>
  )
}