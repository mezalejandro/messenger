import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import EngineActions, { EngineSelectors } from '../Redux/EngineRedux'
import { List, ListItem, Text } from 'react-native-elements'
import { Container, Header, Content, Icon } from 'native-base';

import GraphiteIcon from '../Images/GraphiteIcon.png';
import CryptoIcon from '../Images/CryptoIcon.png';
import BlockSignIcon from '../Images/BlockSignIcon.png';
import TravelIcon from '../Images/TravelIcon.png';
import chatIcon from '../Images/blue512.png';

class DappStore extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerTitle: <Text h4 style={{marginLeft: 20, fontWeight: 'bold'}}>dApps</Text>,
      headerBackTitle: 'Back',
      // headerRight: (
      //   //params.sendMessage()
      //   <TouchableOpacity onPress={() => params.navigation.navigate('BlockContactSearch')} style={{marginRight: 10}}>
      //     <FIcon name="paper-plane" size={28} color='#037aff'/>
      //   </TouchableOpacity>
      // ),
    };
  };

  _onPressButton = (url) => {
    this.props.navigation.navigate('DappData')
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 5}}>
          <View style={{margin: 10}}>
            <TouchableOpacity style={styles.button} onPress={(url) => this._onPressButton('https://app.graphitedocs.com/')}>
              <Image source={GraphiteIcon} style={{width: 80, height: 80, borderRadius: 10}}/>
            </TouchableOpacity>
            <Text style={{fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>Graphite Docs</Text>
          </View>
          <View style={{margin: 10}}>
            <TouchableOpacity style={styles.button} onPress={(url) => this._onPressButton('https://blockusign.co/')}>
              <Image source={BlockSignIcon} style={{width: 80, height: 80, borderRadius: 10}}/>
            </TouchableOpacity>
            <Text style={{fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>Blockusign</Text>
          </View>
          <View style={{margin: 10}}>
            <TouchableOpacity style={styles.button} onPress={() => this._onPressButton('https://cryptocracy.io/')}>
              <Image source={CryptoIcon} style={{width: 80, height: 80, borderRadius: 10}}/>
            </TouchableOpacity>
            <Text style={{fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>Cryptocracy</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 5}}>
          <View style={{margin: 10}}>
            <TouchableOpacity disabled={true} style={styles.button} onPress={() => this._onPressButton()}>
              <Image source={TravelIcon} style={{opacity: 0.5, width: 80, height: 80, borderRadius: 10}}/>
            </TouchableOpacity>
            <Text style={{fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>Travelstack</Text>
          </View>
          <View style={{margin: 10}}>
            <TouchableOpacity disabled={true} style={styles.button} onPress={() => this._onPressButton()}>
              <Image source={chatIcon} style={{opacity: 0.1, width: 80, height: 80, borderRadius: 10}}/>
            </TouchableOpacity>
            <Text style={{fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>TBD</Text>
          </View>
          <View style={{margin: 10}}>
            <TouchableOpacity disabled={true} style={styles.button} onPress={() => this._onPressButton()}>
              <Image source={chatIcon} style={{opacity: 0.1, width: 80, height: 80, borderRadius: 10}}/>
            </TouchableOpacity>
            <Text style={{fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>TBD</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 5}}>
          <View style={{margin: 10}}>
            <TouchableOpacity disabled={true} style={styles.button} onPress={() => this._onPressButton()}>
              <Image source={chatIcon} style={{opacity: 0.1, width: 80, height: 80, borderRadius: 10}}/>
            </TouchableOpacity>
            <Text style={{fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>TBD</Text>
          </View>
          <View style={{margin: 10}}>
            <TouchableOpacity disabled={true} style={styles.button} onPress={() => this._onPressButton()}>
              <Image source={chatIcon} style={{opacity: 0.1, width: 80, height: 80, borderRadius: 10}}/>
            </TouchableOpacity>
            <Text style={{fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>TBD</Text>
          </View>
          <View style={{margin: 10}}>
            <TouchableOpacity disabled={true} style={styles.button} onPress={() => this._onPressButton()}>
              <Image source={chatIcon} style={{opacity: 0.1, width: 80, height: 80, borderRadius: 10}}/>
            </TouchableOpacity>
            <Text style={{fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>TBD</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 5}}>
          <View style={{margin: 10}}>
            <TouchableOpacity disabled={true} style={styles.button} onPress={() => this._onPressButton()}>
              <Image source={chatIcon} style={{opacity: 0.1, width: 80, height: 80, borderRadius: 10}}/>
            </TouchableOpacity>
            <Text style={{fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>TBD</Text>
          </View>
          <View style={{margin: 10}}>
            <TouchableOpacity disabled={true} style={styles.button} onPress={() => this._onPressButton()}>
              <Image source={chatIcon} style={{opacity: 0.1, width: 80, height: 80, borderRadius: 10}}/>
            </TouchableOpacity>
            <Text style={{fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>TBD</Text>
          </View>
          <View style={{margin: 10}}>
            <TouchableOpacity disabled={true} style={styles.button} onPress={() => this._onPressButton()}>
              <Image source={chatIcon} style={{opacity: 0.1, width: 80, height: 80, borderRadius: 10}}/>
            </TouchableOpacity>
            <Text style={{fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>TBD</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },
});

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendFileUrl: (fileUrl) => dispatch(EngineActions.sendFileUrl(fileUrl)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DappStore)