import { MagnifyingGlassPlus } from "phosphor-react"
import * as Dialog from "@radix-ui/react-dialog"

export function CreateAdBanner() {
  return (
    <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8">
      <div className="bg-[#2A2634] px-8 py-6 flex items-center justify-between">
        <div className="flex flex-col">
          <strong className="block text-2xl text-white font-black">
            Não encontrou seu duo?
          </strong>
          <span className="text-zinc-400 block">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>
        <Dialog.Trigger className="flex items-center gap-3 justify-center py-3 px-4 bg-violet-500 hover:bg-violet-600 transition-all text-white rounded">
          <MagnifyingGlassPlus size={24} />
          <span>
            Publicar anúncio
          </span>
        </Dialog.Trigger>
      </div>
    </div>
  )
}