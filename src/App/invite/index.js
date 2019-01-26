import { connect } from "react-redux";
import { joinHome } from 'Actions/homes';
import { openAlert } from 'Actions/app';
import Invite from './invite';

const mapStateToProps = state => {
  return {
    accountStore: state.accountStore,
    appStore: state.appStore,
  }
};

const mapDispatchToProps = {
  joinHome,
  openAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(Invite);
