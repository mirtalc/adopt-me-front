export function assembleAllAnimals(response) {
  let assembledAnimals = []
  response.forEach(({ id, name, species, status }) => {
    let animal = {
      id,
      name,
      species: species.name,
      status
    }
    assembledAnimals.push(animal)
  })
  return assembledAnimals
}

export function assembleCurrentAnimal({
  id,
  name,
  species,
  status,
  vaccinations
}) {
  let assembledAnimal = {
    id,
    name,
    species,
    status,
    vaccinations
  }

  return assembledAnimal
}
