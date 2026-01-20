import type { HouseConfiguration, HouseType, RoomCount, RoomConfiguration } from './types'

// Casa 1 Piano configurations
const casa1PianoConfigs: RoomConfiguration[] = [
  {
    rooms: 2,
    sqm: 95,
    composition: 'Soggiorno open space, cucina, 2 camere da letto, 1 bagno',
  },
  {
    rooms: 3,
    sqm: 115,
    composition: 'Soggiorno open space, cucina, 3 camere da letto, 1 bagno',
  },
  {
    rooms: 4,
    sqm: 150,
    composition: 'Soggiorno open space, cucina, 4 camere da letto, 2 bagni',
  },
  {
    rooms: 5,
    sqm: 190,
    composition: 'Soggiorno open space, cucina, 5 camere da letto, 2 bagni, studio',
  },
]

// Casa 2 Piani configurations
const casa2PianiConfigs: RoomConfiguration[] = [
  {
    rooms: 2,
    sqm: 130,
    composition: 'Living, cucina + 2 camere, 1 bagno',
    details: {
      pianoTerra: 'Living open space, cucina abitabile',
      piano1: '2 camere da letto, 1 bagno',
    },
  },
  {
    rooms: 3,
    sqm: 170,
    composition: 'Living, cucina, studio + 3 camere, 2 bagni',
    details: {
      pianoTerra: 'Living open space, cucina abitabile, studio',
      piano1: '3 camere da letto, 2 bagni',
    },
  },
  {
    rooms: 4,
    sqm: 210,
    composition: 'Living, cucina, studio + 4 camere, 2 bagni',
    details: {
      pianoTerra: 'Living open space, cucina abitabile, studio',
      piano1: '4 camere da letto, 2 bagni',
    },
  },
  {
    rooms: 5,
    sqm: 280,
    composition: 'Living, cucina, studio, camera ospiti + 4 camere, 2 bagni',
    details: {
      pianoTerra: 'Living open space, cucina abitabile, studio, camera ospiti con bagno',
      piano1: '4 camere da letto, 2 bagni',
    },
  },
]

export const houseConfigurations: Record<HouseType, HouseConfiguration> = {
  '1-piano': {
    type: '1-piano',
    label: 'Casa 1 Piano',
    description: 'Soluzione ideale per chi cerca comfort su un unico livello, perfetta per famiglie e persone con mobilità ridotta.',
    minSqm: 95,
    heroImage: '/images/configuratore/1-piano-hero.webp',
    configurations: casa1PianoConfigs,
  },
  '2-piani': {
    type: '2-piani',
    label: 'Casa 2 Piani',
    description: 'Massima privacy e spazio. Zona giorno separata dalla zona notte per il massimo comfort familiare.',
    minSqm: 130,
    heroImage: '/images/configuratore/2-piani-hero.webp',
    configurations: casa2PianiConfigs,
  },
}

export function getConfiguration(type: HouseType, rooms: RoomCount): RoomConfiguration | null {
  const houseConfig = houseConfigurations[type]
  return houseConfig?.configurations.find((c) => c.rooms === rooms) || null
}

export function getRoomImage(type: HouseType, rooms: RoomCount): string {
  const prefix = type === '1-piano' ? '1p' : '2p'
  return `/images/configuratore/${prefix}-${rooms}c.webp`
}

// Available room options per house type
export const roomOptions: Record<HouseType, RoomCount[]> = {
  '1-piano': [2, 3, 4, 5],
  '2-piani': [2, 3, 4, 5],
}
