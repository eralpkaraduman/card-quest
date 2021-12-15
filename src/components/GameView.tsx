import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useGameController} from '@controllers/GameControllerProvider';
import {DonsolCard} from '@controllers/DonsolCard';

export default function GameView(): React.ReactElement {
  const gameController = useGameController();
  const [roomCards, setRoomCards] = React.useState<DonsolCard[]>([]);

  React.useEffect(() => {
    const removeEventListener = gameController.addEventListener({
      onEnterRoom(cards) {
        setRoomCards(cards);
      },
    });

    gameController.enterRoom();

    return () => {
      removeEventListener();
    };
  }, [gameController]);
  return (
    <View>
      {roomCards.map((roomCard, index) => (
        <Text key={index} style={styles.text}>
          {roomCard.toString()}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
});
