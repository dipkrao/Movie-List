// screens/Home.js
import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  TextInput
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styles from './Home.style'

const Home = () => {
  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const navigation = useNavigation()

  const fetchMovies = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZWFhNmNmNzNkYTQxYjQyNjlhNTUzYTMxZTljOWE2NiIsInN1YiI6IjY1ODE0MWZiM2E0OGM1NjE4NmFmNjdiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c8VW4d4Kpo8_JpSxqgZEeAjXQ9b5e8FDPVch_uHUvCY'
      }
    }

    await fetch(
      'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
      options
    )
      .then(response => response.json())
      .then(response => {
        const newMovies = response?.results
        setMovies(prevMovies => [...prevMovies, ...newMovies])
        setFilteredMovies(prevMovies => [...prevMovies, ...newMovies])
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchMovies()
  }, [page])

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1)
  }

  const handleMoviePress = movie => {
    navigation.navigate('MovieDetails', { movie })
  }

  const handleSearch = () => {
    const searchTermLower = searchTerm.toLowerCase()
    const filtered = allMovies.filter(movie =>
      movie?.title.toLowerCase().includes(searchTermLower)
    )
    setFilteredMovies(filtered)
  }

  return (
    <View>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
          marginBottom: 10
        }}
        placeholder="Search by title..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={movies}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleMoviePress(item)}>
            <View style={{ margin: 20 }}>
              <Text style={styles.text}>{item.title}</Text>
              <Text>{item.release_date}</Text>
              <Text>{item.overview}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <Button title="Load More" onPress={handleLoadMore} />
        }
      />
    </View>
  )
}

export default Home
