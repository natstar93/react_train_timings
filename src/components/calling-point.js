var React = require('react');
var departureStatus = require('./departure-status');
var classNames = require('classnames');
var Map = require('../components/map');

var CallingPoint = React.createClass({
  render : function() {
    var data = this.props.data;
    var actual = data.actual;
    var scheduled = data.scheduled;
    var expected = data.expected;
    var departure = actual || expected;
    var onTime = scheduled === departure;
    var departureTimeOutput = (onTime ? null : departure);
    var callingPointDepartureStatus = classNames(this.props.className, {
      'departure-status' : true,
      'late' : !onTime && !actual
    })
    var departureTime = classNames(this.props.className, {
      'calling-point-departure-time' : true,
      'late' : !onTime && !actual
    });
    var callingPoint = classNames(this.props.className, {
      'calling-point clearfix' : true,
      'visited' : actual
    });
    return (
      <div className={callingPoint}>
        <div className="calling-point-timings">
          <div className="calling-point-scheduled-time">
            {data.scheduled}
          </div>
          <div className={departureTime}>
            {departureTimeOutput}
          </div>
        </div>
        <Map/>
        <div className="calling-point-departure">
          <div className="station-name" key={data.id}>
            {data.station}
          </div>
          <div className={callingPointDepartureStatus}>
            {departureStatus(scheduled, departure)}
          </div>
          <div className="platform">
            Platform <strong>{data.platform || '-'}</strong>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = CallingPoint;
