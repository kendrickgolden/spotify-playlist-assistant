import {createContext} from 'react'

export const ArtistMapContext = createContext({
    artistMap: {},
    setArtistMap: () => {},
  });