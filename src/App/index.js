import { connect } from "react-redux";
import App from './app';

const mapStateToProps = state => {
  return {
    appStore: state.appStore,
  }
};

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
