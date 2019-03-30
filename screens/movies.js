import React from "react";
import { Text, View, Image } from "react-native";
import { TouchableHighlight } from "react-native";
import { FlatList, Alert } from "react-native";
import { Icon } from "react-native-elements";
import { styles } from "./../styles.js";

export class MoviesScreen extends React.Component {
  posterURL(path) {
    return "http://image.tmdb.org/t/p/w500" + path;
  }
  render() {
    return (
      <View style={styles.movieList}>
        <TouchableHighlight underlayColor="#fff" onPress={this.props.onPress}>
          <View style={styles.backbutton}>
            <Icon
              size={18}
              color="white"
              containerStyle={styles.chevronContStyle}
              name="chevron-left"
            />
            <Text style={styles.backButtonText}>BACK</Text>
          </View>
        </TouchableHighlight>
        <View style={styles.movieListInner}>
          <FlatList
            data={this.props.movies}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <View style={styles.movie}>
                  <Text style={styles.textstitle}>{item.title}</Text>
                  <Text style={styles.textsyear}>
                    {item.release_date.slice(0, 4)}
                  </Text>
                  <TouchableHighlight
                    underlayColor="#fff"
                    onPress={() => {
                      Alert.alert(
                        item.title,
                        item.overview,
                        [{ text: "BACK" }],
                        { cancelable: true }
                      );
                    }}
                  >
                    <View style={styles.moviePoster}>
                      <Image
                        source={{ uri: this.posterURL(item.poster_path) }}
                        style={{
                          width: this.props.deviceWidth,
                          height: this.props.deviceWidth * 1.5
                        }}
                      />
                    </View>
                  </TouchableHighlight>
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  }
}
