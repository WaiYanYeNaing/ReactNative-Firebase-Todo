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
import { Permissions, Notifications } from "expo";

const data = [];

export default class App extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      listViewData: [],
      newContact: "",
      testArr: []
    };
  }

  componentDidMount() {
    let self = this;
    self._isMounted = true;
    self.getById();
  }

  registerForPushNotificationsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
      alert("No notification permissions!");
      return;
    }

    // Get the token that identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
  };

  getAll() {
    let self = this;
    let newData = [];
    firebase
      .database()
      .ref("/contacts")
      .on("child_added", data => {
        newData.push(data);
        self.setState({ listViewData: newData });
      });
  }

  getById() {
    let self = this;
    let newData = [];
    firebase
      .database()
      .ref("/contacts")
      .on("child_added", data => {
        if (data.val().id == 1) {
          newData.push(data);
        }
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
      .set({ id: 1, name: data });
  }

  async deleteRow(data) {
    let self = this;
    await firebase
      .database()
      .ref("contacts/" + data.key)
      .set(null);
    self.getAll();
  }

  showInformation() {}

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Content>
            <Item regular style={{ borderColor: "#D4B996FF" }}>
              <Input
                placeholder="Add Note"
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
                  <TouchableOpacity onPress={() => this.deleteRow(value)}>
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
