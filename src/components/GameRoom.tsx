import React, {useState} from 'react';
import {useGameController} from '@controllers/GameControllerProvider';
import {GameCardSize} from './GameCard.styles';
import styled from 'styled-components/native';
import {CardSlot} from './CardSlot';
import {DonsolCard} from '@controllers/DonsolCard';
import {
  resolveCardPlay,
  renderDiffAsString,
} from '@controllers/resolveGameCardPlay';
import {useWindowAttributes} from '@/utils';

const Container = styled.View`
  display: flex;
  flex-direction: column;
  padding: ${({theme}) => theme.dimensions.padding.medium}px;
  align-items: center;
`;

const Row = styled.View<{marginTop?: boolean}>`
  display: flex;
  flex-direction: row;
  ${({marginTop, theme}) =>
    marginTop && `margin-top: ${theme.dimensions.padding.medium}px`};
`;

const StyledCardSlot = styled(CardSlot)<{
  marginRight: boolean;
}>`
  ${({marginRight, theme}) =>
    marginRight && `margin-right: ${theme.dimensions.padding.medium}px`};
`;

export function GameRoom(): React.ReactElement {
  const {narrow} = useWindowAttributes();
  const cardSize = narrow ? GameCardSize.medium : GameCardSize.large;

  const game = useGameController();
  const [roomCards, setRoomCards] = useState<DonsolCard[]>(game.room);

  React.useEffect(() => {
    const removeEventListener = game.addEventListener({
      onRoomUpdated() {
        setRoomCards(game.room);
      },
    });

    return () => {
      removeEventListener();
    };
  }, [game]);

  const renderSlot = (order: number, marginRight: boolean) => {
    const card = roomCards.find(({roomOrder}) => roomOrder === order);
    const resolution = card && renderDiffAsString(resolveCardPlay(game, order));
    return (
      <StyledCardSlot
        marginRight={marginRight}
        title={resolution ?? ' '}
        card={card}
        size={cardSize}
        key={`room-slot-${order}`}
        onPress={card ? () => game.playCard(card) : undefined}
      />
    );
  };

  return (
    <Container>
      {narrow ? (
        <>
          <Row>
            {renderSlot(0, true)}
            {renderSlot(1, false)}
          </Row>
          <Row marginTop>
            {renderSlot(2, true)}
            {renderSlot(3, false)}
          </Row>
        </>
      ) : (
        <Row>
          {renderSlot(0, true)}
          {renderSlot(1, true)}
          {renderSlot(2, true)}
          {renderSlot(3, false)}
        </Row>
      )}
    </Container>
  );
}
