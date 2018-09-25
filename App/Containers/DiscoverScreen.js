import React, { Component } from 'react'
import { ActivityIndicator, FlatList, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Text, Divider } from 'react-native-elements'
import { Button, Badge, Container, Header, Content, List, ListItem, Left, Body, Right, Item, Icon, Input, Thumbnail, Title, Separator } from 'native-base';
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import EngineActions, { EngineSelectors } from '../Redux/EngineRedux'
const { firebaseInstance } = require('../Engine/firebaseWrapper.js');

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});

class DiscoverScreen extends Component {
  static navigationOptions = {
    headerLeft: <Text h4 style={{marginLeft: 20, fontWeight: 'bold', color: 'white'}}>Discover</Text>,
    headerRight: (
      <TouchableOpacity onPress={() => alert('Public chatrooms for various topics')} style={{marginRight: 10}}> 
        <Ionicons name="ios-help-buoy" size={30} color='white'/>
      </TouchableOpacity>
    ),
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#34bbed'
    }
  };
  constructor (props) {
    super(props)
    this.state = {
      channelClicked: false,
      showLoading: true,
      showNothing: true,
      channels: []
    }
    this.numContacts = (props.contactMgr) ?
      (props.contactMgr.getAllContacts().length) : 0;
  }
  componentWillReceiveProps(nextProps) {
    const { contactAdded, contactMgr } = nextProps
    const { channelClicked } = this.state
    if (channelClicked && contactMgr && contactMgr.getAllContacts().length > this.numContacts) {
      this.numContacts = contactMgr.getAllContacts().length;
      this.props.navigation.goBack();
      this.props.navigation.navigate('ChatRoom')
      this.props.setContactAdded(false)
    }
    if (contactMgr && this.state.channels.length === 0) {
      let channels = {}
      firebaseInstance.getFirebaseRef('/global/public_channel_v2_0/auto').once('value')
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          const name = childSnapshot.key
          const channel = childSnapshot.val()
          const exists = contactMgr.isExistingContactId(channel.id)
          if (!exists)
            channels[name] = channel
        })
        this.setState({
          channels,
          showLoading: false
        })
      })
      .catch(error => {
        console.log("Firebase Error", error)
      })
    }
  }
  contactSelected = (data) => {
    this.props.addNewContact(data)
    this.props.setActiveContact(data);
    // rowMap[`${secId}${rowId}`].props.closeRow();
    // const newData = [...this.state.channels];
    // newData.splice(rowId, 1);
    // this.setState({ channels: newData, channelClicked: true });
  }
  render () {
    if (this.state.showLoading) {
      return <View style={[styles.container, styles.horizontal]}><ActivityIndicator size="large" color="#34bbed"/></View>
    }
    else {
      return (
        <Container style={{backgroundColor: 'white'}}>
          <Content>
            <FlatList
              data={this.state.channels}
              renderItem={({item}) =>
                <ListItem style={{marginLeft: 5}} avatar onPress={this.contactSelected.bind(this, item)}>
                  <Left>
                    <Thumbnail square source={{ uri: item.image}} />
                  </Left>
                  <Body>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>{item.title}</Text>
                    <Text note>{item.description}</Text>
                  </Body>
                  {(item.members > 0) ? <Right>
                    <Badge style={{ backgroundColor: '#34bbed' }}>
                      <Text style={{color: 'white'}}>{item.members}</Text>
                    </Badge>
                  </Right> : null}
                </ListItem>}
            />
          </Content>
        </Container>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    contactMgr: EngineSelectors.getContactMgr(state),
    contactAdded: EngineSelectors.getContactAdded(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewContact: (contact) => dispatch(EngineActions.addNewContact(contact)),
    setContactAdded: (flag) => dispatch(EngineActions.setContactAdded(flag)),
    setActiveContact: (contact) => dispatch(EngineActions.setActiveContact(contact)),
    handleContactClick: (contact) => dispatch(EngineActions.setActiveContact(contact)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverScreen)
