import React from 'react'
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider'
import Avatar from 'material-ui/lib/avatar';
import { config } from '../../config'
import RepeatingDays from '../common/RepeatingDaysDisplay.jsx';
import moment from 'moment';

import { getUserName } from 'meteor/carpool-view'
import { getUserPicture } from '../../api/UserPicture.coffee'
import Loader from '../common/Loader'
/*global flowControllerHelper*/
/*global Meteor*/

export default class RidesList extends React.Component {
  render () {
    const { progress, trips } = this.props;
    if (100 != progress.getProgress()) {
      return (
        <section style={{height: "100%", marginTop: 25}}>
          <Loader />
        </section>
      );
    } else {
      return (
        <List data-cucumber="trips-list">
          {trips.map((ride) => {
            const user = Meteor.users.findOne({_id: ride.owner});
            ride.ownerName = getUserName(user);
            ride.ownerAvatar = getUserPicture(user);
            //d("Repeat ", ride.repeat);
            ride.fromTime = moment(ride.aTime).format('H:mm');
            ride.toTime = moment(ride.bTime).format('H:mm');
            ride.toTimeApproximate = true;
            // << Mocking
            return (
              [
                <ListItem key={1}
                  onClick={() => flowControllerHelper.goToView('YourRide', {id: ride._id})}
                  rightAvatar={
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', top: 4, height: '100%'}}>
                      <Avatar src={ride.ownerAvatar} size={50} />
                      <span style={{fontSize: 11, marginTop: 5, color: config.colors.textColor, fontWeight: 500}}>{ride.ownerName.split(' ')[0]}</span>
                    </div>
                  }
                >
                  <div style={{display: 'flex', flexDirection: 'column', color: config.colors.textColor}}>
                    <div style={{marginBottom: 7, fontSize: 13, display: 'flex', flexDirection: 'row'}}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '70%',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {ride.fromAddress}
                      </span>
                      <span style={{marginLeft: 10}}>
                        {ride.fromTimeApproximate ? '~' + ride.fromTime : ride.fromTime}
                      </span>
                    </div>
                    <div style={{marginBottom: 10, fontSize: 13, display: 'flex', flexDirection: 'row'}}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '70%',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {ride.toAddress}
                      </span>
                      <span style={{marginLeft: 10}}>
                        {ride.toTimeApproximate ? '~' + ride.toTime : ride.toTime}
                      </span>
                    </div>
                    <div>{ride.repeat ? (
                      <RepeatingDays daysActive={ride.repeat} />
                    ) : (
                      <span style={{fontSize: 12}}>{moment(ride.time).format("lll")}</span>
                    )}</div>
                  </div>
                </ListItem>,
                <Divider key={2} />
              ]
            )
          })}
        </List>
      )
    }
  }
}

RidesList.propTypes = {
  progress: React.PropTypes.object,
  activeTrips: React.PropTypes.array,
  ownTrips: React.PropTypes.array,
  trips: React.PropTypes.array,
};

RidesList.childContextTypes = {
  muiTheme: React.PropTypes.object,
}
