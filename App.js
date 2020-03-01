import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Header,
  Content,
  Item,
  Input,
  Button,
  Icon,
  List,
  ListItem,
  Right,
  Left
} from "native-base";
import firebase from "./FIrebase";

const data = [];

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listViewData: data,
      newContact: ""
    };
  }

  componentDidMount() {
    let self = this;
    firebase
      .database()
      .ref("/contacts")
      .on("child_added", function(data) {
        let newData = [...self.state.listViewData];
        newData.push(data);
        self.setState({ listViewData: newData });
      });
  }

  addRow(data) {
    let key = firebase
      .database()
      .ref("/contacts")
      .push().key;
    firebase
      .database()
      .ref("/contacts")
      .child(key)
      .set({ name: data });
  }

  async deleteRow() {}

  showInformation() {}

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Content>
            <Item regular style={{ borderColor: "#D4B996FF" }}>
              <Input
                placeholder="Add name"
                style={{ color: "#A07855FF" }}
                onChangeText={newContact => this.setState({ newContact })}
              />
              <Button
                style={styles.button}
                onPress={() => this.addRow(this.state.newContact)}
              >
                <Icon name="add" style={{ color: "#D4B996FF" }} />
              </Button>
            </Item>
          </Content>
        </Header>

        <Content>
          {this.state.listViewData.map((value, index) => {
            return (
              <ListItem key={index}>
                <Left>
                  <Text>{value.val().name}</Text>
                </Left>
                <Right>
                  <TouchableOpacity onPress={() => this.addRow(data)}>
                    <Icon
                      name="information-circle"
                      style={{ color: "black" }}
                    />
                  </TouchableOpacity>
                </Right>
                <Right>
                  <TouchableOpacity
                    onPress={() => this.deleteRow(secId, rowId, rowMap, data)}
                  >
                    <Icon name="trash" style={{ color: "black" }} />
                  </TouchableOpacity>
                </Right>
              </ListItem>
            );
          })}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#D4B996FF"
  },
  header: {
    marginTop: 10,
    backgroundColor: "#D4B996FF"
  },
  button: {
    marginTop: 4,
    backgroundColor: "#A07855FF"
  }
});
