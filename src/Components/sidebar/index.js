import { connect } from "react-redux";
import { getHome } from 'Actions/homes';
import Sidebar from './sidebar';

const mapStateToProps = state => {
  return {
    accountStore: state.accountStore,
  }
};

const mapDispatchToProps = {
  getHome,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
