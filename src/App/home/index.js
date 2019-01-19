import { connect } from "react-redux";
import { getHome } from 'Actions/homes';
import Home from './home';

const mapStateToProps = state => {
  return {
    home: state.homeStore,
  }
};

const mapDispatchToProps = {
  getHome,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
