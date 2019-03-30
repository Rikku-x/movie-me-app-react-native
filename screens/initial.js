import React from "react";
import { View } from "react-native";
import { Button } from "react-native";
import { Picker, ImageBackground } from "react-native";
import { Platform, ActivityIndicator } from "react-native";
import { styles } from "./../styles.js";

export class InitialScreen extends React.Component {
  render() {
    const picker = (
      <Picker
        selectedValue={this.props.movieGenre}
        style={styles.pickerText}
        itemStyle={styles.pickerItemText}
        mode="dropdown"
        alignItems="top"
        onValueChange={this.props.onValueChange}
      >
        <Picker.Item label="Choose genre" value="" />
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
    );
    return (
      <ImageBackground
        source={this.props.poster}
        style={styles.posterBackground}
      >
        <View style={styles.container}>
          <View style={styles.body}>
            <View style={styles.picker}>
              {/* TOP */}
              {Platform.OS == "ios" ? picker : <View />}
            </View>
            <View>
              {/* CENTER */}
              <View style={Platform.OS === "ios" ? {} : styles.pickerBorder}>
                {Platform.OS == "android" ? picker : <View />}
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  onPress={this.props.onButtonClick}
                  title="FIND MOVIE"
                  color={Platform.OS === "ios" ? "white" : "black"}
                />
              </View>
              <View style={styles.actindicator}>
                <ActivityIndicator
                  color="black"
                  size="large"
                  animating={this.props.animating}
                />
              </View>
            </View>
            <View>{/* BOTTOM */}</View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
