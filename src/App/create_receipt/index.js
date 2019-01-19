import { connect } from "react-redux";
import { getCurrentHouse } from 'Actions/homes';
import { createReceipt } from 'Actions/receipts';
import { openAlert } from 'Actions/app';
import Receipts from './receipts';

const mapStateToProps = state => {
  return {
    members: state.homeStore.get('members'),
    homeStore: state.homeStore,
  }
};

const mapDispatchToProps = {
  getCurrentHouse,
  createReceipt,
  openAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(Receipts);
