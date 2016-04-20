import React from 'react'
import wrapMobileLayout from './NewMobileWrap'
import GoogleMap from '../map/GoogleMap'
import TopBar from './components/TopBar'
import Avatar from 'material-ui/lib/avatar';
import BackButton from './components/BackButton'

export default class RequestRide extends React.Component {
  render () {
    const topBarHeight = 45
    const mapHeight = 375
    return (
      <div>
        <TopBar
          leftIcon={<BackButton />}
          middleContent="Ride offer"
        />
        <div style={{
          width: window.innerWidth,
          height: mapHeight,
          marginTop: topBarHeight
        }}>
          <GoogleMap />
        </div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{width: window.innerWidth * 0.6}}>
              <div style={{display: 'flex', flexDirection: 'column', margin: 20}}>
                <div>8:15 Home</div>
                <div>8:25 Gabijos g.</div>
                <div>9:00 Akropolis(Seskine)</div>
                <div>9:10 Work</div>
                <div>MTWTFSS</div>
              </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', width: window.innerWidth * 0.4, alignItems: 'center'}}>
              <Avatar src="http://lorempixel.com/200/200/people/9" size={75} style={{marginTop: 16}} />
              <div style={{marginTop: 6}}>Vytaute, 26</div>
              <div style={{marginTop: 12}}>Chat button</div>
            </div>
          </div>
          <div style={{
            marginTop: 18,
            textAlign: 'center',
          }}>
            Request ride button here
          </div>
        </div>
      </div>
    )
  }
}

RequestRideScreen = RequestRide