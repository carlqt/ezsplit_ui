import { connect } from "react-redux";
import { getMembers } from 'Actions/homes';
import { createReceipt } from 'Actions/receipts';
import Receipts from './receipts';

const mapStateToProps = state => {
  return {
    members: state.homeStore.get('members'),
  }
};

const mapDispatchToProps = {
  getMembers,
  createReceipt,
};

export default connect(mapStateToProps, mapDispatchToProps)(Receipts);
