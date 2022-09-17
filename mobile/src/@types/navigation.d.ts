export interface GameParams {
  id: string,
  title: string,
  bannerURl: string
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined
      game: {
        id: string,
        title: string,
        bannerURl: string
      }
    }
  }
}
