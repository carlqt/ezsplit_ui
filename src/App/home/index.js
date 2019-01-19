import { connect } from "react-redux";
import { getCurrentHouse } from 'Actions/homes';
import Home from './home';

const mapStateToProps = state => {
  return {
    home: state.homeStore,
  }
};

const mapDispatchToProps = {
  getCurrentHouse,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
