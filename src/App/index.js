import { connect } from "react-redux";
import { getAccount } from "Actions/account";
import { getHome } from 'Actions/homes';
import App from './app';

const mapStateToProps = state => {
  return {
    appStore: state.appStore,
    accountStore: state.accountStore,
  }
};

const mapDispatchToProps = {
  getAccount,
  getHome,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
