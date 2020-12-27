import { fullMediaEndpoints } from '@/constants/endpoints'

const getPhotoPath = photo =>
  photo ? `${fullMediaEndpoints.mediaServer()}${photo}` : null

export function assembleAllAnimals(response) {
  let assembledAnimals = []
  response.forEach(({ id, name, species, status, photo }) => {
    const photo_path = getPhotoPath(photo)

    const animal = {
      id,
      name,
      species,
      status,
      photo: photo_path
    }
    assembledAnimals.push(animal)
  })
  return assembledAnimals
}

export function assembleAnimalBodyParams(
  rootGetters,
  { name, speciesUid, statusUid }
) {
  const speciesId = rootGetters.getSpeciesByUid(speciesUid).id
  const statusId = rootGetters.getStatusByUid(statusUid).id

  const bodyParams = {
    name,
    species: speciesId,
    status: statusId
  }

  return bodyParams
}

export function assembleCurrentAnimal({
  id,
  name,
  species,
  status,
  vaccinations,
  photo
}) {
  const photo_path = getPhotoPath(photo)
  const assembledAnimal = {
    id,
    name,
    species,
    status,
    vaccinations,
    photo: photo_path
  }

  return assembledAnimal
}

export const assembleSelectOptions = payload => {
  let assembledOptions = []
  payload.forEach(({ uid, name }) => {
    const option = {
      value: uid,
      text: name
    }
    assembledOptions.push(option)
  })
  return assembledOptions
}

export const assembleSpecies = response => {
  let assembledSpecies = []
  response.forEach(({ id, name, uid }) => {
    const species = {
      id,
      name,
      uid
    }
    assembledSpecies.push(species)
  })
  return assembledSpecies
}

export const assembleAdoptionStatuses = response => {
  let assembledStatuses = []
  response.forEach(({ id, name, uid, description }) => {
    const status = {
      id,
      name,
      uid,
      description
    }
    assembledStatuses.push(status)
  })
  return assembledStatuses
}
