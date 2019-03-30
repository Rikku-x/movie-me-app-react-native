import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255, .25)"
  },
  body: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  picker: {
    marginTop: 100
  },
  pickerText: {
    height: 35,
    width: 250,
    color: "white"
  },
  pickerItemText: {
    fontSize: 33,
    fontWeight: "bold"
  },
  pickerBorder: {
    backgroundColor: "rgba(0,0,0, .55)",
    borderWidth: 1.5,
    borderColor: "black"
  },
  buttonContainer: {
    backgroundColor: "black",
    marginTop: 30
  },
  actindicator: {
    color: "blue",
    marginTop: 50
  },
  textstitle: {
    textAlign: "center",
    fontWeight: "300",
    fontSize: 18,
    marginTop: 10,
    marginBottom: 3,
    paddingHorizontal: 20,
    lineHeight: 30,
    color: "white"
  },
  movieList: {
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "black"
  },
  backbutton: {
    alignItems: "stretch",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 90
  },
  backButtonText: {
    color: "white"
  },
  textsyear: {
    textAlign: "center",
    fontWeight: "300",
    fontSize: 13,
    lineHeight: 13,
    marginBottom: 10,
    color: "white"
  },
  movieOverview: {
    justifyContent: "center",
    alignItems: "center",
    color: "red"
  },
  chevronContStyle: {
    alignSelf: "flex-start"
  },
  movieListInner: {
    marginTop: 5
  },
  moviePoster: {
    marginBottom: 28
  },
  posterBackground: {
    width: "100%",
    height: "100%"
  }
});
