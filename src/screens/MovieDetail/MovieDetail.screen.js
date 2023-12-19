// screens/MovieDetailsScreen.js
import React from 'react'
import { View, Text } from 'react-native'

const MovieDetailsScreen = ({ route }) => {
  const { movie } = route.params

  return (
    <View>
      <Text>{movie.title}</Text>
      <Text>{movie.release_date}</Text>
      <Text>{movie.overview}</Text>
      {/* Additional details like poster, genre, runtime, etc. can be displayed here */}
    </View>
  )
}

export default MovieDetailsScreen
