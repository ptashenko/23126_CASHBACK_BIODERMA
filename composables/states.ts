import type { IPlay } from '~/types/interfaces'

export const useLoading = () => useState<boolean>('loading', () => false)
export const useOcrLoading = () => useState<boolean>('ocrLoading', () => false)
export const usePlay = () => useState<IPlay | null>('gioca', () => null)

export const useProductsList = () => (
  useState<any>('products', () => {
    const products = [
      {
        title: '',
        products: [
          'Peroni Nastro Azzurro singola da 62cl',
          'Peroni Nastro Azzurro 3x33cl',
          'Peroni Nastro Azzurro 6x62cl',
          'Peroni Nastro Azzurro singola da 50cl',
          'Peroni Nastro Azzurro Zero 3x33cl',
          'Peroni Nastro Azzurro Zero singola da 33cl',
          'Peroni Nastro Azzurro Sardegna 3x33cl',
          'Peroni Nastro Azzurro Sardegna singola da 62cl',
          'Peroni Nastro Azzurro singola da 50cl',
          'Peroni Nastro Azzurro 2x33cl',
          'Peroni Nastro Azzurro Stile Capri singola da 33cl',
          'Peroni Nastro Azzurro Stile Capri basket 33clx6',
          'Peroni Nastro Azzurro Mais Nostrano 33x3 ',
          'Peroni Nastro Azzurro Mais Nostrano 62cl singola',
          'Peroni Nastro Azzurro 66cl singola',
          'Kozel Lager singola da 50cl',
          'Kozel Lager singola da 33cl',
          'Kozel Dark singola da 50cl',
          'Kozel Dark singola da 33cl',
          'Peroni da 33cl da 3 bottiglie',
          'Peroni da 33cl da 6 bottiglie',
          'Peroni da 33cl da 2 lattine',
          'Peroni da 33cl da 4 lattine',
          'Peroni Chill Lemon da 33cl da 3 bottiglie',
          'Peroni Senza Glutine da 33cl da 3 bottiglie',
          'Gamma Peroni Gran Riserva singola da 50 cl',
          'Peroni Cruda singola da 50cl',
          'Peroni Cruda singola da 33cl',
          'Peroni Non Filtrata singola da 50cl',
          'Peroni Non Filtrata singola da 33cl',
          'Peroni singola da 75cl',
          'Peroni in lattina singola da 50cl',
          'Asahi Super Dry singola 33cl',
          'Asahi Super Dry singola 50cl',
          'Pilsner Urquell singola da 33cl',
          'Raffo da 33cl da 3 bottiglie',
          'Raffo singola da 66cl',
        ],
      },
    ]
    return products
  })
)
