//React Components
import { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
//Components
import { GameCard, GameCardProps } from '../../Components/GameCard';
import { Header } from '../../Components/Header';
import { Background } from '../../Components/Background';
//Imagem
import logoImg from '../../assets/logo-nlw-esports.png'
//Style
import { styles } from './styles';

export function Home() {

const [games, setGames] = useState<GameCardProps[]>([]);

const navigation = useNavigation();

function handleOpenGame({id, title,bannerUrl}:GameCardProps){
  navigation.navigate('game', {id, title,bannerUrl});

}

useEffect(() => {
  fetch('http://192.168.1.5:3333/games')
  .then(Response => Response.json())
  .then(data => setGames(data));
},[]);

  return (
    <Background>
    <SafeAreaView style={styles.container}>

      <Image 
        source={logoImg}
        style={styles.logo}
      />
      
      <Header
        title='Encontre seu duo'
        subtitle='Selecione o game que deseja jogar...'
      />
      <FlatList 
      data={games}
      keyExtractor={item => item.id}
      renderItem={({item}) =>(
        <GameCard 
          data={item}
          onPress={() => handleOpenGame(item)}
        />
      )}
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerStyle={styles.contentList}
      />
    </SafeAreaView>
    </Background>
  );
}

