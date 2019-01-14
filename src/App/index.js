import { connect } from "react-redux";
import App from './app';

const mapStateToProps = state => {
  return {
    appStore: state.appStore,
  }
};

export default connect(mapStateToProps)(App);
