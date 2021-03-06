import { connect } from "react-redux";
import { getCurrentHouse } from 'Actions/homes';
import HomeSettings from './home_settings';

const mapStateToProps = state => {
  return {
    home: state.homeStore,
  }
};

const mapDispatchToProps = {
  getCurrentHouse,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeSettings);
