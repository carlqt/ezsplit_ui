import { connect } from 'react-redux';
import { getAccount } from 'Actions/account';
import { getCurrentHouse } from 'Actions/homes';
import { logout } from 'Actions/app';
import Route from './protected_route';

const mapStateToProps = state => {
  return {
    accountStore: state.accountStore,
  }
};

const mapDispatchToProps = {
  getAccount,
  getCurrentHouse,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Route);
