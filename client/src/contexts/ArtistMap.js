import {createContext, useState} from 'react'

export const ArtistMapContext = createContext();

export function ArtistMapProvider({children}) {
    return(
        <ArtistMapContext.Provider >{children}</ArtistMapContext.Provider>
    );
}