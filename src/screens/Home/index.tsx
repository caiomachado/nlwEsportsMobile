import { useEffect, useState } from 'react'
import { Image, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import logoImg from '../../assets/logo-nlw-esports.png'

import { Heading } from '../../components/Heading'
import { Background } from '../../components/Background'
import { GameCard, GameCardProps } from '../../components/GameCard'

import { styles } from './styles'

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([])

  const navigation = useNavigation()

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate('game', { id, title, bannerUrl })
  }

  useEffect(() => {
    fetch(`${process.env.COMPUTER_IP_ADDRESS}/games`)
      .then(response => response.json())
      .then(data => setGames(data))
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
              onPress={() => handleOpenGame(item)}
              data={item}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
    </Background>
  )
}