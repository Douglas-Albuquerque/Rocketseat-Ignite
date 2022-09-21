//React components
import { useEffect, useState } from 'react';
import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
//Components
import { Background } from "../../Components/Background";
import { GameParams } from "../../@types/navigation";
import { Header } from '../../Components/Header';
import { DuoCard, DuoCardProps } from '../../Components/DuoCard';
import { DuoMatch } from "../../Components/DuoMatch";
//Styles
import { styles } from './styles';
import { THEME } from '../../theme';
//Imagem
import logoImg from '../../assets/logo-nlw-esports.png'
import { TextAlignJustify } from 'phosphor-react-native';

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  function handleGoBack(){
    navigation.goBack();
  }

  async function getDiscordUSer(adsID: string) {
    fetch(`http://192.168.1.5:3333/ads/${adsID}/discord`)
    .then(Response => Response.json())
    .then(data => setDiscordDuoSelected(data.discord));
  }

  useEffect(() => {
    fetch(`http://192.168.1.5:3333/games/${game.id}/ads`)
    .then(Response => Response.json())
    .then(data => setDuos(data));
  },[]);

  return (
    <Background>
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Entypo 
            name='chevron-thin-left'
            color={THEME.COLORS.CAPTION_300}
            size={20}
          />

        </TouchableOpacity>

        <Image 
          source={logoImg}
          style={styles.logo}
        />
        
      <View style={styles.rigth}/>
      </View>

       <Image
        source={{uri: game.bannerUrl}}
        style={styles.cover}
        resizeMode='cover'
       />

      <Header 
      title={game.title}
      subtitle="Conecte-se e comece a jogar!"
      />

      <FlatList 
        data={duos}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <DuoCard 
          data={item}
          onConnect={() => getDiscordUSer(item.id)}
          />
        )}
        horizontal
        style={styles.containerList}
        contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>
            Não há anúncios publicados ainda.
          </Text>

        )}
      
      />

      <DuoMatch
        visible={discordDuoSelected.length > 0}
        discord={discordDuoSelected}
        onClose={() => setDiscordDuoSelected('')}
      />

    </SafeAreaView>
    </Background>
  );
}