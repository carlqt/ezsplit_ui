import { connect } from 'react-redux';
import { getAccount } from 'Actions/account';
import { getCurrentHouse } from 'Actions/homes';
import Route from './protected_route';

const mapStateToProps = state => {
  return {
    accountStore: state.accountStore,
  }
};

const mapDispatchToProps = {
  getAccount,
  getCurrentHouse,
};

export default connect(mapStateToProps, mapDispatchToProps)(Route);
