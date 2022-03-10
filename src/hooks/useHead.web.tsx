import React from 'react';

export function useHead() {
  return {
    setTitle(value?: string) {
      document.title = value ?? '';
    },
  };
}

export function HeadTitle({children}: {children: string}): React.ReactElement {
  const {setTitle} = useHead();
  setTitle(children);
  return <></>;
}
