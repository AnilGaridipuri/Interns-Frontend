export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const capitalizeFirstLetterOfArray = (arr) => {
  const capitalizeArray = []
  for (let i = 0; i < arr.length; i++) {
    capitalizeArray.push(arr[i].charAt(0).toUpperCase() + arr[i].slice(1))
  }
  return capitalizeArray.join(', ')
}
