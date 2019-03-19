import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Button } from 'react-native';
import { Picker, ImageBackground, TouchableHighlight } from 'react-native';
import { FlatList, Alert, Platform, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';


export default class App extends React.Component {


  constructor(props) {
    super(props);
    let { height, width } = Dimensions.get('window');
    this.state = {
      movieGenre: "28",
      animating: false,
      movies: [],
      deviceWidth: width,
      screen: "initialScreen",
      modalVisible: false,
      movie: null
    };

    this.posters = [
      require(`./assets/posters/0.jpg`),
      require(`./assets/posters/1.jpg`),
      require(`./assets/posters/3.jpg`),
      require(`./assets/posters/4.jpg`),
      require(`./assets/posters/5.jpg`),
      require(`./assets/posters/6.jpg`),
      require(`./assets/posters/7.jpg`),
      require(`./assets/posters/8.jpg`),
      require(`./assets/posters/10.jpg`),
      require(`./assets/posters/12.jpg`),
      require(`./assets/posters/13.jpg`),
      require(`./assets/posters/15.jpg`),
      require(`./assets/posters/16.jpg`),
      require(`./assets/posters/17.jpg`),
      require(`./assets/posters/18.jpg`),
      require(`./assets/posters/19.jpg`),
      require(`./assets/posters/20.jpg`),
    ]
    let posternumber = Math.floor(Math.random() * this.posters.length)
    this.poster = this.posters[posternumber]
  }

  posterURL(path) {
    return 'http://image.tmdb.org/t/p/w500' + path
  }

  async getMoviesFromApi() {
    try {
      let page = Math.floor(Math.random() * 17)
      if (page == 0) {
        page = 1
      }
      let url = `https://api.themoviedb.org/3/discover/movie?with_genres=${this.state.movieGenre}&page=${page}&api_key=8df1ff267409edc4e0275609debe6fde`
      console.log(url)
      let response = await fetch(
        url
      );
      let responseJson = await response.json();

      let movies = responseJson.results.filter(result => !(result.poster_path == null))

      this.setState({ movies: movies, animating: false, screen: "movieScreen" })
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const moviesScreen =
      <View style={styles.movieList}>

        <TouchableHighlight
          underlayColor='#fff'
          onPress={() => {
            this.setState({ screen: "initialScreen" })
          }}>
          <View style={styles.backbutton}>
            <Icon size={18} containerStyle={{ alignSelf: "flex-start" }}
              name='chevron-left' />
            <Text>GO BACK</Text>

          </View>
        </TouchableHighlight>
        <View style={{ marginTop: 15 }}>
          <FlatList
            data={this.state.movies}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <View style={styles.movie}>
                  <Text style={styles.textstitle}>{item.title}</Text>
                  <Text style={styles.textsyear}>{item.release_date.slice(0, 4)}</Text>
                  <TouchableHighlight
                    underlayColor='#fff'
                    onPress={() => {

                      this.setState({ modalVisible: false, movie: item });
                      Alert.alert(
                        item.title,
                        item.overview,
                        [
                          { text: 'BACK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: true },
                      );

                    }}>
                    <View style={{ marginBottom: 28 }}>
                      <Image
                        source={{ uri: this.posterURL(item.poster_path) }}
                        style={{ width: this.state.deviceWidth, height: this.state.deviceWidth * 1.5 }}

                      />
                    </View>
                  </TouchableHighlight>
                </View>
              )
            }
            }
          />
        </View>
      </View>
    const picker =
      <Picker
        selectedValue={this.state.movieGenre}
        style={{
          height: 35,
          width: 200,
          color: "white",

        }}

        itemStyle={{ fontSize: 33, fontWeight: 'bold' }}
        mode="dropdown"
        alignItems='top'
        onValueChange={(itemValue) =>
          this.setState({ movieGenre: itemValue })
        }
      >
        <Picker.Item label="Action" value="28" />
        <Picker.Item label="Adventure" value="12" />
        <Picker.Item label="Animation" value="16" />
        <Picker.Item label="Comedy" value="35" />
        <Picker.Item label="Crime" value="80" />
        <Picker.Item label="Documentary" value="99" />
        <Picker.Item label="Drama" value="18" />
        <Picker.Item label="Family" value="10751" />
        <Picker.Item label="Fantasy" value="14" />
        <Picker.Item label="History" value="36" />
        <Picker.Item label="Horror" value="27" />
        <Picker.Item label="Music" value="10402" />
        <Picker.Item label="Mystery" value="9648" />
        <Picker.Item label="Romance" value="10749" />
        <Picker.Item label="Science Fiction" value="878" />
        <Picker.Item label="Thriller" value="53" />
        <Picker.Item label="War" value="10752" />

      </Picker>
    const initialScreen =
      <ImageBackground source={this.poster} style={{ width: '100%', height: '100%' }}>
        <View style={styles.container}>
          <View style={styles.body}>
            <View style={styles.picker}>
              {/* TOP */}
              {Platform.OS == 'ios' ? picker : <View></View>
              }
            </View>
            <View>
              {/* CENTER */}
              <View style=
                {Platform.OS === 'ios' ? {} :
                  { backgroundColor: 'rgba(0,0,0, .55)', borderWidth: 1.5, borderColor: 'black' }
                }>
                {Platform.OS == 'android' ? picker : <View></View>
                }
              </View>
              <View

                style={styles.buttonContainer}>
                <Button

                  onPress={() => {
                    this.setState({ animating: true })
                    this.getMoviesFromApi()
                  }}
                  title="FIND MOVIE"
                  color={Platform.OS === 'ios' ? "white" : "black"}
                />
              </View>
              <View style={styles.actindicator}>
                <ActivityIndicator color='black' size="large" animating={this.state.animating} />
              </View>

            </View>
            <View>
              {/* BOTTOM */}
            </View>
          </View>
        </View >
      </ImageBackground>

    return this.state.screen == "initialScreen" ? initialScreen : moviesScreen
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255, .25)',
    // alignItems: 'center',
    // flexDirection: 'column',
    // justifyContent: 'space-between',

  },
  body: {
    // backgroundColor: "green",
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    // height: 400,
    justifyContent: 'space-between'
  },
  picker: {
    // backgroundColor: "blue",
    marginTop: 100
  },
  buttonContainer: {
    backgroundColor: 'black',
    marginTop: 30
  },
  actindicator: {
    // backgroundColor: "yellow",
    color: 'blue',
    marginTop: 50
  },
  textstitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 3,
    lineHeight: 30
  },
  movieList: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 50,
  },
  backbutton: {
    alignItems: 'stretch',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 15
  },
  textsyear: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 13,
    lineHeight: 13,
    marginBottom: 10

  },
  movieOverview: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red'
  }
});

