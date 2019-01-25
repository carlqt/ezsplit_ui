import { connect } from "react-redux";
import { login } from './actions';
import Login from './login';

const mapStateToProps = state => {
  return {
    accountStore: state.accountStore,
  }
};

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
