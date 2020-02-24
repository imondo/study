import React from 'react'

export const staticStore = {
  num: 1
}

export const AppContext = React.createContext(staticStore)