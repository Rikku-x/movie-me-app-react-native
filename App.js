import React from "react";
import { Dimensions } from "react-native";

// import { SplashScreen } from "expo";

import { MoviesScreen } from "./screens/movies.js";
import { InitialScreen } from "./screens/initial.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    let { height, width } = Dimensions.get("window");
    this.state = {
      movieGenre: "",
      animating: false,
      movies: [],
      deviceWidth: width,
      screen: "initialScreen"
    };

    this.posters = [
      require(`./assets/posters/0.jpg`),
      require(`./assets/posters/3.jpg`),
      require(`./assets/posters/4.jpg`),
      require(`./assets/posters/5.jpg`),
      require(`./assets/posters/6.jpg`),
      require(`./assets/posters/7.jpg`),
      require(`./assets/posters/8.jpg`),
      require(`./assets/posters/10.jpg`),
      require(`./assets/posters/13.jpg`),
      require(`./assets/posters/15.jpg`),
      require(`./assets/posters/16.jpg`),
      require(`./assets/posters/17.jpg`),
      require(`./assets/posters/18.jpg`),
      require(`./assets/posters/19.jpg`),
      require(`./assets/posters/20.jpg`)
    ];
    let posternumber = Math.floor(Math.random() * this.posters.length);
    this.poster = this.posters[posternumber];
  }

  onButtonClick = () => {
    this.setState({ animating: true });
    this.getMoviesFromApi();
  };

  onPress = () => {
    this.setState({ screen: "initialScreen" });
  };
  onValueChange = itemValue => {
    this.setState({ movieGenre: itemValue });
  };

  async getMoviesFromApi() {
    try {
      let page = Math.floor(Math.random() * 15);
      if (page == 0) {
        page = 1;
      }
      let url = `https://api.themoviedb.org/3/discover/movie?with_genres=${
        this.state.movieGenre
      }&page=${page}&include_adult=false&api_key=8df1ff267409edc4e0275609debe6fde`;
      console.log(url);
      let response = await fetch(url);
      let responseJson = await response.json();
      let movies = responseJson.results.filter(
        result => !(result.poster_path == null)
      );

      this.setState({
        movies: movies,
        animating: false,
        screen: "movieScreen"
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    // SplashScreen.preventAutoHide();
    // SplashScreen.hide();

    return this.state.screen == "initialScreen" ? (
      <InitialScreen
        movieGenre={this.state.movieGenre}
        animating={this.state.animating}
        poster={this.poster}
        onButtonClick={this.onButtonClick}
        onValueChange={this.onValueChange}
      />
    ) : (
      <MoviesScreen
        movies={this.state.movies}
        deviceWidth={this.state.deviceWidth}
        onPress={this.onPress}
      />
    );
  }
}
