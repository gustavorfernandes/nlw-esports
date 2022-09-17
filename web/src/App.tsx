import { useEffect, useState } from "react"
import axios from "axios"

import { CreateAdBanner } from "./components/CreateAdBanner"
import { GameBanner } from "./components/GameBanner"
import * as Dialog from "@radix-ui/react-dialog"
import { CreateAdModal } from "./components/CreateAdModal"

export interface Game {
  id: string
  title: string
  bannerURl: string
  _count: {
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios.get("http://localhost:4000/games")
      .then((res) => {
        setGames(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img
        src="/logo-nlw-esports.svg"
        alt="NLW eSports"
      />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="bg-nlw-gradient text-transparent bg-clip-text">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => (
          <GameBanner
            key={game.id}
            bannerUrl={game.bannerURl}
            title={game.title}
            adsCount={game._count.ads}
          />
        ))}
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
