import React from 'react';
import {SubtitleText} from './SubtitleText';

export interface CardDetailView_Props {
  id?: string;
}

export function CardDetailView({id}: CardDetailView_Props) {
  return <SubtitleText>{`Card detail lol id:${id}`}</SubtitleText>;
}
