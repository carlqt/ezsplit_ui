import { connect } from "react-redux";
import { getAccount } from "Actions/account";
import Route from './protected_route';

const mapStateToProps = state => {
  return {
    accountStore: state.accountStore,
  }
};

const mapDispatchToProps = {
  getAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Route);
