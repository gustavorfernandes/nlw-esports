import { useEffect, useState } from "react"
import { View, TouchableOpacity, Image, FlatList, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRoute } from "@react-navigation/native"
import { Entypo } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

import logoImg from "../../assets/logo-nlw-esports.png"

import { THEME } from "../../theme"
import { styles } from "./styles"

import { GameParams } from "../../@types/navigation"

import { DuoCard, DuoCardProps } from "../../components/DuoCard"
import { Background } from "../../components/Background"
import { Heading } from "../../components/Heading"
import { DuoMatch } from "../../components/DuoMatch"

export function Game() {
  const navigation = useNavigation()
  const route = useRoute()
  const game = route.params as GameParams
  const [duos, setDuos] = useState<DuoCardProps[]>([])
  const [discordDuoSelected, setDiscordDuoSelected] = useState("")

  function handleGoBack() {
    navigation.goBack()
  }

  async function getUserDiscord(adsId: string) {
    fetch(`http://192.168.0.89:4000/ads/${adsId}/discord`)
      .then(res => res.json())
      .then(data => setDiscordDuoSelected(data.discord))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetch(`http://192.168.0.89:4000/games/${game.id}/ads`)
      .then(res => res.json())
      .then(data => setDuos(data))
      .catch(err => console.log(err))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>

        <View style={styles.header} >
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image
            style={styles.logo}
            source={logoImg}
          />

          <View style={styles.right} />
        </View>

        <Image
          style={styles.cover}
          source={{ uri: game.bannerURl }}
          resizeMode="cover"

        />

        <Heading
          title={game.title}
          subtitle="Conecte-se e comece a jogar!"
        />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => getUserDiscord(item.id)}
            />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={duos.length > 0 ? styles.contentList : styles.emptyListContent}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        >
        </FlatList>

        <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected("")}
        />
      </SafeAreaView>
    </Background>
  )
}
